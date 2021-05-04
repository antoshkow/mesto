import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { lightboxPopup, cardsPopup, validationConfig, popup, profileName, profileDescription, cardsContainer, showPopupBtn, showCardsPopupBtn, cardsNameInput, cardsLinkInput, popupName, popupDescription, submitPopupSelector, avatarPopupSelector, editAvatar, avatarImg, avatarInput } from '../utils/constants.js';

const userInfo = new UserInfo({ name: profileName, about: profileDescription, avatar: avatarImg });

const addValidator = new FormValidator(validationConfig, cardsPopup);
const profileValidator = new FormValidator(validationConfig, popup);
const avatarValidator = new FormValidator(validationConfig, avatarPopupSelector);

const imagePopup = new PopupWithImage(lightboxPopup);
const submitPopup = new PopupWithSubmit(submitPopupSelector)
submitPopup.setEventListeners();

const cardList = new Section(cardsContainer);

//api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: 'f40da8e2-13aa-4e11-a1ca-3b87795cc968',
    'Content-Type': 'application/json'
  }
});

//загрузка информации о пользователе с сервера
Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    userInfo.updateAvatar(userData);
    //функция создания карточки
    const createCard = (cardsData) => {
    //создаем экземпляр карточки
    const card = new Card({ userData, ...cardsData },
      '.template_type_default',
      imagePopup,
      //коллбэк удаления карточки
      function deleteCard(cardId) {
        submitPopup.open();
        submitPopup.setSubmitAction(() => {

          api.deleteCard(cardId)
            .then(() => submitPopup.close())
            .then(() => cardElement.remove())
            .catch((err) => {
             console.log(err)
           });
       });
      },
      //коллбэк лайка карточки
      function setLike(cardId) {
        api.like(cardId)
          .then((data) => {
            cardElement.querySelector('.element__counter').textContent = data.likes.length;
            cardElement.querySelector('.element__like').classList.toggle('element__like_status_active')
          })
          .catch((err) => {
            console.log(err)
          });
      },
      //коллбэк снятия лайка
      function removeLike(cardId) {
        api.unlike(cardId)
          .then((data) => {
          cardElement.querySelector('.element__counter').textContent = data.likes.length;
          cardElement.querySelector('.element__like').classList.toggle('element__like_status_active')
          })
          .catch((err) => {
            console.log(err)
          });
      }
    );
    //возвращаем наружу
    const cardElement = card.getCard();

    return cardElement;
    }
        //отрисовываем карточки на страницу
        cardList.renderItems({
          items: cardsData.reverse(),
          renderer: (item) => {
            const newCard = createCard(item);
            cardList.addItem(newCard);
          }
        });
    //3. Редактирование профиля
    const editProfilePopup = new PopupWithForm(popup, (userData) => {
      const saveLoading = popup.querySelector('.popup__submit-button');
      saveLoading.textContent = 'Сохранение...';
      api.editProfile({
        name: popupName.value,
        about: popupDescription.value
      })
        .then((res) => {
          saveLoading.textContent = 'Сохранить';
          userInfo.setUserInfo({
            name: popupName.value,
            about: popupDescription.value
          });
          editProfilePopup.close();
        })
        .catch((err) => {
          console.log(err)
        });
    });
    //4. Добавление новой карточки
    const addPopup = new PopupWithForm(cardsPopup, (cardsData) => {
      const saveLoading = cardsPopup.querySelector('.popup__submit-button')
      saveLoading.textContent = 'Сохранение...';
      api.addNewCard({
        name: cardsNameInput.value,
        link: cardsLinkInput.value
      })
        .then((data) => {
          saveLoading.textContent = 'Создать';
          const newCard = createCard(data);
          cardList.addItem(newCard);
          addPopup.close()
        })
        .catch((err) => {
          console.log(err)
        });
    });
    //9. Обновление аватара пользователя
    const avatarPopup = new PopupWithForm(avatarPopupSelector, (userData) => {
      const saveLoading = cardsPopup.querySelector('.popup__submit-button')
      saveLoading.textContent = 'Сохранение...';
      api.updateAvatar({ avatar: avatarInput.value })
        .then((data) => {
          saveLoading.textContent = 'Сохранить';
          avatarImg.src = data.avatar;
          avatarPopup.close();
        })
        .catch((err) => {
          console.log(err)
        });
    });
    //запуск валидации
    addValidator.enableValidation();
    profileValidator.enableValidation();
    avatarValidator.enableValidation();
    //добавляем 'слушатели'
    showPopupBtn.addEventListener('click', () => {
      editProfilePopup.open();
      editProfilePopup.setEventListeners();
      const userData = userInfo.getUserInfo();
      popupName.value = userData.name;
      popupDescription.value = userData.about;
      profileValidator.deletePopupErrors();
      profileValidator.toggleButtonState();
    });
    showCardsPopupBtn.addEventListener('click', () => {
      addPopup.open();
      addPopup.setEventListeners();
      addValidator.toggleButtonState();
      addValidator.deletePopupErrors();
    });
    editAvatar.addEventListener('click', () => {
      avatarPopup.open();
      avatarPopup.setEventListeners();
      avatarValidator.deletePopupErrors();
      avatarValidator.toggleButtonState();
    });
});
