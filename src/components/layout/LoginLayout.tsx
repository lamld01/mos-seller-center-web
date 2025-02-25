import React from "react";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {children}
        </div>
    );
};

export default LoginLayout;
