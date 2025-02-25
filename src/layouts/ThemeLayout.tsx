import { ConfigProvider, theme as AntdTheme } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ThemeLayout = ({ children }: { children: React.ReactNode }) => {
    const theme = useSelector((state: RootState) => state.theme.mode);

    return (
        <ConfigProvider
            theme={{
                algorithm: theme === "dark" ? AntdTheme.darkAlgorithm : AntdTheme.defaultAlgorithm,
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default ThemeLayout;
