// components/PaymentModal.jsx
import React from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

export default  function PaymentModal({ open, onClose, onConfirm }) {
    const { t } = useTranslation();
  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>{t("wouldyoulike")}</DialogHeader>
      {/* <DialogBody>
        Siz tanlagan tovarni to‘lash uchun davom etishni xohlaysizmi?
      </DialogBody> */}
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose} className="mr-2">
          {t("otmen")}
        </Button>
        <Button variant="gradient" color="green" onClick={onConfirm}>
        {t("willpay")}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
