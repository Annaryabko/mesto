import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._pictureElement = this._element.querySelector('.popup__picture');
        this._descriptionElement = this._element.querySelector('.popup__description');
        this.setEventListeners();
    }
    open({ src, alt, description }) {
        this._pictureElement.src = src;
        this._pictureElement.alt = alt;
        this._descriptionElement.textContent = description;
        super.open();
    }
}