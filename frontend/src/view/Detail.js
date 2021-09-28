import Component from "../core/Component.js";
import SelectedList from "../components/SelectedList.js";
import { request } from '../utility/api.js'
import { spearator } from '../utility/separator.js'

class Detail extends Component {
  data() {
    return {
      cost: 0,
      id: 0,
      imgSrc: null,
      name: '',
      options: [],
      selectedItemList: {}
    }
  }
  setup() {
    this.setChild('.selected-list', () => SelectedList, ['selectedItemList', 'cost'], {
      setSelectedItemList: (fn) => {
        this.state.selectedItemList = fn(this.state.selectedItemList)
      }
    })
  }
  template() {
    const { cost, id, imgSrc, name, options } = this.getData(['cost', 'id', 'imgSrc', 'name', 'options']);
    return `
      <article class="detail">
        <section class="img-box">
          <img
            class="fill-picture"
            src="${imgSrc}"
            alt="${name}"
          >
        </section>
        <section class="option-box">
          <h1>${name}</h1>
          <p>${cost}원 ~ </p>
          <select class="option-selet">
            <option value="">옵션을 선택해 주세요.</option>
            ${options.map(option => {
      const soldout = option.stock <= 0;
      return `
                <option
                  value="${option.id}"
                  ${soldout ? 'disabled="true"' : ""}
        >
        (${name}) ${option.name} ${option.cost > 0 ? '+' + spearator(option.cost) + '원' : ''} ${soldout ? '(품절) ' : option.stock + '개'}
                </option >
      `
    }).join('')}
          </select>
          <article class="selected-list">
          </article>
          <button type="button" class="put-button">장바구니에 추가</button>
        </section>
      </article>
    `
  }
  async created() {
    const itemId = history.state.id;
    const { id, name, imgSrc, cost, options } = await request(itemId);
    this.state.id = id;
    this.state.name = name;
    this.state.imgSrc = imgSrc;
    this.state.cost = cost;
    this.state.options = options;
  }
  setEvent() {
    const { setView, setCart } = this.emits;
    this.addEvent('change', '.option-selet', (e) => {
      const optionIndex = e.target.selectedIndex;
      if (optionIndex <= 0) return;
      const selectedOption = this.state.options[optionIndex - 1]
      if (this.state.selectedItemList[selectedOption.id] !== undefined) return;
      const newState = { [selectedOption.id]: { ...selectedOption, counter: 1 } }
      this.state.selectedItemList = { ...newState, ...this.state.selectedItemList }
    })
    this.addEvent('click', '.put-button', () => {
      const { id } = history.state;
      history.pushState(null, '품목', `/`)
      if (Object.keys(this.state.selectedItemList).length === 0) {
        setView(() => 'list')
        return;
      }
      setCart((oldVal) => ({ ...oldVal, [id]: this.state.selectedItemList }))
      setView(() => 'list')
    })
  }
}

export default Detail;