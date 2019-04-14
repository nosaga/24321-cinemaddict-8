const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const filters = [
  {
    name: `All`,
    number: getRandomNum(1, 5)
  },
  {
    name: `Watchlist`,
    number: getRandomNum(0, 10)
  },
  {
    name: `History`,
    number: getRandomNum(1, 15)
  },
  {
    name: `Favorites`,
    number: getRandomNum(1, 17)
  },
];

