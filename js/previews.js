const picturesContainer = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

function createPictureElement (indexArray) {
  let newElement = templatePicture.cloneNode(true);
  let newPicture = newElement.querySelector('.picture__img');
  let newPictureLikes = newElement.querySelector('.picture__likes');
  let newPictureComments = newElement.querySelector('.picture__comments');
  newPicture.src = indexArray.url;
  newPictureLikes.textContent = indexArray.likes;
  newPictureComments.textContent = indexArray.comments.length;
  return newElement;
}

function createPreviewElements (array) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 25; i++) {
    let element = createPictureElement(array[i]);
    element.appendChild(fragment);
    picturesContainer.appendChild(element);
  }
}

export {createPreviewElements};
