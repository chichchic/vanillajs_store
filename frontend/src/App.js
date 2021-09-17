import Component from "./core/Component.js";
import List from "./view/List.js";
import Detail from "./view/Detail.js";
import Cart from "./view/Cart.js";
import { request } from './utility/api.js'
class App extends Component {
  setup() {
    this.state = { view: 'list', cart: [] };
  }
  async mounted() {
    const { view } = this.state
    switch (view) {
      case 'list':
        this.listView();
        break;
      case 'detail':
        this.DetailView();
        break;
      case 'cart':
        this.CartView();
        break;
    }
  }
  async listView() {
    const itemList = await request();
    const list = new List(this.$target, {
      itemList: [],
      clickEvent: (e, currentTarget) => {
        const id = currentTarget.dataset.id
        history.pushState({ id: id }, '품목', `/detail/${id}`)
        this.setState({ view: 'detail' })
      },
      goCart: (e) => {
        this.setState({ view: 'cart' })
      }
    });
    list.setState({ itemList })
  }
  async DetailView() {
    const { id } = history.state
    const itemInfo = await request(id);
    const detail = new Detail(this.$target, {
      ...itemInfo,
      changeEvent: function (e) {
        const optionIndex = e.target.selectedIndex;
        if (optionIndex <= 0) return;
        const selectedOption = itemInfo.options[optionIndex - 1]
        if (detail.state.selectedItemList[selectedOption.id] !== undefined) return;
        const newState = { [selectedOption.id]: { ...selectedOption, counter: 1 } }
        detail.setState({ selectedItemList: { ...detail.state.selectedItemList, ...newState } })
      },
      clickEvent: (e) => {
        this.setState({ cart: { ...detail.state.cart, [id]: detail.state.selectedItemList }, view: 'list' })
      }
    });
  }
  CartView() {
    const cart = new Cart(this.$target, { cart: this.state.cart })
  }
}

export default App;