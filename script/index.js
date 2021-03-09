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

//объявляем переменные
let cardsContainer = document.querySelector('.elements');
let showPopupBtn = document.querySelector('#show-popup');
let closePopupBtn = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let popupName = document.querySelector('#popup-name');
let popupDescription = document.querySelector('#popup-description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupContainer = document.querySelector('.popup__container');

//объявляем функции открытия/закрытия поп-апа, сохранения формы
function openPopupWindow() {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
}

function closePopupWindow() {
  popup.classList.remove('popup_opened');
}

function editPopup(event) {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopupWindow();
}

//6 карточек 'из коробки'
function renderList() {
  let result = initialCards.map(function(element) {
    return `
      <li class="element">
        <img src="${element.link}" alt="Фото" class="element__img">
        <div class="element__bottom">
          <h2 class="element__title">${element.name}</h2>
          <button type="button" class="element__like"></button>
        </div>
      </li>
      `
  }).join('');
  cardsContainer.insertAdjacentHTML('afterbegin', result);
}

renderList();

//добавляем 'слушатели'
showPopupBtn.addEventListener('click', openPopupWindow);
closePopupBtn.addEventListener('click', closePopupWindow);
popupContainer.addEventListener('submit', editPopup);
