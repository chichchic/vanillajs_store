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
    const { clickEvent, goCart } = this.methods;
    this.addEvent('click', '.item-card', clickEvent)
    this.addEvent('click', '.go-cart', goCart)
  }
}

export default List;