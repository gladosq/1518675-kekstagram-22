const imgFilters = document.querySelector('.img-filters');

const getData = (onSuccess) => {
  fetch(
    'https://22.javascript.pages.academy/kekstagram/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => response.json())
    .then((response) => {
      onSuccess(response);
      imgFilters.classList.remove('img-filters--inactive');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Данные заполнены не верно');
      }
    })
    .catch(() => {
      onFail('Данные заполнены не верно');
    });
};

export {getData, sendData};
