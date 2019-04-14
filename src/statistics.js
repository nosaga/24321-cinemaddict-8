import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {getTotalTime} from "./helpers";
import {getMaxItem} from "./helpers";

const statsTotals = document.querySelector(`.statistic__text-list`);
const statsFilmsWatched = statsTotals.children[0].querySelector(`.statistic__item-text`);
const statsFilmsDuration = statsTotals.children[1].querySelector(`.statistic__item-text`);
const statsFilmsGenre = statsTotals.children[2].querySelector(`.statistic__item-text`);

export const getWatchedFilms = (films) => {
  const watchedFilms = [];
  films.forEach((film) => {
    if (film.isWatched === true) {
      watchedFilms.push(film);
    }
  });
  return watchedFilms;
};

export const sortFilms = (inputFilms) => {
  return inputFilms.reduce(
      (acc, {isWatched, hours, minutes, genre}) => {
        const {sortedByNumber, sortedByHours, sortedByMinutes, sortedByTop} = acc;
        // number
        if (sortedByNumber[isWatched]) {
          sortedByNumber[isWatched] += 1;
        } else {
          sortedByNumber[isWatched] = 1;
        }
        // hours
        if (sortedByHours[hours]) {
          sortedByHours[hours] += 1;
        } else {
          sortedByHours[hours] = 1;
        }
        // minutes
        if (sortedByMinutes[minutes]) {
          sortedByMinutes[minutes] += 1;
        } else {
          sortedByMinutes[minutes] = 1;
        }
        // sortedByTop
        if (sortedByTop[genre]) {
          sortedByTop[genre] += 1;
        } else {
          sortedByTop[genre] = 1;
        }
        return acc;
      },
      {
        sortedByNumber: {},
        sortedByHours: {},
        sortedByMinutes: {},
        sortedByTop: {}
      }
  );
};

export const getStatsTotals = (films) => {
  const sortedAll = sortFilms(films);
  const sortedByNumber = sortedAll.sortedByNumber.true;
  const sortedByTop = sortedAll.sortedByTop;
  const sortedByHours = getTotalTime(sortedAll.sortedByHours);
  const sortedByMinutes = getTotalTime(sortedAll.sortedByMinutes);
  const topGenre = getMaxItem(sortedAll.sortedByTop);


  statsFilmsWatched.innerHTML = sortedByNumber + `<span class="statistic__item-description">movies</span>`;
  statsFilmsDuration.innerHTML = sortedByHours + `<span class="statistic__item-description">h</span>` + sortedByMinutes + `<span class="statistic__item-description">m</span>`;
  statsFilmsGenre.innerHTML = topGenre + `<span class="statistic__item-description">movies</span>`;
  renderStats(sortedByTop);
};

const statisticCtx = document.querySelector(`.statistic__chart`);
export const renderStats = (item) => {
  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  const BAR_HEIGHT = 50;
  statisticCtx.height = BAR_HEIGHT * 5;
  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(item),
      datasets: [{
        data: Object.values(item),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

