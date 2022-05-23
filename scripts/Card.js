export class Card {
    _name;
    _link;
    _template;
    _card;
    _openPopupPhoto;

    constructor(name, link, template, openPopupPhoto) {
        this._name= name;
        this._link= link;
        this._template= template;
        this._openPopupPhoto= openPopupPhoto;
    }

    _delClickHandler() {
        this._card.remove();
    }

    _likeClickHandler() {
       this._card.querySelector(".elements__like").classList.toggle("elements__like-pressed");
    }

    createCard() {
        this._card = this._template.querySelector(".elements__item").cloneNode(true);

        const picture = this._card.querySelector(".elements__picture");
        const name = this._card.querySelector(".elements__item-name");

        name.textContent = this._name;
        picture.src = this._link;
        picture.alt = this._name;


        this._card.querySelector('.elements__like').addEventListener('click', () => {
           this._likeClickHandler();
        });

        this._card.querySelector('.elements__delete').addEventListener('click', () => {
            this._delClickHandler();
        });

        picture.addEventListener('click', (evt) => {
            this._openPopupPhoto(picture, name);
        });

        return this._card;
    }
}