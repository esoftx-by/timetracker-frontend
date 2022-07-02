import axios from "axios";


export let instance = axios.create({
    baseURL: "http://localhost:8080/api/v1/"
})


export const ProjectAPI = {
    getAllProject() {
        return instance.get('projects')
            .then(response => {
                return response
            })
    },
    newProject(name, description, customer) {
        return instance.post('projects', {name, description, customer})
            .then(response => {
                return response
            })
    },
    getProjectId(id) {
        return instance.get(`projects/${id}`)
            .then(response => {
                return response
            })
    },
    getProjectByUserId(id) {
        return instance.get(`project-users/user/${id}`)
            .then(response => {
                return response
            })
    },
    newUserInProject(userId, projectId, role){
        return instance.post('project-users', {userId, projectId, role})
            .then(response => {
                return response
            })
    }
}

export const AuthAPI = {
    newUser(email, firstName, lastName, password) {
        return instance.post('users', {email, firstName, lastName, password})
            .then(response => {
                return response
            })
    },
    auth(email, password) {
        return instance.post('login', {email, password})
            .then(response => {
                return response
            })
    },
    setUserData(id) {
        return instance.get(`users/${id}`)
            .then(response => {
                return response
            })
    },
    setAllUsers() {
        return instance.get('users')
            .then(response => {
                return response
            })
    }
}

export const TaskAPI = {
    allTasks() {
        return instance.get('tasks')
            .then(response => {
                return response
            })
    },
    newTask(name, description, estimatedHours, authorId, projectId) {
        return instance.post('tasks', {name, description, estimatedHours, authorId, projectId})
            .then(response => {
                return response
            })

    },
    allTaskUserId(id) {
        return instance.get(`tasks/user/${id}`)
            .then(response => {
                return response
            })
    },
    allTasksProject(projectId) {
        return instance.get(`tasks/project/${projectId}`)
            .then(response => {
                return response
            })
    }
}

export const TracksAPI = {
    newTrack(userId, taskId, startTime, hours) {
        return instance.post('tracks', {userId, taskId, startTime, hours})
            .then(response => {
                return response
            })
    },
    setAllTracks() {
        return instance.get('tracks')
            .then(response => {
                return response
            })
    },
    setAllTracksByUserId(userId) {
        return instance.get(`tracks/user/${userId}`)
            .then(response => {
                return response
            })
    },
    setTracksByTaskId(taskId) {
        return instance(`tracks/task/${taskId}`)
            .then(response => {
                return response
            })
    }
}
