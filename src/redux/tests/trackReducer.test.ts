import {TaskType, UserType} from "../../types";
import {actions, initialStateType, trackReducers} from "../reducers/trackReducer";

const state: initialStateType = {
    allTracks: [],
    tracksByTaskId: [
        {id: 1, task: {} as TaskType, user: {} as UserType, startTime: '', endTime: ''},
        {id: 2, task: {} as TaskType, user: {} as UserType, startTime: '', endTime: ''}
    ],
    allTracksByProjectId: [
        {id: 1, task: {} as TaskType, user: {} as UserType, startTime: '', endTime: ''},
        {id: 2, task: {} as TaskType, user: {} as UserType, startTime: '', endTime: ''}
    ],
    allTracksByUserId: [],
    isFetching: false
}

test('newTrack', () => {
    const newState = trackReducers(state, actions.setNewTrack({id: 3, task: {} as TaskType, user: {} as UserType, startTime: '', endTime: ''}))

    expect(newState.allTracksByProjectId.length).toBe(3)
    expect(newState.tracksByTaskId.length).toBe(3)
})

test('deleteTrack', () => {
    const newState = trackReducers(state, actions.deleteTrack(1))

    expect(newState.allTracksByProjectId.length).toBe(1)
    expect(newState.tracksByTaskId.length).toBe(1)
})
