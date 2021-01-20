'use strict';

import { html, render } from 'lit-html';
import stateConfig from '../../state/config.js';
import stateContexts from '../../state/context.js'


const _ENV = {
  myDIV: null,
  contexts: [],
  config: null,
};

const _PICKCONTEXT = {
  _env: _ENV,

  init: () => {
    if (_ENV.myDIV !== null) { return; }

    _ENV.config = stateConfig.getConfig()['context-picker'];

    _ENV.myDIV = document.createElement('div');
    _ENV.myDIV.classList.add("pickerForContext");

    stateContexts.listenContextChanges({ listener: _PICKCONTEXT._listenerContextChange });

    _PICKCONTEXT.update({ contexts: [_ENV.config.default] });
    _PICKCONTEXT._listenerContextChange({ context: _ENV.config.default }); // default context
  },

  getComponent() {
    return _ENV.myDIV;
  },

  _render: () => {
    const _innerHTML = html`
      ${_PICKCONTEXT._renderButtons()}
    `;
    render(_innerHTML, _ENV.myDIV);
  },

  _renderButtons() {
    const { buttons } = _ENV.config;
    const _result = [];

    Object.keys(buttons).forEach(_k => {
      _result.push( html `<button data-context="${_k}" @click=${_PICKCONTEXT._handleButtonClick}>${buttons[_k].text}</button>` );
    });
    
    return _result;
  },

  update: ({ contexts }) => {
    _ENV.contexts = contexts;

    _PICKCONTEXT._render();

   if (_ENV.contexts.length < 2) {  // hide all if there are less than 2 contexts
    _ENV.myDIV.style.display = 'none';
    return;
   } else {
    _ENV.myDIV.style.display = 'block';
   }

   _ENV.myDIV.querySelectorAll('button')  // hide not enabled contexts
    .forEach(_button => {
      if ( _ENV.contexts.includes(_button.getAttribute('data-context')) === false ) {
        _button.style.display = 'none';
      } else {
        _button.style.display = 'inline-block';
      }
    });
  },

  _handleButtonClick: (_event) => {
    const _context = _event.srcElement.attributes["data-context"].value;
    stateContexts.changeContext({ name: _context });
  },

  _listenerContextChange: (_data) => {
    const { myDIV } = _ENV;
    myDIV.querySelectorAll('button')
      .forEach((_button) => { _button.classList.remove('is-active'); });
    myDIV.querySelector(`button[data-context="${_data.context}"]`)
      .classList.add('is-active');
  },

};

export default _PICKCONTEXT;