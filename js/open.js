'use strict';

const PIN_MAIN_LEFT = `570px`;
const PIN_MAIN_TOP = `375px`;
const mapFiltersSelects = window.filter.mapStrainers.querySelectorAll(`.map__filter`);
const mapFeatures = window.filter.mapStrainers.querySelector(`.map__features`);
const mapFiltersFeatures = window.filter.mapStrainers.querySelectorAll(`.map__checkbox`);
const selectType = document.querySelector(`#type`);
const inputPrice = document.querySelector(`#price`);

window.filter.mapStrainers.style.opacity = `1`;
mapFeatures.style.opacity = `0.7`;

const FormAddressValue = {
  LEFT: parseInt(document.querySelector(`.map__pin--main`).style.left, 10) + window.move.PIN_MAIN_WIDTH / 2,
  TOP_INITIAL: parseInt(document.querySelector(`.map__pin--main`).style.top, 10) + window.move.PIN_MAIN_WIDTH / 2,
  TOP: parseInt(document.querySelector(`.map__pin--main`).style.top, 10) + window.move.PIN_MAIN_HEIGHT
};

const priceTypeValueDefault = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

const disableElements = (elements) => {
  for (const element of elements) {
    if (element.tagName === `INPUT`) {
      element.setAttribute(`disabled`, `disabled`);
    } else {
      element.setAttribute(`disabled`, `true`);
    }
  }
  document.querySelectorAll(`input, select`).forEach((item) => {
    item.style.outline = `none`;
  });

  mapFeatures.style.opacity = `0.7`;
};

const openPage = () => {
  disableElements(document.querySelector(`.ad-form`).children);
  disableElements(mapFiltersSelects);
  disableElements(mapFiltersFeatures);
  document.querySelector(`#address`).value = `${Math.round(FormAddressValue.LEFT)}, ${Math.round(FormAddressValue.TOP_INITIAL)}`;
  document.querySelector(`#address`).setAttribute(`readonly`, `readonly`);
  const type = selectType.value;
  inputPrice.placeholder = priceTypeValueDefault[type];
};
openPage();

const disactivatePage = () => {
  document.querySelector(`.ad-form`).classList.add(`ad-form--disabled`);
  document.querySelector(`.map`).classList.add(`map--faded`);
  window.render.undisplayPins();
  openPage();

  document.querySelector(`.map__pin--main`).style.left = PIN_MAIN_LEFT;
  document.querySelector(`.map__pin--main`).style.top = PIN_MAIN_TOP;

  document.querySelectorAll(`.ad-form__photo`).forEach((element) => {
    if (element.hasChildNodes()) {
      element.remove();
    }
  });
  document.querySelector(`.map__pin--main`).addEventListener(`mousedown`, window.onMouseDown);
};

window.open = {
  disactivatePage,
  FormAddressValue,
  priceTypeValueDefault,
  selectType,
  inputPrice
};
