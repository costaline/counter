import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import reducers from "~src/reducers";

const composeEnhancers = composeWithDevTools({
  trace: false
});

const enhancers = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducers, enhancers);

export default store;
