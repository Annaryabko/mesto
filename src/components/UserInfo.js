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

  getId() {
    return this._id;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._id = _id;
    
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