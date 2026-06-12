import {useState, createContext} from 'react';

export const AuthContext = createContext();

export function Provider({children}) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUser] = useState(null);

    function login(token, userId) {
        setToken(token);
        setUser(userId);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
    }

    function logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }

    return (
        <AuthContext.Provider value={{ token, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}