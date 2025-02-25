import { Modal, Form, Input, Button, message } from "antd";
import { useEffect } from "react";
import { createStore, updateStore, StoreResponse } from "@/features/store/services/storeService";
import { useTranslations } from "next-intl";

interface Props {
    visible: boolean;
    store?: StoreResponse | null;
    onClose: () => void;
    onSuccess: () => void;
}

const ModalCreateUpdateStore: React.FC<Props> = ({ visible, store, onClose, onSuccess }) => {
    const [form] = Form.useForm();
    const t = useTranslations("store");

    useEffect(() => {
        if (store) {
            form.setFieldsValue({
                name: store.name,
                phoneNumber: store.phoneNumber,
            });
        } else {
            form.resetFields();
        }
    }, [store, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (store) {
                // Cập nhật (Không gửi address)
                await updateStore(store.id.toString(), values.phoneNumber, values.name);
                message.success(t("updateSuccess"));
            } else {
                // Tạo mới (Có address)
                await createStore(values.phoneNumber, values.name, values.address);
                message.success(t("createSuccess"));
            }
            onSuccess();
            onClose();
        } catch (error) {
            message.error(t("error.saveStore"));
            console.error(error);
        }
    };

    return (
        <Modal
            title={store ? t("editStore") : t("addStore")}
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    {t("cancel")}
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
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
                {!store && (
                    <Form.Item
                        name="address"
                        label={t("address")}
                        rules={[{ required: true, message: t("error.addressRequired") }]}
                    >
                        <Input />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
};

export default ModalCreateUpdateStore;
