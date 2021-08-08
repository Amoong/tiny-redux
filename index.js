import { createStore } from "./redux.js";

const COUNT = "count";
const FETCH = "fetch";

function middleware(dispatch, action) {
  console.log(action);
}

function updater(state, action) {
  if (action.type === COUNT) {
    return {
      ...state,
      counter: action.payload.counter,
    };
  }
  if (action.type === FETCH) {
  }
  return state;
}

function listener() {
  console.log(store.getState());
}

function actionCreator(type, payload) {
  return {
    type,
    payload,
  };
}

const store = createStore(updater, middleware);

store.subscribe(listener);

store.dispatch(actionCreator(COUNT, { counter: 1 }));

function counter(data) {
  store.dispatch(actionCreator(COUNT, data));
}

counter({ counter: 5 });
