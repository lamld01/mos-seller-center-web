import { useEffect, useState } from "react";
import { Table, Card, message, Tag, Input, Space, Button, Tooltip, Row, Col, Form } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useRouter } from "next/router";
import withAuth from "@/hoc/withAuth";
import { getPageStore, StoreResponse } from "@/features/store/services/storeService";
import { useTranslations } from "next-intl";
import ModalCreateUpdateStore from "@/components/modals/store/ModelCreateIUpdateStore";
import ROUTES from "@/config/routes";
import { EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import BasePage from "@/components/base/page";

const StoreManagement = () => {
    const t = useTranslations("store");
    const commonT = useTranslations("common");
    const router = useRouter();
    const [stores, setStores] = useState<StoreResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedStore, setSelectedStore] = useState<StoreResponse | null>(null);

    const [form] = Form.useForm(); // Dùng Form.useForm để lấy đối tượng form

    useEffect(() => {
        fetchStores();
    }, [pagination.current]); // Thêm chỉ pagination vào dependencies, vì filter sẽ lấy từ form

    const fetchStores = async () => {
        setLoading(true);
        const values = form.getFieldsValue(); // Lấy giá trị từ form
        try {
            const response = await getPageStore(values.phoneNumber, values.name, pagination.current, pagination.pageSize);
            if (response) {
                setStores(response.data);
                setPagination((prev) => ({ ...prev, total: response.totalElements }));
            }
        } catch (error) {
            message.error(t("error.loadStores"));
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const showModal = (store?: StoreResponse) => {
        setSelectedStore(store || null);
        setIsModalVisible(true);
    };

    const handleSearch = () => {
        setPagination((prev) => ({ ...prev, current: 1 })); // Đặt lại trang đầu khi tìm kiếm
        fetchStores(); // Gọi lại fetchStores sau khi tìm kiếm
    };

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setPagination(pagination);
    };

    const handleViewBranches = (storeId: number) => {
        router.push(ROUTES.STORE_BRANCHES(storeId));
    };

    const columns: ColumnsType<StoreResponse> = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: t("name"), dataIndex: "name", key: "name" },
        { title: t("phone"), dataIndex: "phoneNumber", key: "phoneNumber" },
        {
            title: t("status"),
            dataIndex: "status",
            key: "status",
            render: (status: "ACTIVATED" | "INACTIVATED") => (
                <Tag color={status === "ACTIVATED" ? "green" : "red"}>
                    {status === "ACTIVATED" ? t("active") : t("inactive")}
                </Tag>
            ),
        },
        {
            title: t("actions"),
            key: "actions",
            render: (record: StoreResponse) => (
                <Space>
                    <Tooltip title={t("button.edit")}>
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => showModal(record)}
                            type="text"
                        />
                    </Tooltip>
                    <Tooltip title={t("button.viewBranches")}>
                        <Button
                            icon={<EyeOutlined />}
                            onClick={() => handleViewBranches(record.id)}
                            type="text"
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <BasePage
            breadcrumbConfig={[
                { label: commonT("breadcrumb.home"), link: ROUTES.HOME },
                { label: commonT("breadcrumb.storeManagement") },
            ]}
        >
            <Card title={t("management")}>
                <Row gutter={[16, 16]} align="middle" justify="space-between" style={{ marginBottom: 16 }}>
                    {/* Form Search */}
                    <Col xs={24} md={20}>
                        <Form form={form} layout="vertical" onFinish={handleSearch}>
                            <Row gutter={[16, 16]} align="bottom">
                                <Col xs={24} sm={12} md={8}>
                                    <Form.Item label={t("name")} name="name">
                                        <Input placeholder={t("placeholder.name")} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={8}>
                                    <Form.Item label={t("phone")} name="phoneNumber">
                                        <Input placeholder={t("placeholder.phone")} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={8}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                                            {commonT("button.search")}
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>

                    {/* Button Add */}
                    <Col xs={24} md={2} style={{ textAlign: "center" }}>
                        <Button type="primary" onClick={() => showModal()} icon={<PlusOutlined />}>
                            {commonT("button.add")}
                        </Button>
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={stores}
                    loading={loading}
                    rowKey="id"
                    pagination={pagination}
                    onChange={handleTableChange}
                />
                <ModalCreateUpdateStore
                    visible={isModalVisible}
                    store={selectedStore}
                    onClose={() => setIsModalVisible(false)}
                    onSuccess={fetchStores}
                />
            </Card>
        </BasePage>
    );
};

export default withAuth(StoreManagement);
