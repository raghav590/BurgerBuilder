import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'
import {Provider}  from 'react-redux';
import BurgerBuilderReducer  from '../src/store/reducers/BurgerBuilder'
import orderReducer from '../src/store/reducers/order'
import auth from './store/reducers/auth'
import {createStore, applyMiddleware,compose, combineReducers} from 'redux'
import thunk from 'redux-thunk'

const Rootreducers=combineReducers({
 BurgerBuilder:BurgerBuilderReducer,
 order:orderReducer,
 auth:auth,
});

const composeEnhancers= process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose
const store=createStore(Rootreducers,composeEnhancers(
 applyMiddleware(thunk)
));


const app = (
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>

);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
