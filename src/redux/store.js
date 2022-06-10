import {combineReducers, createStore} from "redux";
import {projectReducer} from "./reducers/projectsReducer";


const Reducers = combineReducers({
    project: projectReducer
})


const store = createStore(Reducers)

export default store

window.store = store
