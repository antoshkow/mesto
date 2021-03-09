//данные карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//объявляем переменные (4 спринт)
let showPopupBtn = document.querySelector('#show-popup');
let closePopupBtn = document.querySelector('#close-popup');
let popup = document.querySelector('.popup');
let popupName = document.querySelector('#popup-name');
let popupDescription = document.querySelector('#popup-description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupContainer = document.querySelector('.popup__container');

//объявляем переменные (5 спринт)
let cardsContainer = document.querySelector('.elements');
let cardsPopup = document.querySelector('.popup_add');
let cardsNameInput = document.querySelector('#popup-add-name');
let cardsLinkInput = document.querySelector('#popup-photo-link');
let showCardsPopupBtn = document.querySelector('#show-cards-popup');
let closeCardsPopupBtn = document.querySelector('#close-cards-popup');
let cardsPopupContainer = document.querySelector('.popup__container_add');
let templateElement = document.querySelector('.template');

//функции открытия/закрытия поп-апа, сохранения формы
function openPopupWindow() {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}

function closePopupWindow() {
  popup.classList.remove('popup_opened');
}

function editPopup(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;

  closePopupWindow();
}

//6 карточек 'из коробки'
function createCardsDomNode(element) {
  const newElement = templateElement.content.cloneNode(true);
  const elementTitle = newElement.querySelector('.element__title');
  elementTitle.textContent = element.name;
  const elementImg = newElement.querySelector('.element__img');
  elementImg.src = element.link;

  return newElement;
}

function renderList() {
  let result = initialCards.map(function(element) {
    const newCard = createCardsDomNode(element);
    addCardListeners(newCard);
    return newCard;
  });

  cardsContainer.append(...result);
}

renderList();

//функции открытия/закрытия поп-апа добавления карточек и само добавление
function openCardsPopup() {
  cardsPopup.classList.add('popup_opened');
}

function closeCardsPopup() {
  cardsPopup.classList.remove('popup_opened');
}

function addCard(evt) {
  evt.preventDefault();
  const cardsName = cardsNameInput.value;
  const cardsLink = cardsLinkInput.value;
  const newCard = createCardsDomNode(
    {
      name: cardsName,
      link: cardsLink
    });

  addCardListeners(newCard);

  cardsContainer.prepend(newCard);

  closeCardsPopup();
}

//лайк/удаление карточки
function addCardListeners(newCard) {
  const cardsLikeBtn = newCard.querySelector('.element__like');
  const cardsDeleteBtn = newCard.querySelector('.element__trash');
  cardsLikeBtn.addEventListener('click', likeCard);
  cardsDeleteBtn.addEventListener('click', deleteCard);
}

function likeCard(evt) {
  evt.target.classList.toggle('element__like_status_active');
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

//добавляем 'слушатели'
showPopupBtn.addEventListener('click', openPopupWindow);
closePopupBtn.addEventListener('click', closePopupWindow);
popupContainer.addEventListener('submit', editPopup);
showCardsPopupBtn.addEventListener('click', openCardsPopup);
closeCardsPopupBtn.addEventListener('click', closeCardsPopup);
cardsPopupContainer.addEventListener('submit', addCard);

