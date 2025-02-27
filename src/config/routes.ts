const ROUTES = {
    HOME: "/",
    LOGIN: "/auth/login",
    STORE_MANAGEMENT: "/store/management",
    STORE_BRANCHES: (id: string | number) => `/store/management/${id}/branches`,
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",
};

export default ROUTES;
