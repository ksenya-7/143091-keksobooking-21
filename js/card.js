'use strict';

const PINS_NUMBER = 0;
const CARD_CLASSES = [`popup__title`, `popup__text--address`, `popup__text--price`, `popup__type`, `popup__text--capacity`, `popup__text--time`, `popup__features`, `popup__description`, `popup__photos`, `popup__avatar`];
const filtersContainer = document.querySelector(`.map__filters-container`);
const templateCard = document.querySelector(`#card`).content
.querySelector(`.map__card`);
const templatePhoto = templateCard.querySelector(`.popup__photo`);

const typeAccomadations = {
  'flat': `Квартира`,
  'bungalow': `Бунгало`,
  'house': `Дом`,
  'palace': `Дворец`,
};

const renderFeatures = (elements, container) => {
  const listOfFeatures = document.createDocumentFragment();

  elements.forEach((element) => {
    const li = document.createElement(`li`);
    li.classList.add(`popup__feature`);
    li.classList.add(`popup__feature--${element}`);
    listOfFeatures.append(li);
  });

  container.append(listOfFeatures);
};

const renderPhotos = (elements, container) => {
  const listOfPhotos = document.createDocumentFragment();

  elements.forEach((element) => {
    const photoElement = templatePhoto.cloneNode(true);
    photoElement.src = element;
    listOfPhotos.append(photoElement);
  });

  container.append(listOfPhotos);
};

const renderCard = (pin) => {
  const card = templateCard.cloneNode(true);

  card.querySelector(`.popup__title`).textContent = pin.offer.title;
  card.querySelector(`.popup__text--address`).textContent = pin.offer.address;
  card.querySelector(`.popup__text--price`).textContent = `${pin.offer.price}₽/ночь`;
  card.querySelector(`.popup__type`).textContent = typeAccomadations[pin.offer.type];
  card.querySelector(`.popup__text--capacity`).textContent = `${pin.offer.rooms} комнаты для ${pin.offer.guests} гостей.`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ${pin.offer.checkin}, выезд до ${pin.offer.checkout}.`;
  card.querySelector(`.popup__features`).innerHTML = ``;
  renderFeatures(pin.offer.features, card.querySelector(`.popup__features`));
  card.querySelector(`.popup__description`).textContent = pin.offer.description;
  card.querySelector(`.popup__photos`).innerHTML = ``;
  renderPhotos(pin.offer.photos, card.querySelector(`.popup__photos`));
  card.querySelector(`.popup__avatar`).src = pin.author.avatar;

  CARD_CLASSES.forEach((element) => {
    if (card.querySelector(`.${element}`).innerHTML === ``) {
      card.querySelector(`.${element}`).style.display = `none`;
    }
  });

  filtersContainer.insertAdjacentElement(`beforeBegin`, card);
};

const currentPin = window.pins[PINS_NUMBER];
renderCard(currentPin);
