import { useEffect, useState } from "react";
import { Table, Card, message, Tag, Input, Space, Button, Tooltip, Row, Col, Form } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import withAuth from "@/hoc/withAuth";
import { useTranslations } from "next-intl";
import ModalCreateUpdateProductGroup from "@/components/modals/product/ModalCreateUpdateProductGroup";
import { EditOutlined, PlusOutlined, SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import BasePage from "@/components/base/page";
import { getPageProductGroups, ProductGroupResponse } from "@/features/product/services/productGroupService";
import { CategoryResponse, getAllCategories } from "@/features/product/services/categoryService";
import { useRouter } from "next/router";
import ROUTES from "@/config/routes";

const ProductManagement = () => {
    const t = useTranslations("productGroup");
    const commonT = useTranslations("common");
    const router = useRouter();
    const [products, setProducts] = useState<ProductGroupResponse[]>([]);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductGroupResponse | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchProducts();
    }, [pagination.current]);

    useEffect(() => {
        getAllCategories()
            .then((data) => setCategories(data))
            .catch(() => message.error(commonT("error.loadCategories")));
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const values = form.getFieldsValue();
        try {
            const response = await getPageProductGroups(
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

    const showModal = (product?: ProductGroupResponse) => {
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

    const handleGoToListItem = (productGroupId: number) => {
        router.push(ROUTES.PRODUCT_GROUP_ITEM_MANAGEMENT(productGroupId));
    };

    const columns: ColumnsType<ProductGroupResponse> = [
        { title: "ID", dataIndex: "id", key: "id", width: 80 },
        { title: t("name"), dataIndex: "name", key: "name", width: 200 },
        { title: t("description"), dataIndex: "description", key: "description", width: 120 },
        {
            title: t("status"),
            dataIndex: "status",
            key: "status",
            width: 120,
            render: (status: "ACTIVATED" | "INACTIVATED") => (
                <Tag color={status === "ACTIVATED" ? "green" : "red"}>
                    {status === "ACTIVATED" ? t("active") : t("inactive")}
                </Tag>
            ),
        },
        {
            title: t("actions"),
            key: "actions",
            width: 180,
            render: (_, record: ProductGroupResponse) => (
                <Space>
                    <Tooltip title={t("button.edit")}>
                        <Button icon={<EditOutlined />} onClick={() => showModal(record)} type="text" />
                    </Tooltip>
                    <Tooltip title={t("button.viewListItem")}>
                        <Button
                            icon={<UnorderedListOutlined />}
                            type="text"
                            onClick={() => handleGoToListItem(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <BasePage
            breadcrumbConfig={[
                { label: commonT("breadcrumb.home"), link: "/" },
                { label: commonT("breadcrumb.productGroupManagement") },
            ]}
        >
            <Card title={t("management")}>
                <Row gutter={[16, 16]} align="middle" justify="space-between" style={{ marginBottom: 16 }}>
                    {/* Form Search */}
                    <Col xs={24} md={18}>
                        <Form form={form} layout="inline" onFinish={handleSearch} initialValues={{ name: "" }}>
                            <Form.Item name="name">
                                <Input placeholder={t("placeholder.name")} allowClear prefix={<SearchOutlined />} />
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
                <Table
                    columns={columns}
                    dataSource={products}
                    loading={loading}
                    rowKey="id"
                    pagination={pagination}
                    onChange={handleTableChange}
                    scroll={{ x: "max-content" }}
                />
                <ModalCreateUpdateProductGroup
                    visible={isModalVisible}
                    product={selectedProduct}
                    categories={categories}
                    onClose={() => setIsModalVisible(false)}
                    onSuccess={fetchProducts}
                />
            </Card>
        </BasePage>
    );
};

export default withAuth(ProductManagement);
