export class Popup {
    constructor(selector) {
        this._element = document.querySelector(selector);
        this._escHandler = (evt) => this._handleEscClose(evt);
        this._buttonElement = this._element.querySelector('.popup__button');
        // this.setEventListeners();
    }

    renderLoading(isLoading) {

        if(!this._buttonElement.getAttribute('data-default-value')) {
            this._buttonElement.setAttribute('data-default-value', this._buttonElement.getAttribute('value'));
        }
        if (isLoading) {
            this._buttonElement.setAttribute('value', 'Сохранение...');
        } else {
            this._buttonElement.setAttribute('value', this._buttonElement.getAttribute('data-default-value'));
        }
    }
    
    open() {
        this._element.classList.add("popup__opened");
        document.addEventListener('keydown', this._escHandler);
    }

    close() {
        this._element.classList.remove("popup__opened");
        document.removeEventListener('keydown', this._escHandler);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._element.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__close') || evt.target === this._element) {
              this.close();
            }
        });
    }
}