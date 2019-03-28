export const getCard = () => ({
  title: title[Math.floor(Math.random() * 15)],
  poster: `/images/posters/${posters[Math.floor(Math.random() * 5)]}`,
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
  ],
  year: new Date(getRandomNum(1936, 2019), 1),
  hours: [1, 2, 3][Math.floor(Math.random() * 3)],
  minutes: [15, 20, 25, 30, 45][Math.floor(Math.random() * 5)],
  dateFromNow: [`2019-01-20`, `2019-03-24`, `2019-02-25`, `2019-01-20`, `2019-03-00`][Math.floor(Math.random() * 5)],
  rating: rating[Math.floor(Math.random() * 8)],
  comment: comment[Math.floor(Math.random() * 6)],
  commentEmoji: Object.keys(CommentEmoji)[Math.floor(Math.random() * 3)],
  genre: [`Comedy`, `Thriller`, `Drama`, `Horror`, `Action`, `Sci-Fi`, `Detective`, `Fantasy`],
  cardTypes: [`film-card`, `film-card film-card--no-controls`][Math.floor(Math.random() * 2)]
});

export const CommentEmoji = {
  sleeping: `😴`,
  [`neutral-face`]: `😐`,
  [`emoji-grinning`]: `😀`
};

export const comment = [`nice`, `very boring`, `not fot family watch`, `too many fights`, `funny`, `encouraging`]
export const rating = [1, 2, 3, 4, 5, 6, 7, 8];
const getRandomNum = (min, max) => ((Math.random() * (max - min)) + min).toFixed(1);

const posters = [
  `accused`, `blackmail`, `blue-blazes`, `fuga-da-new-york`, `moonrise`, `three-friends`
];

const title = [
  `True detectives`,
  `Captain Marvel`,
  `The mule`,
  `How to Train Your Dragon: The Hidden World`,
  `Vice`,
  `Alien`,
  `Arctic`,
  `Friends`,
  `Fantastic Beasts: The Crimes of Grindewald`,
  `Avengers: Infinity War`,
  `Britt-Marie var här`,
  `Taxi Driver`,
  `Perfetti Sconosciuti`,
  `Cost Away`,
  `First Man`,
  `Whiplash`,
  `Rick and Morty`
];


const getCards = () => {
  const cards = [];
  for (let i = 0; i < Math.floor(getRandomNum(3, 7)); i++) {
    cards.push(getCard());
  }
  return cards;
};

export const isActive = (active) => active ? `checked` : ``;
export const cards = getCards();
