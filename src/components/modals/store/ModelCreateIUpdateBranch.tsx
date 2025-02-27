import { Modal, Form, Input, Button, message, Select } from "antd";
import React, {useEffect, useState} from "react";
import { createStoreBranch, updateStoreBranch, StoreBranchResponse } from "@/features/store/services/storeBranchService";
import { useTranslations } from "next-intl";

interface Props {
    visible: boolean;
    storeId: number;
    branch?: StoreBranchResponse | null;
    onClose: () => void;
    onSuccess: () => void;
}

const ModelCreateUpdateBranch: React.FC<Props> = ({ visible, storeId, branch, onClose, onSuccess }) => {
    const [form] = Form.useForm();
    const t = useTranslations("storeBranch");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (branch) {
            form.setFieldsValue({
                name: branch.name,
                phoneNumber: branch.phoneNumber,
                status: branch.status,
                address: branch.address,
            });
        } else {
            form.resetFields();
        }
    }, [branch, form]);

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields();
            if (branch) {
                // Cập nhật (Không gửi address)
                await updateStoreBranch(branch.id, values.phoneNumber,values.address, values.name, values.status);
                message.success(t("updateSuccess"));
            } else {
                // Tạo mới (Có address)
                await createStoreBranch(storeId, values.phoneNumber, values.name, values.address);
                message.success(t("createSuccess"));
            }
            onSuccess();
            onClose();
        } catch (error) {
            message.error(t("error.saveBranch"));
            console.error(error);
        }finally {
            setLoading(false)
        }
    };

    return (
        <Modal
            title={branch ? t("editBranch") : t("addBranch")}
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    {t("cancel")}
                </Button>,
                <Button loading={loading} key="submit" type="primary" onClick={handleSubmit}>
                    {t("save")}
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="name" label={t("name")} rules={[{ required: true, message: t("error.nameRequired") }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label={t("phone")}
                    rules={[{ required: true, message: t("error.phoneRequired") }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    label={t("address")}
                    rules={[{ required: true, message: t("error.addressRequired") }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="status"
                    label={t("status")}
                    rules={[{ required: true, message: t("error.statusRequired") }]}
                >
                    <Select>
                        <Select.Option value="OPENED">{t("opened")}</Select.Option>
                        <Select.Option value="CLOSED">{t("closed")}</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModelCreateUpdateBranch;
