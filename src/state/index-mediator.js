'use strict';

import { InterProcessCOM } from '../utils/ipc.js'
import _LOCATION from './location-mediator.js';


const _STATE = {
  _env: {
    ipc: null,
    states: {},
  },

  init: () => {
    const { states } = _STATE._env;
    _STATE._env.ipc = new InterProcessCOM();
    
    _LOCATION.init({ ipc: _STATE._env.ipc });
    states.location = _LOCATION;
  },

  getState: ({ name }) => {
    return _STATE._env.states[name];
  },

};

export default _STATE;