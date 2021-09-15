import Component from "./core/Component.js";
import List from "./view/List.js";
import Detail from "./view/Detail.js";
class App extends Component {
  setup() {
    this.state = { view: 'list' };
  }
  async mounted() {
    const { view } = this.state
    switch (view) {
      case 'list':
        this.listView();
        break;
      case 'detail':
        this.Detail();
        break;
    }
  }
  async listView() {
    const res = await fetch('http://127.0.0.1:3000/')
    const itemList = await res.json();
    const list = new List(this.$target, {
      itemList: [], clickEvent: ({ target }) => {
        const id = target.dataset.id
        history.pushState({ id: id }, '품목', `/detail/${id}`)
        this.setState({ view: 'detail' })
      }
    });
    list.setState({ itemList })
  }
  async Detail() {
    const { id } = history.state
    const res = await fetch(`http://127.0.0.1:3000/options?id=${id}`)
    const itemInfo = await res.json();
    console.log(itemInfo)
    const list = new Detail(this.$target, {});
  }
}

export default App;