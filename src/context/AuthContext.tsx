import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from "universal-cookie";

type ContextProps = {
    children?: ReactNode;
}

type AuthContextProps = {
    authenticated: boolean;
    authenProvider: boolean;
    setAuthenticated: (newState: boolean) => void;
    setAuthenProvider: (newState: boolean) => void;
}

const initialValue = {
    authenticated: false,
    authenProvider: false,
    setAuthenticated: () => { },
    setAuthenProvider: () => { },
}

const AuthContext = createContext<AuthContextProps>(initialValue);

const AuthProvider = ({ children }: ContextProps) => {
    const [authenticated, setAuthenticated] = useState(() => {
        const token = new Cookies().get('token');
        return !!token; 
    });

    const [authenProvider, setAuthenProvider] = useState(() => {
        const token = localStorage.getItem('token');
        return !!token; 
    });

    useEffect(() => {
        const token = new Cookies().get('token');
        if (token) {
            setAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenProvider(true);
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated,authenProvider, setAuthenProvider } } >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext,  AuthProvider }

