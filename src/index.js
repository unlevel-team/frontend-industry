'use strict';

import _state from './state';
import _styles from './design'
import _layouts from './layouts';
import _router from './router';

_state.init();  // Initialize state

const _stateConfig = _state.getState({ name: 'config' });
const _configListener = _stateConfig.listenConfigChanges({ listener: (_data) => {
  _layouts.init();  // Initialize layouts
  _layouts.render();
  
  _router.init({ container: _layouts.getLayouts().main.getComponent() }); // Initialize router
  _configListener.unsubscribe();
}});
_stateConfig.loadConfig();