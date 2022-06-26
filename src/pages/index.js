import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { Api } from "../components/Api.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { validatorConfig } from "../utils/constants.js";

import "./index.css";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editAvatar = document.querySelector(".profile__avatar-edit");

const popupPhoto = new PopupWithImage(".popup_photo");

const addCardValidator = new FormValidator(validatorConfig, ".popup_add");
const popupAddCard = new PopupWithForm(
  ".popup_add",
  addCardValidator,
  addCardHandler
);

const editProfileValidator = new FormValidator(validatorConfig, ".popup_edit");
const popupEditProfile = new PopupWithForm(
  ".popup_edit",
  editProfileValidator,
  userEditHandler
);

const editAvatarValidator = new FormValidator(validatorConfig, ".popup_avatar");
const popupEditAvatar = new PopupWithForm(
  ".popup_avatar",
  editAvatarValidator,
  avatarEditHandler
);

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

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    cardList = new Section(
      {
        data: cardsData,
        renderer: (item) => {
          const cardElement = createCard(item);
          cardList.appendItem(cardElement);
        },
      },
      ".elements__items"
    );

    cardList.renderItems();
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
      const cardElement = createCard(result);
      cardList.prependItem(cardElement);
      popupAddCard.renderLoading(false);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
}

//открытие добавить карточку
addButton.addEventListener("click", () => {
  popupAddCard.open();
});

//добавляем новое имя и должность в заголовок
function userEditHandler(data) {
  popupEditProfile.renderLoading(true);

  api
    .editName(data)
    .then(() => {
      userInfo.setUserInfo(data);
      popupEditProfile.renderLoading(false);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
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
  api
    .editAvatar(data)
    .then(() => {
      popupEditAvatar.renderLoading(false);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

function updateCardLikes(card, data) {
  card.updateLikes(
    data.likes.some((like) => like._id === userInfo.getId()),
    data.likes.length
  );
}

function createCard(item) {
  const card = new Card(
    item.name,
    item.link,
    item.owner._id === userInfo.getId(),
    elementsTemplate,
    (data) => popupPhoto.open(data),
    () => {
      popupConfirm.open(() => {
        api
          .deleteCard(item._id)

          .then(() => {
            card.remove();
            popupConfirm.close();
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      });
    },
    (isLiked) => {
      if (isLiked) {
        api
          .deleteLike(item._id)
          .then((data) => {
            updateCardLikes(card, data);
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      } else {
        api
          .addLike(item._id)
          .then((data) => {
            updateCardLikes(card, data);
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      }
    }
  );

  const domCardElement = card.createCard();
  updateCardLikes(card, item);
  return domCardElement;
}
