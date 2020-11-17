'use strict';

const PIN_MAIN_WIDTH_FOR_OPEN = 65;
const PIN_MAIN_HEIGHT_FOR_OPEN = 87;
const mapDefaultFilters = document.querySelector(`.map__filters`);
const mapDefaultFiltersSelects = mapDefaultFilters.querySelectorAll(`.map__filter`);
const mapDefaultFeatures = mapDefaultFilters.querySelector(`.map__features`);
const mapDefaultFiltersFeatures = mapDefaultFilters.querySelectorAll(`.map__checkbox`);

mapDefaultFilters.style.opacity = `1`;
mapDefaultFeatures.style.opacity = `0.7`;

const FormAdressValue = {
  LEFT: parseInt(document.querySelector(`.map__pin--main`).style.left, 10) + PIN_MAIN_WIDTH_FOR_OPEN / 2,
  TOP_INITIAL: parseInt(document.querySelector(`.map__pin--main`).style.top, 10) + PIN_MAIN_WIDTH_FOR_OPEN / 2,
  TOP: parseInt(document.querySelector(`.map__pin--main`).style.top, 10) + PIN_MAIN_HEIGHT_FOR_OPEN
};

const priceTypeValueDefaultOpen = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

// console.log(document.querySelector(`.ad-form`).children);
const disabledElements = (elements) => {
  for (let element of elements) {
    if (element.tagName === `INPUT`) {
      element.setAttribute(`disabled`, `disabled`);
    } else {
      element.setAttribute(`disabled`, `true`);
    }
  }
  document.querySelectorAll(`input`).forEach((item) => {
    item.style.outline = `none`;
  });
  document.querySelectorAll(`select`).forEach((item) => {
    item.style.outline = `none`;
  });
  mapDefaultFeatures.style.opacity = `0.7`;
};

const removePins = () => {
  document.querySelectorAll(`.map__pin:not(.map__pin--main)`).forEach((element) => element.remove());
  document.querySelectorAll(`.map__card`).forEach((element) => element.remove());
};

const openPage = () => {
  disabledElements(document.querySelector(`.ad-form`).children);
  disabledElements(mapDefaultFiltersSelects);
  disabledElements(mapDefaultFiltersFeatures);
  document.querySelector(`#address`).value = Math.round(FormAdressValue.LEFT) + `, ` + Math.round(FormAdressValue.TOP_INITIAL);
  document.querySelector(`#address`).setAttribute(`readonly`, `readonly`);
  const type = document.querySelector(`#type`).value;
  document.querySelector(`#price`).placeholder = priceTypeValueDefaultOpen[type];
};
openPage();

const disactivatePage = () => {
  document.querySelector(`.ad-form`).classList.add(`ad-form--disabled`);
  document.querySelector(`.map`).classList.add(`map--faded`);
  removePins();
  openPage();

  document.querySelector(`.map__pin--main`).style.left = `570px`;
  document.querySelector(`.map__pin--main`).style.top = `375px`;
  document.querySelector(`.ad-form-header__preview img`).src = `img/muffin-grey.svg`;
  document.querySelectorAll(`.ad-form__photo`).forEach((element) => {
    if (element.hasChildNodes()) {
      element.remove();
    }
  });
  document.querySelector(`.map__pin--main`).addEventListener(`mousedown`, window.onMouseDown);
};

window.disactivatePage = disactivatePage;
