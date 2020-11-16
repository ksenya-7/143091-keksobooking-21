'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const AMOUNT_PINS = 5;

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
  const renderedPins = elements.slice(0, AMOUNT_PINS);
  document.querySelectorAll(`.map__pin:not(.map__pin--main)`).forEach((element) => (element.remove()));
  document.querySelectorAll(`.popup`).forEach((element) => (element.remove()));
  const fragment = document.createDocumentFragment();

  renderedPins.map(renderPin).forEach((element) => fragment.append(element));

  mapPins.append(fragment);

  const currentPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  window.openCards(elements, currentPins);
};

window.renderPins = renderPins;
