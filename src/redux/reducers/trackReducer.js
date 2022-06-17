import {TracksAPI} from "../../API/api";

const SET_ALL_TRACKS = 'tracks/SET_ALL_TRACKS'
const SET_NEW_TRACK = 'tracks/SET_NEW_TRACK'

const initialState = {
    allTracks: []
}

export const trackReducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEW_TRACK:
            let stateCopy = {...state}
            stateCopy.allTracks = [...state.allTracks]
            stateCopy.allTracks.push(action.data)
            return stateCopy
        case SET_ALL_TRACKS:
            return {
                ...state,
                allTracks: action.data
            }
        default:
            return state
    }
}


const setAllTracks = (data) => ({type: SET_ALL_TRACKS, data})
const setNewTrack = (data) => ({type: SET_NEW_TRACK, data})


export const setNewTrackThunk = (userId, taskId, hours) => {
    return dispatch => {
        TracksAPI.newTrack(userId, taskId, hours)
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
