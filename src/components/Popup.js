export class Popup {
    constructor(selector) {
        this._element = document.querySelector(selector);
        this._escHandler = (evt) => this._handleEscClose(evt);
        this.setEventListeners();
    }

    renderLoading(isLoading) {
        const button = this._element.querySelector('.popup__button');

        if(!button.getAttribute('data-default-value')) {
            button.setAttribute('data-default-value', button.getAttribute('value'));
        }
        if (isLoading) {
            button.setAttribute('value', 'Сохранение...');
        } else {
            button.setAttribute('value', button.getAttribute('data-default-value'));
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