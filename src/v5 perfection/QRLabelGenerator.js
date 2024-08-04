import React from "react";
import QRCode from "qrcode.react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import LabelPDF from "./LabelPDF";
import "./QRLabelGenerator.css";

// Sample data for a single label
const data = {
  productId: "1",
  Name: "any name",
  Price: "25",
  serial: "725626",
};

const QRLabelGenerator = () => {
  // Generate QR code URL
  const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${data.serial}&size=150x150`;

  return (
    <div className="qr-label-generator">
      <h1>QR Label Generator</h1>
      <div className="label-container">
        <QRCode value={data.serial} size={150} />
        <div className="label-info">
          <p>
            <strong>Product Name:</strong> {data.Name}
          </p>
          <p>
            <strong>Price:</strong> ${data.Price}
          </p>
        </div>
      </div>
      <div className="controls">
        <PDFDownloadLink
          document={<LabelPDF data={data} />}
          fileName={`label_${Date.now()}.pdf`}
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default QRLabelGenerator;
