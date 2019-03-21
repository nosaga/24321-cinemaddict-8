import {getRandomNum} from "./main";
import Component from "./component";

export default class Card extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._poster = data.poster;
    this._description = data.description;
    this._year = data.year;
    this._hours = data.hours;
    this._minutes = data.minutes;
    this._rating = data.rating;
    this._genre = data.genre;
    this._cardTypes = data.cardTypes;
    this._element = null;
    this._onEdit = null;
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
<article 
    class="${this._cardTypes}">
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this._year.getFullYear()}</span>
      <span class="film-card__duration">${this._hours[getRandomNum(0, 5)]}h&nbsp;${this._minutes[getRandomNum(0, 6)]}m</span>
      <span class="film-card__genre">${this._genre[getRandomNum(0, 8)]}</span>
    </p>
    <img src="${this._poster}.jpg" alt="" class="film-card__poster">
    <p class="film-card__description">${[...this._description].map((desc) =>`
  ${desc}`).splice(getRandomNum(0, 7), 2).join(``)}</p>
      <button class="film-card__comments">${getRandomNum(0, 30)}
   comments</button>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
   </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }

}
