import { Form, Input, Button, Card, message } from 'antd';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ROUTES from "@/config/routes";

interface UserLogin {
    username: string;
    password: string;
}

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const onFinish = async (values: UserLogin) => {
        setLoading(true);
        try {
            await login(values.username, values.password);
            message.success('Đăng nhập thành công!');
            router.push(ROUTES.STORE_MANAGEMENT); // Chuyển hướng sau khi đăng nhập thành công
        } catch (error) {
            message.error('Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản!');
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card title="Đăng nhập" style={{ width: 350 }}>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
