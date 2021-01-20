'use strict';

import { html, render } from 'lit-html';
import pickerForContext from '../components/pickerForContext';
import pickerForConcept from '../components/pickerForConcept';
import viewsCOMMON from './views-common.js';

/**
 * The core structure for a 'View'
 */
export class ViewCore {
  constructor({ topicName, contexts }) {
    this._env = {
      myDIV: null,
      topicName, 
      contexts,
    };

    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  init() {
    const { _env } = this;
    const { topicName: topic, contexts } = _env;
    _env.myDIV = document.createElement('article');
    _env.myDIV.classList.add("topic");
    _env.myDIV.setAttribute("data-topic", _env.topicName);

    viewsCOMMON.initView({
      view: this,
      topic,
      contexts,
    });
  }

  get component() { return this._env.myDIV; }

  static renderView({ view }) {
    const { _env } = view;
    const { title } = _env.topicData || {};
    const _innerHTML = html`
      <h1>${title}</h1>
      ${pickerForContext.getComponent()}
      ${pickerForConcept.getComponent()}
      ${viewsCOMMON.renderConcepts(_env)}
    `;
    render(_innerHTML, _env.myDIV);
  }

  _render() {
    ViewCore.renderView({ view: this });
  }

  update() {
    pickerForContext.update(this._env);
    pickerForConcept.update({ view: this });
    viewsCOMMON.updateConcepts(this._env);
    this._render();
  }

  forceUpdate() {
    render(html``, this._env.myDIV);
    this.update();
  }
}