export default class Card {
  constructor({ userData, likes, _id, name, link, owner }, cardSelector, handleCardClick, deleteCard, likeHandler, unlikeHandler) {
    this._myId = userData._id;
    this._likes = likes;
    this._cardId = _id;
    this._name = name;
    this._link = link;
    this._ownerId = owner._id;
    this._cardSelector = cardSelector;
    //открывает попап с картинкой при клике на карточку
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
    this._likeHandler = likeHandler;
    this._unlikeHandler = unlikeHandler;
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

  _generateCard() {
    this._element = this._getTemplate();
    //добавим обработчики
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__img').alt = this._name;

    //обрабатываем лайка
    this._element.querySelector('.element__counter').textContent = this._likes.length;
    this._likes.forEach((like) => {
      if(like._id === this._myId) {
        this._element.querySelector('.element__like').classList.add('element__like_status_active');
      }
    });

    //обрабатываем корзину
    if(this._ownerId !== this._myId) {
        this._element.querySelector('.element__trash').remove();
    }

    this._setEventListeners();
    return this._element;
  }

  //добавляем слушатели
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      if(this._element.querySelector('.element__like').classList.contains('element__like_status_active')) {
        this._unlikeHandler(this._cardId);
      } else {
        this._likeHandler(this._cardId);
      }
    });

    if(this._ownerId === this._myId) {
      this._element.querySelector('.element__trash').addEventListener('click', () => {
        this._deleteCard(this._cardId);
      });
    }

    const cardImage = this._element.querySelector('.element__img');
    const cardTitle = this._element.querySelector('.element__title');
    cardImage.addEventListener('click', () => {
      this._handleCardClick.open(cardImage, cardTitle);
      this._handleCardClick.setEventListeners();
    });
  }

  getCard() {
    return this._generateCard();
  }
}
