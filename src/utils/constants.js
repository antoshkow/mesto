//массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Челябинская область'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Камчатка'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Холмогорский район'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал'
  }
];

//конфигурация валидации
const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//объявляем переменные (4 спринт)
const showPopupBtn = document.querySelector('#show-popup');
const closePopupBtn = document.querySelector('#close-popup');
const popup = document.querySelector('.popup_profile');
const popupName = document.querySelector('#popup-name');
const popupDescription = document.querySelector('#popup-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupContainer = document.querySelector('.popup__container');

//объявляем переменные (5 спринт)
const cardsContainer = document.querySelector('.elements');
const cardsPopup = document.querySelector('.popup_add');
const cardsNameInput = document.querySelector('#popup-add-name');
const cardsLinkInput = document.querySelector('#popup-photo-link');
const showCardsPopupBtn = document.querySelector('#show-cards-popup');
const closeCardsPopupBtn = document.querySelector('#close-cards-popup');
const cardsPopupContainer = document.querySelector('.popup__container_add');
const templateElement = document.querySelector('.template');
const lightboxPopup = document.querySelector('.popup_lightbox');
const closeLightboxPopupBtn = document.querySelector('#close-lightbox-popup');
const lightboxImg = document.querySelector('.popup__photo');
const lightboxFigcap = document.querySelector('.popup__figcaption');

//объявляем переменные (6 спринт)
const page = document.querySelector('.page');
const submitButton = document.querySelector('#popup-add-submit-button');

//оъявляем переменные (9 спринт)
const submitPopupSelector = document.querySelector('.popup_confirm');
const avatarPopupSelector = document.querySelector('.popup_avatar');
const editAvatar = document.querySelector('.profile__overlay');
const avatarImg = document.querySelector('.profile__avatar');
const avatarInput = document.querySelector('#popup-avatar-link');

export { lightboxPopup, cardsPopup, validationConfig, popup, profileName, profileDescription, cardsContainer, showPopupBtn, showCardsPopupBtn, initialCards, cardsNameInput, cardsLinkInput, popupName, popupDescription, submitPopupSelector, avatarPopupSelector, editAvatar, avatarImg, avatarInput, lightboxImg, lightboxFigcap };
