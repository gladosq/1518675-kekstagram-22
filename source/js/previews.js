const RERENDER_DELAY = 500;
const SORTED_PHOTOS_SIZE = 30;
const RANDOM_PHOTOS_SIZE = 10;

import {debounce} from 'lodash';
import {getData} from './api.js';
import {getRandomElement, sortFunction} from './utils.js';
import {onClickPreview} from './big-picture.js';

const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');
const picturesContainer = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const filtersContainer = document.querySelector('.img-filters');

function createPictureElement (indexPicture) {
  let newElement = templatePicture.cloneNode(true);
  newElement.querySelector('.picture__img').src = indexPicture.url;
  newElement.querySelector('.picture__likes').textContent = indexPicture.likes;
  newElement.querySelector('.picture__comments').textContent = indexPicture.comments.length;
  return newElement;
}

function createPreviewElements (photos) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    fragment.appendChild(createPictureElement(photos[i]));
  }
  picturesContainer.appendChild(fragment);
}

function changeActiveFilter (newButton) {
  let activeFilter = document.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
  newButton.classList.add('img-filters__button--active');
}

function clearPicturesContainer () {
  let picturesForDelete = document.querySelectorAll('.picture');
  for (let i = 0; i < picturesForDelete.length; i++) {
    picturesForDelete[i].remove();
  }
}

function changeDefaultButton () {
  clearPicturesContainer();
  changeActiveFilter(filterDefaultButton);

  getData((photos) => {
    createPreviewElements(photos);
    onClickPreview(photos);
  });

}

function changeRandomButton () {
  clearPicturesContainer();
  changeActiveFilter(filterRandomButton);

  getData((photos) => {
    let clonedPhotos = [];
    while (clonedPhotos.length < RANDOM_PHOTOS_SIZE) {
      let randomElement = getRandomElement(photos);
      if (!clonedPhotos.includes(randomElement)) {
        clonedPhotos.push(randomElement);
      }
    }
    createPreviewElements(clonedPhotos);
    onClickPreview(clonedPhotos);
  })
}

function changeDiscussedButton () {
  clearPicturesContainer();
  changeActiveFilter(filterDiscussedButton);

  let sortedPhotos = [];

  getData((photos) => {
    for (let i = 1; i < SORTED_PHOTOS_SIZE; i++) {
      photos.forEach((photo) => {
        if (photo.comments.length <= i && !sortedPhotos.includes(photo)) {
          sortedPhotos.push(photo);
        }
      })
    }
    sortedPhotos.reverse(sortFunction);

    createPreviewElements(sortedPhotos);
    onClickPreview(sortedPhotos);
  })
}

function changeDebouncedFilter (evt) {
  if (evt.target.classList.contains('img-filters__button-default')) {
    changeDefaultButton();
  } else if (evt.target.classList.contains('img-filters__button-random')) {
    changeRandomButton();
  } else if (evt.target.classList.contains('img-filters__button-discussed')) {
    changeDiscussedButton();
  }
}

filtersContainer.addEventListener('click', debounce(changeDebouncedFilter, RERENDER_DELAY));

export {createPreviewElements};
