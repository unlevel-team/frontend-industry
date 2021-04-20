'use strict';

import { html, render } from 'lit-html';
import stateConfig from '../state/config.js';
import stateLocation from '../state/location.js';


const _ENV = {
  myDIV: null,
  config: null,  
};

const _SIDEBAR = {
  _env: _ENV,

  init: () => {
    _ENV.config = stateConfig.getConfig()['sidebar'];

    _ENV.myDIV = document.createElement('div');
    _ENV.myDIV.classList.add("sidebar");

    stateLocation.listenLocationChanges({ listener: _SIDEBAR._onLocationChanges });
  },

  getComponent() {
    return _ENV.myDIV;
  },

  _render: () => {
    const _innerHTML = html`
      <ul>
        ${_SIDEBAR._renderLinks()}
      </ul>
    `;
    render(_innerHTML, _ENV.myDIV);
  },

  _renderLinks: () => {
    const { links } = _ENV.config;
    const _result = [];

    Object.keys(links).forEach(_k => {
      // _result.push( html `<li><a href="${links[_k].url}" data-name="${_k}">${links[_k].text}</a></li>` );
      _result.push( html `<li><a href="javascript:void(null);" @click=${_SIDEBAR._onClickLink} data-name="${_k}">${links[_k].text}</a></li>` );
    });
    
    return _result;
  },

  update: () => {
    _SIDEBAR._render();
  },

  _onClickLink: (_event) => {
    const { links } = _ENV.config;
    const _name = _event.target.getAttribute('data-name');
    stateLocation.changeView({ urlView: links[_name].url });
  },

  _onLocationChanges(_options) {
    const { myDIV } = _ENV;
    const { title } = stateLocation.getLocation();
    myDIV.querySelectorAll('li a')
      .forEach((_link) => { _link.classList.remove('is-active'); });
    if (title !== null) {
      myDIV.querySelector(`li a[data-name="${title}"]`)
        .classList.add('is-active');
    }
  },

};

export default _SIDEBAR;