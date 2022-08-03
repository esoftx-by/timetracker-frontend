import {actions, initialStateType, taskReducer} from "../reducers/taskReducer";
import {ProjectType, UserType} from "../../types";

const state: initialStateType = {
    allTask: null,
    taskUserId: [],
    allTasksProject: [
        {id: 1, name: '', description: '', estimatedHours: 1, currentAssignee: {} as UserType, project: {} as ProjectType, status: ''},
        {id: 2, name: '', description: '', estimatedHours: 2, currentAssignee: {} as UserType, project: {} as ProjectType, status: ''}
    ],
    taskById: null,
    isFetching: false
}

test('deleteTask', () => {
    const newState = taskReducer(state, actions.deleteTask(1))

    expect(newState.taskById).toBe(null)
    expect(newState.allTasksProject.length).toBe(1)
})
