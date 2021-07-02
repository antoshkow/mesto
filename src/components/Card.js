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

    this._cardImage = this._element.querySelector('.element__img');
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardCounter = this._element.querySelector('.element__counter');
    this._likeButton = this._element.querySelector('.element__like');
    this._trashButton = this._element.querySelector('.element__trash');
    //добавим обработчики
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;

    //обрабатываем лайка
    this._cardCounter.textContent = this._likes.length;
    this._likes.forEach((like) => {
      if(like._id === this._myId) {
        this._likeButton.classList.add('element__like_status_active');
      }
    });

    //обрабатываем корзину
    if(this._ownerId !== this._myId) {
        this._trashButton.remove();
    }

    this._setEventListeners();
    return this._element;
  }

  //добавляем слушатели
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if(this._likeButton.classList.contains('element__like_status_active')) {
        this._unlikeHandler(this._cardId);
      } else {
        this._likeHandler(this._cardId);
      }
    });

    if(this._ownerId === this._myId) {
      this._trashButton.addEventListener('click', () => {
        this._deleteCard(this._cardId);
      });
    }

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  getCard() {
    return this._generateCard();
  }

  updateLikes(length) {
    this._cardCounter.textContent = length;
    this._likeButton.classList.toggle('element__like_status_active');
  }
}
