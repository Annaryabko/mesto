import { initialElements } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import './index.css';


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editAvatar = document.querySelector('.profile__avatar-edit');

const popupPhoto = new PopupWithImage('.popup_photo');
const popupAddCard = new PopupWithForm('.popup_add', addCardHandler);
const popupEditProfile = new PopupWithForm('.popup_edit', userEditHandler);
const popupEditAvatar = new PopupWithForm('.popup_avatar', avatarEditHandler);
const popupConfirm = new PopupWithConfirmation('.popup_confirm');


const elementsTemplate = document.querySelector('#elements-template').content;

const profileElems = {
  nameSelector: document.querySelector('.profile__header'),
  aboutSelector: document.querySelector('.profile__title'),
  avatarSelector: document.querySelector('.profile__avatar')
}

//карточки с сервера

let cardList;

function cardsGeneration(user) {
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
            const card = new Card(item.name, item.link, elementsTemplate, (data) => popupPhoto.open(data), () => {
              popupConfirm.open(() => {
                fetch(`https://nomoreparties.co/v1/cohort-43/cards/${item._id}`, {
                  method: 'DELETE',
                  headers: {
                    authorization: '32883872-fb06-4f78-8961-fef1037a9b81'
                  }
                });
                card.remove();
              });
            });
            const elementsItem = card.createCard(
              item.owner._id === user._id
            );
            cardList.appendItem(elementsItem);
          },
        },
        '.elements__items'
      );
  
      cardList.renderItems();
    });
}



  //взяли имя и описание с сервера

  fetch('https://nomoreparties.co/v1/cohort-43/users/me', {
    headers: {
      authorization: '32883872-fb06-4f78-8961-fef1037a9b81'
    }
  })
    .then(res => res.json())
    .then((result) => {
      // result._id
      userInfo.setUserInfo(result);
      cardsGeneration(result)
    })


//добавить новую карточку
function addCardHandler(data) {

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
  })
  .then(res => res.json())
  .then((result) => {
    const card = new Card(data.name, data.link, elementsTemplate, (data) => popupPhoto.open(data), () => {
      popupConfirm.open(() => {
        fetch(`https://nomoreparties.co/v1/cohort-43/cards/${result._id}`, {
          method: 'DELETE',
          headers: {
            authorization: '32883872-fb06-4f78-8961-fef1037a9b81'
          }
        });
        card.remove();
      });
    });
    const elementsItem = card.createCard();
    // elementsItem = elementsItem.addDelete();
    
    cardList.prependItem(elementsItem);
  
  })
}

//открытие добавить карточку
addButton.addEventListener('click', () => {
  popupAddCard.open();
});

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
      about: data.about
    })
  });
}

//инфо о пользователе
const userInfo= new UserInfo(profileElems);

editButton.addEventListener('click', () => {
  popupEditProfile.open(userInfo.getUserInfo());
});

editAvatar.addEventListener('click', () => {
  console.log(userInfo.getUserInfo());
  popupEditAvatar.open(userInfo.getUserInfo());
});

function avatarEditHandler(data) {
  console.log(data);
  userInfo.setUserInfo(data);

  fetch('https://mesto.nomoreparties.co/v1/cohort-43/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '32883872-fb06-4f78-8961-fef1037a9b81',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: data.avatar,
    })
  });
}