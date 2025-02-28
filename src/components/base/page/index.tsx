import { ReactNode } from "react";
import { Row, Col, Breadcrumb, Card } from "antd";
import Link from "next/link";

interface BasePageProps {
    breadcrumbConfig: Array<{ label: string; link?: string }>;
    children: ReactNode;
}

const BasePage = ({ breadcrumbConfig, children }: BasePageProps) => {
    return (
        <div>
            {/* Breadcrumb */}
            <Row align="middle" style={{ marginBottom: 16 }} wrap>
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
