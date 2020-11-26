'use strict';

import { html, render } from 'lit-html';

const _COMPONENT = {
  _env: {
    myDIV: null,
  },

  init: () => {
    const { _env } = _COMPONENT;
    _env.myDIV = document.createElement('div');
    // _env.myDIV.classList.add("header");
  },

  getComponent() {
    const { _env } = _COMPONENT;
    return _env.myDIV;
  },

  _render: () => {
    const { _env } = _COMPONENT;
    const _innerHTML = html`<h3>My element</h3>`;
    render(_innerHTML, _env.myDIV);
  },

  update: () => {
   _COMPONENT._render();
  },

};

export default _COMPONENT;