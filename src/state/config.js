'use strict';


const _ENV = {
  url: './assets/config.json',
  subject: null,
  config: null,
};

const _CONFIG = {
  _env: _ENV,

  init: ({ subject }) => {
    _CONFIG._env.subject = subject;
  },

  getConfig: () => _CONFIG._env.config,

  _changeConfig: ({ config }) => {
    _CONFIG._env.config = config;
    _CONFIG._notifyConfigChange();
  },

  loadConfig: () => {
    if (_CONFIG._env.config !== null) { return; }
    const { url } = _CONFIG._env;
    
    fetch(url)
    .then(response => response.json())
    .then(_data => { _CONFIG._changeConfig({ config: _data }); })
    .catch((_error) => {
      console.log('Error loading config', _error);  // TODO: REMOVE DEBUG LOG 📏⏳🔍
    });
  },

  _notifyConfigChange: () => {
    const { config, subject } = _CONFIG._env;
    subject.next({ config });
  },

  listenConfigChanges: ({ listener }) => {
    const { subject } = _CONFIG._env;
    return subject.subscribe({
      next: listener,
    });
  },

  subscribeToConfigChanges: ({ subscriber }) => {
    const { subject } = _CONFIG._env;
    return subject.subscribe(subscriber);
  },
};

export default _CONFIG;