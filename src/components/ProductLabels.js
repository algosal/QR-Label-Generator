import React, { useState } from "react";
import QRCode from "qrcode.react";
import QRLabelGenerator from "./QRLabelGenerator";
import "./ProductLabels.css"; // Import the CSS file

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
    <div className="product-labels-container">
      <div className="product-label">
        <QRCode value={label.Serial_Number} size={150} />
        <div className="label-text">Product ID: {label.VariationID}</div>
        <div className="label-text">Name: {label.Name}</div>
        <div className="label-text">Price: ${label.Price}</div>
        <div className="label-text">Serial: {label.Serial_Number}</div>
      </div>
      <div className="navigation-buttons">
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
        className="generate-button"
      />
    </div>
  );
};

export default ProductLabels;
