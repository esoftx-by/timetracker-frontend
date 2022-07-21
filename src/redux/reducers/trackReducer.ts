import {TracksAPI} from "../../API/api";
import {allTracksByProjectIdType} from "../../types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "../store";

const SET_ALL_TRACKS = 'tracks/SET_ALL_TRACKS'
const SET_NEW_TRACK = 'tracks/SET_NEW_TRACK'
const SET_ALL_TRACK_BY_USER_ID = 'tracks/SET_ALL_TRACK_BY_USER_ID'
const SET_TRACKS_BY_TASK_ID = 'tracks/SET_ALL_TRACK_BY_USER_ID'
const SET_ALL_TRACKS_BY_PROJECT_ID = 'tracks/SET_ALL_TRACKS_BY_PROJECT_ID'


type initialStateType = {
    allTracks: null | Array<allTracksByProjectIdType>,
    // allTrackByUserId: null | Array<allTracksByProjectIdType>,
    tracksByTaskId: null | Array<allTracksByProjectIdType>,
    allTracksByProjectId: Array<allTracksByProjectIdType>
}

const initialState: initialStateType = {
    allTracks: [],
    // allTrackByUserId: [],
    tracksByTaskId: null,
    allTracksByProjectId: []
}

export const trackReducers = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case SET_NEW_TRACK:
            let stateCopy = {...state}
            stateCopy.allTracksByProjectId = [...state.allTracksByProjectId]
            stateCopy.tracksByTaskId = [...state.tracksByTaskId as Array<allTracksByProjectIdType>]
            stateCopy.tracksByTaskId.push(action.data)
            stateCopy.allTracksByProjectId.push(action.data)
            return stateCopy
        case SET_ALL_TRACKS:
            return {
                ...state,
                allTracks: action.data
            }
        // case SET_ALL_TRACK_BY_USER_ID:
        //     return {
        //         ...state,
        //         allTrackByUserId: action.data
        //     }
        case SET_TRACKS_BY_TASK_ID:
            return {
                ...state,
                tracksByTaskId: action.data
            }
        case SET_ALL_TRACKS_BY_PROJECT_ID:
            return {
                ...state,
                allTracksByProjectId: action.data
            }
        default:
            return state
    }
}


type ActionsType = InferActionTypes<typeof actions>
type ThunkTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

const actions = {
    setAllTracks: (data: Array<allTracksByProjectIdType>)=> ({type: SET_ALL_TRACKS, data} as const),
    setNewTrack: (data: allTracksByProjectIdType) => ({type: SET_NEW_TRACK, data} as const),
    setAllTracksByUserId: (data: Array<allTracksByProjectIdType>) => ({
        type: SET_ALL_TRACK_BY_USER_ID,
        data
    } as const),
    setTracksByTaskId: (data: Array<allTracksByProjectIdType>) => ({
        type: SET_TRACKS_BY_TASK_ID,
        data
    } as const),
    setAllTracksByProjectId: (data: Array<allTracksByProjectIdType>) => ({
        type: SET_ALL_TRACKS_BY_PROJECT_ID,
        data
    } as const)
}




export const setAllTracksByProjectIdThunk = (projectId: number): ThunkTypes => {
    return async dispatch => {
        let response = await TracksAPI.setAllTracksByProjectId(projectId)
        if (response.data.success) {
            let allTracksByProjectId: Array<allTracksByProjectIdType> = response.data.response
            dispatch(actions.setAllTracksByProjectId(allTracksByProjectId))
        }
    }
}


export const setNewTrackThunk = (userId: number, taskId: number, startTime: string, hours: number): ThunkTypes => {
    return async dispatch => {
        TracksAPI.newTrack(userId, taskId, startTime, hours)
            .then(response => {
                if (response.data.success) {
                    let newTrack = response.data.response
                    dispatch(actions.setNewTrack(newTrack))
                }
            })
    }
}

export const SetAllTracksThunks = (): ThunkTypes => {
    return async dispatch => {
        let response = await TracksAPI.setAllTracks()
        if (response.data.success) {
            let allTracks: Array<allTracksByProjectIdType> = response.data.response
            dispatch(actions.setAllTracks(allTracks))
        }
    }
}

export const setAllTracksByUserIdThunk = (userId: number): ThunkTypes => {
    return async dispatch => {
        let response = await TracksAPI.setAllTracksByUserId(userId)
        if (response.data.success) {
            let allTracksByUser: Array<allTracksByProjectIdType> = response.data.response
            dispatch(actions.setAllTracksByUserId(allTracksByUser))
        }
    }
}
export const setTracksByTaskIdThunk = (TaskId: number): ThunkTypes => {
    return async dispatch => {
        let response = await TracksAPI.setTracksByTaskId(TaskId)
        if (response.data.success) {
            let allTracksByTask: Array<allTracksByProjectIdType> = response.data.response
            dispatch(actions.setTracksByTaskId(allTracksByTask))
        }
    }
}
