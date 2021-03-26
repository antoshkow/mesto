const obj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const allInputsEmpty = (inputList) => {
  return !inputList.some(inputElement =>
  inputElement.value.length > 0);
};

//проверка валидности инпутов
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

//переключаем состояние кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList) || allInputsEmpty(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};

//выводим ошибку
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//убираем ошибку
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//проверяем состояние поля (валидность)
const checkInput = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    //выводим ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    //скрываем ошибку
     hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  };
};

//вешаем слушатели событий
const setInputListeners = (formElement, inputSelector, inactiveButtonClass, submitButtonSelector, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (evt) => {
      //проверяем состояние поля (валидность)
      checkInput(formElement, inputElement, inputErrorClass, errorClass);
      //переключаем состояние кнопки
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  });
};

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    //вешаем слушатели
    setInputListeners(formElement, inputSelector, inactiveButtonClass, submitButtonSelector, inputErrorClass, errorClass);
  });
};

enableValidation(obj);
