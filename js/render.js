'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);

const renderPin = (pin) => {
  const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.style = `left: ${pin.location.x - PIN_WIDTH / 2}px; top: ${pin.location.y - PIN_HEIGHT}px;`;
  pinElement.querySelector(`img`).src = pin.author.avatar;
  pinElement.querySelector(`img`).alt = pin.offer.title;

  if (pin.offer === null || pin.offer === undefined) {
    return null;
  }
  return pinElement;
};

const renderPins = (elements) => {
  const fragment = document.createDocumentFragment();

  elements.map(renderPin).forEach((element) => fragment.append(element));

  mapPins.append(fragment);
};

window.renderPins = renderPins;
