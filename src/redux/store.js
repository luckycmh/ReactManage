import {createStore,applyMiddleware} from "redux";
import {createLogger} from 'redux-logger'
import rootReducer from './index'
const logger = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(logger)
    );

// console.log(process.env.NODE_ENV === 'production')
export default store
