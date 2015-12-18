"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var is = function is(type, obj) {
    var klass = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && klass.toLowerCase() === type.toLowerCase();
};

var isNot = function isNot(type, obj) {
    return !is(type, obj);
};

var Enum = exports.Enum = function Enum() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return args.reduce(function (r, i) {
        return r[i] = i, r;
    }, {});
};

var Factory = exports.Factory = function Factory(updater, state) {
    var listeners = [];

    if (isNot("function", updater)) {
        throw new TypeError("The 'updater' must be a function");
    }

    var getState = function getState() {
        return state;
    };

    var dispatch = function dispatch(action) {
        action = action || {};
        state = updater(state, action);
        listeners.slice().forEach(function (fn) {
            return fn(action);
        });
        return action;
    };

    var subscribe = function subscribe(fn) {
        listeners.push(fn);
        return function (callback) {
            if (is("function", callback)) {
                callback();
            }
            return listeners.splice(listeners.indexOf(fn), 1);
        };
    };

    return { getState: getState, dispatch: dispatch, subscribe: subscribe };
};
