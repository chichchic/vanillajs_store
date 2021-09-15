import Component from "./core/Component.js";
import List from "./view/List.js";
class App extends Component {
  async mounted() {
    this.listView()
  }
  async listView() {
    const res = await fetch('http://127.0.0.1:3000/')
    const itemList = await res.json();
    const list = new List(this.$target, {
      itemList: [], clickEvent: ({ target }) => {
        const id = target.dataset.id
        window.history.pushState({ data: id }, '품목', `/detail/${id}`)
      }
    });
    list.setState({ itemList })
  }
}

export default App;