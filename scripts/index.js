import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

export { openPopup, closePopup };

//запуск валидации
const addValidator = new FormValidator(validationConfig, cardsPopup);
addValidator.enableValidation();
const profileValidator = new FormValidator(validationConfig, popup);
profileValidator.enableValidation();

//функция создания карточки
const createCard = (data, cardSelector) => {
  //создаем экземпляр карточки
  const card = new Card(data, cardSelector);
  //возвращаем наружу
  const cardElement = card.generateCard();

  return cardElement;
};

//отрисовываем карточки на страницу
initialCards.map((element) => {
 const newCard = createCard(element, '.template_type_default');
  //добавляем в DOM
  cardsContainer.append(newCard);

  return newCard;
});

//добавление карточек
function addCard(evt) {
  evt.preventDefault();
  const cardsName = cardsNameInput.value;
  const cardsLink = cardsLinkInput.value;
  const newCard = createCard( {
      name: cardsName,
      link: cardsLink
    }, '.template_type_default');

  cardsContainer.prepend(newCard);

  cardsPopupContainer.reset();

  addValidator.toggleButtonState();

  closePopup(cardsPopup);
};

//открытие/закрытие поп-апов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
};

//сохранение попапа имени
function openPopupWindow() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;

  profileValidator.deletePopupErrors();
  profileValidator.toggleButtonState();

  openPopup(popup);
};

function editPopup(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;

  closePopup(popup);
};

//добавляем 'слушатели'
showPopupBtn.addEventListener('click', openPopupWindow);
closePopupBtn.addEventListener('click', function() { closePopup(popup) });
popupContainer.addEventListener('submit', editPopup);
showCardsPopupBtn.addEventListener('click', function() { openPopup(cardsPopup) });
closeCardsPopupBtn.addEventListener('click', function() { closePopup(cardsPopup) });
cardsPopupContainer.addEventListener('submit', addCard);
closeLightboxPopupBtn.addEventListener('click', function() { closePopup(lightboxPopup) });

//закрытие поп-апа кликом на оверлей
page.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
});

//закрытие поп-апа кликом на esc
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const showPopup = document.querySelector('.popup_opened');
    closePopup(showPopup);
  };
};
