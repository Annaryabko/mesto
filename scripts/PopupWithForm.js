import { Popup } from "./Popup.js";
import { FormValidator } from "./FormValidator.js";

const config = {
    formSelector: '.popup__inputs',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_type_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorMessageSelector: '.popup__input-error',
    errorClass: 'popup__input-error_active'
};

export class PopupWithForm extends Popup {
    constructor(selector, submitHandler) {
        super(selector);
        this._submitHandler = submitHandler;
        this._validator = new FormValidator(config, this._element);

        this._validator.enableValidation();
    }

    open(data) {
        super.open();
        this._setInputValues(data);
    }

    _getInputValues() {
        const result = {};
        Array.from(this._element.querySelectorAll('.popup__input')).forEach((input) => {
            result[input.name] = input.value;
        });
        return result;
    }

    _setInputValues(data) {
        Object.keys(data).forEach((key) => {
            const value = data[key];

            this._element.querySelector(`.popup__input[name="${key}"]`).value = value;
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._element.querySelector('.popup__inputs').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._element.querySelector('.popup__inputs').reset();
        this._validator.resetForm();
    }
}