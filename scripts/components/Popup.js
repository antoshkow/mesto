export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this.close = this.close.bind(this);
  }

  open() {
    //открытие поп-апа
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('click', this._handleOverlayClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    //закрытие поп-апа
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('click', this._handleOverlayClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleOverlayClose = (evt) => {
    //логика закрытия поп-апа кликом на оверлей
    if (evt.target.classList.contains('popup_opened')) this.close();
  }

  _handleEscClose = (evt) => {
    //логика закрытия поп-апа клавишей esc
    if (evt.key === 'Escape') this.close();
  }

  setEventListeners() {
    //добавляет слушатель клика иконке закрытия поп-апа
    const closePopupBtn = this._popup.querySelector('.popup__close');
    closePopupBtn.addEventListener('click', this.close);
  }
}
