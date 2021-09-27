import Component from "../core/Component.js";

import { spearator } from '../utility/separator.js'
class SelectedList extends Component {
  template() {
    const props = this.getProps();
    const selectedItemList = props.selectedItemList;
    const defaultCost = props.cost;
    return `
      <ul>
        ${Object.entries(selectedItemList).map(([_, { name, counter, cost, id, stock }]) => `
        <li class="seleted-list">
          ${name}
            <input type="number" data-id="${id}"
            value="${counter}" class="counter" min="0" max="${stock}"/>
        </li>
      `).join('')
      }
      </ul>
      <p> 총액: ${spearator(Object.entries(selectedItemList).reduce((acc, [_, { name, counter, cost, id, stock }]) => acc + (defaultCost + cost) * counter, 0))}원 </p>
    `
  }
  setEvent() {
    const { setSelectedItemList } = this.emits;
    this.addEvent('change', '.counter', (e) => {
      const { id } = e.target.dataset
      e.target.value = Math.max(e.target.min, e.target.value)
      e.target.value = Math.min(e.target.max, e.target.value)
      setSelectedItemList((oldVal) => ({
        ...oldVal,
        [id]: {
          ...oldVal[id],
          counter: e.target.value
        }
      }))
    })
  }
}

export default SelectedList;