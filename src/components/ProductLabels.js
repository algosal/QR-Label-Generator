import React, { useState } from "react";
import QRCode from "qrcode.react";
import QRLabelGenerator from "./QRLabelGenerator";

const ProductLabels = () => {
  const labels = [
    {
      VariationID: "1",
      Name: "some name",
      Price: "25",
      Serial_Number: "12345",
    },
    {
      VariationID: "2",
      Name: "another name",
      Price: "30",
      Serial_Number: "67890",
    },
    {
      VariationID: "3",
      Name: "third name",
      Price: "35",
      Serial_Number: "54321",
    },
    {
      VariationID: "4",
      Name: "fourth name",
      Price: "40",
      Serial_Number: "09876",
    },
    // Add more labels as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < labels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const label = labels[currentIndex];

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          border: "1px solid #ccc",
          padding: "10px",
          width: "200px",
          margin: "0 auto",
        }}
      >
        <QRCode value={label.serial} size={150} />
        <div>Product ID: {label.VariationID}</div>
        <div>Name: {label.Name}</div>
        <div>Price: ${label.Price}</div>
        <div>Serial: {label.Serial_Number}</div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === labels.length - 1}
        >
          Forward
        </button>
      </div>
      <QRLabelGenerator
        label={{
          productId: label.VariationID,
          productName: label.Name,
          price: label.Price,
          serial: label.Serial_Number,
        }}
      />
    </div>
  );
};

export default ProductLabels;
