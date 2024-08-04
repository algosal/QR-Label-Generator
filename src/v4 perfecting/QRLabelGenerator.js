import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { PDFDownloadLink } from "@react-pdf/renderer";
import LabelPDF from "./LabelPDF";
import "./QRLabelGenerator.css";

// Sample data for 30 labels
const sampleData = Array.from({ length: 30 }, (_, index) => ({
  productId: (index + 1).toString(),
  Name: `Product ${index + 1}`,
  Price: (25 + index).toString(),
  serial: `7256${index + 1}`,
}));

const QRLabelGenerator = () => {
  const [dataWithQR, setDataWithQR] = useState([]);

  useEffect(() => {
    const generateQRs = async () => {
      const updatedData = await Promise.all(
        sampleData.map(async (item) => ({
          ...item,
          qrCode: await QRCode.toDataURL(item.serial),
        }))
      );
      setDataWithQR(updatedData);
    };
    generateQRs();
  }, []);

  return (
    <div className="qr-label-generator">
      <h1>QR Label Generator</h1>
      <PDFDownloadLink
        document={<LabelPDF data={dataWithQR} />}
        fileName={`labels_${Date.now()}.pdf`}
      >
        {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default QRLabelGenerator;
