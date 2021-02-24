import {generatePhotos} from './data.js';
import {createPreviewElements} from './previews.js';
import {showBigPicture} from './big-picture.js';

const photos = generatePhotos();

createPreviewElements(photos);

showBigPicture(photos);
