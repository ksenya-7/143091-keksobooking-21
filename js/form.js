'use strict';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const PHOTO_WIDTH = `70`;
const PHOTO_HEIGHT = `70`;
const MAX_PRICE = 1000000;
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
const previewAvatar = adForm.querySelector(`.ad-form-header__preview img`);
const photoContainer = adForm.querySelector(`.ad-form__photo-container`);
const fileHouseChooser = adForm.querySelector(`.ad-form__input`);
const previewHouseBlockTemplate = adForm.querySelector(`.ad-form__photo`).cloneNode(true);
adForm.querySelector(`.ad-form__photo`).style.display = `none`;

const priceTypeValue = {
  'bungalow': {
    price: 0,
    errorText: `«Бунгало» — минимальная цена за ночь 0`
  },
  'flat': {
    price: 1000,
    errorText: `«Квартира» — минимальная цена за ночь 1 000`
  },
  'house': {
    price: 5000,
    errorText: `«Дом» — минимальная цена 5 000`
  },
  'palace': {
    price: 10000,
    errorText: `«Дворец» — минимальная цена 10 000`
  }
};

const capacityGuestValue = {
  '1': {
    guests: [`1`],
    errorText: `1 комната — «для 1 гостя»`
  },
  '2': {
    guests: [`1`, `2`],
    errorText: `2 комнаты — «для 2 гостей» или «для 1 гостя»`
  },
  '3': {
    guests: [`1`, `2`, `3`],
    errorText: `3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»`
  },
  '100': {
    guests: [`0`],
    errorText: `100 комнат — «не для гостей»`
  }
};

// загрузка внешнего файла
const loadPhoto = (preview, file) => {
  const reader = new FileReader();

  reader.addEventListener(`load`, () => {
    preview.src = reader.result;
  });
  reader.addEventListener(`error`, window.errorSuccess.onLoadFailMessage);
  reader.readAsDataURL(file);
};

const loadPhotoOfAvatar = () => {
  let matchesAvatar = true;
  const fileAvatar = fileAvatarChooser.files[0];
  const fileName = fileAvatar.name.toLowerCase();

  matchesAvatar = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matchesAvatar) {
    previewAvatar.src = ``;
    loadPhoto(previewAvatar, fileAvatar);
  } else {
    window.errorSuccess.onLoadFailMessage(`Ошибка загрузки файла`);
    previewAvatar.src = `img/muffin-grey.svg`;
  }
};
const loadPhotoOfHouse = () => {
  let matchesHouse = true;
  const fileHouse = fileHouseChooser.files[0];
  const fileName = fileHouse.name.toLowerCase();

  matchesHouse = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matchesHouse) {
    const previewHouse = document.createElement(`img`);
    previewHouse.alt = `Фото жилья`;
    previewHouse.width = PHOTO_WIDTH;
    previewHouse.height = PHOTO_HEIGHT;
    previewHouse.src = ``;
    const previewHouseBlock = previewHouseBlockTemplate.cloneNode(true);
    previewHouseBlock.append(previewHouse);
    photoContainer.append(previewHouseBlock);
    loadPhoto(previewHouse, fileHouse);
  } else {
    window.errorSuccess.onLoadFailMessage(`Ошибка загрузки файла`);
  }
};

fileAvatarChooser.addEventListener(`change`, loadPhotoOfAvatar);
fileHouseChooser.addEventListener(`change`, loadPhotoOfHouse);

// валидация цены и типа
const validateTypeAndPrice = () => {
  const typeValue = typeForm.value;
  const priceValue = parseInt(priceForm.value, 10);
  const typeItem = priceTypeValue[typeValue];
  priceForm.placeholder = typeItem.price;

  priceForm.setCustomValidity(priceValue >= typeItem.price && priceValue <= MAX_PRICE ? `` : typeItem.errorText);
  priceForm.style.outline = priceValue >= typeItem.price && priceValue <= MAX_PRICE ? `none` : `3px solid darkred`;
};

const onTypeChange = () => {
  validateTypeAndPrice();
  typeForm.reportValidity();
};
const onPriceChange = () => {
  validateTypeAndPrice();
  priceForm.reportValidity();
};

typeForm.addEventListener(`change`, onTypeChange);
priceForm.addEventListener(`input`, onPriceChange);

// валидация комнат и гостей
const validateRoomsAndCapacity = () => {
  const roomAmountValue = roomAmountForm.value;
  const capacityValue = capacityForm.value;
  const roomItem = capacityGuestValue[roomAmountValue];

  capacityForm.setCustomValidity(roomItem.guests.includes(capacityValue) ? `` : roomItem.errorText);
  capacityForm.style.outline = roomItem.guests.includes(capacityValue) ? `none` : `3px solid darkred`;
};

const onCapacityChange = () => {
  validateRoomsAndCapacity();
  capacityForm.reportValidity();
};
const onRoomsChange = () => {
  validateRoomsAndCapacity();
  roomAmountForm.reportValidity();
};

capacityForm.addEventListener(`change`, onCapacityChange);
roomAmountForm.addEventListener(`change`, onRoomsChange);

// валидация заголовка
let titleValue = titleForm.value;

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

// валидация времени
let timeinValue = timeinForm.value;
let timeoutValue = timeoutForm.value;
let isValidOfTime = timeinValue === timeoutValue;

const onTimeinFormChange = () => {
  timeinValue = timeinForm.value;
  timeoutValue = timeoutForm.value;
  isValidOfTime = timeinValue === timeoutValue;
  if (!isValidOfTime) {
    timeoutForm.value = timeinValue;
  } else {
    timeoutForm.setCustomValidity(``);
    timeoutForm.style.outline = `none`;
  }
};
const onTimeoutFormChange = () => {
  timeinValue = timeinForm.value;
  timeoutValue = timeoutForm.value;
  isValidOfTime = timeinValue === timeoutValue;
  if (!isValidOfTime) {
    timeinForm.value = timeoutValue;
  } else {
    timeoutForm.setCustomValidity(``);
    timeoutForm.style.outline = `none`;
  }
};

timeinForm.addEventListener(`change`, onTimeinFormChange);
timeoutForm.addEventListener(`change`, onTimeoutFormChange);

window.form = {
  priceTypeValue
};
