import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { Api } from "../components/Api.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

import "./index.css";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editAvatar = document.querySelector(".profile__avatar-edit");

const popupPhoto = new PopupWithImage(".popup_photo");
const popupAddCard = new PopupWithForm(".popup_add", addCardHandler);
const popupEditProfile = new PopupWithForm(".popup_edit", userEditHandler);
const popupEditAvatar = new PopupWithForm(".popup_avatar", avatarEditHandler);
const popupConfirm = new PopupWithConfirmation(".popup_confirm");

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-43/",
  headers: {
    authorization: "32883872-fb06-4f78-8961-fef1037a9b81",
    "Content-Type": "application/json",
  },
});

const elementsTemplate = document.querySelector("#elements-template").content;

const profileElems = {
  nameSelector: document.querySelector(".profile__header"),
  aboutSelector: document.querySelector(".profile__title"),
  avatarSelector: document.querySelector(".profile__avatar"),
};

//карточки с сервера

let cardList;

function cardsGeneration(user) {
  api
    .getInitialCards()

    .then((result) => {
      cardList = new Section(
        {
          data: result,
          renderer: (item) => {
            const card = new Card(
              item.name,
              item.link,
              item.likes.length,
              item.likes.some((like) => like._id === user._id),
              item.owner._id === user._id,
              elementsTemplate,
              (data) => popupPhoto.open(data),
              () => {
                popupConfirm.open(() => {
                  api.deleteCard(item._id);
                  card.remove();
                });
              },
              (isLiked) => {
                if (isLiked) {
                  api.deleteLike(item._id);
                } else {
                  api.addLike(item._id);
                }
              }
            );
            const elementsItem = card.createCard();
            cardList.appendItem(elementsItem);
          },
        },
        ".elements__items"
      );

      cardList.renderItems();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

//взяли имя и описание с сервера
api
  .getUser()
  .then((result) => {
    // result._id
    userInfo.setUserInfo(result);
    cardsGeneration(result);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

//добавить новую карточку
function addCardHandler(data) {
  popupAddCard.renderLoading(true);
  api
    .addCard(data)
    .then((result) => {
      const card = new Card(
        result.name,
        result.link,
        result.likes.length,
        result.likes.some((like) => like._id === userInfo.getId()),
        result.owner._id === userInfo.getId(),
        elementsTemplate,
        (data) => popupPhoto.open(data),
        () => {
          popupConfirm.open(() => {
            api.deleteCard(result._id);
            card.remove();
          });
        },
        (isLiked) => {
          if (isLiked) {
            api.deleteLike(result._id);
          } else {
            api.addLike(result._id);
          }
        }
      );
      const elementsItem = card.createCard();
      cardList.prependItem(elementsItem);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .then(() => {
      popupAddCard.renderLoading(false);
      popupAddCard.close();
    });
}

//открытие добавить карточку
addButton.addEventListener("click", () => {
  popupAddCard.open();
});

//добавляем новое имя и должность в заголовок
function userEditHandler(data) {
  userInfo.setUserInfo(data);
  popupEditProfile.renderLoading(true);

  api
    .editName(data)

    .then(() => {
      popupEditProfile.renderLoading(false);
      popupEditProfile.close();
    });
}

//инфо о пользователе
const userInfo = new UserInfo(profileElems);

editButton.addEventListener("click", () => {
  popupEditProfile.open(userInfo.getUserInfo());
});

editAvatar.addEventListener("click", () => {
  console.log(userInfo.getUserInfo());
  popupEditAvatar.open(userInfo.getUserInfo());
});

//меняем аватар
function avatarEditHandler(data) {
  userInfo.setUserInfo(data);
  popupEditAvatar.renderLoading(true);
  api.editAvatar(data).then(() => {
    popupEditAvatar.renderLoading(false);
    popupEditAvatar.close();
  });
}
