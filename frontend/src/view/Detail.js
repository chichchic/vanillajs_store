import Component from "../core/Component.js";

class Detail extends Component {
  template() {
    const { imgSrc, name, options } = this.state;
    return `
      <article class="detail">
        <img
          class="fit-picture"
          src="${imgSrc}"
          alt="${name}"
        >
      </article>
    `
  }
}

export default Detail;