import { Layout as AntLayout, Menu } from 'antd';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import ROUTES from "@/config/routes";

const { Header, Content, Sider } = AntLayout;

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { logout } = useAuth();

    return (
        <AntLayout style={{ minHeight: '100vh' }}>
            <Sider collapsible>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[router.pathname]}>
                    <Menu.Item key={ROUTES.STORE_MANAGEMENT} onClick={() => router.push(ROUTES.STORE_MANAGEMENT)}>
                        Quản lý cửa hàng
                    </Menu.Item>
                </Menu>
            </Sider>
            <AntLayout>
                <Header style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <a onClick={logout} style={{ color: 'white', cursor: 'pointer' }}>Đăng xuất</a>
                </Header>
                <Content style={{ margin: '16px' }}>{children}</Content>
            </AntLayout>
        </AntLayout>
    );
};

export default Layout;
