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
  descriptionSelector: document.querySelector('.profile__title'),
  avatarSelector: document.querySelector('.profile__avatar')
}

let cardList;
fetch('https://mesto.nomoreparties.co/v1/cohort-43/cards', {
  headers: {
    authorization: '32883872-fb06-4f78-8961-fef1037a9b81'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
    //собираем массив карточек
    cardList = new Section({
      data: result,
      renderer: (item) => {
          const card = new Card(item.name, item.link, elementsTemplate, (data) => popupPhoto.open(data));
          const elementsItem = card.createCard();
          cardList.appendItem(elementsItem);
        },
      },
      '.elements__items'
    );

    cardList.renderItems();
  });

  fetch('https://nomoreparties.co/v1/cohort-43/users/me', {
    headers: {
      authorization: '32883872-fb06-4f78-8961-fef1037a9b81'
    }
  })
    .then(res => res.json())
    .then((result) => {
      userInfo.setUserInfo({ 
        name: result.name, 
        description: result.about,
        avatar: result.avatar
      });
    })




// //собираем массив карточек
// const cardList = new Section({
//   data: initialElements,
//   renderer: (item) => {
//       const card = new Card(item.name, item.link, elementsTemplate, (data) => popupPhoto.open(data));
//       const elementsItem = card.createCard();
//       cardList.appendItem(elementsItem);
//     },
//   },
//   '.elements__items'
// );

// cardList.renderItems();

//добавить новую карточку
function addCardHandler(data) {
  const card = new Card(data.name, data.link, elementsTemplate, (data) => popupPhoto.open(data));
  const elementsItem = card.createCard();
  
  cardList.prependItem(elementsItem);

  fetch('https://mesto.nomoreparties.co/v1/cohort-43/cards', {
    method: 'POST',
    headers: {
      authorization: '32883872-fb06-4f78-8961-fef1037a9b81',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  });

}

//добавляем новое имя и должность в заголовок
function userEditHandler(data) {
  userInfo.setUserInfo(data);

  fetch('https://mesto.nomoreparties.co/v1/cohort-43/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '32883872-fb06-4f78-8961-fef1037a9b81',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.description
    })
  });
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