'use strict';

const TITLES = [
  `Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`
];
const HOUSE_NAMES = [`palace`, `flat`, `house`, `bungalow`];
const HOURS = [`12:00`, `13:00`, `14:00`];
const FACILITIES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const HOTEL_FOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const PINS_AMOUNT = 8;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;


const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
map.classList.remove(`map--faded`);


const getRandom = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

let shuffleElements = (elements) => {
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [elements[i], elements[j]] = [elements[j], elements[i]];
  }
  return elements;
};

const getRandomSimpleArrayOfElements = (amount) => {
  const elements = shuffleElements(new Array(amount).fill(``).map((element, index) => (element = index + 1)));
  return elements;
};
const getRandomArrayOfElements = (amount) => {
  shuffleElements(new Array(amount).fill(``).map((element, index) => (element = FACILITIES[index])));
};
const getRandomStrokeOfElements = (elements) => {
  let lengthOfListElements = getRandom(1, elements.length);
  getRandomArrayOfElements(lengthOfListElements);
};

const generatePins = (amount) => {
  const avatars = getRandomSimpleArrayOfElements(amount);

  const pinsFeatures = new Array(amount).fill(``).map((_, idx) => ({
    author: {
      avatar: `img/avatars/user0${avatars[idx]}.png`
    },
    offer: {
      title: getRandomFrom(TITLES),
      address: `${getRandom(35, 1165)}, ${getRandom(130, 630)}`,
      price: getRandom(1500, 8000),
      type: getRandomFrom(HOUSE_NAMES),
      rooms: getRandom(1, 5),
      guests: getRandom(1, 7),
      checkin: getRandomFrom(HOURS),
      checkout: getRandomFrom(HOURS),
      Elements: getRandomStrokeOfElements(FACILITIES),
      description: `это что-то незабываемое`,
      photos: getRandomStrokeOfElements(HOTEL_FOTOS),
    },
    location: {
      x: getRandom(35, 1165),
      y: getRandom(130, 630)
    }
  }));

  return pinsFeatures;
};

const renderPin = (pin) => {
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.style = `left: ${pin.location.x - PIN_WIDTH / 2}px; top: ${pin.location.y - PIN_HEIGHT / 2}px;`;
  pinElement.querySelector(`img`).src = pin.author.avatar;
  pinElement.querySelector(`img`).alt = pin.offer.title;

  return pinElement;
};

const renderPins = (pins) => {
  const fragment = document.createDocumentFragment();

  pins.map(renderPin).forEach((element) => fragment.append(element));

  return fragment;
};

const pins = generatePins(PINS_AMOUNT);
mapPins.append(renderPins(pins));
