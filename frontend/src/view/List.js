import Component from '../core/Component.js';

class List extends Component {
  template() {
    const { itemList } = this.state;
    return `
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
    `
  }
  setEvent() {
    const { clickEvent, goCart } = this.state;
    this.addEvent('click', '.item-card', clickEvent)
    this.addEvent('click', '.go-cart', goCart)
  }
}

export default List;