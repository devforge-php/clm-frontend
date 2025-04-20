import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Helmet } from "react-helmet";

export default function Docs() {
  const { t } = useTranslation();
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => setShowFullText(!showFullText);

  return (
    <div>
      <Helmet>
        <title>Docs - CLM</title>
        <meta
          name="description"
          content="A guide on how to use the CLM platform. Step-by-step explanations."
        />
      </Helmet>
      <div className="flex flex-col justify-center items-center p-6 bg-gray-100 text-left ">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6 flex items-center gap-2">
          <DocumentTextIcon className="w-8 h-8 text-blue-500" />
          {t("documentation")}
        </h1>

        <div className="max-w-3xl text-justify mb-8 text-gray-800 relative">
          <p
            className={`text-lg transition-all duration-300 ease-in-out ${
              showFullText ? "" : "line-clamp-4"
            }`}
          >
            {t("docsText")}
          </p>

          <button
            onClick={toggleText}
            className="mt-3 text-blue-600 hover:underline font-medium"
          >
            {showFullText ? t("showLess") : t("showMore")}
          </button>
        </div>

        <div className="flex gap-4">
          <Link to="/register">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              {t("register")}
            </button>
          </Link>

          <Link to="/login">
            <button className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              {t("login")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
