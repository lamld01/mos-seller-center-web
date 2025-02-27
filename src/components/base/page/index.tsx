import { ReactNode } from "react";
import { Row, Col, Button, Breadcrumb, Card } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

interface BasePageProps {
    breadcrumbConfig: Array<{ label: string; link?: string }>;
    children: ReactNode;
}

const BasePage = ({ breadcrumbConfig, children }: BasePageProps) => {
    const router = useRouter();

    // Hàm quay lại trang trước
    const handleBack = () => {
        router.back();
    };

    return (
        <div>
            {/* Breadcrumb + Nút "Quay lại" */}
            <Row align="middle" style={{ marginBottom: 16 }} wrap>
                <Col flex="none">
                    <Button
                        type="link"
                        onClick={handleBack}
                        icon={<LeftOutlined />}
                        style={{
                            marginRight: 8,
                            marginBottom: '2%'
                        }}
                    >
                        <p style={{ margin: 0, lineHeight: 'normal' }}>Quay lại</p>
                    </Button>
                </Col>
                <Col flex="auto">
                    <Breadcrumb>
                        {breadcrumbConfig.map((item, index) => (
                            <Breadcrumb.Item key={index}>
                                {item.link ? <Link href={item.link}>{item.label}</Link> : item.label}
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </Col>
            </Row>

            {/* Nội dung chính */}
            <Card>{children}</Card>
        </div>
    );
};

export default BasePage;
