'use strict';

const CARD_CLASSES = [`popup__title`, `popup__text--address`, `popup__text--price`, `popup__type`, `popup__text--capacity`, `popup__text--time`, `popup__features`, `popup__description`, `popup__photos`, `popup__avatar`];
const filtersContainer = document.querySelector(`.map__filters-container`);
const templateCard = document.querySelector(`#card`).content
.querySelector(`.map__card`);
const templatePhoto = templateCard.querySelector(`.popup__photo`);

const typeAccommodation = {
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
  const {offer, author} = pin;
  const {title, address, price, type, rooms, guests, checkin, checkout, description, features, photos} = offer;
  const {avatar} = author;

  const card = templateCard.cloneNode(true);
  card.querySelector(`.popup__title`).textContent = title;
  card.querySelector(`.popup__text--address`).textContent = address;
  card.querySelector(`.popup__text--price`).textContent = `${price}₽/ночь`;
  card.querySelector(`.popup__type`).textContent = typeAccommodation[type];
  card.querySelector(`.popup__text--capacity`).textContent = `${rooms} комнаты для ${guests} гостей.`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}.`;
  card.querySelector(`.popup__features`).innerHTML = ``;
  renderFeatures(features, card.querySelector(`.popup__features`));
  card.querySelector(`.popup__description`).textContent = description;
  card.querySelector(`.popup__photos`).innerHTML = ``;
  renderPhotos(photos, card.querySelector(`.popup__photos`));

  CARD_CLASSES.forEach((element) => {
    if (card.querySelector(`.${element}`).innerHTML === ``) {
      card.querySelector(`.${element}`).style.display = `none`;
    }
  });

  card.querySelector(`.popup__avatar`).src = avatar;
  card.querySelector(`.popup__avatar`).style.display = `block`;

  filtersContainer.insertAdjacentElement(`beforebegin`, card);
};


window.renderCard = renderCard;
