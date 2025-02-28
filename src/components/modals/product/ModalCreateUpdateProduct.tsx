import { Modal, Form, Input, Button, message, Select } from "antd";
import { useTranslations } from "next-intl";
import { ProductResponse, createProduct, updateProduct } from "@/features/product/services/productService";
import { useEffect, useState } from "react";

interface Props {
    visible: boolean;
    product?: ProductResponse | null;
    onClose: () => void;
    onRefresh: () => void;
}

const ModalCreateUpdateProduct: React.FC<Props> = ({ visible, product, onClose, onRefresh }) => {
    const t = useTranslations("product");
    const [form] = Form.useForm();

    useEffect(() => {
        if (product) {
            form.setFieldsValue(product);
        } else {
            form.resetFields();
        }
    }, [product, form]);


    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            if (product) {
                await updateProduct(product.id, values.productGroupId, values.name, values.description, values.price, values.status);
                message.success(t("message.updateSuccess"));
            } else {
                await createProduct(values.productGroupId, values.name, values.description, values.price, values.status);
                message.success(t("message.createSuccess"));
            }

            onClose();
            onRefresh();
        } catch (error) {
            message.error(t("message.error"));
            console.error(error);
        }
    };

    return (
        <Modal
            open={visible}
            title={product ? t("title.editProduct") : t("title.addProduct")}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    {t("button.cancel")}
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    {t("button.save")}
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="name" label={t("name")} rules={[{ required: true, message: t("error.nameRequired") }]}>
                    <Input placeholder={t("placeholder.enterName")} />
                </Form.Item>
                <Form.Item name="description" label={t("description")}>
                    <Input.TextArea placeholder={t("placeholder.enterDescription")} />
                </Form.Item>
                <Form.Item name="price" label={t("price")} rules={[{ required: true, message: t("error.priceRequired") }]}>
                    <Input type="number" placeholder={t("placeholder.enterPrice")} />
                </Form.Item>
                <Form.Item name="status" label={t("status")} rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="ACTIVATED">{t("active")}</Select.Option>
                        <Select.Option value="INACTIVATED">{t("inactive")}</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCreateUpdateProduct;
