export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  };

  //проверка валидности инпутов
  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  };

  //переключаем состояние кнопки
  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    };
  };

  //выводим ошибку
  _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  //убираем ошибку
  _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  //проверяем состояние поля (валидность)
  _checkInput(formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
      //выводим ошибку
      this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      //скрываем ошибку
      this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    };
  };

  //вешаем слушатели событий
  _setInputListeners(formElement, inputSelector, submitButtonSelector) {
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', (evt) => {
        //проверяем состояние поля (валидность)
        this._checkInput(formElement, inputElement);
        //переключаем состояние кнопки
        this._toggleButtonState(inputList, buttonElement);
      });

      this._toggleButtonState(inputList, buttonElement);
      });
  };

  enableValidation() {
    //вешаем слушатели
    this._setInputListeners();
  };
};
