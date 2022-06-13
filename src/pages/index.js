import { initialElements } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import './index.css';


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupPhoto = new PopupWithImage('.popup_photo');
const popupAddCard = new PopupWithForm('.popup_add', addCardHandler);
const popupEditProfile = new PopupWithForm('.popup_edit', userEditHandler);

const elementsTemplate = document.querySelector('#elements-template').content;

const profileElems = {
  nameSelector: document.querySelector('.profile__header'),
  descriptionSelector: document.querySelector('.profile__title')
}

//собираем массив карточек
const cardList = new Section({
  data: initialElements,
  renderer: (item) => {
      const card = new Card(item.name, item.link, elementsTemplate, (data) => popupPhoto.open(data));
      const elementsItem = card.createCard();
      cardList.appendItem(elementsItem);
    },
  },
  '.elements__items'
);

cardList.renderItems();

//добавить новую карточку
function addCardHandler(data) {
  const card = new Card(data.name, data.link, elementsTemplate, (data) => popupPhoto.open(data));
  const elementsItem = card.createCard();
  
  cardList.prependItem(elementsItem);
  // cardList.addItemFirst(data);
}

//добавляем новое имя и должность в заголовок
function userEditHandler(data) {
  userInfo.setUserInfo(data);
}

//открытие добавить карточку
addButton.addEventListener('click', () => {
  popupAddCard.open();
});

//инфо о пользователе
const userInfo= new UserInfo(profileElems);

editButton.addEventListener('click', () => {
  popupEditProfile.open(userInfo.getUserInfo());
});