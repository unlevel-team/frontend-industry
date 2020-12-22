'use strict';

import { html, render } from 'lit-html';
import stateConfig from '../state/config.js';
import stateLocation from '../state/location.js';


const _SIDEBAR = {
  _env: {
    myDIV: null,
    config: null,
  },

  init: () => {
    const { _env } = _SIDEBAR;
    _env.config = stateConfig.getConfig()['sidebar'];

    _env.myDIV = document.createElement('div');
    _env.myDIV.classList.add("sidebar");

    stateLocation.listenLocationChanges({ listener: _SIDEBAR._onLocationChanges });
  },

  getComponent() {
    const { _env } = _SIDEBAR;
    return _env.myDIV;
  },

  _render: () => {
    const { _env } = _SIDEBAR;
    const _innerHTML = html`
      <ul>
        ${_SIDEBAR._renderLinks()}
      </ul>
    `;
    render(_innerHTML, _env.myDIV);
  },

  _renderLinks: () => {
    const { links } = _SIDEBAR._env.config;
    const _result = [];

    Object.keys(links).forEach(_k => {
      _result.push( html `<li><a href="${links[_k].url}" data-name="${_k}">${links[_k].text}</a></li>` );
    });
    
    return _result;
  },

  update: () => {
    _SIDEBAR._render();
  },

  _onLocationChanges(_options) {
    const { myDIV } = _SIDEBAR._env;
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