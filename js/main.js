import {generatePhotos} from './data.js';
import {createPreviewElements} from './previews.js';
import './full-pictures.js';

const photos = generatePhotos();

createPreviewElements(photos);

