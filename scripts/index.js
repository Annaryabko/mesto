let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');

let popup = document.querySelector('.popup');
let popupEdit = document.querySelector('.popup_edit');
let popupAdd = document.querySelector('.popup_add');
let popupPhoto = document.querySelector('.popup_photo');

let closeIconEdit = document.querySelector('.popup_edit .popup__close');
let closeIconAdd = document.querySelector('.popup_add .popup__close');
let closeIconPhoto = document.querySelector('.popup_photo .popup__close');
let popupInputsEdit = document.querySelector('.popup_edit .popup__inputs');
let popupInputsAdd = document.querySelector('.popup_add .popup__inputs');

let profileHeader = document.querySelector('.profile__header');
let profileTitle = document.querySelector('.profile__title');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');

let elementsItems = document.querySelector('.elements__items');

let elementsWrapper = document.querySelector('.elements__wrapper');


const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialElements.forEach(function (element) {
  const elementsTemplate = document.querySelector('#elements-template').content;
  const elementsItem = elementsTemplate.querySelector('.elements__item').cloneNode(true);

  elementsItem.querySelector('.elements__item-name').textContent = element.name;
  elementsItem.querySelector('.elements__picture').src = element.link;
  elementsItem.querySelector('.elements__picture').alt = element.name;

  elementsItem.querySelector('.elements__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle("elements__like-pressed");
  });

  elementsItem.querySelector('.elements__delete').addEventListener('click', () => {
    elementsItem.remove();
  });

  elementsItem.querySelector('.elements__picture').addEventListener('click', (evt) => {
    openPopup(popupPhoto);

    popupPhoto.querySelector('.popup__picture').src = elementsItem.querySelector('.elements__picture').src;
    popupPhoto.querySelector('.popup__picture').alt = elementsItem.querySelector('.elements__picture').alt;
    popupPhoto.querySelector('.popup__description').textContent = elementsItem.querySelector('.elements__item-name').textContent;
  });
  elementsItems.append(elementsItem);
})

//добавить новую карточку
function addElement(evt) {
  evt.preventDefault();
  const inputTitle = document.querySelector('.popup__input_type_title').value;
  const inputLink = document.querySelector('.popup__input_type_link').value;
  const elementsTemplate = document.querySelector('#elements-template').content;
  const elementsItem = elementsTemplate.querySelector('.elements__item').cloneNode(true);
  elementsItem.querySelector('.elements__item-name').textContent = inputTitle;
  elementsItem.querySelector('.elements__picture').src = inputLink;
  elementsItem.querySelector('.elements__picture').alt = inputTitle;

  elementsItem.querySelector('.elements__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle("elements__like-pressed");
  });

  elementsItem.querySelector('.elements__delete').addEventListener('click', () => {
    elementsItem.remove();
  });

  elementsItem.querySelector('.elements__picture').addEventListener('click', (evt) => {
    openPopup(popupPhoto);

    popupPhoto.querySelector('.popup__picture').src = elementsItem.querySelector('.elements__picture').src;
    popupPhoto.querySelector('.popup__picture').alt = elementsItem.querySelector('.elements__picture').alt;
    popupPhoto.querySelector('.popup__description').textContent = elementsItem.querySelector('.elements__item-name').textContent;
  });
  elementsItems.prepend(elementsItem);
  closePopup(popupAdd);
}

popupInputsAdd.addEventListener('submit', addElement);

//открытие и закрытие формы
function openPopup(popup) {
  popup.style.visibility = "visible";
  popup.style.opacity = "1";
}

function closePopup(popup) {
  popup.style.visibility = "hidden";
  popup.style.opacity = "0";
}

addButton.addEventListener('click', () => openPopup(popupAdd));
closeIconAdd.addEventListener('click', () => closePopup(popupAdd));

//добавляем новое имя и должность в шапку
function nameValue() {
  nameInput.value = profileHeader.innerText;
  jobInput.value = profileTitle.innerText;
}

nameValue();
editButton.addEventListener('click', () => openPopup(popupEdit));
closeIconEdit.addEventListener('click', () => closePopup(popupEdit));

//добавляем новое имя и должность в заголовок
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileHeader.textContent = nameInput.value;
  profileTitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

popupInputsEdit.addEventListener('submit', formSubmitHandler);

closeIconPhoto.addEventListener('click', () => closePopup(popupPhoto));