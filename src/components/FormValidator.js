export class FormValidator {
    _config;
    _form;

    constructor(config, formSelector) {
        this._config = config;
        this._form = document.querySelector(formSelector);
        this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._errorList = Array.from(this._form.querySelectorAll(this._config.errorMessageSelector))

    }

    enableValidation () {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    };

    _setEventListeners () {

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
            this._toggleButtonState();
        });
    }

    //проверка поля на валидность
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    //показать ошибку  
    _showInputError (inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._config.errorClass);
    };
        
    //скрыть ошибку
    _hideInputError (inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._config.errorClass);
    };

    //состояние кнопки
    _toggleButtonState () {
        
        if (this._hasInvalidInput(this._inputList)) {
            this._submitButton.classList.add(this._config.inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    };

    //поиск неверного инпута
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    //general reset
    resetForm() {
        this._submitButton.disabled = true;
        this._submitButton.classList.add(this._config.inactiveButtonClass);
        this._inputList.forEach((inputElement) => {
            inputElement.classList.remove(this._config.inputErrorClass);
        });
        this._errorList.forEach((inputElement) => {
            inputElement.classList.remove(this._config.errorClass);
            inputElement.innerHTML = '';
        });
    }
}