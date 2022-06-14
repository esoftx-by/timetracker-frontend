import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {projectReducer} from "./reducers/projectsReducer";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "./reducers/authReducer";


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;


const Reducers = combineReducers({
    projectsPage: projectReducer,
    auth:authReducer
})


const store = createStore(Reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
))

export default store

window.store = store
