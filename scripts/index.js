import {initialElements} from './cards.js';
import { Card } from './card.js';
import { FormValidator } from './formValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popups = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPhoto = document.querySelector('.popup_photo');

const elementsTemplate = document.querySelector('#elements-template').content;

const formEditProfile = document.querySelector('.popup_edit .popup__inputs');
const formAddCard = document.querySelector('.popup_add .popup__inputs');

const profileHeader = document.querySelector('.profile__header');
const profileTitle = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardsContainer = document.querySelector('.elements__items');

const config = {
  formSelector: '.popup__inputs',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorMessageSelector: '.popup__input-error',
  errorClass: 'popup__input-error_active'
};

const popupEditValidator = new FormValidator(config, popupEdit);
popupEditValidator.enableValidation();

const popupAddValidator = new FormValidator(config, popupAdd);
popupAddValidator.enableValidation();

//собираем исходный массив карточек
initialElements.forEach(function (element) {
  const card = new Card(element.name, element.link, elementsTemplate, openPopupPhoto);
  const elementsItem = card.createCard();
  cardsContainer.append(elementsItem);
})

//добавить новую карточку
function addCard(evt) {
  evt.preventDefault();

  const inputTitle = document.querySelector('.popup__input_type_title').value;
  const inputLink = document.querySelector('.popup__input_type_link').value;

  const card = new Card(inputTitle, inputLink, elementsTemplate, openPopupPhoto);
  const elementsItem = card.createCard();
  cardsContainer.prepend(elementsItem);

  closePopup(popupAdd);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const popupActiv = document.querySelector(".popup__opened");
    closePopup(popupActiv);
  }
}

//открытие и закрытие формы
function openPopup(popup) {
  popup.classList.add("popup__opened");
  document.addEventListener('keydown', handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove("popup__opened");
  document.removeEventListener('keydown', handleEscClose);
}

function openPopupPhoto (picture, name) {
  openPopup(popupPhoto);
        
  popupPhoto.querySelector('.popup__picture').src = picture.src;
  popupPhoto.querySelector('.popup__picture').alt = picture.alt;
  popupPhoto.querySelector('.popup__description').textContent = name.textContent;
}

//добавляем новое имя и должность в шапку
function insertInputsValue() {
  nameInput.value = profileHeader.textContent;
  jobInput.value = profileTitle.textContent;
}

//добавляем новое имя и должность в заголовок
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileHeader.textContent = nameInput.value;
  profileTitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

formAddCard.addEventListener('submit', addCard);

//открытие добавить карточку
addButton.addEventListener('click', () => {
  formAddCard.reset();
  popupAddValidator.resetForm();
  openPopup(popupAdd);
});

editButton.addEventListener('click', () => {
  insertInputsValue();
  popupEditValidator.resetForm();
  openPopup(popupEdit);
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//закрытие всех попапов по клику
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target === popup) {
      closePopup(popup);
    }
  });
});