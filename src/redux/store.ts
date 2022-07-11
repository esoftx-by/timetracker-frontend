import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {projectReducer} from "./reducers/projectsReducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
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


type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never

export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;

const store = createStore(Reducers,
    applyMiddleware(thunkMiddleware)
)

export default store

// @ts-ignore
window.store = store
