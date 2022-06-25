import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(selector, validator, submitHandler) {
        super(selector);
        this._submitHandler = submitHandler;
        this._validator = validator;
        this._validator.enableValidation();
        this._popupInputs = this._element.querySelectorAll('.popup__input');
        this._popupForm = this._element.querySelector('.popup__inputs');
        this.setEventListeners();
    }

    open(data) {
        super.open();
        if (data) {
            this._setInputValues(data);
        }
    }

    _getInputValues() {
        const result = {};
        Array.from(this._popupInputs).forEach((input) => {
            result[input.name] = input.value;
        });
        return result;
    }

    _setInputValues(data) {
        console.log(data);
        Object.keys(data).forEach((key) => {
            const value = data[key];
            const input = this._element.querySelector(`.popup__input[name="${key}"]`);
            if(input) {
                input.value = value;
            }
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
        this._validator.resetForm();
    }
}