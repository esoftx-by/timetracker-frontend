import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {projectReducer} from "./reducers/projectsReducer";
import thunkMiddleware from "redux-thunk";
import {taskReducer} from "./reducers/taskReducer";
import {trackReducers} from "./reducers/trackReducer";
import {authReducer} from "./reducers/authReducer";


const Reducers = combineReducers({
    projectsPage: projectReducer,
    auth: authReducer,
    tasks: taskReducer,
    tracks: trackReducers
})

type reducersType = typeof Reducers
export type AppStateType = ReturnType<reducersType>


const store = createStore(Reducers,
    applyMiddleware(thunkMiddleware)
)

export default store

// @ts-ignore
window.store = store
