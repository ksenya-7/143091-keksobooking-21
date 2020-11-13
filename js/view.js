'use strict';

let cardPopup = null;
let cardPopupClose = null;

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

const openCards = (elements, currentElements) => {
  let pinsForCard = elements.slice();
  for (let i = 0; i < currentElements.length; i++) {
    currentElements[i].addEventListener(`click`, () => {
      if (cardPopup !== null) {
        cardPopup.remove();
      }
      window.renderCard(pinsForCard[i]);
      cardPopup = document.querySelector(`.map__card`);
      cardPopupClose = cardPopup.querySelector(`.popup__close`);

      cardPopupClose.addEventListener(`click`, closeCardPopup);
      document.addEventListener(`keydown`, onCardPopupEscPress);
    });
  }
};

window.openCards = openCards;
