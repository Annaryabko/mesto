import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    open({ src, alt, description }) {
        this._element.querySelector('.popup__picture').src = src;
        this._element.querySelector('.popup__picture').alt = alt;
        this._element.querySelector('.popup__description').textContent = description;
        super.open();
    }
}