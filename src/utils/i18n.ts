import { createTranslator } from "next-intl";
import en from "@/locales/en";
import vi from "@/locales/vi";

type LocaleMessages = {
    [key: string]: string | LocaleMessages;
};
// Danh sách ngôn ngữ
const messages: Record<string, LocaleMessages> = { en, vi };

export const getLocaleTranslation = (key: string, locale: string = "en") => {
    const t = createTranslator({ locale, messages: messages[locale] || messages["en"] });
    return t(key);
};
