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
}

export default Component