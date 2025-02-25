import { useEffect, useState } from "react";
import { Table, Card, message, Tag, Input, Space, Button } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import withAuth from "@/hoc/withAuth";
import { getPageStore, StoreResponse } from "@/features/store/services/storeService";
import { useTranslations } from "next-intl";
import ModalCreateUpdateStore from "@/components/modal/ModelCreateIUpdateStore";

const StoreManagement = () => {
    const t = useTranslations("store");
    const [stores, setStores] = useState<StoreResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 10, total: 0 });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedStore, setSelectedStore] = useState<StoreResponse | null>(null);

    useEffect(() => {
        fetchStores();
    }, [pagination.current, searchText]);

    const fetchStores = async () => {
        setLoading(true);
        try {
            const response = await getPageStore(undefined, searchText, pagination.current, pagination.pageSize);
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

    const handleSearch = (value: string) => {
        setSearchText(value);
        setPagination((prev) => ({ ...prev, current: 1 }));
    };

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setPagination(pagination);
    };

    const columns: ColumnsType<StoreResponse> = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: t("name"), dataIndex: "name", key: "name" },
        { title: t("phone"), dataIndex: "phoneNumber", key: "phoneNumber" },
        {
            title: t("status"),
            dataIndex: "status",
            key: "status",
            render: (status: "ACTIVE" | "INACTIVE") => (
                <Tag color={status === "ACTIVE" ? "green" : "red"}>
                    {status === "ACTIVE" ? t("active") : t("inactive")}
                </Tag>
            ),
        },
        {
            title: t("createdAt"),
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: t("updatedAt"),
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: t("actions"),
            key: "actions",
            render: (record: StoreResponse) => (
                <Space>
                    <a onClick={() => showModal(record)}>{t("button.edit")}</a>
                </Space>
            ),
        },
    ];

    return (
        <Card title={t("management")}>
            <Space style={{ marginBottom: 16 }}>
                <Input.Search
                    placeholder={t("search.placeholder")}
                    allowClear
                    enterButton={t("button.search")}
                    onSearch={handleSearch}
                    style={{ width: 300 }}
                />
                <Button type="primary" onClick={() => showModal()}>{t("button.add")}</Button>
            </Space>
            <Table columns={columns} dataSource={stores} loading={loading} rowKey="id" pagination={pagination} onChange={handleTableChange} />
            <ModalCreateUpdateStore visible={isModalVisible} store={selectedStore} onClose={() => setIsModalVisible(false)} onSuccess={fetchStores} />
        </Card>
    );
};

export default withAuth(StoreManagement);
