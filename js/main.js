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
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const HOTEL_FOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const PINS_AMOUNT = 8;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const PRICE_MIN = 1500;
const PRICE_MAX = 8000;
const ROOM_MIN = 1;
const ROOM_MAX = 5;
const GUEST_MIN = 1;
const GUEST_MAX = 7;
const RANGE_LEFT = 0;
const RANGE_RIGHT = 1200;
const RANGE_TOP = 130;
const RANGE_BOTTOM = 630;

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);

const activatePage = () => map.classList.remove(`map--faded`);

const generatePins = (amount) => {
  const avatars = window.utils.getRandomSimpleArrayOfElements(amount);

  const pinsFeatures = new Array(amount).fill(``).map((_, idx) => {
    const locationX = window.utils.getRandom(RANGE_LEFT, RANGE_RIGHT);
    const locationY = window.utils.getRandom(RANGE_TOP, RANGE_BOTTOM);

    const pinObject = {
      author: {
        avatar: `img/avatars/user0${avatars[idx]}.png`
      },
      offer: {
        title: window.utils.getRandomFrom(TITLES),
        address: `${locationX}, ${locationY}`,
        price: window.utils.getRandom(PRICE_MIN, PRICE_MAX),
        type: window.utils.getRandomFrom(HOUSE_NAMES),
        rooms: window.utils.getRandom(ROOM_MIN, ROOM_MAX),
        guests: window.utils.getRandom(GUEST_MIN, GUEST_MAX),
        checkin: window.utils.getRandomFrom(HOURS),
        checkout: window.utils.getRandomFrom(HOURS),
        features: window.utils.getRandomStrokeOfElements(FEATURES),
        description: `это что-то незабываемое`,
        photos: window.utils.getRandomStrokeOfElements(HOTEL_FOTOS),
      },
      location: {
        x: locationX,
        y: locationY
      }
    };

    return pinObject;
  });

  return pinsFeatures;
};

const renderPin = (pin) => {
  const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.style = `left: ${pin.location.x - PIN_WIDTH / 2}px; top: ${pin.location.y - PIN_HEIGHT}px;`;
  pinElement.querySelector(`img`).src = pin.author.avatar;
  pinElement.querySelector(`img`).alt = pin.offer.title;

  return pinElement;
};

const renderPins = (pins) => {
  const fragment = document.createDocumentFragment();

  pins.map(renderPin).forEach((element) => fragment.append(element));

  mapPins.append(fragment);
};

activatePage();
const pins = generatePins(PINS_AMOUNT);
renderPins(pins);
