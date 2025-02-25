import { Layout, Menu } from "antd";
import { AppstoreOutlined, ShopOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ROUTES from "@/config/routes";

const { Sider } = Layout;

const Sidebar = () => {
    const router = useRouter();
    const theme = useSelector((state: RootState) => state.theme.mode);

    return (
        <Sider
            collapsible
            style={{
                minHeight: "100vh",
                background: theme === "dark" ? "#001529" : "#fff", // Thay đổi màu nền
            }}
        >
            <Menu
                theme={theme === "dark" ? "dark" : "light"} // Đổi theme của Menu
                mode="inline"
                defaultSelectedKeys={[router.pathname]}
            >
                <Menu.Item
                    key={ROUTES.HOME}
                    icon={<AppstoreOutlined />}
                    onClick={() => router.push(ROUTES.HOME)}
                >
                    Dashboard
                </Menu.Item>
                <Menu.Item
                    key={ROUTES.STORE_MANAGEMENT}
                    icon={<ShopOutlined />}
                    onClick={() => router.push(ROUTES.STORE_MANAGEMENT)}
                >
                    Quản lý cửa hàng
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
