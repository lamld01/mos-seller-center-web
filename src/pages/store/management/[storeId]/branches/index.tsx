import { useEffect, useState } from "react";
import {
    Table, message, Tag, Space, Button, Input, Row, Col, Form, Tooltip
} from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useRouter } from "next/router";
import { SearchOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import withAuth from "@/hoc/withAuth";
import { getPageStoreBranch, StoreBranchResponse } from "@/features/store/services/storeBranchService";
import { useTranslations } from "next-intl";
import ModelCreateUpdateBranch from "@/components/modals/store/ModelCreateIUpdateBranch";
import ROUTES from "@/config/routes";
import BasePage from "@/components/base/page";

const StoreBranches = () => {
    const t = useTranslations("storeBranch");
    const commonT = useTranslations("common");
    const router = useRouter();
    const { storeId } = router.query;

    const [branches, setBranches] = useState<StoreBranchResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState<StoreBranchResponse | null>(null);

    const [form] = Form.useForm();  // Create the form instance

    useEffect(() => {
        if (storeId) {
            fetchBranches();
        }
    }, [storeId, pagination.current]);

    const fetchBranches = async () => {
        setLoading(true);
        try {
            const values = form.getFieldsValue(); // Get values from the form
            const response = await getPageStoreBranch(
                Number(storeId),
                pagination.current,
                pagination.pageSize,
                "createdAt,desc",
                values.name,
                values.phoneNumber
            );
            if (response) {
                setBranches(response.data);
                setPagination((prev) => ({ ...prev, total: response.totalElements }));
            }
        } catch (error) {
            message.error(t("error.loadBranches"));
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setPagination(pagination);
    };

    const handleEdit = (branch: StoreBranchResponse) => {
        setSelectedBranch(branch);
        setIsModalVisible(true);
    };

    const handleAdd = () => {
        setSelectedBranch(null);
        setIsModalVisible(true);
    };

    const handleSearch = () => {
        setPagination({ ...pagination, current: 1 });
        fetchBranches();
    };

    const columns: ColumnsType<StoreBranchResponse> = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: t("name"), dataIndex: "name", key: "name" },
        { title: t("phone"), dataIndex: "phoneNumber", key: "phoneNumber" },
        { title: t("address"), dataIndex: "address", key: "address" },
        {
            title: t("status"),
            dataIndex: "status",
            key: "status",
            render: (status: "OPENED" | "CLOSED") => (
                <Tag color={status === "OPENED" ? "green" : "red"}>
                    {status === "OPENED" ? t("opened") : t("closed")}
                </Tag>
            ),
        },
        {
            title: t("actions"),
            key: "actions",
            render: (record: StoreBranchResponse) => (
                <Space>
                    <Tooltip title={commonT("button.edit")}>
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
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
                { label: commonT("breadcrumb.storeManagement"), link: ROUTES.STORE_MANAGEMENT },
                { label: commonT("breadcrumb.branchManagement") },
            ]}
        >
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
                    <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
                        {commonT("button.add")}
                    </Button>
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={branches}
                loading={loading}
                rowKey="id"
                pagination={pagination}
                onChange={handleTableChange}
                scroll={{ x: "max-content" }}
            />

            {/* Modal thêm/sửa chi nhánh */}
            <ModelCreateUpdateBranch
                visible={isModalVisible}
                storeId={Number(storeId)}
                branch={selectedBranch}
                onClose={() => setIsModalVisible(false)}
                onSuccess={fetchBranches}
            />
        </BasePage>
    );
};

export default withAuth(StoreBranches);
