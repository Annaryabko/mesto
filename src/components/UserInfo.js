export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;
    this._avatarSelector = avatarSelector;
  }

  getUserInfo() {
    const result = {
      name: this._nameSelector.textContent,
      description: this._descriptionSelector.textContent
      };
    return result;
  }

  setUserInfo({ name, description, avatar }) {
    this._nameSelector.textContent = name;
    this._descriptionSelector.textContent = description;
    if(avatar) {
      this._avatarSelector.src = avatar;
    }
  }
}