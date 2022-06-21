export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;
  }

  getUserInfo() {
    const result = {
      name: this._nameSelector.textContent,
      about: this._aboutSelector.textContent,
      avatar: this._avatarSelector.src
      };
    return result;
  }

  setUserInfo({ name, about, avatar }) {
    if(name) {
      this._nameSelector.textContent = name;
    }
    if(about) {
      this._aboutSelector.textContent = about;
    }
    if(avatar) {
      this._avatarSelector.src = avatar;
    }
  }
}