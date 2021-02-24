const bigPictureSection = document.querySelector('.big-picture');
const bigPictureUrl = bigPictureSection.querySelector('.big-picture__url');
const bigPictureLikes = bigPictureSection.querySelector('.likes-count');
const bigPictureComments = bigPictureSection.querySelector('.comments-count');
const commentsContainer = document.querySelector('.social__comments');
const socialComment = commentsContainer.children;
const socialCaption = document.querySelector('.social__caption');
const commentCount = document.querySelector('.social__comment-count');
const commentLoaderButton = document.querySelector('.comments-loader');
const closeButton = document.querySelector('.big-picture__cancel');

function showBigPicture (arrayPhotos) {
  let picturesArray = document.querySelectorAll('.picture');
  picturesArray.forEach((pictureItem, index) => {
    pictureItem.addEventListener('click', function() {
      document.body.classList.add('modal-open');
      bigPictureSection.classList.remove('hidden');
      let imageLink = pictureItem.querySelector('.picture__img');
      let imageLikes = pictureItem.querySelector('.picture__likes');
      let imageComments = pictureItem.querySelector('.picture__comments');
      bigPictureUrl.src = imageLink.src;
      bigPictureLikes.textContent = imageLikes.textContent;
      bigPictureComments.textContent = imageComments.textContent;
      renderComments(arrayPhotos, index);
    });
  });
}

function renderComments (photos, indexArray) {
  let newElement = socialComment[0].cloneNode(true);
  socialComment[0].remove();
  socialComment[0].remove();
  for (let i = 0; i < photos[indexArray].comments.length; i++) {
    let newCloneComment = newElement.cloneNode(true);
    let newCommentPicture = newCloneComment.querySelector('.social__picture');
    let newTextPicture = newCloneComment.querySelector('.social__text');
    newCommentPicture.src = photos[indexArray].comments[i].avatar;
    newCloneComment.alt = photos[indexArray].comments[i].name;
    newTextPicture.textContent = photos[indexArray].comments[i].message;
    commentsContainer.appendChild(newCloneComment);

    socialCaption.textContent = photos[indexArray].description;
    commentCount.classList.add('hidden');
    commentLoaderButton.classList.add('hidden');
  }
}

closeButton.addEventListener('click', function() {
  document.body.classList.remove('modal-open');
  bigPictureSection.classList.add('hidden');
});

export {showBigPicture, renderComments};
