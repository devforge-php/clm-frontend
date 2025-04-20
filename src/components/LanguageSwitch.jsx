import React from "react";
import { Select, Option } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

export function LanguageSwitch() {
  const { i18n } = useTranslation(); // i18n funksiyasini olish

  // Tillar ma'lumotlari
  const languages = [
    { code: "en", name: "English", flag: "https://flagcdn.com/w40/gb.png" },
    { code: "ru", name: "Русский", flag: "https://flagcdn.com/w40/ru.png" },
  ];

  // Tilni o'zgartirish funksiyasi
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className="w-40">
      <Select
        size="lg"
        value={i18n.language}
        onChange={handleChange}
        selected={(element) =>
          element &&
          React.cloneElement(element, {
            disabled: true,
            className:
              "flex items-center opacity-100 px-0 gap-2 pointer-events-none outline-none border-gray-300",
          })
        }
      >
        {languages.map(({ code, name, flag }) => (
          <Option key={code} value={code} className="flex items-center gap-2">
            <img src={flag} alt={name} className="h-5 w-5 rounded-full object-cover" />
            {name}
          </Option>
        ))}
      </Select>
    </div>
  );
}
