import {useCallback, useEffect, useState} from "react";
import {instance} from "../API/api";
import {useNavigate} from "react-router-dom";



const storageName = 'userData'


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [lastName, setLastName] = useState(null)

    const login = useCallback((jwtToken, id, lastName) => {
        setToken(jwtToken)
        setUserId(id)
        setLastName(lastName)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, lastName: lastName
        }))
        instance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        delete instance.defaults.headers.common['Authorization']
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.userId, data.lastName)
        }
    }, [login])

    return {login, logout, token, userId, lastName}
}
