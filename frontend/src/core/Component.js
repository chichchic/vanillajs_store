import { debounceFrame } from '../utility/debounceFrame.js'
class Component {
  $target;
  state;
  constructor($target, state) {
    this.$target = $target;
    this.state = { ...state, _childCoponents: {} };
    this._render = debounceFrame(() => {
      this.$target.innerHTML = this.template();
      this.mounted();
    })
    this.setup();
    this.setEvent();
    this.render();
  }
  setup() { }
  mounted() { }
  template() { return '' }
  render() {
    this._render();
  }
  setEvent() { };
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
  addEvent(eventType, selector, callBack) {
    const children = [...this.$target.querySelectorAll(selector)]
    const isTarget = target => children.find((el) => el === target)
      || target.closest(selector)
    this.$target.addEventListener(eventType, (event) => {
      const currentTarget = isTarget(event.target)
      if (!currentTarget) return false;
      callBack(event, currentTarget)
    })
  }
}

export default Component