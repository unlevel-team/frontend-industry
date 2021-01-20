'use strict';

import stateConfig from './config.js';


const _ENV = {
  subject: null,
  config: null,
  contexts: null,
  context: null,
};

const _CONTEXT = {
  _env: _ENV,

  init: ({ subject }) => {
    _ENV.subject = subject;

    const _configListener = stateConfig.listenConfigChanges({ listener: (_data) => {
      if (_ENV.config !== null) {return;}
      _ENV.config = _data.config;
      _ENV.contexts = _ENV.config.contexts;
      _ENV.context = _ENV.contexts[0];
      _configListener.unsubscribe();
    }});
  },

  changeContext: ({ name }) => {
    if (_ENV.context === name) { return; } // No change is necessary
    _ENV.context = name;
    _CONTEXT._notifyContextChange();
  },

  getContexts: () => _ENV.contexts,
  
  getContext: () => _ENV.context,

  _notifyContextChange: () => {
    const { context, subject } = _ENV;
    subject.next({ context });
  },

  listenContextChanges: ({ listener }) => {
    return _ENV.subject.subscribe({
      next: listener,
    });
  },

  subscribeToContextChanges: ({ subscriber }) => {
    return _ENV.subject.subscribe(subscriber);
  },
};

export default _CONTEXT;