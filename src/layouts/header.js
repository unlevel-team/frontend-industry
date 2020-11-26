'use strict';

import { html, render } from 'lit-html';


const _HEADER = {
  _env: {
    myDIV: null,
    modalInfo: null,
  },

  init: () => {
    const { _env } = _HEADER;
    _env.myDIV = document.createElement('div');
    _env.myDIV.classList.add("header");

    _HEADER._initModalInfo();
  },

  _initModalInfo: () => {
    // instanciate new modal (Tingle)
    const _modal = new tingle.modal({
      footer: true,
      stickyFooter: false,
      closeMethods: ['overlay', 'button', 'escape'],
      closeLabel: "Close",
      cssClass: ['modal-info'],
      onOpen: function() {
          console.log('modal open');
      },
      onClose: function() {
          console.log('modal closed');
      },
      beforeClose: function() {
          // here's goes some logic
          // e.g. save content before closing the modal
          return true; // close the modal
          return false; // nothing happens
      }
    });

    // set content
    _modal.setContent(`
      <h1>About Frontend industry</h1>
      <p>Is a memo pad for develop frontend applications</p>
      <p>Separates the main topics for frontend development and offers concepts for W3C compatible code and frameworks</p>
    `);

    // add a button
    _modal.addFooterBtn('OK', 'tingle-btn tingle-btn--primary', function() {
        // here goes some logic
        _modal.close();
    });

    /*
    // add another button
    _modal.addFooterBtn('Dangerous action !', 'tingle-btn tingle-btn--danger', function() {
        // here goes some logic
        modal.close();
    });
    */

    _HEADER._env.modalInfo = _modal;
  },

  getComponent() {
    const { _env } = _HEADER;
    return _env.myDIV;
  },

  _render: () => {
    const { _env } = _HEADER;
    const _innerHTML = html`
      <div class="title">
        Frontend industry
      </div>
      <div class="links">
        <a href="javascript:void(null);" @click=${_HEADER._onClickInfo}>
          <div class="image info-image"></div>
        </a>
        <a href="javascript:void(null);">
          <div class="image github-image"></div>
        </a>
      </div>
    `;
    render(_innerHTML, _env.myDIV);
  },

  update: () => {
    _HEADER._render();
  },

  _onClickInfo: (_event) => {
    const { modalInfo } = _HEADER._env;
    modalInfo.open();  // open modal
  },

};

export default _HEADER;