import {AppStateType} from "../store";

export const setAllTracksSelector = (state: AppStateType) => {
    return state.tracks.allTracks
}

export const setTracksByTaskIdSelector = (state: AppStateType) => {
    return state.tracks.tracksByTaskId?.reverse()
}

export const setAllTracksByProjectIdSelector = (state: AppStateType) => {
    return state.tracks.allTracksByProjectId
}
