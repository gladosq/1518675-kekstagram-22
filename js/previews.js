import {generatePhotos, PHOTOS_COUNT} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content;
const picture = templatePicture.querySelector('.picture');
const fragment = document.createDocumentFragment();

function createNodeElement (element) {
  let generatedObjects = generatePhotos();
  for (let i = 0; i < PHOTOS_COUNT; i++) {
    let newElement = element.cloneNode(true);
    let newPicture = newElement.querySelector('.picture__img');
    let newPictureLikes = newElement.querySelector('.picture__likes');
    let newPictureComments = newElement.querySelector('.picture__comments');
    let newPictureInfo = newElement.querySelector('.picture__info');
    newPicture.src = generatedObjects[i].url;
    newPictureLikes.textContent = generatedObjects[i].likes;
    newPictureComments.textContent = generatedObjects[i].comments.length;
    fragment.appendChild(newPictureInfo);
    fragment.appendChild(newPicture);
    picturesContainer.appendChild(newElement);
    newElement.appendChild(fragment);
  }
}

createNodeElement(picture);
console.log(PHOTOS_COUNT);
