import {TracksAPI} from "../../API/api";
import {AllTracksByProjectIdType} from "../../types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "../store";

const SET_ALL_TRACKS = 'tracks/SET_ALL_TRACKS'
const SET_NEW_TRACK = 'tracks/SET_NEW_TRACK'
const SET_ALL_TRACK_BY_USER_ID = 'tracks/SET_ALL_TRACK_BY_USER_ID'
const SET_TRACKS_BY_TASK_ID = 'tracks/SET_ALL_TRACK_BY_USER_ID'
const SET_ALL_TRACKS_BY_PROJECT_ID = 'tracks/SET_ALL_TRACKS_BY_PROJECT_ID'
const DELETE_TRACK = 'tracks/DELETE_TRACK'
const UPDATE_TRACK = 'tracks/UPDATE_TRACK'


export type initialStateType = {
    allTracks: null | Array<AllTracksByProjectIdType>,
    tracksByTaskId: Array<AllTracksByProjectIdType>,
    allTracksByProjectId: Array<AllTracksByProjectIdType>
}

const initialState: initialStateType = {
    allTracks: [],
    tracksByTaskId: [],
    allTracksByProjectId: []
}

export const trackReducers = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case SET_NEW_TRACK:
            let stateCopy = {...state}
            stateCopy.allTracksByProjectId = [...state.allTracksByProjectId]
            stateCopy.allTracksByProjectId.push(action.data)
            stateCopy.tracksByTaskId = [...state.tracksByTaskId as Array<AllTracksByProjectIdType>]
            stateCopy.tracksByTaskId.push(action.data)
            return stateCopy
        case SET_ALL_TRACKS:
            return {
                ...state,
                allTracks: action.data
            }
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
        case DELETE_TRACK:
            let copyState = {...state}
            copyState.allTracksByProjectId = [...state.allTracksByProjectId]
            copyState.allTracksByProjectId = copyState.allTracksByProjectId.filter(el => el.id !== action.id)
            copyState.tracksByTaskId = [...state.tracksByTaskId as Array<AllTracksByProjectIdType>]
            copyState.tracksByTaskId = copyState.tracksByTaskId.filter(el => el.id !== action.id)
            return copyState
        case UPDATE_TRACK: {
            return {
                ...state,
                tracksByTaskId: state.tracksByTaskId.map(el => el.id === action.updateTrack.id ? action.updateTrack : el)
            }
        }
        default:
            return state
    }
}


type ActionsType = InferActionTypes<typeof actions>
type ThunkTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const actions = {
    setAllTracks: (data: Array<AllTracksByProjectIdType>) => ({type: SET_ALL_TRACKS, data} as const),
    setNewTrack: (data: AllTracksByProjectIdType) => ({type: SET_NEW_TRACK, data} as const),
    setAllTracksByUserId: (data: Array<AllTracksByProjectIdType>) => ({
        type: SET_ALL_TRACK_BY_USER_ID,
        data
    } as const),
    setTracksByTaskId: (data: Array<AllTracksByProjectIdType>) => ({
        type: SET_TRACKS_BY_TASK_ID,
        data
    } as const),
    setAllTracksByProjectId: (data: Array<AllTracksByProjectIdType>) => ({
        type: SET_ALL_TRACKS_BY_PROJECT_ID,
        data
    } as const),
    deleteTrack: (id: number) => ({type: DELETE_TRACK, id} as const),
    updateTrack: (updateTrack: any) => ({type: UPDATE_TRACK, updateTrack} as const)
}


export const deleteTrackThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        try {
            await TracksAPI.deleteTrack(id)
            dispatch(actions.deleteTrack(id))

        } catch (e: any) {
            console.log(e.message)
        }
    }
}



export const setAllTracksByProjectIdThunk = (projectId: number): ThunkTypes => {
    return async dispatch => {
        let response = await TracksAPI.setAllTracksByProjectId(projectId)
        if (response.data.success) {
            let allTracksByProjectId: Array<AllTracksByProjectIdType> = response.data.response
            dispatch(actions.setAllTracksByProjectId(allTracksByProjectId))
        }
    }
}

export const updateTrackThunk = (id: number, startTime: string, endTime: string): ThunkTypes => {
    return async dispatch => {
        try {
            let response = await TracksAPI.updateTrack(id, startTime, endTime)
            if (response.data.success){
                dispatch(actions.updateTrack(response.data.response))
            }
        } catch (e: any){
            console.log(e.message)
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
            let allTracks: Array<AllTracksByProjectIdType> = response.data.response
            dispatch(actions.setAllTracks(allTracks))
        }
    }
}

export const setAllTracksByUserIdThunk = (userId: number): ThunkTypes => {
    return async dispatch => {
        let response = await TracksAPI.setAllTracksByUserId(userId)
        if (response.data.success) {
            let allTracksByUser: Array<AllTracksByProjectIdType> = response.data.response
            dispatch(actions.setAllTracksByUserId(allTracksByUser))
        }
    }
}
export const setTracksByTaskIdThunk = (TaskId: number): ThunkTypes => {
    return async dispatch => {
        let response = await TracksAPI.setTracksByTaskId(TaskId)
        if (response.data.success) {
            let allTracksByTask: Array<AllTracksByProjectIdType> = response.data.response
            dispatch(actions.setTracksByTaskId(allTracksByTask))
        }
    }
}

