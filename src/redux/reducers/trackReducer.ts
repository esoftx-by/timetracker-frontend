import {TracksAPI} from "../../API/api";
import {allTracksByProjectIdType} from "../../types";

const SET_ALL_TRACKS = 'tracks/SET_ALL_TRACKS'
const SET_NEW_TRACK = 'tracks/SET_NEW_TRACK'
const SET_ALL_TRACK_BY_USER_ID = 'tracks/SET_ALL_TRACK_BY_USER_ID'
const SET_TRACKS_BY_TASK_ID = 'tracks/SET_ALL_TRACK_BY_USER_ID'
const SET_ALL_TRACKS_BY_PROJECT_ID = 'tracks/SET_ALL_TRACKS_BY_PROJECT_ID'



type initialStateType = {
    allTracks: null | object,
    allTrackByUserId: null | object,
    tracksByTaskId: null | object,
    allTracksByProjectId: Array<allTracksByProjectIdType>
}

const initialState: initialStateType = {
    allTracks: [],
    allTrackByUserId: [],
    tracksByTaskId: [],
    allTracksByProjectId: []
}

export const trackReducers = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_NEW_TRACK:
            let stateCopy = {...state}
            stateCopy.allTracksByProjectId = [...state.allTracksByProjectId]
            stateCopy.allTracksByProjectId.push(action.data)
            return stateCopy
        case SET_ALL_TRACKS:
            return {
                ...state,
                allTracks: action.data
            }
        case SET_ALL_TRACK_BY_USER_ID:
            return {
                ...state,
                allTrackByUserId: action.data
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
        default:
            return state
    }
}


const setAllTracks = (data: object) => ({type: SET_ALL_TRACKS, data})
const setNewTrack = (data: object) => ({type: SET_NEW_TRACK, data})
const setAllTracksByUserId = (data: object) => ({type: SET_ALL_TRACK_BY_USER_ID, data})
const setTracksByTaskId = (data: object) => ({type: SET_TRACKS_BY_TASK_ID, data})
const setAllTracksByProjectId = (data: object) => ({type: SET_ALL_TRACKS_BY_PROJECT_ID, data})


export const setAllTracksByProjectIdThunk = (projectId: number) => {
    return (dispatch: any) => {
        TracksAPI.setAllTracksByProjectId(projectId)
            .then(response => {
                if (response.data.success) {
                    let allTracksByProjectId: allTracksByProjectIdType = response.data.response
                    dispatch(setAllTracksByProjectId(allTracksByProjectId))
                }
            })
    }
}


export const setNewTrackThunk = (userId: number, taskId: number, startTime: number, hours: number) => {
    return (dispatch: any) => {
        TracksAPI.newTrack(userId, taskId, startTime, hours)
            .then(response => {
                if (response.data.success) {
                    let newTrack = response.data.response
                    dispatch(setNewTrack(newTrack))
                }
            })
    }
}

export const SetAllTracksThunks = () => {
    return (dispatch: any) => {
        TracksAPI.setAllTracks()
            .then(response => {
                if (response.data.success) {
                    let allTracks: object = response.data.response
                    dispatch(setAllTracks(allTracks))
                }
            })
    }
}

export const setAllTracksByUserIdThunk = (userId: number) => {
    return (dispatch: any) => {
        TracksAPI.setAllTracksByUserId(userId)
            .then(response => {
                if (response.data.success) {
                    let allTracksByUser: object = response.data.response
                    dispatch(setAllTracksByUserId(allTracksByUser))
                }
            })
    }
}
export const setTracksByTaskIdThunk = (TaskId: number) => {
    return (dispatch: any) => {
        TracksAPI.setTracksByTaskId(TaskId)
            .then(response => {
                if (response.data.success) {
                    let allTracksByTask: object = response.data.response
                    dispatch(setTracksByTaskId(allTracksByTask))
                }
            })
    }
}
