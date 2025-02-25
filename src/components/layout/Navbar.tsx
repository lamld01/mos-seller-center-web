import { Layout, Avatar, Dropdown, Menu, Select, Switch } from "antd";
import { UserOutlined, LogoutOutlined, BulbOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setLanguage } from "@/store/slices/languageSlice";
import { setTheme } from "@/store/slices/themeSlice";
import Image from "next/image";
import ROUTES from "@/config/routes";

const { Header } = Layout;

const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const reduxLocale = useSelector((state: RootState) => state.language.locale);
    const theme = useSelector((state: RootState) => state.theme.mode);
    const appName = process.env.NEXT_PUBLIC_APP_NAME || "My App";

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push(ROUTES.LOGIN);
    };

    const handleLanguageChange = (value: "en" | "vi") => {
        dispatch(setLanguage(value));
    };

    const handleThemeToggle = (checked: boolean) => {
        dispatch(setTheme(checked ? "dark" : "light"));
    };

    const menu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />}>
                Hồ sơ
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <Header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                background: theme === "dark" ? "#001529" : "#fff", // Thay đổi màu nền
            }}
        >
            {/* Logo & Tên App */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Image src="/globe.svg" alt="App Logo" width={32} height={32} />
                <span
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: theme === "dark" ? "#fff" : "#333", // Tự động đổi màu chữ
                    }}
                >
                    {appName}
                </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Chọn ngôn ngữ */}
                <Select
                    value={reduxLocale}
                    onChange={handleLanguageChange}
                    style={{ width: 120 }}
                    dropdownStyle={{ minWidth: 120 }}
                >
                    <Select.Option value="en">🇬🇧 EN</Select.Option>
                    <Select.Option value="vi">🇻🇳 VI</Select.Option>
                </Select>

                {/* Nút Chuyển Theme */}
                <Switch
                    checked={theme === "dark"}
                    onChange={handleThemeToggle}
                    checkedChildren={<BulbOutlined />}
                    unCheckedChildren={<BulbOutlined />}
                />

                {/* Avatar User */}
                <Dropdown overlay={menu}>
                    <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
                </Dropdown>
            </div>
        </Header>
    );
};

export default Navbar;
