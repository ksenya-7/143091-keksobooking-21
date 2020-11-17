'use strict';

const main = document.querySelector(`main`);
const successTemplate = document
.querySelector(`#success`)
.content.querySelector(`.success`);
const successElement = successTemplate.cloneNode(true);
const errorTemplate = document
.querySelector(`#error`)
.content.querySelector(`.error`);
const errorElement = errorTemplate.cloneNode(true);
const errorButton = errorElement.querySelector(`.error__button`);
const errorText = errorElement.querySelector(`.error__message`);

const addElementAndListener = (element, elementButton, cbClose, cbEsc, cbClick) => {
  main.append(element);
  elementButton.addEventListener(`click`, cbClose);
  document.addEventListener(`keydown`, cbEsc);
  document.addEventListener(`mousedown`, cbClick);
};

const removeElementAndListener = (element, cbEsc, cbClick) => {
  element.remove();
  document.removeEventListener(`keydown`, cbEsc);
  document.removeEventListener(`mousedown`, cbClick);
};

const onLoadSuccessMessage = () => {
  main.append(successElement);
  document.addEventListener(`keydown`, onSuccessMessageEscPress);
  document.addEventListener(`mousedown`, onSuccessMessageClick);
};
const onSuccessMessageEscPress = (evt) => {
  if (window.utils.isEscape(evt)) {
    evt.preventDefault();
    removeElementAndListener(successElement, onSuccessMessageEscPress, onSuccessMessageClick);
  }
};
const onSuccessMessageClick = (evt) => {
  evt.preventDefault();
  removeElementAndListener(successElement, onSuccessMessageEscPress, onSuccessMessageClick);
};


const closeErrorMessage = () => {
  removeElementAndListener(errorElement, onErrorMessageEscPress, onErrorMessageClick);
};
const onLoadFormErrorMessage = () => {
  addElementAndListener(errorElement, errorButton, closeErrorMessage, onErrorMessageEscPress, onErrorMessageClick);
};
const onErrorMessageEscPress = (evt) => {
  if (window.utils.isEscape(evt)) {
    evt.preventDefault();
    removeElementAndListener(errorElement, onErrorMessageEscPress, onErrorMessageClick);
  }
};
const onErrorMessageClick = (evt) => {
  evt.preventDefault();
  removeElementAndListener(errorElement, onErrorMessageEscPress, onErrorMessageClick);
};

const onLoadErrorMessage = (message) => {
  errorText.textContent = message;
  main.append(errorElement);
  errorButton.addEventListener(`click`, closeErrorMessage);
  document.addEventListener(`keydown`, onErrorMessageEscPress);
  document.addEventListener(`mousedown`, onErrorMessageClick);
};

window.error = {
  onLoadSuccessMessage,
  onLoadFailMessage: onLoadErrorMessage,
  onLoadFormFailMessage: onLoadFormErrorMessage
};
