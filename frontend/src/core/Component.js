export default class Component {
  constructor($target = document.createElement('div'), props, methods) {
    this.$target = $target;
    this.props = props;
    this.methods = methods;
    this.events = [];
    this.childInfo = {};
    this.childComponent = {};
    this.state = this.data();
    this.parent = null;
    this.setup();
    this.setEvent();
    this._render();
    this.mounted();
  }
  _render() {
    const childEl = document.createElement('div');
    childEl.innerHTML = this.template().trim();
    this.$el = childEl.firstChild
    this._update();
    this._createChildren(childEl);
    const replaceEl = document.createElement('div');
    this.$target.innerHTML = ''
    this.$target.appendChild(replaceEl);
    this.$target.replaceChild(this.$el, replaceEl);
  };
  _createChildren($target) {
    Object.entries(this.childInfo).forEach(([selector, { classType, props, methods }]) => {
      this.childComponent[selector] =
        new classType($target.querySelector(selector), props, methods)
      this.childComponent[selector].parent = this;
    })
  }
  _update() {
    for (const key in this.childComponent) {
      this.childComponent[key]._destroy();
    }
  }
  _destroy() {
    this.events.forEach(({ type, eventListener }) => {
      this.$target.removeEventListener(type, eventListener);
    })
    for (const key in this.childComponent) {
      this.childComponent[key]._destroy();
    }
  }
  data() { return {} }
  getData(keys) {
    return keys.reduce((acc, cur) => {
      acc[cur] = this.state[cur];
      let _value = this.state[cur];
      if (_value === undefined) {
        itemList = this.props[cur]
      }
      Object.defineProperty(this.state, cur, {
        get: () => _value,
        set: (value) => {
          _value = value;
          this._render();
        }
      })
      return acc;
    }, {})
  }
  // NOTE: template에 가장 바깥은 한개의 태그로 감싸져있어야 함
  template() { return '' }
  setEvent() { };
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
    this.events.push({ type: eventType, eventListener });
  };
  setChild(selector, classType, props, methods) {
    if (this.childInfo[selector] !== undefined) {
      this.childInfo[selector] = { classType, props, methods }
      return;
    }
    let _value = { classType, props, methods };
    Object.defineProperty(this.childInfo, selector, {
      get: () => _value,
      set: (value) => {
        _value = value;
        this._render();
      },
      enumerable: true
    })
  }
  setup() { };
  mounted() { };
}