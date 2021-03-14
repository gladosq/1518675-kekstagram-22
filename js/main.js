import {generatePhotos} from './data.js';
import {createPreviewElements} from './previews.js';
import {onClickPreview} from './big-picture.js';
import {changePreviewEffect} from './upload.js';
import {checkSubmitForm} from './upload-form.js';
import {createFetch} from './render-server.js';
import {getData, sendData} from './api.js';

const photos = generatePhotos();

changePreviewEffect();

// getData((photos) => {

// });

const fetchPhotos = createFetch(
  (photos) => {
    console.log(photos);
    createPreviewElements(photos);
    onClickPreview(photos);
  },
  (err) => {
    console.log(err);
    alert('Произошла ошибка загрузки данных');
});

checkSubmitForm();
fetchPhotos();
