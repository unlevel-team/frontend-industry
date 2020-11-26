import { html, render } from 'lit-html';


export class SectionForConcept {
  constructor({ data }) {
    this._env = {
      myDIV: null,
      data: {
        title: null,
        docLink: null,
        description: null,
        codeLanguage: null,
        code: null,
      },
    };

    if (data) { this.data = data; }

    this.update = this.update.bind(this);

    this._init();
  }

  _init() {
    const { _env } = this;
    _env.myDIV = document.createElement('section');
    _env.myDIV.classList.add("concept");
  }

  get component() {
    const { _env } = this;
    return _env.myDIV;
  }

  set data({ title, docLink, description, codeLanguage, code, codes }) {
    const { _env } = this;
    _env.data = {
      ..._env.data,
      title, docLink, description, codeLanguage, code, codes
    };
  }

  get data() { return this._env.data; }

  _render() {
    const { myDIV, data } = this._env;
    const { Prism } = window;

    const _innerHTML = html`
      <h2 class="title">${data.title}</h2>
      <a class="docLink" href="${data.docLink}" target="_blank">doc</a> <br>
      <div class="description">${html([data.description])}</div>
      ${this._renderCodes()}  
    `;
    render(_innerHTML, myDIV);

    for (const _codeElements of myDIV.querySelectorAll('pre code')) {
      Prism.highlightElement(_codeElements);
    }
  }

  _renderCodes() {
    const { codes } = this._env.data;
    const _result = [];

    codes.forEach(_codeItem => {
      _result.push( html `<pre><code class="language-${_codeItem.language}">${html([_codeItem.code])}</code></pre>` );
    });
    
    return _result;
  }

  update() {
    this._render();
  }
}