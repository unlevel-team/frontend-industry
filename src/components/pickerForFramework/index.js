'use strict';

import { html, render } from 'lit-html';
import stateConfig from '../../state/config.js';
import stateFrameworks from '../../state/framework.js';


const _PICFRMWK = {
  _env: {
    myDIV: null,
    frameworks: [],
    config: null,
  },

  init: () => {
    const { _env } = _PICFRMWK;
    if (_env.myDIV !== null) { return; }

    _env.config = stateConfig.getConfig()['framework-picker'];

    _env.myDIV = document.createElement('div');
    _env.myDIV.classList.add("pickerForFramework");

    stateFrameworks.listenFrameworkChanges({ listener: _PICFRMWK._listenerFrameworkChange });

    _PICFRMWK.update({ frameworks: [_env.config.default] });
    _PICFRMWK._listenerFrameworkChange({ framework: _env.config.default }); // default framework
  },

  getComponent() {
    const { _env } = _PICFRMWK;
    return _env.myDIV;
  },

  _render: () => {
    const { _env } = _PICFRMWK;
    const _innerHTML = html`
      ${_PICFRMWK._renderButtons()}
    `;
    render(_innerHTML, _env.myDIV);
  },

  _renderButtons() {
    const { buttons } = _PICFRMWK._env.config;
    const _result = [];

    Object.keys(buttons).forEach(_k => {
      _result.push( html `<button data-framework="${_k}" @click=${_PICFRMWK._handleButtonClick}>${buttons[_k].text}</button>` );
    });
    
    return _result;
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