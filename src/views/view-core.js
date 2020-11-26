'use strict';

import { html, render } from 'lit-html';
import _pickerForFramework from '../components/pickerForFramework';
import viewsCOMMON from './views-common.js';


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
      ${_pickerForFramework.getComponent()}
      ${viewsCOMMON.renderConcepts(_env)}
    `;
    render(_innerHTML, _env.myDIV);
  }

  _render() {
    ViewCore.renderView({ view: this });
  }

  update() {
    _pickerForFramework.update(this._env);
    viewsCOMMON.updateConcepts(this._env);
    this._render();
  }

  forceUpdate() {
    render(html``, this._env.myDIV);
    this.update();
  }
}