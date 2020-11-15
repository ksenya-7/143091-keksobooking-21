'use strict';

const mapFilters = document.querySelector(`.map__filters`);
const housingType = mapFilters.querySelector(`#housing-type`);
const housingPrice = mapFilters.querySelector(`#housing-price`);
const housingRooms = mapFilters.querySelector(`#housing-rooms`);
const housingGuests = mapFilters.querySelector(`#housing-guests`);
const housingFeatures = mapFilters.querySelector(`#housing-features`);

// const mapLabelFeatures = mapFilters.querySelectorAll(`.map__feature`);

const filterByType = (element) => housingType.value === `any` ? true : housingType.value === element.offer.type;
const filterByPrice = (element) => {
  const price = parseInt(element.offer.price, 10);
  let result = true;
  switch (housingPrice.value) {
    case `any`:
      result = true;
      break;
    case `middle`:
      result = price >= 10000 && price <= 50000;
      break;
    case `low`:
      result = price < 10000;
      break;
    case `high`:
      result = price > 50000;
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
  // let result = true;
  return checkedFeatures.every((el) => features.includes(el));
  // console.log(checkedFeatures);
  // for (let i = 0; i < checkedInputs.length; i++) {
  //   console.log(checkedInputs[i].value);
  //   for (let j = 0; j < checkedFeatures.length; j++) {
  //     result = checkedFeatures.some(checkedInputs[i].value === element.offer.features[j]);
  //   }
  // }
  // console.log(result);
  // return checkedInputs[i].value;
  // return result;
};

const debouncedRenderSetOfPins = window.debounce(window.renderPins);

const filtersHandler = (elements) => {
  mapFilters.addEventListener(`change`, () => {
    const filteredPins = elements.filter(filterByType).filter(filterByPrice).filter(filterByRooms).filter(filterByGuests).filter(filterByFeatures);
    // console.log(filteredPins);
    debouncedRenderSetOfPins(filteredPins);
  });
};

window.filtersHandler = filtersHandler;

// Доработайте модуль, отрисовывающий метки, таким образом, чтобы отрисованные на карте
// метки можно было фильтровать с помощью фильтров, расположенных в блоке .map__filters.
// После фильтрации должны показываться те метки из набора данных, которые подходят под
// выбранные фильтры. Метки, отрисованные до этого нужно убрать. Все выбранные фильтры
// применяются вместе: один фильтр не отменяет другие, выбранные до него. Например, после
// выбора типа жилья можно указать диапазон стоимости и дополнения и в этом случае,
// на карте должны показываться только те метки, которые подходят под все условия.
