'use strict';

import { Router } from '@vaadin/router';
import stateConfig from '../state/config.js';
import stateLocation from '../state/location.js';
import _views from '../views';


const _ROUTER = {
  _env: {
    basePath: null,
    container: null,
    router: null,
    routerConfig: null,
  },

  init: ({ basePath = null, container }) => {
    const { _env } = _ROUTER;
    _env.basePath = basePath !== null ? basePath : `${window.location.pathname}`;
    _env.container = container;
    _env.router = new Router(_env.container, { baseUrl: _env.basePath });
    _env.routerConfig = stateConfig.getConfig()['router'];

    _views.init();
    _ROUTER._initRoutes();
  },

  _initRoutes: () => {
    const { router, container, routerConfig } = _ROUTER._env;
    const _routes = [];

    _routes.push({path: '/', action: (context, commands) => {
      return commands.redirect(routerConfig.default);
    }});

    Object.keys(routerConfig.routes).forEach(_k => {
      _routes.push({
        path: routerConfig.routes[_k].url, 
        action: (context, commands) => {
          return _ROUTER._changeView({ name: _k, context });
        }
      });
    });

    router.setRoutes(_routes);
  },

  _changeView: ({ name, context }) => {
    const { container } = _ROUTER._env;
    const _view = _views.getView({ name });
    _view.forceUpdate ? _view.forceUpdate() : _view.update(); // Force update for the view???
    
    container.innerHTML = ''; // Clear container and force update???
    container.appendChild(_view.component);

    stateLocation.notifyLocationChange({ title: name, url: context.pathname, id: name });

    return _view.component;
  },
};


export default _ROUTER;