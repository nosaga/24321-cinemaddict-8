import makeFilter from './make-filter.js';
import makeCard from './make-card';

const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const mainNavigation = document.querySelector(`.main-navigation`);
const filmList = document.querySelectorAll(`.films-list__container`)[0];
const filmTopRated = document.querySelectorAll(`.films-list__container`)[1];
const filmCommented = document.querySelectorAll(`.films-list__container`)[2];
const filters = [`All`, `Watchlist`, `History`, `Favorites`, `Stats`];

const renderFilters = function () {
  for (let i = 0; i < filters.length; i++) {
    mainNavigation.insertAdjacentHTML(`beforeend`, makeFilter(filters[i], getRandomNum(0, 15)));
  }
};

renderFilters();

const renderCards = function (elem, num, caption) {
  for (let i = 0; i < num; i++) {
    elem.insertAdjacentHTML(`beforeend`, makeCard(caption));
  }
};

renderCards(filmList, 7, `moonrise`);
renderCards(filmTopRated, 2, `blue-blazes`);
renderCards(filmCommented, 2, `accused`);

let selectedFilter;
const filtersAll = document.querySelectorAll(`.main-navigation`)[0];


const addClass = function (node) {
  if (selectedFilter) {
    selectedFilter.classList.remove (`main-navigation__item--active`);
  }
  selectedFilter = node;
  selectedFilter.classList.add(`main-navigation__item--active`);
  renderCards(7, 2, 2);
}


filtersAll.addEventListener(`click`, function (evt) {
  let target = evt.target;

  if (target.classList !== `main-navigation__item`) {
    addClass(target);
  }
});

