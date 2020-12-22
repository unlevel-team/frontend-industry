'use strict';

import _header from './header.js';
import _sidebar from './sidebar.js';
import _main from './main.js';


const _LAYOUT = {
  _env: {
    initialized: false,
    layouts: {},
    bodyContainer: null,
    mainContainer: null,
  },

  init: () => {
    const {_env} = _LAYOUT;
    if (_env.initialized === true) { return; }

    _env.bodyContainer = document.createElement('div');
    _env.bodyContainer.classList.add("bodyContainer");
    document.body.appendChild(_env.bodyContainer);    

    _header.init();
    _env.bodyContainer.appendChild(_header.getComponent());
    _env.layouts.header = _header;

    _env.mainContainer = document.createElement('div'); // Contains 'sidebar' and 'main' layers
    _env.mainContainer.classList.add("mainContainer");
    _env.bodyContainer.appendChild(_env.mainContainer);

    _sidebar.init();
    _env.mainContainer.appendChild(_sidebar.getComponent());
    _env.layouts.sidebar = _sidebar;
    _main.init();
    _env.mainContainer.appendChild(_main.getComponent());
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