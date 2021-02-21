let showPopup = document.querySelector('#show-popup');
let closePopup = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

showPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);

document.querySelector('.popup__container').addEventListener('submit', function (event) {
  event.preventDefault();
  document.querySelector('.profile__name').textContent = document.querySelector('#popup-name').value;
  document.querySelector('.profile__description').textContent = document.querySelector('#popup-description').value;
});

