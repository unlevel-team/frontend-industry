'use strict';

import { Router } from '@vaadin/router';
import _state_location from '../state/location.js';
import _views from '../views';


const _ROUTER = {
  _env: {
    router: null,
    container: null,
  },

  _MESSAGES: {
    LOCATION_CHANGE: 'locationChange',
  },

  init: ({ basePath = null, container }) => {
    const { _env } = _ROUTER;
    _env.basePath = basePath !== null ? basePath : `${window.location.pathname}`;
    _env.container = container;
    _env.router = new Router(_env.container, { baseUrl: _env.basePath });
    // _env.router = new Router(_env.container);

    console.log('ROUTER', _env);  // TODO: REMOVE DEBUG LOG 📏⏳🔍

    _views.init();
    _ROUTER._initRoutes();
  },

  _initRoutes: () => {
    const { router, container } = _ROUTER._env;
    router.setRoutes([
      {path: '/', action: (context, commands) => {
        return commands.redirect('/html-basics');
      }},
      {path: '/html-basics', action: (context, commands) => {
        return _ROUTER._changeView({ name: 'html-basics', context });
      }},
      {path: '/templates', action: (context, commands) => {
        return _ROUTER._changeView({ name: 'templates', context });
      }},
      {path: '/components', action: (context, commands) => {
        return _ROUTER._changeView({ name: 'components', context });
      }},
      {path: '/state-lifecycle', action: (context, commands) => {
        return _ROUTER._changeView({ name: 'state-lifecycle', context });
      }},
      {path: '/conditional-rendering', action: (context, commands) => {
        return _ROUTER._changeView({ name: 'conditional-rendering', context });
      }},
    ]);
  },

  _changeView: ({ name, context }) => {
    const { container } = _ROUTER._env;
    const _view = _views.getView({ name });
    _view.forceUpdate ? _view.forceUpdate() : _view.update();
    
    container.innerHTML = ''; // Clear container and force update???
    container.appendChild(_view.component);

    _state_location.notifyLocationChange({ title: name, url: context.pathname, id: name });

    return _view.component;
  },
};


export default _ROUTER;