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
    `
  }
}

export default List;