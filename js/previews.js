import {fullSizeRender} from './full-pictures.js';

const picturesContainer = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

function createPictureElement (indexArray) {
  let newElement = templatePicture.cloneNode(true);
  newElement.querySelector('.picture__img').src = indexArray.url;
  newElement.querySelector('.picture__likes').textContent = indexArray.likes;
  newElement.querySelector('.picture__comments').textContent = indexArray.comments.length;
  return newElement;
}

function createPreviewElements (array) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(createPictureElement(array[i]));
  }
  picturesContainer.appendChild(fragment);
  fullSizeRender(array);
}

export {createPreviewElements};
