//объявляем переменные (4 спринт)
const showPopupBtn = document.querySelector('#show-popup');
const closePopupBtn = document.querySelector('#close-popup');
const popup = document.querySelector('.popup');
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

//открытие/закрытие поп-апов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//сохранение попапа имени
function openPopupWindow() {
  openPopup(popup);
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}

function editPopup(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;

  closePopup(popup);
}

//6 карточек 'из коробки'
function createCardsDomNode(element) {
  const newElement = templateElement.content.cloneNode(true);
  const elementTitle = newElement.querySelector('.element__title');
  const likeButton = newElement.querySelector('.element__like');
  const DeleteButton = newElement.querySelector('.element__trash');
  const cardImage = newElement.querySelector('.element__img');

  elementTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.alt;

  likeButton.addEventListener('click', likeCard);
  DeleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', function(evt) {
    openPopup(lightboxPopup);
    lightboxImg.src = cardImage.src;
    lightboxImg.alt = cardImage.alt;
    lightboxFigcap.textContent = elementTitle.textContent});

  return newElement;
}

function renderList() {
  const sixCards = initialCards.map(function(element) {
    const newCard = createCardsDomNode(element);

    return newCard;
  });

  cardsContainer.append(...sixCards);
}

renderList();

//добавление карточек
function addCard(evt) {
  evt.preventDefault();
  const cardsName = cardsNameInput.value;
  const cardsLink = cardsLinkInput.value;
  const newCard = createCardsDomNode(
    {
      name: cardsName,
      link: cardsLink
    });

  cardsContainer.prepend(newCard);

  cardsPopupContainer.reset();

  closePopup(cardsPopup);
}

//лайк/удаление карточки
function likeCard(evt) {
  evt.target.classList.toggle('element__like_status_active');
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

//добавляем 'слушатели'
showPopupBtn.addEventListener('click', openPopupWindow);
closePopupBtn.addEventListener('click', function() { closePopup(popup) });
popupContainer.addEventListener('submit', editPopup);
showCardsPopupBtn.addEventListener('click', function() { openPopup(cardsPopup) });
closeCardsPopupBtn.addEventListener('click', function() { closePopup(cardsPopup) });
cardsPopupContainer.addEventListener('submit', addCard);
closeLightboxPopupBtn.addEventListener('click', function() { closePopup(lightboxPopup) });
