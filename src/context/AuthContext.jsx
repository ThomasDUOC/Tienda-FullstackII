import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // Para guardar rol, id, etc.
    const [loading, setLoading] = useState(true);

    // Al cargar la página, revisa si hay un token guardado.
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId');

        if (token) {
            setIsAuthenticated(true);
            setUser({ role, userId });
        }
        setLoading(false);
    }, []);

    const login = (token, role, userId) => {
        localStorage.setItem('token', token);
        if (role) localStorage.setItem('userRole', role);
        if (userId) localStorage.setItem('userId', userId);
        
        setIsAuthenticated(true);
        setUser({ role, userId });
    };

    //Borra datos
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};