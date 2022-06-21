import { Popup } from "./Popup.js";
import { FormValidator } from "./FormValidator.js";
import { validatorConfig } from "../utils/constants.js";

export class PopupWithForm extends Popup {
    constructor(selector, submitHandler) {
        super(selector);
        this._submitHandler = submitHandler;
        this._validator = new FormValidator(validatorConfig, this._element);

        this._validator.enableValidation();
    }

    open(data) {
        super.open();
        if (data) {
            this._setInputValues(data);
        }
    }

    _getInputValues() {
        const result = {};
        Array.from(this._element.querySelectorAll('.popup__input')).forEach((input) => {
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