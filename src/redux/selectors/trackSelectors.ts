import {AppStateType} from "../store";

export const setAllTracksSelector = (state: AppStateType) => state.tracks.allTracks

export const setTracksByTaskIdSelector = (state: AppStateType) => state.tracks.tracksByTaskId?.reverse()

export const setAllTracksByProjectIdSelector = (state: AppStateType) => state.tracks.allTracksByProjectId

export const allTracksByUserIdSelector = (state: AppStateType) => state.tracks.allTracksByUserId

export const isFetchingTrackSelector = (state: AppStateType) => state.tracks.isFetching
