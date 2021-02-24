import {getRandomNumber, getRandomElement} from './utils.js';

const PHOTOS_COUNT = 25;
const TOTAL_PHOTOS = 6;
const MAX_SIZE_COMMENTS = 4;
const MIN_AMOUNT_LIKES = 15;
const MAX_AMOUNT_LIKES = 200;

const descriptionPhotos = ['Логика риторики', 'Сидим', 'Как заходить в хату', 'Видел такое', 'В горах Краснодарского края',
  'Восприятие изменяет состояние нашей материальной души', 'Вид с моря', 'Утренний закат', 'Морозный вечер', 'Удачный кадр',
  'Неудачный кадр', 'Всей семьёй', 'На свадьбе', 'На похоронах', 'На даче', 'Безразличие к жаре и холоду', 'Есть два стула',
  'Человеческая судьба является проекцией логоса', 'На курорте', 'Аквадискотека', 'Новая машина', 'Старая машина',
  'Рандомный комментарий', 'Чётко прописанный комментарий', 'Комментарий, написанный ИИ'];

const messageArray = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const commentatorNames = ['Иван', 'Борис', 'Иезекииль', 'Василий', 'Оксана', 'Ксения', 'Александр', 'Александра', 'Иероним',
  'Сократ', 'Платон', 'Август', 'Валерий', 'Валерия', 'Алиса', 'Полина', 'Алёна'];


function createComments () {
  let photoComments = [];
  let randomSizeComment = getRandomNumber(1, MAX_SIZE_COMMENTS);

  for (let i = 1; i <= randomSizeComment; i++) {
    photoComments.push({
      id: i,
      avatar: 'img/avatar-' + getRandomNumber(1, TOTAL_PHOTOS) + '.svg',
      message: getRandomElement(messageArray),
      name: getRandomElement(commentatorNames),
    });
  }
  return photoComments;
}

function generatePhotos () {
  let generatedObjects = [];
  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    generatedObjects.push({
      id: i,
      url: 'photos/' + i + '.jpg',
      description: getRandomElement(descriptionPhotos),
      likes: getRandomNumber(MIN_AMOUNT_LIKES, MAX_AMOUNT_LIKES),
      comments: createComments(),
    });
  }
  return generatedObjects;
}

export {generatePhotos, PHOTOS_COUNT};
