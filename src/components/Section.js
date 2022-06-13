export default class Section {
  constructor({ data, renderer }, selector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  appendItem(domElement) {
    this._container.append(domElement);
  }

  prependItem(domElement) {
    this._container.prepend(domElement);
  }
}