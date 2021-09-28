import Component from '../core/Component.js';
import { request } from '../utility/api.js'

class List extends Component {
  data() {
    return {
      itemList: []
    }
  }
  template() {
    const { itemList } = this.getData(['itemList']);
    return `
    <section class="list">
      <ul class="item-list">
      ${itemList.map(({ id, imgSrc, name }) => `
        <li class="item-card" data-id="${id}">
          <img
            class="fit-picture"
            src="${imgSrc}"
            alt="${name}"
          >
          <p>${name}</p>
        </li>
      `).join('')}
      </ul>
      <button type="button" class="go-cart">카트로 이동하기</button>
    </section>
    `
  }
  async mounted() {
    this.state.itemList = await request();
  }
  setEvent() {
    const { setView } = this.emits;
    this.addEvent('click', '.item-card', (e, currentTarget) => {
      const { id } = currentTarget.dataset
      history.pushState({ id }, '상세', `/detail/${id}`)
      setView(() => 'detail')
    })
    this.addEvent('click', '.go-cart', () => {
      history.pushState(null, '장바구니', `/detail/cart`)
      setView(() => 'cart')
    })
  }
}

export default List;