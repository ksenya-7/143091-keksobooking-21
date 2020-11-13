'use strict';

const PIN_MAIN_WIDTH_FOR_OPEN = 65;
const PIN_MAIN_HEIGHT_FOR_OPEN = 87;

const mapDefaultFiltersSelects = document.querySelectorAll(`.map__filter`);
const mapDefaultFiltersFeatures = document.querySelectorAll(`.map__checkbox`);


const FormAdressValueForOpen = {
  LEFT: parseInt(document.querySelector(`.map__pin--main`).style.left, 10) + PIN_MAIN_WIDTH_FOR_OPEN / 2,
  TOP_INITIAL: parseInt(document.querySelector(`.map__pin--main`).style.top, 10) + PIN_MAIN_WIDTH_FOR_OPEN / 2,
  TOP: parseInt(document.querySelector(`.map__pin--main`).style.top, 10) + PIN_MAIN_HEIGHT_FOR_OPEN
};

const disabledElements = (elements) => {
  for (let element of elements) {
    if (element.tagName === `INPUT`) {
      element.setAttribute(`disabled`, `disabled`);
    } else {
      element.setAttribute(`disabled`, `true`);
    }
  }
};

const removePins = () => {
  document.querySelectorAll(`.map__pin:not(.map__pin--main)`).forEach((element) => element.remove());
};

const disactivatePage = () => {
  removePins();
  disabledElements(document.querySelector(`.ad-form`).children);
  disabledElements(mapDefaultFiltersSelects);
  disabledElements(mapDefaultFiltersFeatures);
  document.querySelector(`#address`).value = Math.round(FormAdressValueForOpen.LEFT) + `, ` + Math.round(FormAdressValueForOpen.TOP_INITIAL);
  document.querySelector(`#address`).setAttribute(`readonly`, `readonly`);
};
disactivatePage();

window.disactivatePage = disactivatePage;
