import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { lightboxPopup, cardsPopup, validationConfig, popup, profileName, profileDescription, cardsContainer, showPopupBtn, showCardsPopupBtn, cardsNameInput, cardsLinkInput, popupName, popupDescription, submitPopupSelector, avatarPopupSelector, editAvatar, avatarImg, avatarInput, lightboxImg, lightboxFigcap } from '../utils/constants.js';

const userInfo = new UserInfo({ name: profileName, about: profileDescription, avatar: avatarImg });

const addValidator = new FormValidator(validationConfig, cardsPopup);
const profileValidator = new FormValidator(validationConfig, popup);
const avatarValidator = new FormValidator(validationConfig, avatarPopupSelector);

const imagePopup = new PopupWithImage(lightboxPopup, lightboxImg, lightboxFigcap);
const submitPopup = new PopupWithSubmit(submitPopupSelector)
submitPopup.setEventListeners();

//api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: 'f40da8e2-13aa-4e11-a1ca-3b87795cc968',
    'Content-Type': 'application/json'
  }
});

//загрузка информации о пользователе с сервера, рендер карточек и т.д.
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
        //коллбэк вызова попапа с картинкой
        function setLightboxCLick() {
          imagePopup.open(cardsData);
          imagePopup.setEventListeners();
        },
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
              card.updateLikes(data.likes.length);
            })
            .catch((err) => {
              console.log(err)
            });
        },
        //коллбэк снятия лайка
        function removeLike(cardId) {
          api.unlike(cardId)
            .then((data) => {
              card.updateLikes(data.likes.length);
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
    const cardList = new Section( (item) => {
        const newCard = createCard(item);

        cardList.addItem(newCard);
      },
      cardsContainer
    );

    cardList.renderItems(cardsData);
    //редактирование профиля
    const editProfilePopup = new PopupWithForm(popup, (userData) => {
      editProfilePopup.renderLoading('Сохранение...')
      api.editProfile({
        name: userData.name,
        about: userData.description
      })
        .then((res) => {
          editProfilePopup.renderLoading('Сохранить');
          userInfo.setUserInfo({
            name: res.name,
            about: res.about
          });
          editProfilePopup.close();
        })
        .catch((err) => {
          console.log(err);
        });
    });
    editProfilePopup.setEventListeners();
    //добавление новой карточки
    const addPopup = new PopupWithForm(cardsPopup, (cardsData) => {
      addPopup.renderLoading('Сохранение...');
      api.addNewCard({
        name: cardsData['photo-name'],
        link: cardsData['photo-link']
      })
        .then((data) => {
          addPopup.renderLoading('Создать');
          const newCard = createCard(data);
          cardList.addItem(newCard);
          addPopup.close()
        })
        .catch((err) => {
          console.log(err)
        });
    });
    addPopup.setEventListeners();
    //обновление аватара пользователя
    const avatarPopup = new PopupWithForm(avatarPopupSelector, (userData) => {
      avatarPopup.renderLoading('Сохранение...')
      api.updateAvatar({ avatar: userData['avatar-link'] })
        .then((data) => {
          avatarPopup.renderLoading('Сохранить')
          userInfo.updateAvatar({ avatar: data.avatar });
          avatarPopup.close();
        })
        .catch((err) => {
          console.log(err)
        });
    });
    avatarPopup.setEventListeners();
    //запуск валидации
    addValidator.enableValidation();
    profileValidator.enableValidation();
    avatarValidator.enableValidation();
    //добавляем 'слушатели'
    showPopupBtn.addEventListener('click', () => {
      editProfilePopup.open();
      const userData = userInfo.getUserInfo();
      popupName.value = userData.name;
      popupDescription.value = userData.about;
      profileValidator.resetValidation();
    });
    showCardsPopupBtn.addEventListener('click', () => {
      addPopup.open();
      addValidator.resetValidation();
    });
    editAvatar.addEventListener('click', () => {
      avatarPopup.open();
      avatarValidator.resetValidation();
    });
});
