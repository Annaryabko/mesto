const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');
const popupArray = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPhoto = document.querySelector('.popup_photo');

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
  const elementsItem = createElement(element.name, element.link);
  cardsContainer.append(elementsItem);
})

//создать карточку
function createElement(name, link) {
  const elementsTemplate = document.querySelector('#elements-template').content;
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
function addElement(evt) {
  evt.preventDefault();

  const inputTitle = document.querySelector('.popup__input_type_title').value;
  const inputLink = document.querySelector('.popup__input_type_link').value;
  const elementsItem = createElement(inputTitle, inputLink);
  cardsContainer.prepend(elementsItem);

  closePopup(popupAdd);
}

formAddCard.addEventListener('submit', addElement);

//открытие и закрытие формы
function openPopup(popup) {
  popup.classList.add("popup__opened");
}

function closePopup(popup) {
  popup.classList.remove("popup__opened");
}

//возврат к первоначальным значениям формы add
function resetAddForm() {
  formAddCard.reset();

  popupAdd.querySelector('.popup__button').disabled = true;
  popupAdd.querySelector('.popup__button').classList.add('popup__button_type_inactive');
  Array.from(popupAdd.querySelectorAll('.popup__input')).forEach((inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
  });
  Array.from(popupAdd.querySelectorAll('.popup__input-error')).forEach((inputElement) => {
    inputElement.classList.remove('popup__input-error_active');
    inputElement.innerHTML = '';
  });
}

//открытие добавить карточку
addButton.addEventListener('click', () => {
  resetAddForm();
  openPopup(popupAdd);
});

//закрытие всех попапов по клику
popupArray.forEach((form) => {
  form.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target === form) {
      closePopup(form);
    }
  });
});

//закрытие попапов по кнопке
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    popupArray.forEach((form) => {
      closePopup(form);
    })
  }
});

//добавляем новое имя и должность в шапку
function insertInputsValue() {
  nameInput.value = profileHeader.innerText;
  jobInput.value = profileTitle.innerText;
}
//возврат к первоначальным значениям формы edit
function resetEditForm() {
  insertInputsValue();

  popupEdit.querySelector('.popup__button').disabled = false;
  popupEdit.querySelector('.popup__button').classList.remove('popup__button_type_inactive');
  Array.from(popupEdit.querySelectorAll('.popup__input')).forEach((inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
  });
  Array.from(popupEdit.querySelectorAll('.popup__input-error')).forEach((inputElement) => {
    inputElement.classList.remove('popup__input-error_active');
    inputElement.innerHTML = '';
  });
}

editButton.addEventListener('click', () => {
  resetEditForm();
  openPopup(popupEdit);
});

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