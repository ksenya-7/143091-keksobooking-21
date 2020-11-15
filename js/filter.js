'use strict';

const AMOUNT_PINS = 5;
const mapFilters = document.querySelector(`.map__filters `);
const housingType = mapFilters.querySelector(`#housing-type`);
// const housingPrice = mapFilters.querySelectorAll(`.housing-price`);
// const housingRooms = mapFilters.querySelectorAll(`.housing-rooms`);
// const housingGuests = mapFilters.querySelectorAll(`.housing-guests`);
// const mapInputFeatures = mapFilters.querySelectorAll(`.map__checkbox`);
// const mapLabelFeatures = mapFilters.querySelectorAll(`.map__feature`);

const getAmountPins = (elements) => elements.slice(0, AMOUNT_PINS);
const getStartPins = (elements) => window.utils.shuffleElements(elements.slice()).slice(0, AMOUNT_PINS);
const getHousingTypePins = (elements, type) => elements.filter((element) => element.offer.type === type);
const debouncedRenderSetOfPins = window.debounce(window.renderPins);

const clearSetOfPins = () => {
  document.querySelectorAll(`.map__pin:not(.map__pin--main)`).forEach((element) => (element.remove()));
};

const housingTypeFilter = {
  'default': (elements) => {
    let housingTypePins = getStartPins(elements);
    clearSetOfPins();
    debouncedRenderSetOfPins(housingTypePins);
  },
  'any': (elements) => {
    let housingTypePins = getStartPins(elements);
    clearSetOfPins();
    debouncedRenderSetOfPins(housingTypePins);
  },
  'bungalow': (elements) => {
    let housingTypePins = getHousingTypePins(elements, `bungalow`);
    housingTypePins = getAmountPins(housingTypePins);
    clearSetOfPins();
    debouncedRenderSetOfPins(housingTypePins);
  },
  'flat': (elements) => {
    let housingTypePins = getHousingTypePins(elements, `flat`);
    housingTypePins = getAmountPins(housingTypePins);
    clearSetOfPins();
    debouncedRenderSetOfPins(housingTypePins);
  },
  'house': (elements) => {
    let housingTypePins = getHousingTypePins(elements, `house`);
    housingTypePins = getAmountPins(housingTypePins);
    clearSetOfPins();
    debouncedRenderSetOfPins(housingTypePins);
  },
  'palace': (elements) => {
    let housingTypePins = getHousingTypePins(elements, `palace`);
    housingTypePins = getAmountPins(housingTypePins);
    clearSetOfPins();
    debouncedRenderSetOfPins(housingTypePins);
  }
};

const filtersHandler = (elements) => {
  housingTypeFilter[`default`](elements);
  housingType.addEventListener(`change`, (evt) => {
    housingTypeFilter[evt.target.value](elements);
    document.querySelectorAll(`.popup`).forEach((element) => element.remove());
  });
};

window.filtersHandler = filtersHandler;
