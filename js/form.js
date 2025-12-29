'use strict';
import { sendData } from './api.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const showMessage = (templateId, onCloseCallback) => {
  const template = document.querySelector(`#${templateId}`);
  if (!template) {
    return;
  }

  const message = template.content.querySelector(`.${templateId}`).cloneNode(true);
  const closeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
    if (onCloseCallback) {
      onCloseCallback();
    }
  };

  const onCloseButtonClick = () => closeMessage();
  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };
  const onDocumentClick = (evt) => {
    if (!message.contains(evt.target)) {
      closeMessage();
    }
  };

  message.querySelector(`.${templateId}__button`).addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.appendChild(message);
};

const validateHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/);
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  if (hashtags.length > 5) {
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const tag = hashtags[i];

    if (!hashtagRegex.test(tag)) {
      return false;
    }

    if (hashtags.indexOf(tag) !== i) {
      return false;
    }
  }

  return true;
};

const getHashtagErrorMessage = (value) => {
  if (value.trim() === '') {
    return '';
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/);

  if (hashtags.length > 5) {
    return 'Не более 5 хэш-тегов';
  }

  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  for (let i = 0; i < hashtags.length; i++) {
    const tag = hashtags[i];

    if (!hashtagRegex.test(tag)) {
      if (tag.length > 20) {
        return 'Хэш-тег не более 20 символов';
      }
      if (!tag.startsWith('#')) {
        return 'Хэш-тег должен начинаться с #';
      }
      if (tag === '#') {
        return 'Хэш-тег не может состоять только из #';
      }
      if (tag.includes(' ')) {
        return 'Хэш-теги разделяются пробелами';
      }
      return 'Недопустимые символы в хэш-теге';
    }

    if (hashtags.indexOf(tag) !== i) {
      return 'Хэш-теги не должны повторяться';
    }
  }

  return '';
};

const validateComment = (value) => {
  return value.length <= 140;
};

export const initForm = () => {
  const uploadForm = document.querySelector('#upload-select-image');
  const uploadInput = document.querySelector('#upload-file');
  const uploadOverlay = document.querySelector('.img-upload__overlay');
  const uploadCancel = document.querySelector('#upload-cancel');
  const hashtagInput = document.querySelector('.text__hashtags');
  const commentInput = document.querySelector('.text__description');
  const submitButton = uploadForm.querySelector('.img-upload__submit');
  const previewImage = document.querySelector('.img-upload__preview img');

  if (!uploadForm || !uploadInput || !uploadOverlay || !uploadCancel || !hashtagInput || !commentInput || !submitButton || !previewImage) {
    return;
  }

  const showUploadedImage = () => {
    const file = uploadInput.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        previewImage.src = event.target.result;

        const effectPreviews = document.querySelectorAll('.effects__preview');
        effectPreviews.forEach((preview) => {
          preview.style.backgroundImage = `url(${event.target.result})`;
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__error'
  });

  const showUploadForm = () => {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    showUploadedImage();
  };

  const closeUploadForm = () => {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadForm.reset();
    uploadInput.value = '';
    pristine.reset();

    previewImage.src = 'img/upload-default-image.jpg';

    const effectPreviews = document.querySelectorAll('.effects__preview');
    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = '';
    });

    uploadForm.dispatchEvent(new Event('reset'));
  };

  uploadInput.addEventListener('change', showUploadForm);
  uploadCancel.addEventListener('click', closeUploadForm);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !uploadOverlay.classList.contains('hidden')) {
      if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
        return;
      }
      closeUploadForm();
    }
  });

  pristine.addValidator(
    hashtagInput,
    validateHashtags,
    getHashtagErrorMessage
  );

  pristine.addValidator(
    commentInput,
    validateComment,
    'Комментарий не должен превышать 140 символов'
  );

  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (!isValid) {
      return;
    }

    const originalText = submitButton.textContent;
    submitButton.textContent = SubmitButtonText.SENDING;
    submitButton.disabled = true;

    try {
      const formData = new FormData(uploadForm);
      await sendData(formData);

      closeUploadForm();
      showMessage('success');
    } catch {
      showMessage('error');
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });

  hashtagInput.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });

  commentInput.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
};
