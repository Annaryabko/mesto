export class FormValidator {
    _config;
    _form;

    constructor(config, form) {
        this._config = config;
        this._form = form;
    }

    enableValidation () {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    };

    _setEventListeners () {
        const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));

        inputList.forEach((inputElement) => {
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
        const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
        const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._config.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._config.inactiveButtonClass);
            buttonElement.disabled = false;
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
        const button = this._form.querySelector(this._config.submitButtonSelector);

        button.disabled = true;
        button.classList.add(this._config.inactiveButtonClass);
        Array.from(this._form.querySelectorAll(this._config.inputSelector)).forEach((inputElement) => {
            inputElement.classList.remove(this._config.inputErrorClass);
        });
        Array.from(this._form.querySelectorAll(this._config.errorMessageSelector)).forEach((inputElement) => {
            inputElement.classList.remove(this._config.errorClass);
            inputElement.innerHTML = '';
        });
    }
}