import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [ thunk ];

const composed =
	process.env.NODE_ENV === 'production'
		? compose(applyMiddleware(...middleware))
		: compose(
				applyMiddleware(...middleware)
				// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
			);

const store = createStore(rootReducer, initialState, composed);

export default store;
