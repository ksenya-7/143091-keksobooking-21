'use strict';

const SUCCESS_REQUEST = 200;
const TIMEOUT = 5000;

const Url = {
  URL_DATA: `https://21.javascript.pages.academy/keksobooking/data`,
  URL: `https://21.javascript.pages.academy/keksobooking`,
};

const onXhrLoad = (xhr, onLoad, onError) => {
  if (xhr.status === SUCCESS_REQUEST) {
    onLoad(xhr.response);
  } else {
    onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
  }
};

const loadOrSaveXhr = (request, onLoad, onError) => {
  request.responseType = `json`;

  request.addEventListener(`load`, onXhrLoad.bind(null, request, onLoad, onError));

  request.timeout = TIMEOUT;

  request.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${request.timeout} мс`);
  });
};

const load = (onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  loadOrSaveXhr(xhr, onLoad, onError);

  xhr.addEventListener(`error`, () => {
    window.errorSuccess.onLoadFailMessage(`Ошибка сети, данные не загрузились`);
    window.open.disactivatePage();
  });

  xhr.open(`GET`, Url.URL_DATA);
  xhr.send();
};

const save = (data, onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  loadOrSaveXhr(xhr, onLoad, onError);

  xhr.addEventListener(`error`, (evt) => {
    evt.preventDefault();
    window.errorSuccess.onLoadFailMessage(`Ошибка сети, данные не отправились`);
  });

  xhr.open(`POST`, Url.URL);
  xhr.send(data);
};

window.backend = {
  load,
  save
};
