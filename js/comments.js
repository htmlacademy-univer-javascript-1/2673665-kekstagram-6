'use strict';
import { getRandomInteger } from './utils.js';
import { MESSAGES, NAMES } from './data.js';


export const createComment = () => {
  const messageCount = getRandomInteger(1, 2);
  let messageText = '';

  for (let i = 0; i < messageCount; i++) {
    const randomIndex = getRandomInteger(0, MESSAGES.length - 1);
    if (i > 0) {
      messageText += ' ';
    }
    messageText += MESSAGES[randomIndex];
  }

  return {
    id: getRandomInteger(1, 25),
    message: messageText,
    name: NAMES[getRandomInteger(0, NAMES.length - 1)]
  };
};
