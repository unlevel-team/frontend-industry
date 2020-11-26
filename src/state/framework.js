'use strict';

import stateConfig from './config.js';


const _FRAMEWORK = {
  _env: {
    subject: null,
    config: null,
    frameworks: null,
    framework: null,
  },

  init: ({ subject }) => {
    const { _env } = _FRAMEWORK;
    _env.subject = subject;

    const _configListener = stateConfig.listenConfigChanges({ listener: (_data) => {
      if (_env.config !== null) {return;}
      _env.config = _data.config;
      _env.frameworks = _env.config.frameworks;
      _env.framework = _env.frameworks[0];
      _configListener.unsubscribe();
    }});
  },

  changeFramework: ({ name }) => {
    if (_FRAMEWORK._env.framework === name) { return; } // No change is necessary
    _FRAMEWORK._env.framework = name;
    _FRAMEWORK._notifyFrameworkChange();
  },

  getFrameworks: () => _FRAMEWORK._env.frameworks,
  
  getFramework: () => _FRAMEWORK._env.framework,

  _notifyFrameworkChange: () => {
    const { framework, subject } = _FRAMEWORK._env;
    subject.next({ framework });
  },

  listenFrameworkChanges: ({ listener }) => {
    const { subject } = _FRAMEWORK._env;
    return subject.subscribe({
      next: listener,
    });
  },

  subscribeToFrameworkChanges: ({ subscriber }) => {
    const { subject } = _FRAMEWORK._env;
    return subject.subscribe(subscriber);
  },
};

export default _FRAMEWORK;