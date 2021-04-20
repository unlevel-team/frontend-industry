'use strict';

import { Subject } from 'rxjs';
import _CONFIG from './config.js';
import _LOCATION from './location.js';
import _TOPICS from './topics.js';
import _CONTEXT from './context.js';


const _STATE = {
  _env: {
    states: {},
  },

  init: () => {
    const { states } = _STATE._env;
    _CONFIG.init({ subject: new Subject() });
    states.config = _CONFIG;
    _LOCATION.init({ subject: new Subject() });
    states.location = _LOCATION;
    _TOPICS.init({ subject: new Subject() });
    states.topics = _TOPICS;
    _CONTEXT.init({ subject: new Subject() });
    states.context = _CONTEXT;
  },

  getState: ({ name }) => {
    return _STATE._env.states[name];
  },

};

export default _STATE;