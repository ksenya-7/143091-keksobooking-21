'use strict';

const PIN_MAIN_WIDTH = 65;
const PIN_MAIN_HEIGHT = 87;
const adForm = document.querySelector(`.ad-form`);
const adFormFields = adForm.children;
const adressForm = adForm.querySelector(`#address`);
const capacityForm = adForm.querySelector(`#capacity`);
const roomAmountForm = adForm.querySelector(`#room_number`);
const mapFilters = document.querySelector(`.map__filters `);
const mapFiltersSelects = mapFilters.querySelectorAll(`select`);
const mapFiltersFeatures = mapFilters.querySelectorAll(`input`);
const mapFiltersLabels = mapFilters.querySelectorAll(`label`);
const mapPinMain = document.querySelector(`.map__pin--main`);

const FormAdressValue = {
  LEFT: parseInt(mapPinMain.style.left, 10) + PIN_MAIN_WIDTH / 2,
  TOP_INITIAL: parseInt(mapPinMain.style.top, 10) + PIN_MAIN_WIDTH / 2,
  TOP: parseInt(mapPinMain.style.top, 10) + PIN_MAIN_HEIGHT
};

const alertGuestValue = {
  '1': `1 комната — «для 1 гостя»`,
  '2': `2 комнаты — «для 2 гостей» или «для 1 гостя»`,
  '3': `3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»`,
  '100': `100 комнат — «не для гостей»`
};
const formGuestValue = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0]
};

const disabledElements = (elements) => {
  for (let element of elements) {
    if (element.tagName === `INPUT`) {
      element.setAttribute(`disabled`, `disabled`);
    } else if (element.tagName === `LABEL`) {
      element.style.opacity = `0.7`;
    } else {
      element.setAttribute(`disabled`, `true`);
    }
  }
};

const abledElements = (elements) => {
  for (let element of elements) {
    if (element.tagName === `INPUT`) {
      element.removeAttribute(`disabled`, `disabled`);
    } else if (element.tagName === `LABEL`) {
      element.style.opacity = `1`;
    } else {
      element.removeAttribute(`disabled`, `true`);
    }
  }
};

// default opening
const disactivatePage = () => {
  disabledElements(adFormFields);
  disabledElements(mapFiltersSelects);
  disabledElements(mapFiltersFeatures);
  disabledElements(mapFiltersLabels);
  adressForm.value = Math.round(FormAdressValue.LEFT) + `, ` + Math.round(FormAdressValue.TOP_INITIAL);
};
disactivatePage();

const activatePage = () => {
  adForm.classList.remove(`ad-form--disabled`);
  window.render.renderPins(window.render.pins);
  window.card.renderCard(window.card.currentPin);
  document.querySelector(`.map`).classList.remove(`map--faded`);
  abledElements(adFormFields);
  abledElements(mapFiltersSelects);
  abledElements(mapFiltersFeatures);
  abledElements(mapFiltersLabels);
  adressForm.value = Math.round(FormAdressValue.LEFT) + `, ` + Math.round(FormAdressValue.TOP);
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

// validation
let capacityValue = capacityForm.value;
let roomAmountValue = roomAmountForm.value;

adForm.addEventListener(`submit`, (evt) => {
  capacityForm.addEventListener(`change`, () => {
    capacityValue = capacityForm.value;
    capacityForm.setCustomValidity(``);
    capacityForm.style.outline = `none`;
    return capacityValue;
  });

  roomAmountForm.addEventListener(`change`, () => {
    roomAmountValue = roomAmountForm.value;
    capacityForm.setCustomValidity(``);
    capacityForm.style.outline = `none`;
    return roomAmountValue;
  });

  const isInvalidOfAmountGuest = formGuestValue[`${roomAmountValue}`].some((element) => {
    return (parseInt(element, 10) === parseInt(capacityValue, 10));
  });

  if (!isInvalidOfAmountGuest) {
    capacityForm.setCustomValidity(alertGuestValue[roomAmountValue]);
    capacityForm.style.outline = `2px solid red`;
    evt.preventDefault();
  } else {
    capacityForm.setCustomValidity(``);
    capacityForm.style.outline = `none`;
  }
  capacityForm.reportValidity();
  roomAmountForm.reportValidity();
  adForm.reportValidity();
});
