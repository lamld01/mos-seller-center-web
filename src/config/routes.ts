const ROUTES = {
    HOME: "/",
    LOGIN: "/auth/login",
    STORE_MANAGEMENT: "/store/management",
    STORE_BRANCHES: (id: string | number) => `/store/management/${id}/branches`,
    PRODUCT_GROUP_MANAGEMENT: "/product/management/group",
    PRODUCT_GROUP_ITEM_MANAGEMENT: (id: string | number) => `/product/management/group/${id}/items`,
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",
};

export default ROUTES;
