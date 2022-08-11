import TracksAPI from "../../../API/trackAPI";
import {AllTracksByProjectIdType} from "../../../types";
import {actions, ThunkTypes} from "../trackReducer";

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
            if (response.data.success) {
                dispatch(actions.updateTrack(response.data.response))
            }
        } catch (e: any) {
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
        try {
            let response = await TracksAPI.setAllTracksByUserId(userId)
            if (response.data.success) {
                let allTracksByUser: Array<AllTracksByProjectIdType> = response.data.response
                dispatch(actions.setAllTracksByUserId(allTracksByUser))
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }

}
export const setTracksByTaskIdThunk = (TaskId: number): ThunkTypes => {
    return async dispatch => {
        try {
            let response = await TracksAPI.setTracksByTaskId(TaskId)
            if (response.data.success) {
                let allTracksByTask: Array<AllTracksByProjectIdType> = response.data.response
                dispatch(actions.setTracksByTaskId(allTracksByTask))
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }
}
