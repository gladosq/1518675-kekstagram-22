import {generatePhotos} from './data.js';
import {createPreviewElements} from './previews.js';

const photos = generatePhotos();

createPreviewElements(photos);
