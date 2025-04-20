import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { $api } from "../utils/index"; // Sizning axios konfiguratsiyangiz fayli
import { useTranslation } from "react-i18next";

export default function UsertaskCard() {
  const [taskId, setTaskId] = useState(""); // task_id uchun state
  const [code, setCode] = useState(""); // code uchun state
  const [loading, setLoading] = useState(false); // yuklanish holati
  const [error, setError] = useState(null); // xatolik holati
  const [success, setSuccess] = useState(null); // muvaffaqiyat holati
  const { t } = useTranslation();

  // Formani yuborish funksiyasi
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await $api.post("/tasks/verify", {
        task_id: taskId,
        code: code,
      });
      setSuccess("Muvaffaqiyatli yuborildi!");
      // console.log("Javob:", response.data);
      // Agar kerak bo'lsa, inputlarni tozalash
      setTaskId("");
      setCode("");
    } catch (err) {
      setError("Xatolik yuz berdi, qayta urinib ko‘ring.");
      console.error("Xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg rounded-lg h-[400px] p-4 sm:mb-2 sm:w-[500px] md:ml-2 md:mb-[10px]">
      <CardBody>
        <Typography variant="h5" className="font-bold">
          {t("getAdmin")}
        </Typography>

        {/* Telegram link */}
        <a
          href="https://t.me/gdr_0000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-2 block"
        >
          @admin_username 
        </a>

        <Typography className="text-gray-600 mt-[30px]">
          {t("adminCommnetDocs")}
        </Typography>

        {/* Input qismi */}
        <input
          type="text"
          placeholder="Enter your id..."
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          className="mt-3 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter your code..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-3 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Xatolik yoki muvaffaqiyat xabari */}
        {error && (
          <Typography className="text-red-500 mt-2">{error}</Typography>
        )}
        {success && (
          <Typography className="text-green-500 mt-2">{success}</Typography>
        )}

        <Button
          className="mt-2 bg-black text-white " 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Yuborilmoqda..." : "Send"}
        </Button>
      </CardBody>
    </Card>
  );
}