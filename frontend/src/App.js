import Component from "./core/Component.js";
import List from "./view/List.js";
import Detail from "./view/Detail.js";
import Cart from "./view/Cart.js";
import { request } from './utility/api.js'

class App extends Component {
  data() {
    return {
      view: 'list', cart: {}
    }
  }
  template() {
    return `
      <div class="view"></div>
    `
  }
  setup() {
    this.setChild('.view', () => {
      switch (this.state.view) {
        case 'list':
          return List
        case 'detail':
          return Detail
        case 'cart':
          return Cart
        default:
          break;
      }
    }, ['cart'], {
      setView: (fn) => {
        const { view } = this.getData(['view'])
        this.state.view = fn(view);
      },
      setCart: (fn) => {
        const { cart } = this.getData(['cart'])
        this.state.cart = fn(cart)
      }
    })
  }
}

export default App;