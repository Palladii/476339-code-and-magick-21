'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const FONT_GAP = 15;
const BAR_HEIGHT = 150;
const BAR_WIDTH = 40;
const GAP_BAR = 50;
const GRAPH_START = CLOUD_Y + GAP + FONT_GAP * 3;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText(`Список результатов:`, CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);

  ctx.fillStyle = `#000`;

  const maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    ctx.fillText(
        Math.ceil(times[i]),
        CLOUD_X + GAP + (BAR_WIDTH + GAP_BAR) * i,
        GRAPH_START + BAR_HEIGHT - (BAR_HEIGHT * times[i] / maxTime)
    );

    if (players[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      let randomColor = getRandomInt(1, 70);
      ctx.fillStyle = `hsl(240, ` + randomColor + `%, 50%)`;
    }

    ctx.fillRect(
        CLOUD_X + GAP + (BAR_WIDTH + GAP_BAR) * i,
        GRAPH_START + FONT_GAP + GAP + BAR_HEIGHT - (BAR_HEIGHT * times[i] / maxTime),
        BAR_WIDTH,
        BAR_HEIGHT * times[i] / maxTime
    );
    ctx.fillStyle = `#000`;
    ctx.fillText(
        players[i],
        CLOUD_X + GAP + (BAR_WIDTH + GAP_BAR) * i,
        GRAPH_START + FONT_GAP + GAP + BAR_HEIGHT + GAP
    );
  }
};

