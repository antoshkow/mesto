export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  };

  //проверка валидности инпутов
  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  };

  //переключаем состояние кнопки
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    };
  };

  //выводим ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  //убираем ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  //проверяем состояние поля (валидность)
  _checkInput(inputElement) {
    if (!inputElement.validity.valid) {
      //выводим ошибку
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      //скрываем ошибку
      this._hideInputError(inputElement);
    };
  };

  //вешаем слушатели событий
  _setInputListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', (evt) => {
        //проверяем состояние поля (валидность)
        this._checkInput(inputElement);
        //переключаем состояние кнопки
        this.toggleButtonState();
      });

      this.toggleButtonState();
      });
  };

  //сброс ошибок полей перед открытием попапа
  deletePopupErrors() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  };

  enableValidation() {
    //вешаем слушатели
    this._setInputListeners();
  };
};
