'use strict';


const _LOCATION = {
  _env: {
    subject: null,
    location: {
      basePath: null,
      title: null, 
      url: null, 
      id: null 
    },
    state: {},
  },

  init: ({ subject }) => {
    _LOCATION._env.subject = subject;
  },

  changeLocation: ({ state = {}, title='', url, id }) => { 
    history.pushState(state, id, url);
    _LOCATION.notifyLocationChange({ state, title, url, id });
  },

  getLocation: () => _LOCATION._env.location,

  notifyLocationChange: ({ state = {}, title, url, id }) => {
    _LOCATION._env.state = state;
    const { location, subject } = _LOCATION._env;
    location.title = title; location.url = url; location.id = id;
    subject.next({ state, location });
  },

  listenLocationChanges: ({ listener }) => {
    const { subject } = _LOCATION._env;
    return subject.subscribe({
      next: listener,
    });
  },

  subscribeToLocationChanges: ({ subscriber }) => {
    const { subject } = _LOCATION._env;
    return subject.subscribe(subscriber);
  },
};

export default _LOCATION;