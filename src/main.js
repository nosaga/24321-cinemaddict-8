import {filters} from './make-filter.js';
import Filters from './filter';
import Card from "./card";
import CardEdit from "./card-edit";
import moment from "moment";
import {getCards} from "./get-card";
import {getWatchedFilms} from "./statistics";
import {getStatsTotals} from "./statistics";

moment().format();

export const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const mainNavigation = document.querySelector(`.main-navigation`);
const filmList = document.querySelectorAll(`.films-list__container`)[0];
const filmTopRated = document.querySelectorAll(`.films-list__container`)[1];
const filmCommented = document.querySelectorAll(`.films-list__container`)[2];
const chartSelector = mainNavigation.querySelector(`.main-navigation__item--additional`);
const filmsContainer = document.querySelector(`.films`);
const statsContainer = document.querySelector(`.statistic`);


const renderFilters = () => {
  filters.forEach((filter) => {
    const filterComponent = new Filters(filter);
    mainNavigation.insertBefore(filterComponent.render(), chartSelector);
  });
};

const showStats = () => {
  filmsContainer.classList.add(`visually-hidden`);
  statsContainer.classList.remove(`visually-hidden`);
  const watchedFilms = getWatchedFilms(initailFilms);
  getStatsTotals(watchedFilms);
};

chartSelector.addEventListener(`click`, showStats);

const initailFilms = getCards();

const filterFilms = (filmsAll, filterName) => {
  switch (filterName) {
    case `all`:
      return filmsAll;
    case `watchlist`:
      return filmsAll.filter((it) => it.isWatchlist === true);

    case `history`:
      return filmsAll.filter((it) => it.isWatched === true);

    case `favorites`:
      return filmsAll.filter((it) => it.isFavorite === true);

    default:
      throw new Error(`Unknown filter name`);
  }
};

const clearFilms = () => {
  filmList.innerHTML = ``;
  filmTopRated.innerHTML = ``;
  filmCommented.innerHTML = ``;
};

const renderFilms = (filmsAll) => {
  clearFilms();

  for (let i = 0; i < filmsAll.length; i++) {

    const film = filmsAll[i];
    const cardComponent = new Card(film);
    const editCardComponent = new CardEdit(film);

    filmList.appendChild(cardComponent.render());
    filmTopRated.appendChild(cardComponent.render());
    filmCommented.appendChild(cardComponent.render());
    cardComponent.onEdit = () => {
      editCardComponent.render();
      document.body.appendChild(editCardComponent.element);
      cardComponent.unrender();
    };
    cardComponent.onAddToWatchList = () => {
      film.isWatchlist = !film.isWatchlist;
      cardComponent.update(film);

    };
    cardComponent.onMarkAsWatched = () => {
      film.isWatched = !film.isWatched;
      cardComponent.update(film);
    };
    cardComponent.onMarkAsFavorite = () => {
      film.isFavorite = !film.isFavorite;
      cardComponent.update(film);

    };
    editCardComponent.unEdit = (newObject) => {
      film.commentEmoji = newObject.commentEmoji;
      film.comment = newObject.comment;
      film.rating = newObject.rating;
      film.isWatchlist = newObject.isWatchlist === `on`;
      film.isWatched = newObject.isWatched === `on`;
      film.isFavorite = newObject.isFavorite === `on`;
      cardComponent.update(film);
      cardComponent.render();
      editCardComponent.update(film);
      document.body.removeChild(editCardComponent.element);
      editCardComponent.unrender();
      clearFilms();
      renderFilms(initailFilms);
    };
  }
};

renderFilters();
renderFilms(initailFilms);

const filtersAll = document.querySelector(`.main-navigation`);

filtersAll.addEventListener(`click`, (evt) => {
  if (evt.target.tagName === `A`) {
    const filterName = evt.target.dataset.filterId;
    const filteredFilms = filterFilms(initailFilms, filterName);
    renderFilms(filteredFilms);
  }
});


