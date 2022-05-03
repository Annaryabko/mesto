const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popups = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPhoto = document.querySelector('.popup_photo');

const elementsTemplate = document.querySelector('#elements-template').content;

const closeIconEdit = document.querySelector('.popup_edit .popup__close');
const closeIconAdd = document.querySelector('.popup_add .popup__close');
const closeIconPhoto = document.querySelector('.popup_photo .popup__close');
const formEditProfile = document.querySelector('.popup_edit .popup__inputs');
const formAddCard = document.querySelector('.popup_add .popup__inputs');

const profileHeader = document.querySelector('.profile__header');
const profileTitle = document.querySelector('.profile__title');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardsContainer = document.querySelector('.elements__items');
const elementsWrapper = document.querySelector('.elements__wrapper');

//собираем исходный массив карточек
initialElements.forEach(function (element) {
  const elementsItem = createCard(element.name, element.link);
  cardsContainer.append(elementsItem);
})

//создать карточку
function createCard(name, link) {
  const elementsItem = elementsTemplate.querySelector('.elements__item').cloneNode(true);
  const elementsItemName = elementsItem.querySelector('.elements__item-name');
  const elementsPicture = elementsItem.querySelector('.elements__picture');

  elementsItemName.textContent = name;
  elementsPicture.src = link;
  elementsPicture.alt = name;

  elementsItem.querySelector('.elements__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle("elements__like-pressed");
  });

  elementsItem.querySelector('.elements__delete').addEventListener('click', () => {
    elementsItem.remove();
  });

  elementsPicture.addEventListener('click', (evt) => {
    openPopup(popupPhoto);

    popupPhoto.querySelector('.popup__picture').src = elementsPicture.src;
    popupPhoto.querySelector('.popup__picture').alt = elementsPicture.alt;
    popupPhoto.querySelector('.popup__description').textContent = elementsItemName.textContent;
  });
  return elementsItem;
}

//добавить новую карточку
function addCard(evt) {
  evt.preventDefault();

  const inputTitle = document.querySelector('.popup__input_type_title').value;
  const inputLink = document.querySelector('.popup__input_type_link').value;
  const elementsItem = createCard(inputTitle, inputLink);
  cardsContainer.prepend(elementsItem);

  closePopup(popupAdd);
}

formAddCard.addEventListener('submit', addCard);

//закрытие по кнопке
function handleEscClose(popupActive, evt) {
  if (evt.key === 'Escape') {
    closePopup(popupActive);
  }
}

//открытие и закрытие формы
function openPopup(popup) {
  popup.classList.add("popup__opened");
  document.addEventListener('keydown', (evt) => handleEscClose(popup, evt));
}

function closePopup(popup) {
  popup.classList.remove("popup__opened");
  document.removeEventListener('keydown', (evt) => handleEscClose(popup, evt));
}

//открытие добавить карточку
addButton.addEventListener('click', () => {
  formAddCard.reset();
  resetForm(popupAdd);
  openPopup(popupAdd);
});

editButton.addEventListener('click', () => {
  insertInputsValue();
  resetForm(popupEdit);
  openPopup(popupEdit);
});

//закрытие всех попапов по клику
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target === popup) {
      closePopup(popup);
    }
  });
});

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

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//валидация
enableValidation({
  formSelector: '.popup__inputs',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});