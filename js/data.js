import {getRandomInteger, getRandomArrayElement} from './util.js';

const Names = ['Иван', 'Мария', 'Алексей', 'Ольга', 'Дмитрий', 'Екатерина', 'Сергей', 'Анна'];

const Messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const Descriptions = [
  'Закат, море, спокойствие - все, что нужно для счастья.',
  'Лето, солнце, море - идеальный рецепт для отличного настроения!',
  'Путешествие - это жизнь, а жизнь - это приключение!',
  'Небо, облака, свобода - все это отражает мою душу.',
  'Улыбка, радость, позитив - вот что я хочу видеть на своих фотографиях.',
  'Камера, свет, момент - поймать мгновение и сохранить его навсегда.',
  'Фотография - это не просто картинка, это история, которую она рассказывает.',
  'Красота в деталях, а детали создают шедевр.',
  'Простое удовольствие от жизни - смотреть на мир сквозь объектив.',
  'Момент, запечатленный на пленке, - это кусочек вечности.'
];

const MaxObject = 25;

const similarObject = [];
const usedIds = new Set();
let commentIdCounter = 1;

while (similarObject.length < MaxObject) {
  const newId = getRandomInteger(1, MaxObject);

  if (!usedIds.has(newId)) {
    usedIds.add(newId);

    const commentCount = getRandomInteger(0, 30);
    const comments = [];

    for (let i = 0; i < commentCount; i++) {
      comments.push({
        id: commentIdCounter++,
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: `${getRandomArrayElement(Messages)} ${getRandomInteger(0, 1) === 1 ? getRandomArrayElement(Messages) : ''}`,
        name: getRandomArrayElement(Names),
      });
    }

    similarObject.push({
      id: newId,
      url: `img/avatar-${newId}.svg`,
      description: getRandomArrayElement(Descriptions),
      coments: comments,
      likes: getRandomInteger(15, 1000),
      name: getRandomArrayElement(Names)
    });
  }
}

export { similarObject };
