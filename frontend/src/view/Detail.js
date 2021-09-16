import Component from "../core/Component.js";

class Detail extends Component {
  template() {
    const { cost, id, imgSrc, name, options } = this.state;
    return `
      <article class="detail">
        <section class="img-box">
          <img
            class="fit-picture"
            src="${imgSrc}"
            alt="${name}"
          >
        </section>
        <section class="option-box">
          <h1>${name}</h1>
          <p>${cost}원 ~ </p>
          <select class="option-selet">
            <option value="">옵션을 선택해 주세요.</option>
            ${options.map(option => {
      const soldout = option.stock <= 0;
      return `
                <option
                  value="${option.id}"
                  ${soldout ? 'disabled="true"' : ""}
        >
        (${name}) ${option.name} ${option.cost > 0 ? '+' + option.cost + '원' : ''} ${soldout ? '(품절) ' : option.stock + '개'}
                </option >
      `
    }).join('')}
          </select>
          <article class="selected-list">
          </artilce>
        </section>
      </article>
    `
  }
  setEvent() {
    const { changeEvent } = this.state;
    this.addEvent('change', '.option-selet', changeEvent)
  }
}

export default Detail;