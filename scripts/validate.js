//general reset

function resetForm(form) {
    form.querySelector('.popup__button').disabled = true;
    form.querySelector('.popup__button').classList.add('popup__button_type_inactive');
    Array.from(form.querySelectorAll('.popup__input')).forEach((inputElement) => {
      inputElement.classList.remove('popup__input_type_error');
    });
    Array.from(form.querySelectorAll('.popup__input-error')).forEach((inputElement) => {
      inputElement.classList.remove('popup__input-error_active');
      inputElement.innerHTML = '';
    });
  }
  



//поиск неверного инпута
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

//состояние кнопки
const toggleButtonState = (config, formElement) => {
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled=true;
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled=false;
    }
};

//показать ошибку  
const showInputError = (config, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

//скрыть ошибку
const hideInputError = (config, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

//проверка поля на валидность
const checkInputValidity = (config, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(config, formElement, inputElement);
    }
};

//перебор всех инпутов формы
const setEventListeners = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(config, formElement, inputElement);
            toggleButtonState(config, formElement);
        });
        toggleButtonState(config, formElement);
    });
};

//вызов функции обработчика для каждой формы
function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        
        setEventListeners(config, formElement);
    });
};