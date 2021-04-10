import { openPopup } from './index.js';

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
  };

  //получаем разметку из темплейта
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  };

  //метод, добавляющий данные в разметку
  generateCard() {
    this._element = this._getTemplate();
    //добавим обработчики
    this._setEventListeners();

    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__img').alt = this._alt;

    return this._element;
  };

  //лайтбокс попап
  _handleImageClick() {
    lightboxImg.src = this._link;
    lightboxImg.alt = this._alt;
    lightboxFigcap.textContent = this._name;

    openPopup(lightboxPopup);
  };

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
    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleImageClick();
    });
  };
};
