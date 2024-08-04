import React, { useState } from "react";
import QRCode from "qrcode.react";

const QRGenerator = ({ data }) => {
  const [qrCode, setQRCode] = useState("");

  const handleGenerateQR = () => {
    setQRCode(data);
  };

  return (
    <div>
      <button onClick={handleGenerateQR}>Generate QR Code</button>
      {qrCode && <QRCode value={qrCode} />}
    </div>
  );
};

export default QRGenerator;
