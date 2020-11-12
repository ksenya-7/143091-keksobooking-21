'use strict';

let cardPopup = document.querySelector(`.map__card`);
let cardPopupClose = cardPopup.querySelector(`.popup__close`);

const onCardPopupEscPress = (evt) => {
  if (window.utils.isEscape(evt)) {
    cardPopup.classList.add(`hidden`);
  }
  document.removeEventListener(`keydown`, onCardPopupEscPress);
  document.removeEventListener(`click`, closeCardPopup);
};
const closeCardPopup = () => {
  cardPopup.remove();
  document.removeEventListener(`keydown`, onCardPopupEscPress);
  document.removeEventListener(`click`, closeCardPopup);
};

const openCards = (elements) => {
  const pinsForCard = window.render.pins;
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(`click`, () => {
      cardPopup.remove();
      window.card.renderCard(pinsForCard[i]);
      cardPopup = document.querySelector(`.map__card`);
      cardPopupClose = cardPopup.querySelector(`button`);

      cardPopupClose.addEventListener(`click`, closeCardPopup);
      document.addEventListener(`keydown`, onCardPopupEscPress);
    });
  }
};

cardPopupClose.addEventListener(`click`, closeCardPopup);
document.addEventListener(`keydown`, onCardPopupEscPress);

window.openCards = openCards;
