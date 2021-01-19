'use strict';

import { html, render } from 'lit-html';


const _ENV = {
  myDIV: null,
  view: null,
  viewLayer: null,
  topicName: null,
  topicData: null,
};

const _PICKCONCEPT = {
  _env: _ENV,

  init: () => {
    if (_ENV.myDIV !== null) { return; }

    _ENV.myDIV = document.createElement('div');
    _ENV.myDIV.classList.add("pickerForConcept");
  },

  getComponent() {
    return _ENV.myDIV;
  },

  _render: () => {
    const { concepts } = _ENV.topicData;
    let _innerHTML = '';

    if (Object.keys(concepts).length > 1) {  // Only render buttons for more than one concept
      _innerHTML = html`
      <fieldset>
        <legend>Concepts</legend>
        ${_PICKCONCEPT._renderButtons()}
      </fieldset>
    `;
    }

    render(_innerHTML, _ENV.myDIV);
  },

  _renderButtons() {
    const { concepts } = _ENV.topicData;
    const _result = [];

    Object.keys(concepts).forEach(_k => {
      _result.push( html `<button data-concept="${_k}" @click=${_PICKCONCEPT._handleButtonClick}>${concepts[_k].title}</button>` );
    });
    
    return _result;
  },

  update: ({ view }) => {
    _ENV.view = view;
    _ENV.viewLayer = view._env.myDIV;
    _ENV.topicName = view._env.topicName;
    _ENV.topicData = view._env.topicData;

    if (_ENV.topicData === null) { return; }
    
    _PICKCONCEPT._render();
  },

  _handleButtonClick: (_event) => {
    const _concept = _event.srcElement.attributes["data-concept"].value;

    _ENV.viewLayer.querySelector(`section[data-concept="${_concept}"]`)
    .scrollIntoView({ block: "start", behavior: "smooth" });
  },
};

export default _PICKCONCEPT;