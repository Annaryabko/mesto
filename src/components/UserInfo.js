export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameSelector = nameSelector;
    this._descriptionSelector = descriptionSelector;
  }

  getUserInfo() {
    const result = {
      name: this._nameSelector.textContent,
      description: this._descriptionSelector.textContent
      };
    return result;
  }

  setUserInfo({ name, description }) {
    this._nameSelector.textContent = name;
    this._descriptionSelector.textContent = description;
  }
}