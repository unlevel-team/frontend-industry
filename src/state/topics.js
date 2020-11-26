'use strict';

import stateConfig from './config.js';
import dataLoader from '../utils/data-loader.js';


const _TOPICS = {
  _env: {
    subject: null,
    config: null,
    topics: null,
  },

  init: ({ subject }) => {
    const { _env } = _TOPICS;
    _env.subject = subject;

    const _configListener = stateConfig.listenConfigChanges({ listener: (_data) => {
      if (_env.config !== null) {return;}
      _env.config = _data.config;
      _env.topics = {};
      _env.config.topics.forEach(_topic => {
        _env.topics[_topic] = {};
      });
      _configListener.unsubscribe();
    }});
  },

  loadTopic: ({ framework, name }) => {
    const { topics, config } = _TOPICS._env;

    return new Promise((_resolve, _reject) => {
      try {
        if (_TOPICS.getTopic({ framework, name }) !== null) {
          throw Error(`Topic ${framework}/${name} already loaded.`);
        }
        const url = config['framework-config'][framework].topics[name]['data-file'];
        dataLoader.loadData({ url: `./assets/data/${url}` })
        .then(_data => {
          topics[name][framework] = _data.topics[name];
          _TOPICS._notifyTopicChange({ framework, name });
          _resolve({ topic: topics[name][framework] });
        })
        .catch(_error => {throw _error});
      } catch (_error) {
        _reject(_error);
      }
    });
  },

  getTopic: ({ framework, name }) => {
    const { topics } = _TOPICS._env;

    if (topics[name] === undefined) {
      throw Error(`Topic ${name} not found.`);
    }

    return topics[name][framework] || null;
  },

  _notifyTopicChange: ({ framework, name }) => {
    const { topics, subject } = _TOPICS._env;
    subject.next({ topic: topics[name][framework], framework, name });
  },

  listenTopicsChanges: ({ listener }) => {
    const { subject } = _CONFIG._env;
    return subject.subscribe({
      next: listener,
    });
  },

  subscribeToTopicsChanges: ({ subscriber }) => {
    const { subject } = _CONFIG._env;
    return subject.subscribe(subscriber);
  },
};


export default _TOPICS;