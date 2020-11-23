'use strict';

const adFormFields = document.querySelector(`.ad-form`).children;
const mapFiltersSelectsForActive = document.querySelectorAll(`select`);
const mapFiltersFeaturesForActive = document.querySelectorAll(`input`);
const resetForm = document.querySelector(`.ad-form__reset`);

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
  window.filter.strainerForPins(loadPins);

  window.move.mapPinMain.removeEventListener(`click`, onMainPinClick);
  window.move.mapPinMain.removeEventListener(`keydown`, onMainPinKeydown);
};

const activatePage = () => {
  window.backend.load(onLoadSuccess, window.error.onLoadFailMessage);

  document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);
  document.querySelector(`.map`).classList.remove(`map--faded`);
  abledElements(adFormFields);
  abledElements(mapFiltersSelectsForActive);
  abledElements(mapFiltersFeaturesForActive);
  window.move.addressForm.value = `${Math.round(window.open.FormAddressValue.LEFT)}, ${Math.round(window.open.FormAddressValue.TOP)}`;
  window.move.mapPinMain.querySelector(`img`).draggable = `true`;
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

window.move.mapPinMain.addEventListener(`click`, onMainPinClick);
window.move.mapPinMain.addEventListener(`keydown`, onMainPinKeydown);

let type = window.open.selectType.value;

const cleanForm = () => {
  document.querySelector(`.map__filters`).reset();
  document.querySelector(`.ad-form`).reset();
  window.move.addressForm.value = Math.round(window.open.FormAddressValue.LEFT) + `, ` + Math.round(window.open.FormAddressValue.TOP_INITIAL);

  type = window.open.selectType.value;
  window.open.inputPrice.placeholder = window.open.priceTypeValueDefault[type];
  document.querySelector(`.ad-form-header__preview img`).src = `img/muffin-grey.svg`;
  window.move.mapPinMain.addEventListener(`click`, onMainPinClick);
  window.move.mapPinMain.addEventListener(`keydown`, onMainPinKeydown);
};

const onResetFormClick = (evt) => {
  evt.preventDefault();
  cleanForm();
  window.open.disactivatePage();
  window.move.mapPinMain.addEventListener(`click`, onMainPinClick);
  window.move.mapPinMain.addEventListener(`keydown`, onMainPinKeydown);
};
const onResetFormKeydown = (evt) => {
  evt.preventDefault();
  if (window.utils.isEnter(evt)) {
    cleanForm();
    window.open.disactivatePage();
    window.move.mapPinMain.addEventListener(`click`, onMainPinClick);
    window.move.mapPinMain.addEventListener(`keydown`, onMainPinKeydown);
  }
};

resetForm.addEventListener(`click`, onResetFormClick);
resetForm.addEventListener(`keydown`, onResetFormKeydown);

const onSaveSuccess = () => {
  window.open.disactivatePage();
  window.error.onLoadSuccessMessage();
  cleanForm();
  window.move.mapPinMain.addEventListener(`click`, onMainPinClick);
  window.move.mapPinMain.addEventListener(`keydown`, onMainPinKeydown);
};

document.querySelector(`.ad-form`).addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  window.backend.save(new FormData(document.querySelector(`.ad-form`)), onSaveSuccess, window.error.onLoadFormFailMessage);
  // window.backend.save(window.form.newData, onSaveSuccess, window.error.onLoadFormFailMessage);
});
