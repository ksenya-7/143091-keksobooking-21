'use strict';

const adFormFields = document.querySelector(`.ad-form`).children;
const mapFiltersSelects = document.querySelectorAll(`select`);
const mapFiltersFeatures = document.querySelectorAll(`input`);
const resetForm = document.querySelector(`.ad-form__reset`);

const priceTypeValueDefault = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

const abledElements = (elements) => {
  for (const element of elements) {
    if (element.tagName === `INPUT`) {
      element.removeAttribute(`disabled`, `disabled`);
    } else {
      element.removeAttribute(`disabled`, `true`);
    }
  }
  document.querySelector(`.map__features`).style.opacity = `1`;
};

let loadPins = [];
const onLoadSuccess = (elements) => {
  loadPins = elements.slice();

  window.render.displayPins(loadPins);
  window.filtersHandler(loadPins);

  window.move.mapPinMain.removeEventListener(`click`, onMainPinClick);
  window.move.mapPinMain.removeEventListener(`keydown`, onMainPinKeydown);
};

const activatePage = () => {
  window.backend.load(onLoadSuccess, window.error.onLoadFailMessage);

  document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);
  document.querySelector(`.map`).classList.remove(`map--faded`);
  abledElements(adFormFields);
  abledElements(mapFiltersSelects);
  abledElements(mapFiltersFeatures);
  window.move.addressForm.value = Math.round(window.open.FormAddressValue.LEFT) + `, ` + Math.round(window.open.FormAddressValue.TOP);
  document.querySelector(`.map__pin--main img`).draggable = `true`;
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

let type = document.querySelector(`#type`).value;

window.move.mapPinMain.addEventListener(`click`, onMainPinClick);
window.move.mapPinMain.addEventListener(`keydown`, onMainPinKeydown);

const onResetFormClick = (evt) => {
  evt.preventDefault();
  document.querySelector(`.map__filters`).reset();
  document.querySelector(`.ad-form`).reset();
  window.open.disactivatePage();

  type = document.querySelector(`#type`).value;
  document.querySelector(`#price`).placeholder = priceTypeValueDefault[type];
  window.move.mapPinMain.addEventListener(`click`, onMainPinClick);
  window.move.mapPinMain.addEventListener(`keydown`, onMainPinKeydown);
};
const onResetFormKeydown = (evt) => {
  evt.preventDefault();
  if (window.utils.isEnter(evt)) {
    document.querySelector(`.map__filters`).reset();
    document.querySelector(`.ad-form`).reset();
    window.open.disactivatePage();
    type = document.querySelector(`#type`).value;
    document.querySelector(`#price`).placeholder = priceTypeValueDefault[type];
    window.move.mapPinMain.addEventListener(`click`, onMainPinClick);
    window.move.mapPinMain.addEventListener(`keydown`, onMainPinKeydown);
  }
};

window.form.fileAvatarChooser.addEventListener(`change`, () => {
  window.form.matchOfAvatar();
  window.move.mapPinMain.addEventListener(`click`, onMainPinClick);
  window.move.mapPinMain.addEventListener(`keydown`, onMainPinKeydown);
});

window.form.fileHouseChooser.addEventListener(`change`, () => {
  window.form.matchOfHouse();
  window.move.mapPinMain.addEventListener(`click`, onMainPinClick);
  window.move.mapPinMain.addEventListener(`keydown`, onMainPinKeydown);
});

document.querySelector(`.ad-form`).addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  window.form.onAdSubmit();
  document.querySelector(`.map__filters`).reset();
  document.querySelector(`.ad-form`).reset();
  window.open.disactivatePage();
  type = document.querySelector(`#type`).value;
  document.querySelector(`#price`).placeholder = priceTypeValueDefault[type];
  window.move.mapPinMain.addEventListener(`click`, onMainPinClick);
  window.move.mapPinMain.addEventListener(`keydown`, onMainPinKeydown);
});

resetForm.addEventListener(`click`, onResetFormClick);
resetForm.addEventListener(`keydown`, onResetFormKeydown);

// window.error.failButton.addEventListener(`mousedown`, () => {
//   window.open.disactivatePage();
//   window.move.mapPinMain.addEventListener(`click`, onMainPinClick);
//   window.move.mapPinMain.addEventListener(`keydown`, onMainPinKeydown);
// });
