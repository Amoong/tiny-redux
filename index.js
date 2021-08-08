import { createStore } from "./redux.js";

const COUNT = "count";
const FETCH = "fetch";

const middleware1 = store => dispatch => action => {
  if (action.type === FETCH) {
    setTimeout(() => {
      dispatch({
        type: "fetch-response",
        payload: [1, 2, 3],
      });
    }, 2000);
  } else {
    dispatch(action);
  }
};

const middleware2 = store => dispatch => action => {
  console.log("mid 2");
  dispatch(action);
};

function reducer(state, action) {
  if (action.type === COUNT) {
    return {
      ...state,
      counter: action.payload.counter,
    };
  }
  if (action.type === "fetch-response") {
    return {
      ...state,
      response: action.payload,
    };
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

const store = createStore(reducer, [middleware1, middleware2]);

store.subscribe(listener);

function counter(data) {
  store.dispatch(actionCreator(COUNT, data));
}

counter({ counter: 1 });
store.dispatch(actionCreator(FETCH));
