export default class Section {
  constructor({ data, renderer }, selector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._renderedItems.forEach(item => this.addItem(item));
  }

  addItem(item) {
    const domElement = this._renderer(item);
    this._container.append(domElement);
  }

  addItemFirst(item) {
    // this._container.prepend(element);
    const domElement = this._renderer(item);
    this._container.prepend(domElement);
  }
}