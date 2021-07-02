import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__container');
    this._submitFormHandler = submitFormHandler;
    this._btn = this._popup.querySelector('.popup__submit-button')
  }

  _getInputValues() {
    //собирает данные всех полей формы
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    //еще добавляет обработчик сабмита формы
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitHandler)
  }

  close() {
    //при закрытии попапа форма еще и сбрасывается
    super.close();
    this._form.reset();
  }

  _submitHandler = (evt) => {
    evt.preventDefault();
    this._submitFormHandler(this._getInputValues());
  }

  renderLoading(text) {
    this._btn.textContent = text;
  }
}
