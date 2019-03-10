import makeFilter from './make-filter.js';
import makeCard from './make-card';
import {getCard} from './get-card';

export const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const mainNavigation = document.querySelector(`.main-navigation`);
const filmsAll = document.querySelectorAll(`.films-list__container`);
const filmList = document.querySelectorAll(`.films-list__container`)[0];
const filmTopRated = document.querySelectorAll(`.films-list__container`)[1];
const filmCommented = document.querySelectorAll(`.films-list__container`)[2];
const filters = [`All`, `Watchlist`, `History`, `Favorites`, `Stats`];

filters.forEach((filter) => {
  mainNavigation.insertAdjacentHTML(`beforeend`, makeFilter(filter, getRandomNum(0, 15)));

});

const renderCards = (elem, num) => {
  for (let i = 0; i < num; i++) {
    elem.insertAdjacentHTML(`beforeend`, makeCard(getCard()));
  }
};

renderCards(filmList, 7);
renderCards(filmTopRated, 2);
renderCards(filmCommented, 2);

let selectedFilter;
const filtersAll = document.querySelectorAll(`.main-navigation`)[0];

const addClass = function (node) {
  if (selectedFilter) {
    selectedFilter.classList.remove(`main-navigation__item--active`);
  }
  selectedFilter = node;
  selectedFilter.classList.add(`main-navigation__item--active`);
};

filtersAll.addEventListener(`click`, function (evt) {
  let target = evt.target;

  if (target.classList !== `main-navigation__item`) {
    addClass(target);
    filmsAll.forEach((film) => {
      film.innerHTML = ``;
    });
    renderCards(filmList, 7, `moonrise`);
    renderCards(filmTopRated, 2, `blue-blazes`);
    renderCards(filmCommented, 2, `accused`);
  }
});

