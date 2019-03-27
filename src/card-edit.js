import Component from "./component";
import {isActive} from "./get-card";
import {CommentEmoji} from "./get-card";
const moment = require(`moment`);
moment().format();


export default class CardEdit extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._poster = data.poster;
    this._description = data.description;
    this._year = data.year;
    this._hours = data.hours;
    this._minutes = data.minutes;
    this._dateFromNow = data.dateFromNow;
    this._rating = data.rating;
    this._comment = data.comment;
    this._commentEmoji = data.commentEmoji;
    this._genre = data.genre;
    this._element = null;
    this._unEdit = null;
    this._onChangeComment = this._onChangeComment.bind(this);
    this._onChangeRate = this._onChangeRate.bind(this);
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      commentEmoji: ``,
      comment: ``,
      rating: ``
    };

    const cardEditMapper = CardEdit.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (cardEditMapper[property]) {
        cardEditMapper[property](value);
      }
    }

    return entry;
  }

  _unEditCardClick() {
    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    const newData = this._processForm(formData);
    console.log(newData);
    if (typeof this._unEdit === `function`) {
      this._unEdit(newData);
    }

    this.update(newData);
  }

  _onChangeComment() {
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeRate() {
    this.unbind();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  set unEdit(fn) {
    this._unEdit = fn;
  }

  get template() {
    return `
<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${this._poster}.jpg" alt="${this._title}">

        <p class="film-details__age">18+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${this._title}</h3>
            <p class="film-details__title-original">Original: Невероятная семейка</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${this._rating}</p>
            <p class="film-details__user-rating">Your rate ${this._rating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">Brad Bird</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">Brad Bird</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">Samuel L. Jackson, Catherine Keener, Sophia Bush</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${moment().format(`ll`)} (USA)</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${moment.duration(this._hours, `hours`).humanize()}, ${moment.duration(this._minutes, `minutes`).humanize()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">USA</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${this._genre}</span>
              <span class="film-details__genre">${this._genre}</span>
              <span class="film-details__genre">${this._genre}</span></td>
          </tr>
        </table>

        <p class="film-details__film-description">
          ${this._description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" checked>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>

    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">1</span></h3>

      <ul class="film-details__comments-list">
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">😴</span>
          <div>
            <p class="film-details__comment-text">So long-long story, boring!</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">Tim Macoveev</span>
              <span class="film-details__comment-day">${moment(this._dateFromNow).fromNow()}</span>
            </p>
          </div>
        </li>
      </ul>

      <div class="film-details__new-comment">
        <div>
          <label for="add-emoji" class="film-details__add-emoji-label">${CommentEmoji[this._commentEmoji]}</label>
          <input type="checkbox" 
          class="film-details__add-emoji visually-hidden" 
          id="add-emoji" 
          ${isActive(this._commentEmoji)}>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item 
            visually-hidden" 
            name="comment-emoji" 
            type="radio" 
            id="emoji-sleeping" 
            value="sleeping"
            ${isActive(this._commentEmoji)}>
            <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

            <input class="film-details__emoji-item 
            visually-hidden" 
            name="comment-emoji" 
            type="radio" 
            id="emoji-neutral-face" 
            value="neutral-face" 
            ${isActive(this._commentEmoji)}>
            <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

            <input class="film-details__emoji-item 
            visually-hidden" 
            name="comment-emoji" 
            type="radio" 
            id="emoji-grinning" 
            value="grinning" 
            ${isActive(this._commentEmoji)}>
            <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
          </div>
        </div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment">${this._comment}</textarea>
        </label>
      </div>
    </section>

    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
        <button class="film-details__watched-reset" type="button">undo</button>
      </div>

      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="images/posters/blackmail.jpg" alt="film-poster" class="film-details__user-rating-img">
        </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">Incredibles 2</h3>

          <p class="film-details__user-rating-feelings">How you feel it?</p>

          <div class="film-details__user-rating-score">
            <input type="radio" name="score" 
            class="film-details__user-rating-input visually-hidden" 
            value="1" 
            id="rating-1"
            ${isActive(this._rating)}>
            <label class="film-details__user-rating-label" for="rating-1">1</label>

            <input type="radio" name="score" 
            class="film-details__user-rating-input visually-hidden" 
            value="2" 
            id="rating-2"
            ${isActive(this._rating)}>
            <label class="film-details__user-rating-label" for="rating-2">2</label>

            <input type="radio" name="score" 
            class="film-details__user-rating-input visually-hidden" 
            value="3" 
            id="rating-3"
            ${isActive(this._rating)}>
            <label class="film-details__user-rating-label" for="rating-3">3</label>

            <input type="radio" name="score" 
            class="film-details__user-rating-input visually-hidden" 
            value="4" 
            id="rating-4"
            ${isActive(this._rating)}>
            <label class="film-details__user-rating-label" for="rating-4">4</label>

            <input type="radio" name="score" 
            class="film-details__user-rating-input visually-hidden" 
            value="5" 
            id="rating-5"
            ${isActive(this._rating)}>
            <label class="film-details__user-rating-label" for="rating-5">5</label>

            <input type="radio" name="score" 
            class="film-details__user-rating-input 
            visually-hidden" 
            value="6" 
            id="rating-6"
            ${isActive(this._rating)}>
            <label class="film-details__user-rating-label" for="rating-6">6</label>

            <input type="radio" name="score" 
            class="film-details__user-rating-input visually-hidden" 
            value="7" 
            id="rating-7"
            ${isActive(this._rating)}>
            <label class="film-details__user-rating-label" for="rating-7">7</label>

            <input type="radio" name="score" 
            class="film-dectails__user-rating-input visually-hidden" 
            value="8" 
            id="rating-8"
            ${isActive(this._rating)}>
            <label class="film-details__user-rating-label" for="rating-8">8</label>

            <input type="radio" name="score" 
            class="film-details__user-rating-input visually-hidden" 
            value="9" 
            id="rating-9"
            ${isActive(this._rating)}>
            <label class="film-details__user-rating-label" for="rating-9">9</label>

          </div>
        </section>
      </div>
    </section>
  </form>
</section>`.trim();
  }

  bind() {
    this._element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._unEditCardClick.bind(this));
    this.element.querySelector(`.film-details__comment`)
      .addEventListener(`click`, this._onChangeComment.bind(this));
    this.element.querySelector(`.film-details__user-rating-score`)
      .addEventListener(`click`, this._onChangeRate.bind(this));
  }

  unbind() {
    this._element.querySelector(`.film-details__close-btn`)
      .removeEventListener(`click`, this._unEditCardClick);
    this.element.querySelector(`.film-details__comment`)
      .removeEventListener(`click`, this._onChangeComment.bind(this));
    this.element.querySelector(`.film-details__user-rating-score`)
      .removeEventListener(`click`, this._onChangeRate.bind(this));
  }

  update(data) {
    this._rating = data.rating;
    this._comment = data.comment;
    this._commentEmoji = data.commentEmoji;
  }


  static createMapper(target) {
    return {
      comment: (value) => {
        target.comment = value;
      },
      [`comment-emoji`]: (value) => {
        target.commentEmoji = value;
      },
      score: (value) => {
        target.rating = value;
      },
    };
  }
}
