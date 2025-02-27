import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

const { Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const screens = useBreakpoint();
    const isMobile = !screens.md; // Khi nhỏ hơn md (768px) sẽ là mobile

    return (
        <Layout style={{ minHeight: "100vh", minWidth: '600px' }}>
            <Sidebar collapsed={collapsed} drawerVisible={drawerVisible} setDrawerVisible={setDrawerVisible} />
            <Layout>
                <Navbar collapsed={collapsed} setCollapsed={isMobile ? () => setDrawerVisible(true) : setCollapsed} />
                <Content
                    style={{
                        margin: "12px 8px",
                        padding: 12,
                        minHeight: "70vh",
                        transition: "all 0.3s",
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
