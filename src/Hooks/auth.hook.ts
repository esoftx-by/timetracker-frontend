import {useCallback, useEffect, useState} from "react";
import {instance} from "../API/api";

const storageName = 'userData'

export type storageType = {
    token: string | null
    userId: number | null
    lastName: string | null
}

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<number | null>(null)
    const [lastName, setLastName] = useState<string | null>(null)

    const login = useCallback((jwtToken: string | null, id: number | null, lastName: string | null) => {
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
        setLastName(null)
        delete instance.defaults.headers.common['Authorization']
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data: storageType = JSON.parse(localStorage.getItem(storageName) || '{}')
        if (data && data.token) {
            login(data.token, data.userId, data.lastName)
        }

    }, [login])

    return {login, logout, token, userId, lastName}
}
