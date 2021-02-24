//объявляем переменные
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
  document.querySelector('.profile__name').textContent = document.querySelector('#popup-name').value;
  document.querySelector('.profile__description').textContent = document.querySelector('#popup-description').value;
  closePopupWindow();
}

//добавляем 'слушатели'
showPopupBtn.addEventListener('click', openPopupWindow);
closePopupBtn.addEventListener('click', closePopupWindow);
popupContainer.addEventListener('submit', editPopup);
