import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from "universal-cookie";

type ContextProps = {
    children?: ReactNode;
}

type AuthContextProps = {
    authenticated: boolean;
    authenProvider: boolean;
    role: boolean;
    setAuthenticated: (newState: boolean) => void;
    setAuthenProvider: (newState: boolean) => void;
    setRole: (newState: boolean) => void;
}

const initialValue = {
    authenticated: false,
    authenProvider: false,
    role: false,
    setAuthenticated: () => { },
    setAuthenProvider: () => { },
    setRole: () => { },
}

const AuthContext = createContext<AuthContextProps>(initialValue);

const AuthProvider = ({ children }: ContextProps) => {
    const [authenticated, setAuthenticated] = useState(() => {
        const token = new Cookies().get('token');
        return !!token;
    });

    const [role, setRole] = useState(() => {
        const encodedRole = new Cookies().get('role');
        const role = encodedRole ? parseInt(atob(encodedRole)) : null;
        return !!role;
    });

    const [authenProvider, setAuthenProvider] = useState(() => {
        const token = localStorage.getItem('token');
        return !!token;
    });

    useEffect(() => {
        const token = new Cookies().get('token');
        if (token) {
            setAuthenticated(true);
            const TIME = 60 * 60 * 1000;
            setTimeout(() => {
                const cookies = new Cookies();
                cookies.remove('token');
                cookies.remove('userId');
                cookies.remove('role');
                setAuthenticated(false);
                window.location.reload()
            }, TIME);
        }
    }, []);

    useEffect(() => {
        const encodedRole = new Cookies().get('role');
        const role = encodedRole ? parseInt(atob(encodedRole)) : null;
        if (role === 1) {
            setRole(true);
        } else {
            setRole(false);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenProvider(true);
            const TIME = 60 * 60 * 1000;
            setTimeout(() => {
                localStorage.clear();
                setAuthenProvider(false);
                window.location.reload()
            }, TIME);
        }
    }, []);

    const value = {
        authenticated,
        authenProvider,
        role,
        setAuthenticated,
        setAuthenProvider,
        setRole,
    };

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }
