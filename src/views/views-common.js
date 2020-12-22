'use strict';

import { html, render } from 'lit-html';
import { SectionForConcept } from '../components/sectionForConcept';
import stateTopics from '../state/topics.js';


const _COMMON = {
  initView: ({ view }) => {
    view._env = {
      ...view._env,
      active: false,
      topicData: null,
      concepts: {},
    };

    view.activate = () => { view._env.active = true; };
    view.deactivate = () => { view._env.active = false; };
    view.loadTopic = ({ framework }) => { _COMMON.loadTopic({ view, framework }); };
  },

  loadTopic: ({ view, framework }) => {
    const { _env } = view;
    const { topicName } = _env;

    let _topic = stateTopics.getTopic({ framework, name: topicName });
    if (_topic !== null) {
      _env.topicData = _topic;
      _COMMON.initConcepts(_env);
      view.update();
      return;
    }

    stateTopics.loadTopic({ framework, name: topicName })
    .then(({ topic }) => {
      _env.topicData = topic;
      _COMMON.initConcepts(_env);
      view.update();
    })
    .catch(_error => { throw _error; })
  },

  initConcepts: ({ concepts, topicData }) => {
    if (topicData === null) { return; } // TODO: REVIEW CODE 🔍⚠️ Data is not initialized 

    topicData.conceptsOrder.forEach((_conceptName) => {
      concepts[_conceptName] = new SectionForConcept({ data: topicData.concepts[_conceptName] });
    });
  },

  updateConcepts: ({ concepts, topicData }) => {
    if (topicData === null) { return; } // TODO: REVIEW CODE 🔍⚠️ Data is not initialized 

    topicData.conceptsOrder.forEach((_conceptName) => {
      concepts[_conceptName].update();
    });
  },

  renderConcepts: ({ concepts, topicData }) => {
    if (topicData === null) { return; } // TODO: REVIEW CODE 🔍⚠️ Data is not initialized 

    let _html = [];

    topicData.conceptsOrder.forEach((_conceptName) => {
      _html.push(html `${concepts[_conceptName].component}`);
    });

    return _html;
  },

};

export default _COMMON;