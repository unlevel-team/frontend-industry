'use strict';

import configState from '../state/config.js';
import stateLocation from '../state/location.js';
import stateContext from '../state/context.js';
import { ViewCore } from './view-core.js';
import pickerForConcept from '../components/pickerForConcept';
import pickerForContext from '../components/pickerForContext';


const _VIEWS = {
  _env: {
    activeView: null,
    views: {},
  },

  init: () => {
    stateLocation.listenLocationChanges({ listener: _VIEWS._onLocationChanges });
    stateContext.listenContextChanges({ listener: _VIEWS._onContextChanges });

    pickerForConcept.init();
    pickerForContext.init();
    _VIEWS._initTopicsViews();
  },

  _initTopicsViews: () => {
    const _config = configState.getConfig();
    const { topics, contexts } = _config;
    const { _env } = _VIEWS

    const _views = {};
    topics.forEach(_topic => {
      const _topicDATA = {
        topicName: _topic,
        contexts: [],
      };
      contexts.forEach(_context => {
        if (_config['contexts-config'][_context].topics[_topic] !== undefined) {
          _topicDATA.contexts.push(_context);
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

    const context = stateContext.getContext();
    if (_view._env.contexts.includes(context)) {
      _view.loadTopic({ context });
    } else {
      stateContext.changeContext({ name: _view._env.contexts[0] });  // Load 'default' context
    }
  },

  _onContextChanges(_options) {
    const { activeView } = _VIEWS._env;
    const { context } = _options;
    if (activeView === null) { return; }
    _VIEWS.getView({ name: activeView }).loadTopic({ context });
  },
};


export default _VIEWS;