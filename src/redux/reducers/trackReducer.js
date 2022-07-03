import {TracksAPI} from "../../API/api";

const SET_ALL_TRACKS = 'tracks/SET_ALL_TRACKS'
const SET_NEW_TRACK = 'tracks/SET_NEW_TRACK'
const SET_ALL_TRACK_BY_USER_ID = 'tracks/SET_ALL_TRACK_BY_USER_ID'
const SET_TRACKS_BY_TASK_ID = 'tracks/SET_ALL_TRACK_BY_USER_ID'
const SET_ALL_TRACKS_BY_PROJECT_ID = 'tracks/SET_ALL_TRACKS_BY_PROJECT_ID'

const initialState = {
    allTracks: [],
    allTrackByUserId: [],
    tracksByTaskId: [],
    allTracksByProjectId:[]
}

export const trackReducers = (state = initialState, action) => {
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


const setAllTracks = (data) => ({type: SET_ALL_TRACKS, data})
const setNewTrack = (data) => ({type: SET_NEW_TRACK, data})
const setAllTracksByUserId = (data) => ({type: SET_ALL_TRACK_BY_USER_ID, data})
const setTracksByTaskId = (data) => ({type: SET_TRACKS_BY_TASK_ID, data})
const setAllTracksByProjectId = (data) => ({type: SET_ALL_TRACKS_BY_PROJECT_ID, data})


export const setAllTracksByProjectIdThunk = (projectId) => {
    return dispatch => {
        TracksAPI.setAllTracksByProjectId(projectId)
            .then(response => {
                if (response.data.success){
                    let allTracksByProjectId = response.data.response
                    dispatch(setAllTracksByProjectId(allTracksByProjectId))
                }
            })
    }
}


export const setNewTrackThunk = (userId, taskId, startTime, hours) => {
    return dispatch => {
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
    return dispatch => {
        TracksAPI.setAllTracks()
            .then(response => {
                if (response.data.success) {
                    let allTracks = response.data.response
                    dispatch(setAllTracks(allTracks))
                }
            })
    }
}

export const setAllTracksByUserIdThunk = (userId) => {
    return dispatch => {
        TracksAPI.setAllTracksByUserId(userId)
            .then(response => {
                if (response.data.success){
                    let allTracksByUser = response.data.response
                    dispatch(setAllTracksByUserId(allTracksByUser))
                }
            })
    }
}
export const setTracksByTaskIdThunk = (TaskId) => {
    return dispatch => {
        TracksAPI.setTracksByTaskId(TaskId)
            .then(response => {
                if (response.data.success){
                    let allTracksByTask = response.data.response
                    dispatch(setTracksByTaskId(allTracksByTask))
                }
            })
    }
}
