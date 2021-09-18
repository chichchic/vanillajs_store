import { debounceFrame } from '../utility/debounceFrame.js'
class Component {
  $target;
  state;
  constructor($target, state) {
    this.$target = $target;
    this.state = { ...state, _childComponent: {} };
    this._events = [];
    this._render = debounceFrame(() => {
      this.$target.innerHTML = this.template();
      this.mounted();
    })
    this.setup();
    this.setEvent();
    this.render();
  }
  appendChild(key, childComponent) {
    this.state._childComponent[key] = childComponent;
  }
  setup() { }
  mounted() { }
  _destroyed() {
    this._events.forEach(({ type, eventListener }) => {
      this.$target.removeEventListener(type, eventListener);
    })
    for (const [key, childComponent] of Object.entries(this.state._childComponent)) {
      childComponent._destroyed();
    }
    this.destroyed();
  }
  _update() {
    for (const [key, childComponent] of Object.entries(this.state._childComponent)) {
      childComponent._destroyed();
    }
    this.update();
  }
  update() {

  }
  destroyed() { }
  template() { return '' }
  render() {
    this._render();
  }
  setEvent() { };
  setState(newState) {
    this._update();
    this.state = { ...this.state, ...newState };
    this.render();
  }
  addEvent(eventType, selector, callBack) {
    const children = [...this.$target.querySelectorAll(selector)]
    const isTarget = target => children.find((el) => el === target)
      || target.closest(selector)
    const eventListener = (event) => {
      const currentTarget = isTarget(event.target)
      if (!currentTarget) return false;
      callBack(event, currentTarget)
    }
    this.$target.addEventListener(eventType, eventListener)
    this._events.push({ type: eventType, eventListener });
  }
}

export default Component