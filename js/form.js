'use strict';

const PIN_MAIN_WIDTH = 65;
const PIN_MAIN_HEIGHT = 87;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const adForm = document.querySelector(`.ad-form`);
const adFormFields = adForm.children;
const titleForm = adForm.querySelector(`#title`);
const adressForm = adForm.querySelector(`#address`);
const typeForm = adForm.querySelector(`#type`);
const priceForm = adForm.querySelector(`#price`);
const capacityForm = adForm.querySelector(`#capacity`);
const roomAmountForm = adForm.querySelector(`#room_number`);
const timeinForm = adForm.querySelector(`#timein`);
const timeoutForm = adForm.querySelector(`#timeout`);

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

const priceTypeValue = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
const alertPriceValue = {
  'bungalow': `«Бунгало» — минимальная цена за ночь 0`,
  'flat': `«Квартира» — минимальная цена за ночь 1 000`,
  'house': `«Дом» — минимальная цена 5 000`,
  'palace': `«Дворец» — минимальная цена 10 000`
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
    } else if (element.tagName === `BUTTON`) {
      element.classList.add(`hidden`);
    } else {
      element.setAttribute(`disabled`, `true`);
    }
  }
};

const abledElements = (elements) => {
  for (let element of elements) {
    if (element.tagName === `INPUT`) {
      element.removeAttribute(`disabled`, `disabled`);
    } else if (element.tagName === `BUTTON`) {
      element.classList.remove(`hidden`);
    } else {
      element.removeAttribute(`disabled`, `true`);
    }
  }
};

let currentPins = ``;
const disactivatePage = () => {
  window.card.renderCard(window.card.currentPin);
  document.querySelector(`.map__card`).classList.add(`hidden`);
  window.render.renderPins(window.render.pins);
  currentPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  disabledElements(currentPins);
  disabledElements(adFormFields);
  disabledElements(mapFiltersSelects);
  disabledElements(mapFiltersFeatures);
  disabledElements(mapFiltersLabels);
  adressForm.value = Math.round(FormAdressValue.LEFT) + `, ` + Math.round(FormAdressValue.TOP_INITIAL);
  return currentPins;
};
disactivatePage();

const activatePage = () => {
  adForm.classList.remove(`ad-form--disabled`);
  document.querySelector(`.map__card`).classList.remove(`hidden`);
  document.querySelector(`.map`).classList.remove(`map--faded`);
  abledElements(currentPins);
  abledElements(adFormFields);
  abledElements(mapFiltersSelects);
  abledElements(mapFiltersFeatures);
  abledElements(mapFiltersLabels);
  adressForm.value = Math.round(FormAdressValue.LEFT) + `, ` + Math.round(FormAdressValue.TOP);
  window.openCards(currentPins);
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

// annoy
adForm.querySelector(`#title`).value = `Милая, уютная квартирка в центре Токио`;
adForm.querySelector(`#price`).value = `5000`;

// validation
adForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  let capacityValue = capacityForm.value;
  let roomAmountValue = roomAmountForm.value;
  let titleValue = titleForm.value;
  let typeValue = typeForm.value;
  let priceValue = priceForm.value;
  let timeinValue = timeinForm.value;
  let timeoutValue = timeoutForm.value;

  titleForm.addEventListener(`input`, () => {
    titleValue = titleForm.value;
    evt.preventDefault();
    if (titleValue.length < MIN_TITLE_LENGTH) {
      titleForm.setCustomValidity(`Минимальная длина заголовка объявления 30 символов. Допишите ещё ${MIN_TITLE_LENGTH - titleValue.length} симв.`);
      titleForm.style.outline = `2px solid orange`;
      evt.preventDefault();
    } else if (titleValue.length > MAX_TITLE_LENGTH) {
      titleForm.setCustomValidity(`Максимальная длина заголовка объявления 100 символов. Удалите лишние ${titleValue.length - MAX_TITLE_LENGTH} симв.`);
      titleForm.style.outline = `2px solid orange`;
      evt.preventDefault();
    } else {
      titleForm.setCustomValidity(``);
      titleForm.style.outline = `none`;
      titleValue = titleForm.value;
    }

    titleForm.reportValidity();
  });

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
  const isValidOfAmountGuest = formGuestValue[`${roomAmountValue}`].some((element) => (parseInt(element, 10) === parseInt(capacityValue, 10)));

  typeForm.addEventListener(`change`, () => {
    typeValue = typeForm.value;
    priceForm.placeholder = priceTypeValue[`${typeValue}`];
    priceForm.setCustomValidity(``);
    priceForm.style.outline = `none`;
    return typeValue;
  });
  priceForm.addEventListener(`change`, () => {
    priceValue = priceForm.value;
    priceForm.placeholder = priceTypeValue[`${typeValue}`];
    priceForm.setCustomValidity(``);
    priceForm.style.outline = `none`;
    return priceValue;
  });
  const isValidOfPriceType = priceValue >= priceTypeValue[`${typeValue}`];

  const isValidOfTime = timeinValue === timeoutValue;
  timeinForm.addEventListener(`change`, () => {
    timeinValue = timeinForm.value;
    if (!isValidOfTime) {
      timeinValue = timeoutValue;
    } else {
      timeoutForm.setCustomValidity(``);
      timeoutForm.style.outline = `none`;
    }
    return timeinValue;
  });
  timeoutForm.addEventListener(`change`, () => {
    timeoutValue = timeoutForm.value;
    if (!isValidOfTime) {
      timeoutValue = timeinValue;
    } else {
      timeoutForm.setCustomValidity(``);
      timeoutForm.style.outline = `none`;
    }
    return timeoutValue;
  });

  if (!isValidOfAmountGuest) {
    capacityForm.setCustomValidity(alertGuestValue[roomAmountValue]);
    capacityForm.style.outline = `2px solid orange`;
    evt.preventDefault();
  } else if (!isValidOfPriceType) {
    priceForm.setCustomValidity(alertPriceValue[typeValue]);
    priceForm.placeholder = priceTypeValue[`${typeValue}`];
    priceForm.style.outline = `2px solid orange`;
    evt.preventDefault();
  } else if (titleValue.length < MIN_TITLE_LENGTH || titleValue.length > MAX_TITLE_LENGTH) {
    titleForm.setCustomValidity(`Длина заголовка объявления от 30 до 100 символов.`);
    titleForm.style.outline = `2px solid orange`;
    evt.preventDefault();
  } else if (!isValidOfTime) {
    timeoutForm.setCustomValidity(`Время въезда и выезда должно совпадать.`);
    evt.preventDefault();
  } else {
    capacityForm.setCustomValidity(``);
    capacityForm.style.outline = `none`;
    priceForm.setCustomValidity(``);
    priceForm.style.outline = `none`;
    timeoutForm.setCustomValidity(``);
    timeoutForm.style.outline = `none`;
  }

  capacityForm.reportValidity();
  roomAmountForm.reportValidity();
  timeoutForm.reportValidity();
  adForm.reportValidity();
});
