// src/components/QRLabelGenerator.js
import React, { useState } from "react";
import QRCode from "react-qr-code";
import { PDFDownloadLink } from "@react-pdf/renderer";
import LabelPDF from "./LabelPDF";
import "./QRLabelGenerator.css";

const mockData = [
  {
    VariationID: "1",
    ProductID: "1",
    Name: "Moonlight Hash - Small",
    QR_Code: "QR7256260006",
    Price: "25.00",
  },
  {
    VariationID: "2",
    ProductID: "2",
    Name: "Moonlight Hash - Large",
    QR_Code: "QR7256260007",
    Price: "50.00",
  },
];

const QRLabelGenerator = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % mockData.length);
  };

  const handlePrevious = () => {
    setIndex(
      (prevIndex) => (prevIndex - 1 + mockData.length) % mockData.length
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="qr-label-generator">
      <h1>QR Label Generator</h1>
      <div className="label-container">
        <div className="qr-code">
          <QRCode value={mockData[index].QR_Code} size={128} />
        </div>
        <div className="label-info">
          <p>
            <strong>Product Name:</strong> {mockData[index].Name}
          </p>
          <p>
            <strong>Price:</strong> ${mockData[index].Price}
          </p>
        </div>
      </div>
      <div className="controls">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handlePrint}>Print Label</button>
        <PDFDownloadLink
          document={<LabelPDF data={mockData} />}
          fileName={`labels_${Date.now()}.pdf`}
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default QRLabelGenerator;
