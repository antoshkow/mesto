import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { lightboxPopup, cardsPopup, validationConfig, popup, profileName, profileDescription, cardsContainer, showPopupBtn, showCardsPopupBtn, initialCards, cardsNameInput, cardsLinkInput, popupName, popupDescription } from '../utils/constants.js';

const addValidator = new FormValidator(validationConfig, cardsPopup);
const profileValidator = new FormValidator(validationConfig, popup);
const userInfo = new UserInfo({ name: profileName, bio: profileDescription });
const imagePopup = new PopupWithImage(lightboxPopup);
const profilePopup = new PopupWithForm(popup, () => {
  userInfo.setUserInfo({
    name: popupName.value,
    bio: popupDescription.value
  });
  profilePopup.close();
});
const addPopup = new PopupWithForm(cardsPopup, () => {
  const newCard = createCard({
    name: cardsNameInput.value,
    link: cardsLinkInput.value
  });
  cardList.addItem(newCard);
  addPopup.close();
});

//запуск валидации
addValidator.enableValidation();

profileValidator.enableValidation();

//функция создания карточки
const createCard = (cardsData) => {
  //создаем экземпляр карточки
  const card = new Card(cardsData, '.template_type_default', imagePopup);
  //возвращаем наружу
  const cardElement = card.generateCard();

  return cardElement;
};

//добавляем карточки "из коробки"
const cardList = new Section({
  items: initialCards,
  renderer: (cardsData) => {
    const newCard = createCard(cardsData, '.template_type_default', imagePopup);

    cardList.addItem(newCard);
  }
},
cardsContainer
);

//отрисовываем карточки на страницу
cardList.renderItems();

//добавляем 'слушатели'
showPopupBtn.addEventListener('click', () => {
  profilePopup.open();
  profilePopup.setEventListeners();
  const newUserData = userInfo.getUserInfo();
  popupName.value = newUserData.name;
  popupDescription.value = newUserData.bio;
  profileValidator.deletePopupErrors();
  profileValidator.toggleButtonState();
});

showCardsPopupBtn.addEventListener('click', () => {
  addPopup.open();
  addPopup.setEventListeners();
  addValidator.toggleButtonState();
  addValidator.deletePopupErrors();
});
