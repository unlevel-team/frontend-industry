'use strict';

import stateConfig from './config.js';


const _ENV = {
  subject: null,
  location: {
    basePath: null,
    title: null, 
    url: null, 
    id: null 
  },
  state: {},
};

const _LOCATION = {
  _env: _ENV,

  init: ({ subject }) => {
    _ENV.subject = subject;
  },

  changeLocation: ({ state = {}, url, id }) => { 
    history.pushState(state, id, url);
    window.dispatchEvent(new PopStateEvent('popstate'));  // Notify history change
    // _LOCATION.notifyLocationChange({ state, title, url, id }); // the router do this
  },

  changeView: ({ urlView }) => {
    const { basePath } = stateConfig.getConfig().router;
    const { protocol,  host } = window.location;
    const _baseURL = `${protocol}//${host}${basePath}`;
    _LOCATION.changeLocation({ url:`${_baseURL}${urlView}`, id:null });
  },

  getLocation: () => _LOCATION._env.location,

  notifyLocationChange: ({ state = {}, title, url, id }) => {
    _ENV.state = state;
    const { location, subject } = _ENV;
    location.title = title; location.url = url; location.id = id;
    subject.next({ state, location });
  },

  listenLocationChanges: ({ listener }) => {
    const { subject } = _ENV;
    return subject.subscribe({
      next: listener,
    });
  },

  subscribeToLocationChanges: ({ subscriber }) => {
    const { subject } = _ENV;
    return subject.subscribe(subscriber);
  },
};

export default _LOCATION;