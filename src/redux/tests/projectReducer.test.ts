import {actionsProject, initialStateType, projectReducer} from "../reducers/projectsReducer";


const state: initialStateType = {
    projects: [],
    projectsByUser: [],
    project: null,
    isFetching: false,
    allUsersInProject: []
}

test('NewProject', () => {

    const newState = projectReducer(state, actionsProject.setNewProject({
        id: 1,
        name: '',
        description: '',
        customer: ''
    }))

    expect(newState.projects.length).toBe(1)
})

