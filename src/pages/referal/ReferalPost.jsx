import React, { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { $api } from "../../utils/index";
import { Helmet } from "react-helmet";

export default function ReferalPost() {
  const [referralCode, setReferralCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendCode = async () => {
    if (!referralCode.trim()) return; // Bo‘sh kod kiritilmasin

    setIsLoading(true);
    setMessage("");

    try {
      const response = await $api.post("/referral-code", {
        referral_code: referralCode, // API talab qilgan formatda
      });

      if (response.status === 200) {
        setMessage("Code Sent Successfully!");
      } else {
        setMessage("Something went wrong. Try again.");
      }
    } catch (error) {
      console.error("Error sending referral code:", error);
      setMessage("Error: Invalid or expired referral code.");
      if (error?.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(""), 3000); // 3 soniyadan keyin o‘chadi
    }
  };

  return (
    <div>
      <Helmet>
        <title>Create Referral Link - CLM</title>
        <meta
          name="description"
          content="Create a new referral link and share it with others. Invite your friends and get a bonus!"
        />
      </Helmet>

      <div className="flex flex-col items-start sm:ml-2 md:ml-4 mt-6 space-y-4 bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
        <Typography variant="h6" className="text-gray-700 text-left">
          Send Referral Code
        </Typography>

        <Input
          label="Enter Referral Code"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          className="w-full"
        />

        <div className="flex justify-end w-full">
          <Button
            color="blue"
            className="w-[120px]"
            onClick={handleSendCode}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Code"}
          </Button>
        </div>

        {message && (
          <Typography variant="small" className="font-medium text-green-600">
            {message}
          </Typography>
        )}
      </div>
    </div>
  );
}
