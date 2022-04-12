let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeIcon = document.querySelector('.popup__close');
let popupInputs = document.querySelector('.popup__inputs');
let profileHeader = document.querySelector('.profile__header');
let profileTitle = document.querySelector('.profile__title');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');
let body = document.querySelector('body');

function openPopup() {
  popup.style.display = "block";
  nameInput.value = profileHeader.innerText;
  jobInput.value = profileTitle.innerText;
  body.style.overflow = 'hidden';
}

function closePopup() {
  popup.style.display = "none";
  body.style.overflow = 'auto';
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileHeader.textContent = nameInput.value;
  profileTitle.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeIcon.addEventListener('click', closePopup);
popupInputs.addEventListener('submit', formSubmitHandler);
