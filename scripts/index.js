const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');
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

  formAddCard.reset();
  closePopup(popupAdd);
}

formAddCard.addEventListener('submit', addElement);

//открытие и закрытие формы
function openPopup(popup) {
  if (popup === popupEdit) {
    insertInputsValue();
  }
  popup.classList.add("popup__opened");
}

function closePopup(popup) {
  popup.classList.remove("popup__opened");
}

addButton.addEventListener('click', () => openPopup(popupAdd));
closeIconAdd.addEventListener('click', () => closePopup(popupAdd));

//добавляем новое имя и должность в шапку
function insertInputsValue() {
  nameInput.value = profileHeader.innerText;
  jobInput.value = profileTitle.innerText;
}

editButton.addEventListener('click', () => openPopup(popupEdit));
closeIconEdit.addEventListener('click', () => closePopup(popupEdit));

//добавляем новое имя и должность в заголовок
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileHeader.textContent = nameInput.value;
  profileTitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

closeIconPhoto.addEventListener('click', () => closePopup(popupPhoto));