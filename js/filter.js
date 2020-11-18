'use strict';

const MIN_OF_MIDDLE_PRICE = 10000;
const MAX_OF_MIDDLE_PRICE = 50000;
const mapFilters = document.querySelector(`.map__filters`);
const housingType = mapFilters.querySelector(`#housing-type`);
const housingPrice = mapFilters.querySelector(`#housing-price`);
const housingRooms = mapFilters.querySelector(`#housing-rooms`);
const housingGuests = mapFilters.querySelector(`#housing-guests`);
const housingFeatures = mapFilters.querySelector(`#housing-features`);

const filterByType = (element) => housingType.value === `any` ? true : housingType.value === element.offer.type;
const filterByPrice = (element) => {
  const price = parseInt(element.offer.price, 10);
  let result = true;
  switch (housingPrice.value) {
    case `any`:
      result = true;
      break;
    case `middle`:
      result = price >= MIN_OF_MIDDLE_PRICE && price <= MAX_OF_MIDDLE_PRICE;
      break;
    case `low`:
      result = price < MIN_OF_MIDDLE_PRICE;
      break;
    case `high`:
      result = price > MAX_OF_MIDDLE_PRICE;
      break;
  }
  return result;
};
const filterByRooms = (element) => housingRooms.value === `any` ? true : parseInt(housingRooms.value, 10) === element.offer.rooms;
const filterByGuests = (element) => housingGuests.value === `any` ? true : parseInt(housingGuests.value, 10) === element.offer.guests;
const filterByFeatures = (element) => {
  const features = element.offer.features;
  const checkedInputs = housingFeatures.querySelectorAll(`input[type=checkbox]:checked`);
  const checkedFeatures = [].map.call(checkedInputs, (input) => input.value);

  return checkedFeatures.every((el) => features.includes(el));
};

const debouncedRenderSetOfPins = window.debounce(window.render.displayPins);

const filterPins = (elements) => {
  mapFilters.addEventListener(`change`, () => {
    const filteredPins = elements.filter(filterByType).filter(filterByPrice).filter(filterByRooms).filter(filterByGuests).filter(filterByFeatures);
    debouncedRenderSetOfPins(filteredPins);
  });
};

window.filter = {
  strainerForPins: filterPins,
  mapStrainers: mapFilters
};
