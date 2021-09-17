import Component from "../core/Component.js";

import { spearator } from '../utility/separator.js'
class SelectedList extends Component {
  template() {
    const { selectedItemList, defaultCost } = this.state;
    return `
      <ul>
        ${Object.entries(selectedItemList).map(([_, { name, counter, cost, id, stock }]) => `
        <li class="seleted-list">
          ${name}
            <input type="number" data-id="${id}"
            value="${counter}"" class="counter" min="0" max="${stock}" size="10"/>
        </li>
      `).join('')
      }
      </ul>
      <p> 총액: ${spearator(Object.entries(selectedItemList).reduce((acc, [_, { name, counter, cost, id, stock }]) => acc + (defaultCost + cost) * counter, 0))}원 </p>
    `
  }
  setEvent() {
    const { changeEvent } = this.state;
    this.addEvent('change', '.counter', changeEvent)
  }
}

export default SelectedList;