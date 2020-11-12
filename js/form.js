'use strict';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const adForm = document.querySelector(`.ad-form`);
const titleForm = adForm.querySelector(`#title`);
const typeForm = adForm.querySelector(`#type`);
const priceForm = adForm.querySelector(`#price`);
const capacityForm = adForm.querySelector(`#capacity`);
const roomAmountForm = adForm.querySelector(`#room_number`);
const timeinForm = adForm.querySelector(`#timein`);
const timeoutForm = adForm.querySelector(`#timeout`);

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

// prefill
let capacityValue = capacityForm.value;
let roomAmountValue = roomAmountForm.value;
let titleValue = titleForm.value;
let typeValue = typeForm.value;
let priceValue = priceForm.value;
let timeinValue = timeinForm.value;
let timeoutValue = timeoutForm.value;
priceForm.placeholder = priceTypeValue[`${typeValue}`];

capacityForm.addEventListener(`change`, () => {
  capacityValue = capacityForm.value;
  capacityForm.setCustomValidity(``);
  capacityForm.style.outline = `none`;
  capacityForm.reportValidity();
  return capacityValue;
});
roomAmountForm.addEventListener(`change`, () => {
  roomAmountValue = roomAmountForm.value;
  capacityForm.setCustomValidity(``);
  capacityForm.style.outline = `none`;
  roomAmountForm.reportValidity();
  return roomAmountValue;
});

titleForm.addEventListener(`input`, (evt) => {
  titleValue = titleForm.value;
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

typeForm.addEventListener(`change`, () => {
  typeValue = typeForm.value;
  priceForm.placeholder = priceTypeValue[`${typeValue}`];
  priceForm.setCustomValidity(``);
  priceForm.style.outline = `none`;
  typeForm.reportValidity();
  return typeValue;
});
priceForm.addEventListener(`change`, () => {
  priceValue = priceForm.value;
  priceForm.placeholder = priceTypeValue[`${typeValue}`];
  priceForm.setCustomValidity(``);
  priceForm.style.outline = `none`;
  priceForm.reportValidity();
  return priceValue;
});

let isValidOfTime = timeinValue === timeoutValue;
timeinForm.addEventListener(`change`, () => {
  timeinValue = timeinForm.value;
  timeoutValue = timeoutForm.value;
  isValidOfTime = timeinValue === timeoutValue;
  if (!isValidOfTime) {
    timeoutForm.value = timeinValue;
  } else {
    timeoutForm.setCustomValidity(``);
    timeoutForm.style.outline = `none`;
  }
});
timeoutForm.addEventListener(`change`, () => {
  timeinValue = timeinForm.value;
  timeoutValue = timeoutForm.value;
  isValidOfTime = timeinValue === timeoutValue;
  if (!isValidOfTime) {
    timeinForm.value = timeoutValue;
  } else {
    timeoutForm.setCustomValidity(``);
    timeoutForm.style.outline = `none`;
  }
});

// validation
adForm.addEventListener(`submit`, (evt) => {
  const isValidOfAmountGuest = formGuestValue[`${roomAmountValue}`].some((element) => (parseInt(element, 10) === parseInt(capacityValue, 10)));
  const isValidOfPriceType = priceValue >= priceTypeValue[`${typeValue}`];

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
  } else {
    capacityForm.setCustomValidity(``);
    capacityForm.style.outline = `none`;
    priceForm.setCustomValidity(``);
    priceForm.style.outline = `none`;
  }

  adForm.reportValidity();
});
