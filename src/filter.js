import Component from "./component";

export default class Filters extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._number = data.number;
    this._onFilter = null;

    this._onFilterClick = this._onFilterClick.bind(this);
  }
  _onFilterClick(evt) {
    evt.preventDefault();
    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }
  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `
      <a href="${this._name.toLowerCase()}"
      class="main-navigation__item main-navigation__item">
        ${this._name}
        <span class="main-navigation__item-count">${this._number}</span>
    </a>`.trim();
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterClick);
  }
  unbind() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }

}
