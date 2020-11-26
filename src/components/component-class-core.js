import { html, render } from 'lit-html';


export class Component {
  constructor() {
    this._env = {
      myDIV: null,
    };

    this.update = this.update.bind(this);

    this._init();
  }

  _init() {
    const { _env } = this;
    _env.myDIV = document.createElement('div');
    // _env.myDIV.classList.add("header");
  }

  get component() {
    const { _env } = this;
    return _env.myDIV;
  }

  _render() {
    const { _env } = this;
    const _innerHTML = html`<h3>My element</h3>`;
    render(_innerHTML, _env.myDIV);
  }

  update() {
    this._render();
  }
}