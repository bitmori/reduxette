let is = (type, obj) => {
    let klass = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && klass.toLowerCase() === type.toLowerCase();
};

let isNot = (type, obj) => !is(type, obj);

export const Enum = (...args) => args.reduce((r, i) => (r[i] = i, r), {});

export const Factory = (updater, state) => {
    let listeners = [];

    if (isNot(`function`, updater)) {
        throw new TypeError(`The 'updater' must be a function`);
    }

    let getState = () => state;

    let dispatch = action => {
        action = action || {};
        state = updater(state, action);
        listeners.slice().forEach(fn => fn(action));
        return action;
    };

    let subscribe = fn => {
        listeners.push(fn);
        return (callback) => {
            if (is(`function`, callback)) {
                callback();
            }
            return listeners.splice(listeners.indexOf(fn), 1);
        };
    };

    return { getState, dispatch, subscribe };
};