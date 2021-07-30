import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducer';

const initialState = {};

const middleware = [thunk];

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
//const composeEnhancers =  compose;
const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middleware),
));

export default store;