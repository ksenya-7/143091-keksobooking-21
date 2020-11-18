'use strict';

const PIN_MAIN_WIDTH = 65;
const PIN_MAIN_HEIGHT = 87;
const DRAG_LEFT = 0;
const DRAG_RIGHT = 1201;
const DRAG_TOP = 130;
const DRAG_BOTTOM = 630;

const mapPinMain = document.querySelector(`.map__pin--main`);
const addressForm = document.querySelector(`#address`);

const onMouseDown = (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  };
  const getAddress = (left, right) => Math.floor(parseInt(left, 10) + PIN_MAIN_WIDTH / 2) + `, ` + Math.floor(parseInt(right, 10) + PIN_MAIN_HEIGHT);

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
      mapPinMain.style.top = `DRAG_BOTTOM - PIN_MAIN_HEIGHT px`;
    } else if (mapPinMain.offsetTop - shift.y < DRAG_TOP - PIN_MAIN_HEIGHT) {
      mapPinMain.style.top = `DRAG_TOP - PIN_MAIN_HEIGHT px`;
    } else {
      mapPinMain.style.top = `${mapPinMain.offsetTop - shift.y}px`;
      addressForm.value = getAddress(mapPinMain.style.left, mapPinMain.style.top);
    }

    if (mapPinMain.offsetLeft - shift.x > DRAG_RIGHT - PIN_MAIN_WIDTH / 2) {
      mapPinMain.style.left = `DRAG_RIGHT - PIN_MAIN_WIDTH / 2 px`;
    } else if (mapPinMain.offsetLeft - shift.x < DRAG_LEFT - PIN_MAIN_WIDTH / 2) {
      mapPinMain.style.left = `DRAG_LEFT - PIN_MAIN_WIDTH / 2 px`;
    } else {
      mapPinMain.style.left = `${mapPinMain.offsetLeft - shift.x}px`;
      addressForm.value = getAddress(mapPinMain.style.left, mapPinMain.style.top);
    }
  };

  const onMouseUp = (upEvt) =>{
    upEvt.preventDefault();
    addressForm.value = getAddress(mapPinMain.style.left, mapPinMain.style.top);

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

mapPinMain.addEventListener(`mousedown`, onMouseDown);

window.move = {
  PIN_MAIN_WIDTH,
  PIN_MAIN_HEIGHT,
  mapPinMain,
  addressForm
};
