'use stict'

const PHOTOS_COUNT = 26;
const TOTAL_PHOTOS = 6;
const MAX_SIZE_COMMENTS = 4;

function getRandomNumber (min, max) {
  if ((typeof min) == 'number' && (typeof max) == 'number') {
    if (min == Math.floor(min) && max == Math.floor(max)) {
      if (min < max && min >= 0 && max >= 0) {
        return Math.floor(min + Math.random() * (max + 1 - min));
      }
    }
  }
  return 0;
}

function lengthStringCheck (string, maxStringSize) {
  if ((typeof string) == 'string' && (typeof maxStringSize) == 'number') {
    return (string.length < maxStringSize);
  }
  return false;
}

getRandomNumber();
lengthStringCheck();

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


function getRandomElement (array) {
  let element = getRandomNumber(0, array.length - 1);
  return array[element];
}

function createComments () {
  let fullCommentsArray = [];
  let singlePhotoComments = [];
  let startNumber = 70;
  let randomSizeComment = getRandomNumber(1, MAX_SIZE_COMMENTS);

  for (let i = 1; i <= randomSizeComment; i++) {
    startNumber += 10;
    let randomImgNumber = getRandomNumber(1, TOTAL_PHOTOS);
    let avatarUrl = 'img/avatar-' + randomImgNumber;

    let comment = {
      id: i,
      avatar: avatarUrl,
      message: getRandomElement(messageArray),
      name: getRandomElement(commentatorNames),
    };

    singlePhotoComments.push(comment);
  }
  fullCommentsArray.push(singlePhotoComments);

  return fullCommentsArray;
}

createComments();

function generatePhotos () {
  let generatedObject = [];
  for (let i = 1; i < PHOTOS_COUNT; i++) {
    let urlValue = 'photos/' + [i];
    let randomLikes = getRandomNumber(15, 200);

    let object = {
      id: Number([i]),
      url: urlValue,
      description: descriptionPhotos[i - 1],
      likes: randomLikes,
      comments: createComments(),
    };
    generatedObject.push(object);
  }
  return generatedObject;
}

generatePhotos();
