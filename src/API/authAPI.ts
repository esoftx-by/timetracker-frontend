import {AllUsers, Auth, instance, User} from "./api";

export default class AuthAPI {
    static newUser(email: string, firstName: string, lastName: string, password: string | number) {
        return instance.post<User>('users', {email, firstName, lastName, password})
            .then(response => {
                return response
            })
    }

    static auth(email: string, password: string | number) {
        return instance.post<Auth>('login', {email, password})
            .then(response => {
                return response
            })
    }

    static setUserData(id: number) {
        return instance.get<User>(`users/${id}`)
            .then(response => {
                return response
            })
    }

    static setAllUsers() {
        return instance.get<AllUsers>('users')
            .then(response => {
                return response
            })
    }

    static updateProfile(id: number, firstName?: string | null, lastName?: string | null, email?: string | null, password?: string | null) {
        return instance.patch('users', {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
            .then(response => {
                return response
            })
    }

    static deleteUser(id: number){
        return instance.delete(`users/${id}`)
    }
}
