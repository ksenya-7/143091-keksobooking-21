'use strict';

const PIN_MAIN_WIDTH_FOR_ACTIVE = 65;
const PIN_MAIN_HEIGHT_FOR_ACTIVE = 87;
const adFormFields = document.querySelector(`.ad-form`).children;
const mapFiltersSelects = document.querySelectorAll(`select`);
const mapFiltersFeatures = document.querySelectorAll(`input`);
const resetForm = document.querySelector(`.ad-form__reset`);

const FormAdressValue = {
  LEFT: parseInt(document.querySelector(`.map__pin--main`).style.left, 10) + PIN_MAIN_WIDTH_FOR_ACTIVE / 2,
  TOP_INITIAL: parseInt(document.querySelector(`.map__pin--main`).style.top, 10) + PIN_MAIN_WIDTH_FOR_ACTIVE / 2,
  TOP: parseInt(document.querySelector(`.map__pin--main`).style.top, 10) + PIN_MAIN_HEIGHT_FOR_ACTIVE
};
const priceTypeValueDefault = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

document.querySelector(`#address`).value = Math.round(FormAdressValue.LEFT) + `, ` + Math.round(FormAdressValue.TOP_INITIAL);
let type = document.querySelector(`#type`).value;
document.querySelector(`#price`).placeholder = priceTypeValueDefault[type];

const abledElements = (elements) => {
  for (let element of elements) {
    if (element.tagName === `INPUT`) {
      element.removeAttribute(`disabled`, `disabled`);
    } else {
      element.removeAttribute(`disabled`, `true`);
    }
  }
};

let loadPins = [];
const onLoadSuccess = (elements) => {
  loadPins = elements.slice();

  window.renderPins(loadPins);

  window.filtersHandler(loadPins);

  // return loadPins;
};

const activatePage = () => {
  window.backend.load(onLoadSuccess, window.error.onLoadErrorMessage);

  document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);
  document.querySelector(`.map`).classList.remove(`map--faded`);
  abledElements(adFormFields);
  abledElements(mapFiltersSelects);
  abledElements(mapFiltersFeatures);
  document.querySelector(`.map__pin--main`).querySelector(`img`).draggable = `true`;
  document.querySelector(`.map__pin--main`).removeEventListener(`click`, onMainPinClick);
  document.querySelector(`.map__pin--main`).removeEventListener(`keydown`, onMainPinKeydown);
};

const onMainPinClick = (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
};
const onMainPinKeydown = (evt) => {
  evt.preventDefault();
  if (window.utils.isEnter(evt)) {
    activatePage();
  }
};

document.querySelector(`.map__pin--main`).addEventListener(`click`, onMainPinClick);
document.querySelector(`.map__pin--main`).addEventListener(`keydown`, onMainPinKeydown);

const onResetFormClick = (evt) =>{
  evt.preventDefault();
  document.querySelector(`.map__filters`).reset();
  document.querySelector(`.ad-form`).reset();
  window.disactivatePage();
  document.querySelector(`#price`).placeholder = priceTypeValueDefault[type];
  document.querySelector(`.map__pin--main`).addEventListener(`click`, onMainPinClick);
  document.querySelector(`.map__pin--main`).addEventListener(`keydown`, onMainPinKeydown);
};
const onResetFormKeydown = (evt) => {
  evt.preventDefault();
  if (window.utils.isEnter(evt)) {
    document.querySelector(`.map__filters`).reset();
    document.querySelector(`.ad-form`).reset();
    window.disactivatePage();
    document.querySelector(`#price`).placeholder = priceTypeValueDefault[type];
    document.querySelector(`.map__pin--main`).addEventListener(`click`, onMainPinClick);
    document.querySelector(`.map__pin--main`).addEventListener(`keydown`, onMainPinKeydown);
  }
};

document.querySelector(`.ad-form`).addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  window.form.onAdFormSubmit();
  document.querySelector(`.map__filters`).reset();
  document.querySelector(`.ad-form`).reset();
  window.disactivatePage();
  document.querySelector(`#price`).placeholder = priceTypeValueDefault[type];
  document.querySelector(`.map__pin--main`).addEventListener(`click`, onMainPinClick);
  document.querySelector(`.map__pin--main`).addEventListener(`keydown`, onMainPinKeydown);
});
resetForm.addEventListener(`click`, onResetFormClick);
resetForm.addEventListener(`keydown`, onResetFormKeydown);
