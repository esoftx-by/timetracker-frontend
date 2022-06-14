import axios from "axios";


export let instance = axios.create({
    baseURL: "http://localhost:8080/api/"
})



export const ProjectAPI = {
    getAllProject() {
        return instance.get('projects/')
            .then(response => {
                return response
            })
    },
    newProject(name, description, customer) {
        return instance.post('projects/', {name, description, customer})
            .then(response => {
                return response
            })
    },
    getProjectId(id) {
        return instance.get(`projects/${id}`)
            .then(response => {
                return response
            })
    }
}

export const AuthAPI = {
    newUser(email, firstName, lastName, password) {
        return instance.post('users/', {email, firstName, lastName, password})
            .then(response => {
                return response
            })
    },
    auth(email, password) {
        return instance.post('login', {email, password})
            .then(response => {
                return response
            })
    }
}
