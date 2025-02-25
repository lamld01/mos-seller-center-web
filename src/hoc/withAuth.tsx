import { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import ROUTES from "@/config/routes";

// Định nghĩa kiểu cho props
function withAuth<T extends object>(WrappedComponent: ComponentType<T>) {
    return function AuthComponent(props: T) {
        const { token } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!token) {
                router.push(ROUTES.LOGIN);
            }
        }, [token, router]);

        if (!token) {
            return null; // Không render gì khi chưa có token
        }

        return <WrappedComponent {...props} />;
    };
}

export default withAuth;
