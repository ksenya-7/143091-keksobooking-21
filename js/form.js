'use strict';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const adForm = document.querySelector(`.ad-form`);
const titleForm = adForm.querySelector(`#title`);
const typeForm = adForm.querySelector(`#type`);
const priceForm = adForm.querySelector(`#price`);
const capacityForm = adForm.querySelector(`#capacity`);
const roomAmountForm = adForm.querySelector(`#room_number`);
const timeinForm = adForm.querySelector(`#timein`);
const timeoutForm = adForm.querySelector(`#timeout`);

const fileAvatarChooser = adForm.querySelector(`.ad-form-header__input`);
const previewAva = adForm.querySelector(`.ad-form-header__preview img`);
const photoContainer = adForm.querySelector(`.ad-form__photo-container`);
const fileHouseChooser = adForm.querySelector(`.ad-form__input`);
const previewHouseBlockTemplate = adForm.querySelector(`.ad-form__photo`).cloneNode(true);
adForm.querySelector(`.ad-form__photo`).style.display = `none`;

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

const formGuestValue = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0]
};

const alertGuestValue = {
  '1': `1 комната — «для 1 гостя»`,
  '2': `2 комнаты — «для 2 гостей» или «для 1 гостя»`,
  '3': `3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»`,
  '100': `100 комнат — «не для гостей»`
};

// загрузка внешнего файла
let matchesAvatar = true;
fileAvatarChooser.addEventListener(`change`, () => {
  const file = fileAvatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  previewAva.src = ``;
  matchesAvatar = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matchesAvatar) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
      previewAva.src = reader.result;
    });
    reader.addEventListener(`error`, window.error.onLoadErrorMessage);
    reader.readAsDataURL(file);
  } else {
    window.error.onLoadErrorMessage(`Ошибка загрузки файла`);
  }
});

let matchesHouse = true;
fileHouseChooser.addEventListener(`change`, () => {
  const file = fileHouseChooser.files[0];
  const fileName = file.name.toLowerCase();

  const previewHouse = document.createElement(`img`);
  previewHouse.alt = `Фото жилья`;
  previewHouse.width = `70`;
  previewHouse.height = `70`;
  previewHouse.src = ``;
  const previewHouseBlock = previewHouseBlockTemplate.cloneNode(true);
  previewHouseBlock.append(previewHouse);
  photoContainer.append(previewHouseBlock);

  matchesHouse = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matchesHouse) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      previewHouse.src = reader.result;
    });
    reader.addEventListener(`error`, window.error.onLoadErrorMessage);
    reader.readAsDataURL(file);
  } else {
    window.error.onLoadErrorMessage(`Ошибка загрузки файла`);
  }
});


// annoy
titleForm.value = `slkdhgaaghjkaglhadkhfgjakdfjhgadkjhfg`;
// priceForm.value = `5000`;


// prefill
let capacityValue = capacityForm.value;
let roomAmountValue = roomAmountForm.value;
let titleValue = titleForm.value;
let typeValue = typeForm.value;
let priceValue = priceForm.value;
let timeinValue = timeinForm.value;
let timeoutValue = timeoutForm.value;

let isValidOfAmountGuest = formGuestValue[`${roomAmountValue}`].includes(parseInt(capacityValue, 10)); // почему-то всегда false
let isValidOfPriceType = priceValue >= priceTypeValue[`${typeValue}`]; // почему-то всегда true
let isValidOfTime = timeinValue === timeoutValue;

roomAmountForm.addEventListener(`change`, (evt) => {
  roomAmountValue = roomAmountForm.value;
  capacityValue = capacityForm.value;
  // console.log(roomAmountValue);
  // console.log(parseInt(capacityValue, 10));

  evt.preventDefault();

  if (!isValidOfAmountGuest) {
    // console.log(isValidOfAmountGuest);
    capacityForm.setCustomValidity(alertGuestValue[roomAmountValue]);
    capacityForm.style.outline = `3px solid darkred`;
  } else {
    capacityValue = capacityForm.value;
    capacityForm.setCustomValidity(``);
    capacityForm.style.outline = `none`;
  }
  roomAmountForm.reportValidity();
});

capacityForm.addEventListener(`change`, (evt) => {
  evt.preventDefault();
  roomAmountValue = roomAmountForm.value;
  capacityValue = capacityForm.value;
  // console.log(roomAmountValue);
  // console.log(capacityValue);

  if (!isValidOfAmountGuest) {
    // console.log(isValidOfAmountGuest);
    capacityForm.setCustomValidity(alertGuestValue[roomAmountValue]);
    capacityForm.style.outline = `3px solid darkred`;
  } else {
    capacityForm.setCustomValidity(``);
    capacityForm.style.outline = `none`;
  }
  capacityForm.reportValidity();
});

titleForm.addEventListener(`input`, (evt) => {
  titleValue = titleForm.value;
  if (titleValue.length < MIN_TITLE_LENGTH) {
    titleForm.setCustomValidity(`Минимальная длина заголовка объявления 30 символов. Допишите ещё ${MIN_TITLE_LENGTH - titleValue.length} симв.`);
    titleForm.style.outline = `3px solid darkred`;
    evt.preventDefault();
  } else if (titleValue.length > MAX_TITLE_LENGTH) {
    titleForm.setCustomValidity(`Максимальная длина заголовка объявления 100 символов. Удалите лишние ${titleValue.length - MAX_TITLE_LENGTH} симв.`);
    titleForm.style.outline = `3px solid darkred`;
    evt.preventDefault();
  } else {
    titleForm.setCustomValidity(``);
    titleForm.style.outline = `none`;
    titleValue = titleForm.value;
  }

  titleForm.reportValidity();
});

typeForm.addEventListener(`change`, (evt) => {
  evt.preventDefault();
  priceValue = priceForm.value;
  typeValue = typeForm.value;
  // console.log(priceValue);
  // console.log(typeValue);

  if (!isValidOfPriceType) {
    // console.log(isValidOfPriceType);
    priceForm.setCustomValidity(alertPriceValue[typeValue]);
    // console.log(alertPriceValue[typeValue]);
    priceForm.style.outline = `3px solid darkred`;
  } else {
    priceForm.placeholder = priceTypeValue[`${typeValue}`];
    priceForm.setCustomValidity(``);
    priceForm.style.outline = `none`;
  }
  typeForm.reportValidity();
});
priceForm.addEventListener(`input`, (evt) => {
  evt.preventDefault();
  priceValue = priceForm.value;
  typeValue = typeForm.value;

  if (!isValidOfPriceType) {
    // console.log(isValidOfPriceType);
    priceForm.setCustomValidity(alertPriceValue[typeValue]);
    priceForm.style.outline = `3px solid darkred`;
  } else {
    priceForm.placeholder = priceTypeValue[`${typeValue}`];
    priceForm.setCustomValidity(``);
    priceForm.style.outline = `none`;
  }
  priceForm.reportValidity();
});

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
const onAdFormSubmit = () => {
  if (titleValue.length < MIN_TITLE_LENGTH || titleValue.length > MAX_TITLE_LENGTH) {
    titleForm.setCustomValidity(`Длина заголовка объявления от 30 до 100 символов.`);
    titleForm.style.outline = `3px solid darkred`;
  } else {
    window.backend.save(new FormData(adForm), () => {
      window.disactivatePage();
      window.error.onLoadSuccessMessage();
    }, window.error.onLoadFormErrorMessage);
  }

  adForm.reportValidity();
};

window.form = {
  onAdFormSubmit,
  priceTypeValue
};
