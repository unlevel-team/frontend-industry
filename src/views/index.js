'use strict';

import _configState from '../state/config.js';
import stateLocation from '../state/location.js';
import stateFramework from '../state/framework.js';
import { ViewCore } from './view-core.js';
import pickerForConcept from '../components/pickerForConcept';
import pickerForFramework from '../components/pickerForFramework';

const _VIEWS = {
  _env: {
    activeView: null,
    views: {},
  },

  init: () => {
    stateLocation.listenLocationChanges({ listener: _VIEWS._onLocationChanges });
    stateFramework.listenFrameworkChanges({ listener: _VIEWS._onFrameworkChanges });

    pickerForConcept.init();
    pickerForFramework.init();
    _VIEWS._initTopicsViews();
  },

  _initTopicsViews: () => {
    const _config = _configState.getConfig();
    const { topics, frameworks } = _config;
    const { _env } = _VIEWS

    const _views = {};
    topics.forEach(_topic => {
      const _topicDATA = {
        topicName: _topic,
        frameworks: [],
      };
      frameworks.forEach(_framework => {
        if (_config['framework-config'][_framework].topics[_topic] !== undefined) {
          _topicDATA.frameworks.push(_framework);
        }
      });
      _views[_topic] = new ViewCore(_topicDATA);
      _views[_topic].init();
    });

    _env.views = _views;
  },

  getView: ({ name }) => {
    const { views } = _VIEWS._env;
    return views[name];
  },

  _onLocationChanges(_options) {
    const { _env } = _VIEWS;
    const { title } = stateLocation.getLocation();

    if (_env.activeView !== null) {
      _VIEWS.getView({ name: _env.activeView }).deactivate();
    }
    _env.activeView = title;
    const _view = _VIEWS.getView({ name: title });
    _view.activate();

    const framework = stateFramework.getFramework();
    if (_view._env.frameworks.includes(framework)) {
      _view.loadTopic({ framework });
    } else {
      stateFramework.changeFramework({ name: _view._env.frameworks[0] });  // Load 'default' framework
    }
  },

  _onFrameworkChanges(_options) {
    const { activeView } = _VIEWS._env;
    const { framework } = _options;
    if (activeView === null) { return; }
    _VIEWS.getView({ name: activeView }).loadTopic({ framework });
  },
};


export default _VIEWS;