import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store";
import MainLayout from "@/components/layout/MainLayout";
import LoginLayout from "@/components/layout/LoginLayout";
import { AuthProvider } from "@/context/AuthContext";
import LocaleLayout from "@/layouts/LocaleLayout";
import ThemeLayout from "@/layouts/ThemeLayout";
import "./globals.css";

const NO_LAYOUT_ROUTES = ["/auth/login"];

function MyApp({ Component, pageProps, router }: AppProps) {
    const Layout = NO_LAYOUT_ROUTES.includes(router.pathname) ? LoginLayout : MainLayout;

    return (
        <Provider store={store}>
            <AuthProvider>
                <LocaleLayout>
                    <ThemeLayout> {/* Bọc toàn bộ ứng dụng với ThemeLayout */}
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ThemeLayout>
                </LocaleLayout>
            </AuthProvider>
        </Provider>
    );
}

export default MyApp;
