import {getRandomNum} from "./main";
import {cardTypes} from "./get-card";

export default (card) => `<article 
    class="${cardTypes[getRandomNum(0, 2)]}">
    <h3 class="film-card__title">${card.title}</h3>
    <p class="film-card__rating">${card.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${card.year.getFullYear()}</span>
      <span class="film-card__duration">${card.hours[getRandomNum(0, 5)]}h&nbsp;${card.minutes[getRandomNum(0, 6)]}m</span>
      <span class="film-card__genre">${card.genre[getRandomNum(0, 8)]}</span>
    </p>
    <img src="${card.poster}.jpg" alt="" class="film-card__poster">
    <p class="film-card__description">${[...card.description].map((desc) => `${desc}`).splice(getRandomNum(0, 7), 2).join(``)}</p>
    
    <button class="film-card__comments">${getRandomNum(0, 30)} comments</button>

    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
 </article>`;
