'use strict';

import { html, render } from 'lit-html';
import { Modal } from '../components/modal';


const _ENV = {
  myDIV: null,
  modalInfo: null,
  modalCode: null,
};

const _HEADER = {
  _env: _ENV,

  init: () => {
    _ENV.myDIV = document.createElement('div');
    _ENV.myDIV.classList.add("header");
  },

  getComponent() {
    return _ENV.myDIV;
  },

  _render: () => {
    const _innerHTML = html`
      <div class="title">
        Frontend industry
      </div>
      <div class="links">
        <a href="javascript:void(null);" @click=${_HEADER._onClickInfo}>
          <div class="image info-image"></div>
        </a>
        <a href="javascript:void(null);" @click=${_HEADER._onClickCode}>
          <div class="image github-image"></div>
        </a>
      </div>
      ${_HEADER._renderModalInfo()}
      ${_HEADER._renderModalCode()}
    `;
    render(_innerHTML, _ENV.myDIV);
  },

  _renderModalInfo: () => {
    return html`
    <!-- The Modal -->
    <div id="modal-info" class="modal info">
    
      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <span class="close">&times;</span>
          <h2>About Frontend industry</h2>
        </div>
        <div class="modal-body">
          <p>Is a memo pad for develop frontend applications</p>
          <p>Separates the main topics for frontend development and offers concepts for W3C compatible code and frameworks</p>
          <!--
          <p>
            <button type="button" @click="${() => _ENV.modalInfo.close()}">Close</button>
          </p>
          -->
        </div>
        <div class="modal-footer">
          <!-- <h3>Modal Footer</h3> -->
        </div>
      </div>
    </div>
    `;
  },


  _renderModalCode: () => {
    return html`
    <!-- The Modal -->
    <div id="modal-code" class="modal info">
    
      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <span class="close">&times;</span>
          <h2>Code of Frontend industry</h2>
        </div>
        <div class="modal-body">
          <p>This project is open source</p>
          <p>You can find the code in <a href="https://github.com/unlevel-team/frontend-industry" target="_blank">this repository</a></p>
          <!--
          <p>
            <button type="button" @click="${() => _ENV.modalInfo.close()}">Close</button>
          </p>
          -->
        </div>
        <div class="modal-footer">
          <!-- <h3>Modal Footer</h3> -->
        </div>
      </div>
    </div>
    `;
  },

  update: () => {
    _HEADER._render();
  },

  _onClickInfo: (_event) => {
    if (_ENV.modalInfo === null) {  // Initialize modal for info
      _ENV.modalInfo = new Modal({ element: _ENV.myDIV.querySelector('#modal-info') });  // TODO: REVIEW CODE 🔍⚠️
    }
    _ENV.modalInfo.open();
  },

  _onClickCode: (_event) => {
    if (_ENV.modalCode === null) {  // Initialize modal for code
      _ENV.modalCode = new Modal({ element: _ENV.myDIV.querySelector('#modal-code') });  // TODO: REVIEW CODE 🔍⚠️
    }
    _ENV.modalCode.open();
  },

};

export default _HEADER;