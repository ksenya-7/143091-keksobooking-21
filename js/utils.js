'use strict';

const Key = {
  ESCAPE: `Escape`,
  ENTER: `Enter`,
};

const isEscape = (evt) => (evt.key === Key.ESCAPE);
const isEnter = (evt) => (evt.key === Key.ENTER);

window.utils = {
  isEscape,
  isEnter,
};
