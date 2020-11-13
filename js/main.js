'use strict';

const PIN_MAIN_WIDTH = 65;
const PIN_MAIN_HEIGHT = 87;
const DRAG_LEFT = 0;
const DRAG_RIGHT = 1201;
const DRAG_TOP = 130;
const DRAG_BOTTOM = 630;
const adFormFields = document.querySelector(`.ad-form`).children;
const adressForm = document.querySelector(`#address`);
const mapFilters = document.querySelector(`.map__filters `);
const mapFiltersSelects = mapFilters.querySelectorAll(`select`);
const mapFiltersFeatures = mapFilters.querySelectorAll(`input`);
const mapPinMain = document.querySelector(`.map__pin--main`);

const FormAdressValue = {
  LEFT: parseInt(document.querySelector(`.map__pin--main`).style.left, 10) + PIN_MAIN_WIDTH / 2,
  TOP_INITIAL: parseInt(document.querySelector(`.map__pin--main`).style.top, 10) + PIN_MAIN_WIDTH / 2,
  TOP: parseInt(document.querySelector(`.map__pin--main`).style.top, 10) + PIN_MAIN_HEIGHT
};

const abledElements = (elements) => {
  for (let element of elements) {
    if (element.tagName === `INPUT`) {
      element.removeAttribute(`disabled`, `disabled`);
    } else {
      element.removeAttribute(`disabled`, `true`);
    }
  }
};
let loadPins = ``;

const onLoadSuccess = (elements) => {
  loadPins = elements.slice();
  // console.log(loadPins);
  window.renderPins(loadPins);
  const currentPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  window.openCards(loadPins, currentPins);
  // console.log(loadPins);
  return loadPins;
};

const activatePage = () => {
  window.backend.load(onLoadSuccess, window.error.onLoadErrorMessage);
  // console.log(loadPins);

  document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);
  document.querySelector(`.map`).classList.remove(`map--faded`);
  abledElements(adFormFields);
  abledElements(mapFiltersSelects);
  abledElements(mapFiltersFeatures);
  adressForm.value = Math.round(FormAdressValue.LEFT) + `, ` + Math.round(FormAdressValue.TOP);
  mapPinMain.querySelector(`img`).draggable = `true`;
};

mapPinMain.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
});

mapPinMain.addEventListener(`keydown`, (evt) => {
  evt.preventDefault();
  if (window.utils.isEnter(evt)) {
    activatePage();
  }
});

mapPinMain.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  };
  const getAdress = (left, right) => Math.floor(parseInt(left, 10) + PIN_MAIN_WIDTH / 2) + `, ` + Math.floor(parseInt(right, 10) + PIN_MAIN_HEIGHT);

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (mapPinMain.offsetTop - shift.y > DRAG_BOTTOM - PIN_MAIN_HEIGHT) {
      mapPinMain.style.top = DRAG_BOTTOM - PIN_MAIN_HEIGHT + `px`;
    } else if (mapPinMain.offsetTop - shift.y < DRAG_TOP - PIN_MAIN_HEIGHT) {
      mapPinMain.style.top = DRAG_TOP - PIN_MAIN_HEIGHT + `px`;
    } else {
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + `px`;
      adressForm.value = getAdress(mapPinMain.style.left, mapPinMain.style.top);
    }

    if (mapPinMain.offsetLeft - shift.x > DRAG_RIGHT - PIN_MAIN_WIDTH / 2) {
      mapPinMain.style.left = DRAG_RIGHT - PIN_MAIN_WIDTH / 2 + `px`;
    } else if (mapPinMain.offsetLeft - shift.x < DRAG_LEFT - PIN_MAIN_WIDTH / 2) {
      mapPinMain.style.left = DRAG_LEFT - PIN_MAIN_WIDTH / 2 + `px`;
    } else {
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + `px`;
      adressForm.value = getAdress(mapPinMain.style.left, mapPinMain.style.top);
    }
  };

  const onMouseUp = (upEvt) =>{
    upEvt.preventDefault();
    adressForm.value = getAdress(mapPinMain.style.left, mapPinMain.style.top);

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});
