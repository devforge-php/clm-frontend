import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Typography } from "@material-tailwind/react";
import { $api } from "../utils";

export default function PaymentResult() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    payment_status: "",
    payment_id: "",
    user_id: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const profileResponse = await $api.get("/profile");
        const user_id = profileResponse.data?.user.id;
        const params = new URLSearchParams(search);
        const payment_status = params.get("payment_status");
        const payment_id = params.get("payment_id");

        setData({ payment_status, payment_id, user_id });
      } catch (error) {
        console.error("Foydalanuvchi ma'lumotlarini olishda xatolik:", error);
      }
    };

    fetchUserId();
  }, [search]);

  const handleClaimCoin = async () => {
    setLoading(true);
    try {
      const response = await $api.post("/payment/callback", {
        user_id: data.user_id,
        payment_id: data.payment_id,
        payment_status: data.payment_status,
      });
      alert("Tanga muvaffaqiyatli berildi!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Tanga olishda xatolik:", error);
      alert("Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6 shadow-lg text-center">
      <Typography variant="h5" color="blue-gray" className="mb-4">
        To‘lov Natijasi
      </Typography>

      <Typography variant="small" className="mb-2">User ID: {data.user_id}</Typography>
      <Typography variant="small" className="mb-2">Payment ID: {data.payment_id}</Typography>
      <Typography variant="small" className="mb-6">Status: {data.payment_status}</Typography>

      {data.payment_status === "1" && (
        <>
          <Typography variant="paragraph" color="red" className="mb-4">
            ❌ To‘lov amalga oshmadi
          </Typography>
          <Button color="blue" onClick={() => navigate("/dashboard")}>
            Ortga qaytish
          </Button>
        </>
      )}

      {data.payment_status === "2" && (
        <>
          <Typography variant="paragraph" color="green" className="mb-4">
            ✅ To‘lov muvaffaqiyatli
          </Typography>
          <Button
            color="green"
            onClick={handleClaimCoin}
            disabled={loading}
          >
            {loading ? "Yuklanmoqda..." : "Tanga olish"}
          </Button>
        </>
      )}
    </Card>
  );
}
