import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Layout } from "antd";

const { Content } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Navbar />
            <Layout>
                <Sidebar />
                <Content style={{ margin: "16px", padding: "16px", flex: 1 }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
