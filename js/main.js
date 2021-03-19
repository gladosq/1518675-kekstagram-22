import {createPreviewElements} from './previews.js';
import {onClickPreview} from './big-picture.js';
import {changePreviewEffect} from './upload.js';
import {getData} from './api.js';
import './upload-form.js';

changePreviewEffect();

getData((photos) => {
  createPreviewElements(photos);
  onClickPreview(photos);
});
