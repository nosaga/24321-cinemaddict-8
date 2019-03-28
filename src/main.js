import makeFilter from './make-filter.js';
import {cards} from './get-card';
import Card from "./card";
import CardEdit from "./card-edit";
moment().format();
import moment from "moment";

export const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const mainNavigation = document.querySelector(`.main-navigation`);
const filmList = document.querySelectorAll(`.films-list__container`)[0];
const filmTopRated = document.querySelectorAll(`.films-list__container`)[1];
const filmCommented = document.querySelectorAll(`.films-list__container`)[2];
const filters = [`All`, `Watchlist`, `History`, `Favorites`, `Stats`];

filters.forEach((filter) => {
  mainNavigation.insertAdjacentHTML(`beforeend`, makeFilter(filter, getRandomNum(0, 15)));

});

const clearCards = () => {
  filmList.innerHTML = ``;
  filmTopRated.innerHTML = ``;
  filmCommented.innerHTML = ``;
};

const renderCards = () => {
  cards.forEach((item) => {
    const cardComponent = new Card(item);
    const editCardComponent = new CardEdit(item);
    filmList.appendChild(cardComponent.render());
    filmTopRated.appendChild(cardComponent.render());
    filmCommented.appendChild(cardComponent.render());
    cardComponent.onEdit = () => {
      editCardComponent.render();
      document.body.appendChild(editCardComponent.element);
      cardComponent.unrender();
    };
    editCardComponent.unEdit = (newObject) => {
      item.commentEmoji = newObject.commentEmoji;
      item.comment = newObject.comment;
      item.rating = newObject.rating;
      cardComponent.update(item);
      cardComponent.render();
      editCardComponent.update(item);
      document.body.removeChild(editCardComponent.element);
      editCardComponent.unrender();
      clearCards();
      renderCards();
    };
  });
};

renderCards();

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
    clearCards();
    renderCards();
  }
});


