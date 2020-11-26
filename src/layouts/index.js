'use strict';

import _header from './header.js';
import _sidebar from './sidebar.js';
import _main from './main.js';


const _LAYOUT = {
  _env: {
    initialized: false,
    layouts: {},
  },

  init: () => {
    const {_env} = _LAYOUT;
    if (_env.initialized === true) { return; }

    _header.init();
    document.body.appendChild(_header.getComponent());
    _env.layouts.header = _header;
    _sidebar.init();
    document.body.appendChild(_sidebar.getComponent());
    _env.layouts.sidebar = _sidebar;
    _main.init();
    document.body.appendChild(_main.getComponent());
    _env.layouts.main = _main;

    _env.initialized = true;
  },

  getLayouts: () => { return _LAYOUT._env.layouts; },

  render: () => {
    _header.update();
    _sidebar.update();
    _main.update();
  },

};

// HOT MODULE REPLACEMENT !!!
if (module.hot) {
  module.hot.accept(['./header.js', './sidebar.js'], ()=> {
    _LAYOUT.render();
  });
}

export default _LAYOUT;