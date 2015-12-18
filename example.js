import * as Reduxette from './index';

let constants = Reduxette.Enum("INCREMENT");

let updater = (state, action) => {
    state = state || 0;
    if (action.type === constants.INCREMENT) {
        return state + 10;
    }
    return state;
};

let reduxette = Reduxette.Factory(updater);
let action = {type: constants.INCREMENT};
let unsubscribe = reduxette.subscribe(() => {
    console.log(reduxette.getState());
});

reduxette.dispatch(action); // 10
reduxette.dispatch(action); // 20
reduxette.dispatch(action); // 30

unsubscribe(() => console.log(`unsubscribed`));

reduxette.dispatch(action); // nothing will happen

