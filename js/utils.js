'use strict';

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
  shuffleElements(new Array(amount).fill(``).map((element, index) => (element = elements[index])));
};
const getRandomStrokeOfElements = (elements) => {
  const lengthOfListElements = getRandom(1, elements.length);
  getRandomArrayOfElements(lengthOfListElements, elements);
  // console.log(getRandomArrayOfElements(lengthOfListElements, elements));
};

window.utils = {
  getRandom,
  getRandomFrom,
  getRandomSimpleArrayOfElements,
  getRandomStrokeOfElements
};
