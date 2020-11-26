/**
 * inter-process communication (IPC)
 */

/*
In software engineering, the mediator pattern defines an object that encapsulates 
how a set of objects interact. This pattern is considered to be a behavioral 
pattern due to the way it can alter the program's running behavior.

With the mediator pattern, communication between objects is encapsulated within a 
mediator object. Objects no longer communicate directly with each other, 
but instead communicate through the mediator. This reduces the dependencies 
between communicating objects, thereby reducing coupling.

@see https://addyosmani.com/largescalejavascript/
*/

const getNew_Mediator = () => { // Mediator factory

  const mediator = (function(){
    var subscribe = function(channel, fn) { // Subscribe to a mediator channel
      if (!mediator.channels[channel]) mediator.channels[channel] = [];
      mediator.channels[channel].push({ context: this, callback: fn });
      return this;
    },
  
    publish = function(channel) { // Publish a message into some mediator channel
      if (!mediator.channels[channel]) return false;
      var args = Array.prototype.slice.call(arguments, 1);
      for (var i = 0, l = mediator.channels[channel].length; i < l; i++) {
        var subscription = mediator.channels[channel][i];
        subscription.callback.apply(subscription.context, args);
      }
      return this;
    };
  
    return {
      channels: {},
      publish: publish,
      subscribe: subscribe,
      installTo: function(obj){
        obj.subscribe = subscribe;
        obj.publish = publish;
      }
    };
  
  }());

  return mediator;
};


/**
 * The inter-process communication facility
 */
export class InterProcessCOM {
  constructor() {
    this._env = {
      mediator: null,
      signal: {},
    };
    this._init();
  }

  _init() {  // Initialize a IPC of the type SIGNAL
    const mediator = getNew_Mediator();
    this._env.mediator = mediator;
    mediator.installTo(this._env.signal);
    this.listen = (..._options) =>  {this._env.signal.subscribe(..._options)};  // mehod for listen to signals
    this.emit = (..._options) => {  // method for emit signals
      this._env.signal.publish(..._options);
    };
  }

}
