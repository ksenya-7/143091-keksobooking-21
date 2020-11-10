'use strict';

const Key = {
  ESCAPE: `Escape`,
  ENTER: `Enter`,
};

const isEscape = (evt) => (evt.key === Key.ESCAPE);
const isEnter = (evt) => (evt.key === Key.ENTER);
const getRandom = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const getRandomFrom = (arr) => arr[getRandom(0, arr.length - 1)];

const shuffleElements = (elements) => {
  const newElements = elements.slice();
  for (let i = newElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newElements[i], newElements[j]] = [newElements[j], newElements[i]];
  }
  return newElements;
};

const getRandomSimpleArrayOfElements = (amount) => {
  const elements = shuffleElements(new Array(amount).fill(``).map((element, index) => (element = index + 1)));
  return elements;
};
const getRandomArrayOfElements = (amount, elements) => {
  const newElements = shuffleElements(new Array(amount).fill(``).map((element, index) => (element = elements[index])));
  return newElements;
};
const getRandomStrokeOfElements = (elements) => {
  const lengthOfListElements = getRandom(1, elements.length);
  const newElements = getRandomArrayOfElements(lengthOfListElements, elements);
  return newElements;
};

window.utils = {
  isEscape,
  isEnter,
  getRandom,
  getRandomFrom,
  getRandomSimpleArrayOfElements,
  getRandomStrokeOfElements
};
