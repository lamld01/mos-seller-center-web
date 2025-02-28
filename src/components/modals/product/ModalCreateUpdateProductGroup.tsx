import { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, message, AutoComplete } from "antd";
import { useTranslations } from "next-intl";
import {
    createProductGroup,
    ProductGroupResponse,
    updateProductGroup
} from "@/features/product/services/productGroupService";
import { CategoryResponse } from "@/features/product/services/categoryService";

interface Props {
    visible: boolean;
    product?: ProductGroupResponse | null;
    categories: CategoryResponse[];
    onClose: () => void;
    onSuccess: () => void;
}

const ModalCreateUpdateProductGroup = ({ visible, product, categories, onClose, onSuccess }: Props) => {
    const t = useTranslations("productGroup");
    const commonT = useTranslations("common");
    const [form] = Form.useForm();
    const [categoryOptions, setCategoryOptions] = useState<{ value: string }[]>([]);

    useEffect(() => {
        setCategoryOptions(categories.map((c) => ({ value: c.name })));
    }, [categories]);

    useEffect(() => {
        if (product) {
            const category = categories.find((c) => c.id === product.categoryId);
            form.setFieldsValue({
                ...product,
                category: category ? category.name : undefined, // Hiển thị tên thay vì ID
            });
        } else {
            form.resetFields();
            form.setFieldsValue({ status: "ACTIVATED" });
        }
    }, [product, visible, categories]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const selectedCategory = categories.find((c) => c.name === values.category);
            if (!selectedCategory) {
                message.error(t("error.invalidCategory"));
                return;
            }

            if (product) {
                await updateProductGroup(product.id, selectedCategory.id, values.name, values.description, values.price, values.status);
                message.success(t("success.update"));
            } else {
                await createProductGroup(selectedCategory.id, values.name, values.description, values.price, values.status);
                message.success(t("success.create"));
            }

            onSuccess();
            onClose();
        } catch (error) {
            message.error(commonT("error.generic"));
            console.error(error);
        }
    };

    return (
        <Modal
            open={visible}
            title={product ? t("button.edit") : t("button.add")}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    {commonT("button.cancel")}
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    {commonT("button.save")}
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label={t("category")}
                    name="category"
                    rules={[{ required: true, message: t("placeholder.category") }]}
                >
                    <AutoComplete
                        options={categoryOptions}
                        placeholder={t("placeholder.category")}
                        filterOption={(inputValue, option) =>
                            (option as { value: string })?.value.toLowerCase().includes(inputValue.toLowerCase())
                        }
                    />
                </Form.Item>

                <Form.Item label={t("name")} name="name" rules={[{ required: true, message: t("placeholder.name") }]}>
                    <Input placeholder={t("placeholder.name")} />
                </Form.Item>

                <Form.Item
                    label={t("description")}
                    name="description"
                    rules={[{ required: true, message: t("placeholder.description") }]}
                >
                    <Input.TextArea placeholder={t("placeholder.description")} rows={3} />
                </Form.Item>

                <Form.Item
                    label={t("status")}
                    name="status"
                    rules={[{ required: true, message: t("placeholder.status") }]}
                    initialValue="ACTIVATED"
                >
                    <Select>
                        <Select.Option value="ACTIVATED">{t("active")}</Select.Option>
                        <Select.Option value="INACTIVATED">{t("inactive")}</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCreateUpdateProductGroup;
