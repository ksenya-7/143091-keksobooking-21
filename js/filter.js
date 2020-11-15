'use strict';

const mapFilters = document.querySelector(`.map__filters`);
// const housingType = mapFilters.querySelector(`#housing-type`);
// const housingPrice = mapFilters.querySelectorAll(`.housing-price`);
// const housingRooms = mapFilters.querySelectorAll(`.housing-rooms`);
// const housingGuests = mapFilters.querySelectorAll(`.housing-guests`);
// const mapInputFeatures = mapFilters.querySelectorAll(`.map__checkbox`);
// const mapLabelFeatures = mapFilters.querySelectorAll(`.map__feature`);

const getFilteredPins = (elements, type) => elements.filter((element) => type === `any` ? true : element.offer.type === type)
.filter((element) => {
  // console.log(type);
  if (type === `any`) {
    // console.log(parseInt(element.offer.price, 10) > 10000 && parseInt(element.offer.price, 10) < 50000);
    // console.log(type);
    return true;
  } else if (type === `middle`) {
    // console.log(type);
    // console.log(type === `middle`);
    return parseInt(element.offer.price, 10) > 10000 && parseInt(element.offer.price, 10) < 50000;
  } else if (type === `low`) {
    return parseInt(element.offer.price, 10) < 10000;
  } else if (type === `high`) {
    return parseInt(element.offer.price, 10) > 50000;
  }
  return true;
});

const debouncedRenderSetOfPins = window.debounce(window.renderPins);

// let filteredPins = [];
const filtersHandler = (elements) => {
  let filteredPins = [];
  mapFilters.addEventListener(`change`, (evt) => {
    console.log(evt.target.value);
    filteredPins = getFilteredPins(elements, evt.target.value);
    // console.log(filteredPins);
    // filteredPins = getHousingPricePins(filteredPins, evt.target.value);
    debouncedRenderSetOfPins(filteredPins);
    // console.log(filteredPins);
  });
};

// Неправильно. Вся логика условия должна быть в коллбэке filter. Массив должен фильтроваться
// и потом отрисовываться. shuffleElements использовать нельзя, массив не должен перемешиваться случайно

window.filtersHandler = filtersHandler;

// Доработайте модуль, отрисовывающий метки, таким образом, чтобы отрисованные на карте
// метки можно было фильтровать с помощью фильтров, расположенных в блоке .map__filters.
// После фильтрации должны показываться те метки из набора данных, которые подходят под
// выбранные фильтры. Метки, отрисованные до этого нужно убрать. Все выбранные фильтры
// применяются вместе: один фильтр не отменяет другие, выбранные до него. Например, после
// выбора типа жилья можно указать диапазон стоимости и дополнения и в этом случае,
// на карте должны показываться только те метки, которые подходят под все условия.
// Как в изначальном состоянии, так и при изменении фильтра, на карте должно показываться
// не более 5 меток, независимо от выбранного фильтра.
