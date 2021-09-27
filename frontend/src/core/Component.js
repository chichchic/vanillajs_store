import { debounceFrame } from '../utility/debounceFrame.js'

export default class Component {
  constructor($target = document.createElement('div'), props, emits) {
    this.$target = $target;
    this.props = props;
    this.emits = emits;
    this.events = [];
    this.childInfo = {};
    this.childComponent = {};
    this.parent = null;
    this._init();
  }
  async _init() {
    const [data, renderTarget] = this._publishData();
    this.state = data;
    this.renderTarget = renderTarget;
    await this.setup();
    await this.setEvent();
    await this.created();
    await this._render();
    await this.mounted();
  }
  _realRender() {
    const childEl = document.createElement('div');
    childEl.innerHTML = this.template().trim();
    this.$el = childEl.firstChild
    this._update();
    this._createChildren(childEl);
    const replaceEl = document.createElement('div');
    this.$target.innerHTML = ''
    this.$target.appendChild(replaceEl);
    this.$target.replaceChild(this.$el, replaceEl);
  }
  _render = debounceFrame(this._realRender.bind(this))
  _createChildren($target) {
    Object.entries(this.childInfo).forEach(([selector, { classType, props, emits }]) => {
      classType = classType();
      this.childComponent[selector] =
        new classType($target.querySelector(selector), props, emits)
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
  _publishData() {
    const data = this.data();
    const renderTarget = {};
    for (const key in data) {
      let _value = data[key];
      renderTarget[key] = null;
      Object.defineProperty(data, key, {
        get: () => _value,
        set: (value) => {
          _value = value;
          if (renderTarget[key] !== null) {
            renderTarget[key]._render();
          }
        }
      })
    }
    return [data, renderTarget]
  }
  data() { return {} }
  getProps() {
    return this.parent.getData(this.props, this);
  }
  getData(keys, renderTarget = this) {
    // TODO: 여기서 render를 set에 추가해야함
    return keys.reduce((acc, cur) => {
      acc[cur] = this.state[cur];
      if (this.renderTarget[cur] === null || this.renderTarget[cur] !== renderTarget.parent) {
        this.renderTarget[cur] = renderTarget;
      }
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
  setChild(selector, classType, props, emits) {
    if (this.childInfo[selector] !== undefined) {
      this.childInfo[selector] = { classType, props, emits }
      return;
    }
    let _value = { classType, props, emits };
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
  created() { };
}