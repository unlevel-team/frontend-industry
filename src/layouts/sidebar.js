import { html, render } from 'lit-html';
import _location_state from '../state/location.js';


const _SIDEBAR = {
  _env: {
    myDIV: null,
  },

  init: () => {
    const { _env } = _SIDEBAR;
    _env.myDIV = document.createElement('div');
    _env.myDIV.classList.add("sidebar");

    _location_state.listenLocationChanges({ listener: _SIDEBAR._onLocationChanges });
  },

  getComponent() {
    const { _env } = _SIDEBAR;
    return _env.myDIV;
  },

  _render: () => {
    const { _env } = _SIDEBAR;
    const _innerHTML = html`
      <ul>
        <li><a href="./html-basics" data-name="html-basics">HTML basics</a></li>
        <li><a href="./templates" data-name="templates">Templates</a></li>
        <li><a href="./components" data-name="components">Components</a></li>
        <li><a href="./state-lifecycle" data-name="state-lifecycle">State and lifecycle</a></li>
        <li><a href="./conditional-rendering" data-name="conditional-rendering">Conditional rendering</a></li>
      </ul>
    `;
    render(_innerHTML, _env.myDIV);
  },

  update: () => {
    _SIDEBAR._render();
  },

  _onLocationChanges(_options) {
    const { myDIV } = _SIDEBAR._env;
    const { title } = _location_state.getLocation();
    myDIV.querySelectorAll('li a.is-active')
      .forEach((_link) => { _link.classList.remove('is-active'); });
    if (title !== null) {
      myDIV.querySelector(`li a[data-name="${title}"]`)
        .classList.add('is-active');
    }
  },

};

export default _SIDEBAR;