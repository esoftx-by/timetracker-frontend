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
            return {
                ...state,
                allTracksByProjectId: [...state.allTracksByProjectId, action.data],
                tracksByTaskId: [...state.tracksByTaskId, action.data]
            }
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
            return {
                ...state,
                allTracksByProjectId: state.allTracksByProjectId.filter(el => el.id !== action.id),
                tracksByTaskId: state.tracksByTaskId.filter(el => el.id !== action.id)
            }
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
export type ThunkTypes = ThunkAction<void, AppStateType, unknown, ActionsType>

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




