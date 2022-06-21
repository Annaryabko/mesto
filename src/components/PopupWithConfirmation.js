import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    open(onYesClick) {
        super.open();
        this._onYesClick = onYesClick;
    }


    setEventListeners() {
        super.setEventListeners();
        this._element.querySelector('.popup__inputs').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._onYesClick();
            this.close();
        });
    }

}