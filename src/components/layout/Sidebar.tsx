import { Layout, Menu, Drawer, Typography } from "antd";
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ROUTES from "@/config/routes";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import Image from "next/image"; // Để sử dụng hình ảnh logo

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar: React.FC<{
    collapsed: boolean;
    drawerVisible: boolean;
    setDrawerVisible: (val: boolean) => void;
}> = ({ collapsed, drawerVisible, setDrawerVisible }) => {
    const themeMode = useSelector((state: RootState) => state.theme.mode);
    const router = useRouter();
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const menuItems = [
        {
            key: ROUTES.HOME,
            icon: <AppstoreOutlined />,
            label: "Dashboard",
            onClick: () => router.push(ROUTES.HOME),
        },
        {
            key: ROUTES.STORE_MANAGEMENT,
            icon: <ShopOutlined />,
            label: "Quản lý cửa hàng",
            onClick: () => router.push(ROUTES.STORE_MANAGEMENT),
        },
        {
            key: ROUTES.PRODUCT_GROUP_MANAGEMENT,
            icon: <ShoppingCartOutlined />,
            label: "Quản lý sản phẩm",
            onClick: () => router.push(ROUTES.PRODUCT_GROUP_MANAGEMENT),
        },
    ];

    const logoSection = (
        <div style={{ padding: "16px", display: "flex", alignItems: "center" }}>
            <Image
                src="/deployment.svg"
                alt="Logo"
                width={40}
                height={40}
                style={{ borderRadius: "8px" }}
            />
            <Title
                hidden={collapsed}
                level={4}
                style={{
                    marginLeft: 8,
                    color: themeMode === "dark" ? "#fff" : "#000",
                    fontSize: 16,
                    whiteSpace: "nowrap",
                }}
            >
                {process.env.NEXT_PUBLIC_APP_NAME_TYPE}
            </Title>
        </div>
    );

    return isMobile ? (
        <Drawer
            title="Menu"
            placement="left"
            closable
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width={250}
        >
            <Menu theme={themeMode} selectedKeys={[router.pathname]} items={menuItems} />
        </Drawer>
    ) : (
        <Sider theme={themeMode} trigger={null} collapsible collapsed={collapsed}>
            {logoSection}
            <Menu theme={themeMode} defaultSelectedKeys={[router.pathname]} items={menuItems} />
        </Sider>
    );
};

export default Sidebar;
