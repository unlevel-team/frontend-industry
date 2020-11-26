'use strict';

import { html, render } from 'lit-html';
import _location_state from '../state/location.js';


const _MAIN = {
  _env: {
    myDIV: null,
  },

  init: () => {
    const { _env } = _MAIN;
    _env.myDIV = document.createElement('div');
    _env.myDIV.classList.add("main");
    
    _location_state.listenLocationChanges({ listener: _MAIN._onLocationChanges });
  },

  getComponent() {
    const { _env } = _MAIN;
    return _env.myDIV;
  },

  _render: () => {
    const { _env } = _MAIN;
    const _innerHTML = html`<h1>Main</h1>`;
    render(_innerHTML, _env.myDIV);
  },

  update: () => {
   _MAIN._render();
  },

  _onLocationChanges(_options) {
    const { myDIV } = _MAIN._env;
    myDIV.scrollTop = 0;
  },
};

export default _MAIN;