import { getRandomArrayElement, getRandomInteger } from './util.js';

const NAMES = [
  'Иван',
  'Мария',
  'Алексей',
  'Ольга',
  'Дмитрий',
  'Екатерина',
  'Сергей',
  'Анна',
];

const MESSAGES = [
  'Всё отлично',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Закат, море, спокойствие - все, что нужно для счастья.',
  'Лето, солнце, море - идеальный рецепт для отличного настроения!',
  'Путешествие - это жизнь, а жизнь - это приключение!',
  'Небо, облака, свобода - все это отражает мою душу.',
  'Улыбка, радость, позитив - вот что я хочу видеть на своих фотографиях.',
  'Камера, свет, момент - поймать мгновение и сохранить его навсегда.',
  'Фотография - это не просто картинка, это история, которую она рассказывает.',
  'Красота в деталях, а детали создают шедевр.',
  'Простое удовольствие от жизни - смотреть на мир сквозь объектив.',
  'Момент, запечатленный на пленке, - это кусочек вечности',
];

export const GET_DATA_LINK = 'https://32.javascript.htmlacademy.pro/kekstagram/data';
export const SEND_DATA_LINK = 'https://32.javascript.htmlacademy.pro/kekstagram/ ';

export const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const MAX_OBJECTS = 24;

const similarObjects = [];

let commentIdCounter = 1;

let similarObjectIdCounter = 1;

for (let i = 0; i < MAX_OBJECTS; i++) {
  const commentCount = getRandomInteger(0, 30);
  const comments = [];
  for (let j = 0; j < commentCount; j++) {
    comments.push({
      id: commentIdCounter++,
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: `${getRandomArrayElement(MESSAGES)} ${getRandomInteger(0, 1) === 1 ? getRandomArrayElement(MESSAGES) : ''}`,
      name: getRandomArrayElement(NAMES),
    });
  }

  similarObjects.push({
    id: similarObjectIdCounter++, // порядковый ID для объекта
    url: `photos/${similarObjectIdCounter}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    comments: comments,
    likes: getRandomInteger(15, 1000),
    name: getRandomArrayElement(NAMES),
    dataId: `data-${similarObjectIdCounter}`,
  });
}

export function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

