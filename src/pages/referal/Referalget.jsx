import React, { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/solid";
import { $api } from "../../utils/index";
import { Helmet } from "react-helmet";
export default function ReferalGet() {
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const getReferralCode = async () => {
    setLoading(true);
    try {
      const response = await $api.get("/referral");
      setReferralCode(response.data[0].referral_code);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching referral code:", error);
      setLoading(false);
      if (error?.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
    }
  };

  const copyToClipboard = () => {
    if (!referralCode) return;
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Helmet>
        <title>Referral Stats - CLM</title>
        <meta
          name="description"
          content="Track how many users have registered through your referral links."
        />
      </Helmet>
      <Card className="p-4 w-full sm:w-[400px] ml-4 mt-10 bg-white shadow-md rounded-md flex flex-col gap-4">
        <Typography variant="h6" color="blue-gray">
          Referral Code
        </Typography>

        {referralCode ? (
          <div className="flex items-center justify-between border border-gray-300 p-2 rounded-md">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              {referralCode}
            </Typography>
            <Button
              onClick={copyToClipboard}
              size="sm"
              color={copied ? "green" : "blue"}
              className="flex items-center gap-1"
            >
              {copied ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <ClipboardIcon className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        ) : (
          <Button
            onClick={getReferralCode}
            disabled={loading}
            color="blue"
            className="w-full sm:w-[200px]"
          >
            {loading ? "Loading..." : "Get Referral Code"}
          </Button>
        )}
      </Card>
    </div>
  );
}
