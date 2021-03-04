import {generatePhotos} from './data.js';
import {createPreviewElements} from './previews.js';
import {onClickPreview} from './big-picture.js';
import './upload.js';

const photos = generatePhotos();

createPreviewElements(photos);

onClickPreview(photos);
