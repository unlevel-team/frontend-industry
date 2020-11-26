'use strict';

import { html, render } from 'lit-html';
import stateFrameworks from '../../state/framework.js';


const _PICFRMWK = {
  _env: {
    myDIV: null,
    frameworks: [],
  },

  init: () => {
    const { _env } = _PICFRMWK;
    if (_env.myDIV !== null) { return; }

    _env.myDIV = document.createElement('div');
    _env.myDIV.classList.add("pickerForFramework");

    stateFrameworks.listenFrameworkChanges({ listener: _PICFRMWK._listenerFrameworkChange });

    _PICFRMWK.update({ frameworks: ['w3c'] });
    _PICFRMWK._listenerFrameworkChange({ framework: 'w3c' }); // default framework
  },

  getComponent() {
    const { _env } = _PICFRMWK;
    return _env.myDIV;
  },

  _render: () => {
    const { _env } = _PICFRMWK;
    const _innerHTML = html`
      <button data-framework="w3c" @click=${_PICFRMWK._handleButtonClick}>W3C</button>
      <button data-framework="react" @click=${_PICFRMWK._handleButtonClick}>React</button>
      <button data-framework="vue" @click=${_PICFRMWK._handleButtonClick}>Vue</button>
    `;
    render(_innerHTML, _env.myDIV);
  },

  update: ({ frameworks }) => {
    const { _env } = _PICFRMWK;
    _env.frameworks = frameworks;

    _PICFRMWK._render();

   if (_env.frameworks.length < 2) {  // hide all if there are less than 2 frameworks
    _env.myDIV.style.display = 'none';
    return;
   } else {
    _env.myDIV.style.display = 'block';
   }

   _env.myDIV.querySelectorAll('button')  // hide not enabled frameworks
    .forEach(_button => {
      if ( _env.frameworks.includes(_button.getAttribute('data-framework')) === false ) {
        _button.style.display = 'none';
      } else {
        _button.style.display = 'inline-block';
      }
    });
  },

  _handleButtonClick: (_event) => {
    const _framework = _event.srcElement.attributes["data-framework"].value;
    stateFrameworks.changeFramework({ name: _framework });
  },

  _listenerFrameworkChange: (_data) => {
    const { myDIV } = _PICFRMWK._env;
    myDIV.querySelectorAll('button')
      .forEach((_button) => { _button.classList.remove('is-active'); });
    myDIV.querySelector(`button[data-framework="${_data.framework}"]`)
      .classList.add('is-active');
  },

};

export default _PICFRMWK;