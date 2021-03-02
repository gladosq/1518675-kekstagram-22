const picturesContainer = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

function createPictureElement (indexArray) {
  let newElement = templatePicture.cloneNode(true);
  newElement.querySelector('.picture__img').src = indexArray.url;
  newElement.querySelector('.picture__likes').textContent = indexArray.likes;
  newElement.querySelector('.picture__comments').textContent = indexArray.comments.length;
  return newElement;
}

function createPreviewElements (photos) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    fragment.appendChild(createPictureElement(photos[i]));
  }
  picturesContainer.appendChild(fragment);
}

export {createPreviewElements};
