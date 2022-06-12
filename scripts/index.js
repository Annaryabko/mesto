import {initialElements} from './cards.js';
import { Card } from './Card.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const photoPopup = new PopupWithImage('.popup_photo');
const addCardPopup = new PopupWithForm('.popup_add', addCardHandler);
const editUserPopup = new PopupWithForm('.popup_edit', userEditHandler);

const elementsTemplate = document.querySelector('#elements-template').content;

const profileElems = {
  nameSelector: document.querySelector('.profile__header'),
  descriptionSelector: document.querySelector('.profile__title')
}

//собираем массив карточек
const cardList = new Section({
  data: initialElements,
  renderer: (item) => {
    const card = new Card(item.name, item.link, elementsTemplate, (data) => {
      photoPopup.open(data);
    });
    const elementsItem = card.createCard();
    return elementsItem;
    },
  },
  '.elements__items'
);

cardList.renderItems();

//добавить новую карточку
function addCardHandler(data) {
  cardList.addItemFirst(data);
}

//добавляем новое имя и должность в заголовок
function userEditHandler(data) {
  userInfo.setUserInfo(data);
}

//открытие добавить карточку
addButton.addEventListener('click', () => {
  addCardPopup.open();
});

//инфо о пользователе
const userInfo= new UserInfo(profileElems);

editButton.addEventListener('click', () => {
  editUserPopup.open(userInfo.getUserInfo());
});