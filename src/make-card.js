import {getRandomNum} from "./main";

export default (card) => `<article 
    class="film-card">
    <h3 class="film-card__title">${card.title}</h3>
    <p class="film-card__rating">9.8</p>
    <p class="film-card__info">
      <span class="film-card__year">2018</span>
      <span class="film-card__duration">1h&nbsp;13m</span>
      <span class="film-card__genre">Comedy</span>
    </p>
    <img src="${card.poster}.jpg" alt="" class="film-card__poster">
    <p class="film-card__description">${[...card.description].map((desc) => `${desc}`).splice(getRandomNum(0, 7), 2).join(``)}</p>
    
    <button class="film-card__comments">13 comments</button>

    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
 </article>`;
