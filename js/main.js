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

const messageRandomizer = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const commentatorNames = ['Иван', 'Борис', 'Иезекииль', 'Василий', 'Оксана', 'Ксения', 'Александр', 'Александра', 'Иероним',
  'Сократ', 'Платон', 'Август', 'Валерий', 'Валерия', 'Алиса', 'Полина', 'Алёна'];

let i, j;
let generatedObject = [];
let singlePhotoComments = [];
let fullCommentsArray = [];

function createCommentsMassive () {
  let startNumber = 70;
  for (j = 0; j < 25; j++) {
    let randomSizeComment = getRandomNumber(1, 4);
    for (i = 1; i <= randomSizeComment; i++) {
      let randomIdGenerator = getRandomNumber(startNumber, startNumber + 10);
      startNumber += 10;
      let randomImgNumber = getRandomNumber(1, 6);
      let randomMessage = getRandomNumber(0, 5);
      let randomName = getRandomNumber(0, commentatorNames.length - 1);
      let avatarUrl = 'img/avatar-' + randomImgNumber;

      singlePhotoComments[i] = {
        id: randomIdGenerator,
        avatar: avatarUrl,
        message: messageRandomizer[randomMessage],
        name: commentatorNames[randomName],
      };
    }
    fullCommentsArray[j] = JSON.parse(JSON.stringify(singlePhotoComments));
    singlePhotoComments.length = 0;
  }
}

createCommentsMassive();

function createMassiveDescription () {
  for (i = 1; i < 26; i++) {
    let urlValue = 'photos/' + [i];
    let randomLikes = getRandomNumber(15, 200);

    generatedObject[i] = {
      id: Number([i]),
      url: urlValue,
      description: descriptionPhotos[i - 1],
      likes: randomLikes,
      comments: fullCommentsArray[i],
    };
  }
}

createMassiveDescription();
