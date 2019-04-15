import {getRandomNum} from "./main";
import Component from "./component";
import moment from "moment";

export default class Card extends Component {
  constructor(data) {
    super();
    this._title = data.name;
    this._poster = data.poster;
    this._iconFav = data.iconFav;
    this._description = data.description;
    this._year = data.year;
    this._hours = data.hours;
    this._minutes = data.minutes;
    this._rating = data.rating;
    this._comment = data.comment;
    this._genre = data.genre;
    this._cardTypes = data.cardTypes;
    this._isWatchlist = data.isWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
    this._element = null;


    this._onEdit = null;
    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;
    this._onMarkAsFavorite = null;

    this._onAddToWatchClick = this._onAddToWatchClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
    this._onMarkAsFavoriteClick = this._onMarkAsFavoriteClick.bind(this);
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  _onAddToWatchClick() {
    if (typeof this._onAddToWatchList === `function`) {
      this._onAddToWatchList();
    }
  }

  _onMarkAsWatchedClick() {
    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched();
    }
  }

  _onMarkAsFavoriteClick() {
    if (typeof this._onMarkAsFavorite === `function`) {
      this._onMarkAsFavorite();
    }
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  set onMarkAsFavorite(fn) {
    this._onMarkAsFavorite = fn;
  }

  get template() {
    return `
<article 
    class="film-card">
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${moment(this._year).format(`LL`)} </span>
      <span class="film-card__duration">${moment.duration(this._hours, `hours`).humanize()}, ${moment.duration(this._minutes, `minutes`).humanize()}</span>
      <span class="film-card__genre">${this._genre}</span>
    </p>
    <img src="${this._poster}.jpg" alt="" class="film-card__poster">
    <p class="film-card__description">${[...this._description].map((desc) =>`
  ${desc}`).splice(getRandomNum(0, 7), 2).join(``)}</p>
      <button class="film-card__comments">${getRandomNum(0, 30)}
   comments</button>
      <form class="film-card__controls">
        <button type="button" class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button type="button" class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button type="button" class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
   </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._onAddToWatchClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._onMarkAsWatchedClick);
    this._element.querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._onMarkAsFavoriteClick);
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`)
      .removeEventListener(`click`, this._onEditButtonClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
      .removeEventListener(`click`, this._onAddToWatchClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
      .removeEventListener(`click`, this._onMarkAsWatchedClick);
    this._element.querySelector(`.film-card__controls-item--favorite`)
      .removeEventListener(`click`, this._onMarkAsFavoriteClick);
  }

  update(data) {
    this._rating = data.rating;
    this._comment = data.comment;
    this._commentEmoji = data.commentEmoji;
    this._isWatchlist = data.isWatchlist;
    this._isWatched = data.isWatched;
    this._isFavorite = data.isFavorite;
  }

}
