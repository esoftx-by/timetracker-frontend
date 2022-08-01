import {createContext} from "react";
import {AuthContextType} from "../types";

function noop() {
}

export const AuthContext = createContext({
    token: null,
    userId: null,
    lastName: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
} as AuthContextType)
