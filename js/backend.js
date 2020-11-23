'use strict';

const SUCCESS_REQUEST = 200;
const TIMEOUT = 5000;

const Url = {
  URL_DATA: `https://21.javascript.pages.academy/keksobooking/data`,
  URL: `https://21.javascript.pages.academy/keksobooking`,
};

const StatusCode = {
  0: `Ошибка сети, данные не загрузились`,
  102: `Пользователь отменил запрос`,
  400: `Неверный запрос`,
  401: `Пользователь не авторизован`,
  404: `Ничего не найдено`,
  500: `Internal Server Error`
};

const onXhrLoad = (xhr, onLoad, onError) => {
  let error;
  switch (xhr.status) {
    case SUCCESS_REQUEST:
      onLoad(xhr.response);
      break;
    case (xhr.status) : error = StatusCode[xhr.status];
      break;
    default:
      error = `Cтатус ответа: ${xhr.status} ${xhr.statusText}`;
  }

  if (error) {
    onError(error);
  }
};

// const loadOrSaveXhr = (method, onLoad, onError, url, data) => {
//   const xhr = new XMLHttpRequest();
//   xhr.responseType = `json`;

//   xhr.addEventListener(`load`, onXhrLoad.bind(null, xhr, onLoad, onError));

//   xhr.timeout = TIMEOUT;

//   xhr.addEventListener(`timeout`, () => {
//     onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
//   });

//   xhr.addEventListener(`error`, () => {
//     window.errorSuccess.onLoadFailMessage(`${StatusCode[xhr.status]}`);
//     window.open.disactivatePage();
//   });

//   xhr.open(method, url);
//   xhr.send(data);
// };

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
    window.errorSuccess.onLoadFailMessage(`${StatusCode[xhr.status]}`);
    window.open.disactivatePage();
  });

  xhr.open(`GET`, Url.URL_DATA);
  xhr.send();

  // loadOrSaveXhr(`GET`, onLoad, onError, Url.URL_DATA);
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

  // loadOrSaveXhr(`POST`, onLoad, onError, Url.URL, data);
};

window.backend = {
  load,
  save
};
