/* global _:readonly */
const _ = require('lodash');

import {getData} from './api.js';
import {getRandomElement, sortFunction} from './utils.js';
import {onClickPreview} from './big-picture.js';

const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');
const picturesContainer = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const RERENDER_DELAY = 500;

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
    let cloneArray = [];
    while (cloneArray.length < 10) {
      let randomElement = getRandomElement(photos);
      if (!cloneArray.includes(randomElement)) {
        cloneArray.push(randomElement);
      }
    }
    createPreviewElements(cloneArray);
    onClickPreview(cloneArray);
  })
}

function changeDiscussedButton () {
  clearPicturesContainer();
  changeActiveFilter(filterDiscussedButton);

  let sortedArray = [];

  getData((photos) => {
    for (let i = 1; i < 30; i++) {
      photos.forEach((photo) => {
        if (photo.comments.length <= i && !sortedArray.includes(photo)) {
          sortedArray.push(photo);
        }
      })
    }
    sortedArray.reverse(sortFunction);

    createPreviewElements(sortedArray);
    onClickPreview(sortedArray);
  })
}

filterDefaultButton.addEventListener('click', _.debounce(changeDefaultButton, RERENDER_DELAY));

filterRandomButton.addEventListener('click', _.debounce(changeRandomButton, RERENDER_DELAY));

filterDiscussedButton.addEventListener('click', _.debounce(changeDiscussedButton, RERENDER_DELAY));

export {createPreviewElements};
