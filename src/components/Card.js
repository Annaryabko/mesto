export class Card {
    _name;
    _link;
    _likeCount;
    _isLiked;
    _isDeletable;
    _template;
    _card;
    _handleCardClick;
    _handleDeleteClick;
    _handleLikeClick;

    constructor(name, link, isDeletable, template, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._name = name;
        this._link = link;
        this._isDeletable = isDeletable;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        this._likeCount = 0;
        this._isLiked = false;
    }

    remove() {
        this._card.remove();
    }

    updateLikes(isLiked, likeCount) {
        this._isLiked = isLiked;
        this._likeCount = likeCount;

        if (isLiked) {
            this._likeElement.classList.add("elements__like-pressed");
        } else {
            this._likeElement.classList.remove("elements__like-pressed");
        }
        
        this._likeCounter.innerText = likeCount;
    }
    
    createCard() {
        this._card = this._template.querySelector(".elements__item").cloneNode(true);
        // this._card.name = this._name;
        this._card.setAttribute('name', this._name);

        const picture = this._card.querySelector(".elements__picture");
        const name = this._card.querySelector(".elements__item-name");
        this._likeElement = this._card.querySelector('.elements__like');
        this._likeCounter = this._card.querySelector('.elements__like-counter');
        this._deleteElement = this._card.querySelector('.elements__delete');

        if (!this._isDeletable) {
            this._deleteElement.style.display = 'none';
        }

        name.textContent = this._name;
        picture.src = this._link;
        picture.alt = this._name;


        this._likeElement.addEventListener('click', () => {
           this._handleLikeClick(this._isLiked);
        });

        this._deleteElement.addEventListener('click', (evt) => {
            this._handleDeleteClick();
        });

        picture.addEventListener('click', (evt) => {
            this._handleCardClick({ src: picture.src , alt: picture.alt, description: name.textContent });
        });
        return this._card;
    }
}
