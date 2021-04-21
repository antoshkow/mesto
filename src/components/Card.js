export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
    //открывает попап с картинкой при клике на карточку
    this._handleCardClick = handleCardClick;
  }

  //получаем разметку из темплейта
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  //метод, добавляющий данные в разметку
  generateCard() {
    this._element = this._getTemplate();
    //добавим обработчики
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__img').alt = this._alt;

    this._setEventListeners();

    return this._element;
  }

  //лайк карточки
  _likeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_status_active');
  }

  //удаление карточки
  _deleteCard() {
    this._element.querySelector('.element__trash').closest('.element').remove();
  }

  //добавляем слушатели
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._deleteCard();
    });
    const cardImage = this._element.querySelector('.element__img');
    const cardTitle = this._element.querySelector('.element__title');
    cardImage.addEventListener('click', () => {
      this._handleCardClick.open(cardImage, cardTitle);
      this._handleCardClick.setEventListeners();
    });
  }
}
