import { NextIntlClientProvider } from "next-intl";
import locales from "@/locales";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const LocaleLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const reduxLocale = useSelector((state: RootState) => state.language.locale);
    const [locale, setLocale] = useState<string | null>(null);

    useEffect(() => {
        setLocale(reduxLocale);
    }, [reduxLocale]);

    if (!locale) return null; // Tránh lỗi hydration

    // TypeScript sẽ hiểu `locale` chỉ có thể là "en" hoặc "vi"
    const messages = locales[locale as keyof typeof locales] || locales.en;

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
};

export default LocaleLayout;
