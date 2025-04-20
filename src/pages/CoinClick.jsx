  import { useState } from "react";
  import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
  import { $api } from "../utils/index";
  import { Helmet } from "react-helmet";

  const TABLE_HEAD = ["Coins", "Amount", "Count"];

  export function CoinClick() {
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const rows = [
      {
        id: 1,
        name: "Gold",
        img: "/goldcoin.webp",
        amount: "5000 so'm",
        count: 5,
        coin: "GOLD",
      },
    ];

    const handlePayment = async () => {
      setLoading(true);
      try {
        const response = await $api.post("/payment/initiate", {
          type: "gold",
          quantity: 5,
          redirect_url: "https://clmgo.org/paymentResult",
        });

        const data = response.data;
        // console.log("API response:", data);/

        if (data?.payment_url) {
          window.location.href = data.payment_url;
        } else {
          alert("To‘lov havolasi topilmadi.");
        }
      } catch (error) {
        console.error("To‘lovda xatolik:", error);
        alert("To‘lov amalga oshmadi.");
        if (err?.status === 401) {
          navigate("/login");
          localStorage.clear();
        }
      } finally {
        setLoading(false);
        setModalOpen(false); // Modalni yopish
      }
    };

    return (
      <>
        <Helmet>
          <title>Earn Coins - CLM</title>
          <meta
            name="description"
            content="Complete tasks and earn coins. CLM allows you to earn money by collecting subscribers."
          />
        </Helmet>

        <Card className="w-full sm:w-[700px] mx-auto mt-6">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none px-4 py-3"
          >
            <Typography variant="h5" color="blue-gray">
              Coins
            </Typography>
          </CardHeader>

          <CardBody className="px-4 py-2">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max table-auto border-collapse">
                <thead>
                  <tr className="bg-blue-gray-50">
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border border-blue-gray-100 px-4 py-2 text-center"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((coin) => (
                    <tr key={coin.id} className="border-b border-blue-gray-100">
                      <td className="px-4 py-3 flex justify-center items-center gap-3">
                        <Avatar src={coin.img} alt={coin.name} size="md" />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {coin.name}
                        </Typography>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Typography variant="small" color="blue-gray">
                          {coin.amount}
                        </Typography>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Typography variant="small" color="blue-gray">
                          {coin.count}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>

          <CardFooter className="flex justify-end py-4 mr-4">
            <Button
              size="md"
              color="green"
              onClick={() => setModalOpen(true)}
              disabled={loading}
            >
              {loading ? "Yuklanmoqda..." : "To‘lash"}
            </Button>
          </CardFooter>
        </Card>

      </>
    );
  }

