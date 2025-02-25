const ErrorPage = ({ statusCode }: { statusCode?: number }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
            <h1>Đã có lỗi xảy ra!</h1>
            <p>Mã lỗi: {statusCode || 500}</p>
        </div>
    );
};

export default ErrorPage;
