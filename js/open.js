'use strict';

const PIN_MAIN_LEFT = `570px`;
const PIN_MAIN_TOP = `375px`;
const mapDefaultFilters = document.querySelector(`.map__filters`);
const mapDefaultFiltersSelects = mapDefaultFilters.querySelectorAll(`.map__filter`);
const mapDefaultFeatures = mapDefaultFilters.querySelector(`.map__features`);
const mapDefaultFiltersFeatures = mapDefaultFilters.querySelectorAll(`.map__checkbox`);

mapDefaultFilters.style.opacity = `1`;
mapDefaultFeatures.style.opacity = `0.7`;

const FormAddressValue = {
  LEFT: parseInt(document.querySelector(`.map__pin--main`).style.left, 10) + window.move.PIN_MAIN_WIDTH / 2,
  TOP_INITIAL: parseInt(document.querySelector(`.map__pin--main`).style.top, 10) + window.move.PIN_MAIN_WIDTH / 2,
  TOP: parseInt(document.querySelector(`.map__pin--main`).style.top, 10) + window.move.PIN_MAIN_HEIGHT
};

const priceTypeValueDefaultOpen = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

const disabledElements = (elements) => {
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

  mapDefaultFeatures.style.opacity = `0.7`;
};

const openPage = () => {
  disabledElements(document.querySelector(`.ad-form`).children);
  disabledElements(mapDefaultFiltersSelects);
  disabledElements(mapDefaultFiltersFeatures);
  document.querySelector(`#address`).value = Math.round(FormAddressValue.LEFT) + `, ` + Math.round(FormAddressValue.TOP_INITIAL);
  document.querySelector(`#address`).setAttribute(`readonly`, `readonly`);
  const type = document.querySelector(`#type`).value;
  document.querySelector(`#price`).placeholder = priceTypeValueDefaultOpen[type];
};
openPage();

const disactivatePage = () => {
  document.querySelector(`.ad-form`).classList.add(`ad-form--disabled`);
  document.querySelector(`.map`).classList.add(`map--faded`);
  window.render.removePins();
  openPage();

  document.querySelector(`.map__pin--main`).style.left = PIN_MAIN_LEFT;
  document.querySelector(`.map__pin--main`).style.top = PIN_MAIN_TOP;
  document.querySelector(`.ad-form-header__preview img`).src = `img/muffin-grey.svg`;
  document.querySelectorAll(`.ad-form__photo`).forEach((element) => {
    if (element.hasChildNodes()) {
      element.remove();
    }
  });
  document.querySelector(`.map__pin--main`).addEventListener(`mousedown`, window.onMouseDown);
};

window.open = {
  disactivatePage,
  FormAddressValue
};
