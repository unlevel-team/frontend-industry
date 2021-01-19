'use strict';

import { html, render } from 'lit-html';
import pickerForFramework from '../components/pickerForFramework';
import pickerForConcept from '../components/pickerForConcept';
import viewsCOMMON from './views-common.js';

/**
 * The core structure for a 'View'
 */
export class ViewCore {
  constructor({ topicName, frameworks }) {
    this._env = {
      myDIV: null,
      topicName, 
      frameworks,
    };

    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  init() {
    const { _env } = this;
    const { topicName: topic, frameworks } = _env;
    _env.myDIV = document.createElement('article');
    _env.myDIV.classList.add("topic");
    _env.myDIV.setAttribute("data-topic", _env.topicName);

    viewsCOMMON.initView({
      view: this,
      topic,
      frameworks,
    });
  }

  get component() { return this._env.myDIV; }

  static renderView({ view }) {
    const { _env } = view;
    const { title } = _env.topicData || {};
    const _innerHTML = html`
      <h1>${title}</h1>
      ${pickerForFramework.getComponent()}
      ${pickerForConcept.getComponent()}
      ${viewsCOMMON.renderConcepts(_env)}
    `;
    render(_innerHTML, _env.myDIV);
  }

  _render() {
    ViewCore.renderView({ view: this });
  }

  update() {
    pickerForFramework.update(this._env);
    pickerForConcept.update({ view: this });
    viewsCOMMON.updateConcepts(this._env);
    this._render();
  }

  forceUpdate() {
    render(html``, this._env.myDIV);
    this.update();
  }
}