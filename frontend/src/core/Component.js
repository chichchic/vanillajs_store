class Component {
  $target;
  state;
  constructor($target, state) {
    this.$target = $target;
    this.state = state;
    this.setup();
    this.setEvent();
    this.render();
  }
  setup() { }
  mounted() { }
  template() { return '' }
  render() {
    const { $target } = this;
    $target.innerHTML = this.template();
    this.mounted();
  }
  setEvent() { };
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
  addEvent(eventType, selector, callBack) {
    const children = [...this.$target.querySelectorAll(selector)]
    const isTarget = target => children.includes(target)
      || target.closest(selector)
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callBack(event)
    })
  }
}

export default Component