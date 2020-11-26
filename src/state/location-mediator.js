'use strict';


const _LOCATION = {
  _EVENTS: {
    LOCATION_CHANGE: 'locationChange',
  },
  
  _env: {
    ipc: null,
    location: {
      basePath: null,
      title: null, 
      url: null, 
      id: null 
    },
    state: {},
  },

  init: ({ ipc }) => {
    _LOCATION._env.ipc = ipc;
  },

  changeLocation: ({ state = {}, title='', url, id }) => { 
    history.pushState(state, id, url);
    _LOCATION.notifyLocationChange({ state, title, url, id });
  },

  getLocation: () => _LOCATION._env.location,

  notifyLocationChange: ({ state = {}, title, url, id }) => {
    _LOCATION._env.state = state;
    const { location } = _LOCATION._env;
    location.title = title; location.url = url; location.id = id;
    _LOCATION._env.ipc.emit(_LOCATION._EVENTS.LOCATION_CHANGE, { state, location });
  },

  listenLocationChanges: ({ listener }) => {
    _LOCATION._env.ipc.listen(_LOCATION._EVENTS.LOCATION_CHANGE, listener );
  },
};

export default _LOCATION;