export function createStore(reducer, middleware) {
  let state;
  const handler = [];

  function dispatch(action) {
    middleware(dispatch, action);
    state = reducer(state, action);
    handler.forEach((listener) => {
      listener();
    });
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    handler.push(listener);
  }

  return {
    dispatch,
    getState,
    subscribe,
  };
}
