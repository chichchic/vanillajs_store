import Component from "../core/Component.js";
import SelectedList from "../components/SelectedList.js";
import { spearator } from '../utility/separator.js'

class Detail extends Component {
  setup() {
    this.state.selectedItemList = {};
  }
  template() {
    const { cost, id, imgSrc, name, options } = this.state;
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
  mounted() {
    const { selectedItemList, cost } = this.state
    this.state._childCoponents.selectedList = new SelectedList(document.querySelector('.selected-list'), {
      selectedItemList, defaultCost: cost, changeEvent: (e) => {
        const id = e.target.dataset.id
        const counter = e.target.value < 0 ? 0
          : e.target.value > e.target.max ? e.target.max
            : e.target.value;
        this.setState({
          selectedItemList: {
            ...this.state.selectedItemList,
            [id]: {
              ...this.state.selectedItemList[id],
              counter
            }
          }
        })
      }
    })
  }
  setEvent() {
    const { changeEvent, clickEvent } = this.state;
    this.addEvent('change', '.option-selet', changeEvent)
    this.addEvent('click', '.put-button', clickEvent)
  }
}

export default Detail;