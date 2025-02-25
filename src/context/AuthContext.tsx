import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { login as loginAPI, getUserInfo } from '@/features/auth/services/authService';
import { User } from '@/types/User';
import ROUTES from "@/config/routes";

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            fetchUser();
        }
    }, []);

    const fetchUser = async () => {
        try {
            const userData = await getUserInfo();
            setUser(userData);
        } catch (error) {
            console.error('Lỗi lấy thông tin user', error);
            logoutHandler();
        }
    };

    const loginHandler = async (username: string, password: string) => {
        try {
            const { token } = await loginAPI(username, password);
            localStorage.setItem('token', token);
            setToken(token);
            await fetchUser();
        } catch (error) {
            console.error('Đăng nhập thất bại', error);
            throw error;
        }
    };

    const logoutHandler = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        router.push(ROUTES.LOGIN);
    };

    return (
        <AuthContext.Provider value={{ user, token, login: loginHandler, logout: logoutHandler }}>
            {children}
        </AuthContext.Provider>
    );
};
