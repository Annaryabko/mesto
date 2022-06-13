export class Card {
    _name;
    _link;
    _template;
    _card;
    _handleCardClick;

    constructor(name, link, template, handleCardClick) {
        this._name = name;
        this._link = link;
        this._template = template;
        this._handleCardClick = handleCardClick;
    }

    _delClickHandler() {
        this._card.remove();
    }

    _likeClickHandler() {
        this._likeElement.classList.toggle("elements__like-pressed");
    }

    createCard() {
        this._card = this._template.querySelector(".elements__item").cloneNode(true);
        // this._card.name = this._name;
        this._card.setAttribute('name', this._name);

        const picture = this._card.querySelector(".elements__picture");
        const name = this._card.querySelector(".elements__item-name");
        this._likeElement = this._card.querySelector('.elements__like');

        name.textContent = this._name;
        picture.src = this._link;
        picture.alt = this._name;


        this._likeElement.addEventListener('click', () => {
           this._likeClickHandler();
        });

        this._card.querySelector('.elements__delete').addEventListener('click', () => {
            this._delClickHandler();
        });

        picture.addEventListener('click', (evt) => {
            this._handleCardClick({ src: picture.src , alt: picture.alt, description: name.textContent });
        });
        return this._card;
    }
}
