'use strict';

/**
 * @see https://www.w3schools.com/howto/howto_css_modals.asp
 */
const _MODAL = {
  openModal: ({ element }) => {
    element.style.display = "block";
  },
  closeModal: ({ element }) => {
    element.style.display = "none";
  },
};

export class Modal {
  constructor({ element }) {
    this._element = element;

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._onWindowClick = this._onWindowClick.bind(this);
    
    window.addEventListener('click', this._onWindowClick);
    this._element.querySelector('.modal .close').addEventListener('click', this.close);
  }

  dispose() {
    window.removeEventListener('click', this._onWindowClick);
    this._element.querySelector('.modal .close').removeEventListener('click', this.close);
    delete this._element;
  }

  open() {
    _MODAL.openModal({ element: this._element });
  }

  close() {
    _MODAL.closeModal({ element: this._element });
  }

  _onWindowClick(_event) {
    // When the user clicks anywhere outside of the modal, close it
    if (_event.target === this._element) {
      this.close();
    }
  }
}

export default _MODAL;