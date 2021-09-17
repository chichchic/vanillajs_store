import Component from '../core/Component.js';
import { spearator } from '../utility/separator.js'

class Cart extends Component {
  template() {
    const { cart, itemInfo } = this.state;
    return `
      <section class="cart">
        ${Object.entries(cart).map(([key, selectedList]) => `
        <article class="item">
          <img src="${itemInfo[key].imgSrc}"/>
          <div class="item--info" >
            <h1>${itemInfo[key].name}</h1>
            <ul>
              ${Object.entries(selectedList).map(([id, item]) => `
                <li>
                  ${item.name} ${item.counter}개. ${spearator((item.cost + itemInfo[key].cost) * item.counter)}원
                </li>
              `).join('')}
            </ul>
          </div>
        </article>
        `).join('')}
        <p>총액: ${spearator(Object.entries(cart).reduce((acc, [key, selectedList]) =>
      acc + Object.entries(selectedList).reduce((acc, [id, item]) =>
        acc + ((item.cost + itemInfo[key].cost) * item.counter), 0)
      , 0))}</p>
      </section>
    `
  }
}

export default Cart