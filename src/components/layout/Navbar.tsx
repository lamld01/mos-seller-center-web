import { useState } from "react";
import {
    Layout,
    Button,
    Avatar,
    Dropdown,
    Menu,
    Drawer,
    Switch,
    Badge,
    Select,
    theme,
    Row,
    Col,
    Typography,
    Image,
} from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LogoutOutlined,
    BulbOutlined,
    BellOutlined,
    GlobalOutlined,
    AppstoreOutlined,
    ShopOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setLanguage } from "@/store/slices/languageSlice";
import { setTheme } from "@/store/slices/themeSlice";
import ROUTES from "@/config/routes";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

const { Header } = Layout;
const { Title } = Typography;

// ✅ Lấy tên app & icon từ .env
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "My App";
const APP_ICON = "/logo.svg"; // Thay bằng đường dẫn icon của bạn

const Navbar: React.FC<{ collapsed: boolean; setCollapsed: (val: boolean) => void }> = ({
                                                                                            collapsed,
                                                                                            setCollapsed,
                                                                                        }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const reduxLocale = useSelector((state: RootState) => state.language.locale);
    const themeMode = useSelector((state: RootState) => state.theme.mode);
    const { token: { colorBgContainer } } = theme.useToken();
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const [drawerVisible, setDrawerVisible] = useState(false);

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
    ];

    const userMenu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />}>
                Hồ sơ
            </Menu.Item>
            <Menu.SubMenu key="settings" title="Cài đặt">
                <Menu.Item key="language" icon={<GlobalOutlined />}>
                    <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", alignItems: "center" }}>
                        <Select
                            value={reduxLocale}
                            onChange={handleLanguageChange}
                            style={{ width: 100, marginLeft: 8 }}
                        >
                            <Select.Option value="en">🇬🇧 EN</Select.Option>
                            <Select.Option value="vi">🇻🇳 VI</Select.Option>
                        </Select>
                    </div>
                </Menu.Item>


                <Menu.Item key="darkMode" icon={<BulbOutlined />}>
                    <Switch
                        checked={themeMode === "dark"}
                        onChange={handleThemeToggle}
                        style={{ marginLeft: 8 }}
                    />
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <Header style={{ background: colorBgContainer, padding: "0 16px" }}>
            <Row align="middle" justify="space-between">
                {/* Bên trái: Nút mở menu & Logo & Tên App */}
                <Col>
                    <Row align="middle" gutter={16}>
                        {/* Nút menu */}
                        <Col>
                            <Button
                                type="text"
                                icon={isMobile ? <MenuUnfoldOutlined /> : (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)}
                                onClick={() => isMobile ? setDrawerVisible(true) : setCollapsed(!collapsed)}
                                style={{ fontSize: "16px", width: 48, height: 48 }}
                            />
                        </Col>
                        {/* Logo + Tên App */}
                        <Col>
                            <Row
                                align="middle"
                                gutter={12}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    whiteSpace: "nowrap"
                                }}
                            >
                                <Col style={{ display: "flex", alignItems: "center" }}>
                                    <Image
                                        src={APP_ICON}
                                        alt="App Icon"
                                        width={40}
                                        height={40}
                                        preview={false}
                                        style={{ borderRadius: "8px" }}
                                    />
                                </Col>
                                <Col>
                                    <Title
                                        level={4}
                                        style={{
                                            margin: 0,
                                            fontSize: isMobile ? "16px" : "20px",
                                            fontWeight: 600,
                                            color: themeMode === "dark" ? "#fff" : "#000",
                                        }}
                                    >
                                        {APP_NAME}
                                    </Title>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </Col>

                {/* Bên phải: Thông báo & Avatar */}
                <Col>
                    <Row align="middle" gutter={16}>
                        <Col>
                            <Badge count={3} offset={[-5, 5]}>
                                <Button type="text" icon={<BellOutlined />} style={{ fontSize: 18 }} />
                            </Badge>
                        </Col>
                        <Col>
                            <Dropdown overlay={userMenu} trigger={["click"]}>
                                <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
                            </Dropdown>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Drawer cho Mobile Sidebar */}
            {isMobile && (
                <Drawer
                    title="Menu"
                    placement="left"
                    closable
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                >
                    <Menu theme={themeMode} selectedKeys={[router.pathname]} items={menuItems} />
                </Drawer>
            )}
        </Header>
    );
};

export default Navbar;
