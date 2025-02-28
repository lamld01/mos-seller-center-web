import { useEffect, useState } from "react";
import { Table, Card, message, Tag, Input, Space, Button, Tooltip, Form, Row, Col } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import withAuth from "@/hoc/withAuth";
import { useTranslations } from "next-intl";
import { EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import BasePage from "@/components/base/page";
import { getPageProducts, ProductResponse } from "@/features/product/services/productService";
import ModalCreateUpdateProduct from "@/components/modals/product/ModalCreateUpdateProduct";
import ROUTES from "@/config/routes";
import {ActiveStatus} from "@/features/product/services/categoryService";

const ProductManagement = () => {
    const t = useTranslations("product");
    const commonT = useTranslations("common");

    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchProducts();
    }, [pagination.current]);

    const fetchProducts = async () => {
        setLoading(true);
        const values = form.getFieldsValue();
        try {
            const response = await getPageProducts(
                undefined,
                values.name,
                undefined,
                undefined,
                pagination.current,
                pagination.pageSize
            );
            setProducts(response.data);
            setPagination((prev) => ({ ...prev, total: response.totalElements }));
        } catch (error) {
            message.error(commonT("error.loadProducts"));
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const showModal = (product?: ProductResponse) => {
        setSelectedProduct(product || null);
        setIsModalVisible(true);
    };

    const handleSearch = () => {
        setPagination((prev) => ({ ...prev, current: 1 }));
        fetchProducts();
    };

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setPagination(pagination);
    };

    const columns: ColumnsType<ProductResponse> = [
        { title: "ID", dataIndex: "id", key: "id", width: 80 },
        { title: t("name"), dataIndex: "name", key: "name", width: 200 },
        { title: t("description"), dataIndex: "description", key: "description", width: 120 },
        { title: t("price"), dataIndex: "price", key: "price", width: 120, render: (price) => `$${price.toFixed(2)}` },
        { title: t("productGroup"), dataIndex: "productGroupName", key: "productGroupName", width: 200 },
        {
            title: t("status"),
            dataIndex: "status",
            key: "status",
            width: 120,
            render: (status: ActiveStatus) => (
                <Tag color={status === "ACTIVATED" ? "green" : "red"}>
                    {status === "ACTIVATED" ? t("active") : t("inactive")}
                </Tag>
            ),
        },
        {
            title: t("actions"),
            key: "actions",
            width: 100,
            render: (_, record: ProductResponse) => (
                <Space>
                    <Tooltip title={t("button.edit")}>
                        <Button icon={<EditOutlined />} onClick={() => showModal(record)} type="text" />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <BasePage
            breadcrumbConfig={[
                { label: commonT("breadcrumb.home"), link: ROUTES.HOME },
                { label: commonT("breadcrumb.productGroupManagement"), link: ROUTES.PRODUCT_GROUP_MANAGEMENT },
                { label: commonT("breadcrumb.productManagement") },
            ]}
        >
            <Card title={t("title.management")}>
                {/* Bộ lọc */}
                <Row gutter={[16, 16]} align="middle" justify="space-between" style={{ marginBottom: 16 }}>
                    {/* Form Search */}
                    <Col xs={24} md={18}>
                        <Form form={form} layout="inline" onFinish={handleSearch} initialValues={{ name: "" }}>
                            <Form.Item name="name">
                                <Input placeholder={t("placeholder.enterName")} allowClear prefix={<SearchOutlined />} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                                    {commonT("button.search")}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    {/* Button Add */}
                    <Col xs={24} md={6} style={{ textAlign: "right" }}>
                        <Button type="primary" onClick={() => showModal()} icon={<PlusOutlined />}>
                            {commonT("button.add")}
                        </Button>
                    </Col>
                </Row>

                {/* Bảng dữ liệu */}
                <Table
                    columns={columns}
                    dataSource={products}
                    loading={loading}
                    rowKey="id"
                    pagination={pagination}
                    onChange={handleTableChange}
                    scroll={{ x: "max-content" }}
                />
            </Card>

            {/* Modal thêm/sửa sản phẩm */}
            <ModalCreateUpdateProduct
                visible={isModalVisible}
                product={selectedProduct}
                onClose={() => setIsModalVisible(false)}
                onRefresh={fetchProducts}
            />
        </BasePage>
    );
};

export default withAuth(ProductManagement);
