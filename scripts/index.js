let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeIcon = document.querySelector('.popup__close');
let popupInputs = document.querySelector('.popup__inputs');
let profileHeader = document.querySelector('.profile__header');
let profileTitle = document.querySelector('.profile__title');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');

function openPopup() {
  popup.style.display = "flex";
  nameInput.value = profileHeader.innerText;
  jobInput.value = profileTitle.innerText;
}

function closePopup() {
  popup.style.display = "none";
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
