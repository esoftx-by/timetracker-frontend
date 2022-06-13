import axios from "axios";

let instance = axios.create({
    baseURL:"http://localhost:8080/api/"
})

export const ProjectAPI = {
    getAllProject(){
        return instance.get('projects/')
            .then(response => {
                return response
            })
    },
    newProject(name, description, customer){
        return instance.post('projects/', {name, description, customer})
            .then(response => {
                return response
            })
    }
}
