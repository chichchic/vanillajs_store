import Component from "./core/Component.js";
import List from "./view/List.js";
class App extends Component {
  async mounted() {
    const list = new List(this.$target, { itemList: [] });
    const res = await fetch('http://127.0.0.1:3000/')
    const itemList = await res.json();
    list.setState({ itemList })
  }
}

export default App;