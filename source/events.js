const rx = require('rx');
const EventEmitter = require('events').EventEmitter;

const eventEmitter = new EventEmitter();

// Dictionary of observables for events.
const observables = {};

// Creates an observable for an event.
exports.observe = (event) => {
  observables[event] = rx.Observable.fromEvent(eventEmitter, event);
  return observables[event];
};

// Subscribes to an event type and returns the subscription.
exports.subscribe = (event, callback) => observables[event].subscribe(callback);

// Emit some event.
exports.emit = (event, data) => {
  eventEmitter.emit(event, data);
};
