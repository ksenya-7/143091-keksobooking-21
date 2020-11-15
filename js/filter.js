'use strict';

const mapFilters = document.querySelector(`.map__filters `);
const housingType = mapFilters.querySelector(`#housing-type`);
// const housingPrice = mapFilters.querySelectorAll(`.housing-price`);
// const housingRooms = mapFilters.querySelectorAll(`.housing-rooms`);
// const housingGuests = mapFilters.querySelectorAll(`.housing-guests`);
// const mapInputFeatures = mapFilters.querySelectorAll(`.map__checkbox`);
// const mapLabelFeatures = mapFilters.querySelectorAll(`.map__feature`);

const getHousingTypePins = (elements, type) => elements.filter((element) => element.offer.type === type);
const debouncedRenderSetOfPins = window.debounce(window.renderPins);

const filtersHandler = (elements) => {
  housingType.addEventListener(`change`, (evt) => {
    if (evt.target.value === `any`) {
      debouncedRenderSetOfPins(window.utils.shuffleElements(elements.slice()));
    } else {
      debouncedRenderSetOfPins(getHousingTypePins(elements, evt.target.value));
    }
  });
};

window.filtersHandler = filtersHandler;
