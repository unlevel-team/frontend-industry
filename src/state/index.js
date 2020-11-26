'use strict';

import { Subject } from 'rxjs';
import _LOCATION from './location.js';
import _CONFIG from './config.js';
import _TOPICS from './topics.js';
import _FRAMEWORK from './framework.js';


const _STATE = {
  _env: {
    states: {},
  },

  init: () => {
    const { states } = _STATE._env;
    _LOCATION.init({ subject: new Subject() });
    states.location = _LOCATION;
    _CONFIG.init({ subject: new Subject() });
    states.config = _CONFIG;
    _TOPICS.init({ subject: new Subject() });
    states.topics = _TOPICS;
    _FRAMEWORK.init({ subject: new Subject() });
    states.framework = _FRAMEWORK;
  },

  getState: ({ name }) => {
    return _STATE._env.states[name];
  },

};

export default _STATE;