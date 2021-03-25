const pictureSection = document.querySelector('.big-picture');
const pictureUrl = pictureSection.querySelector('.big-picture__url');
const pictureLikes = pictureSection.querySelector('.likes-count');
const pictureComments = pictureSection.querySelector('.comments-count');
const commentsContainer = document.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const commentCount = document.querySelector('.social__comment-count');
const commentLoaderButton = document.querySelector('.comments-loader');
const closeButton = document.querySelector('.big-picture__cancel');
const templateComment = document.querySelector('#message').content.querySelector('.social__comment');

const MAX_COMMENTS_PHOTO = 5;

function onClickPreview (photos) {
  let picturesArray = document.querySelectorAll('.picture');
  picturesArray.forEach((pictureItem, index) => {
    pictureItem.addEventListener('click', function() {
      document.body.classList.add('modal-open');
      pictureSection.classList.remove('hidden');
      showBigPicture(photos[index]);
      renderComments(photos[index]);

    });
  });
}

function showBigPicture (photo) {
  renderPicture(photo);
}

function renderPicture (photo) {
  pictureUrl.src = photo.url;
  pictureLikes.textContent = photo.likes;
  pictureComments.textContent = photo.comments.length;
}

function clearComments () {
  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }
}

function hideBigPicture () {
  document.body.classList.remove('modal-open');
  pictureSection.classList.add('hidden');
}

function renderComments (photo) {
  clearComments();
  let fragment = document.createDocumentFragment();

  let commentsPhotoValue = MAX_COMMENTS_PHOTO;

  if (photo.comments.length <= MAX_COMMENTS_PHOTO) {
    commentsPhotoValue = photo.comments.length;
    commentLoaderButton.classList.add('hidden');
    commentCount.classList.add('hidden');
  } else if (commentLoaderButton.classList.contains('hidden') && commentCount.classList.contains('hidden')) {
    commentLoaderButton.classList.remove('hidden');
    commentCount.classList.remove('hidden');
  } else {
    commentLoaderButton.classList.remove('hidden');
  }

  for (let i = 0; i < commentsPhotoValue; i++) {
    let newComment = templateComment.cloneNode(true);
    newComment.querySelector('.social__picture').src = photo.comments[i].avatar;
    newComment.querySelector('.social__picture').alt = photo.comments[i].name;
    newComment.querySelector('.social__text').textContent = photo.comments[i].message;
    fragment.appendChild(newComment);
  }

  socialCaption.textContent = photo.description;
  commentsContainer.appendChild(fragment);

  commentLoaderButton.addEventListener('click', function() {
    clearComments();
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < photo.comments.length; i++) {
      let newComment = templateComment.cloneNode(true);
      newComment.querySelector('.social__picture').src = photo.comments[i].avatar;
      newComment.querySelector('.social__picture').alt = photo.comments[i].name;
      newComment.querySelector('.social__text').textContent = photo.comments[i].message;
      fragment.appendChild(newComment);
    }
    socialCaption.textContent = photo.description;
    commentsContainer.appendChild(fragment);

    commentLoaderButton.classList.add('hidden');

  });
}

closeButton.addEventListener('click', function() {
  hideBigPicture();
});

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {

    hideBigPicture();
  }
});

export {showBigPicture, renderComments, onClickPreview};
