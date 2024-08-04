import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import QRLabelGenerator from "./QRLabelGenerator";
import "./ProductLabels.css"; // Import the CSS file
// import sampleData from "../services/data";
import { fetchProductData } from "../services/productService";

const ProductLabels = () => {
  let initalStateOfArray = [
    {
      VariationID: "1",
      Name: "Moonlight Hash - Small",
      Serial_Number: "7256260006",
      Price: "25.00",
    },
  ];

  let [labelsArray, setLabelsArray] = useState(initalStateOfArray);

  useEffect(() => {
    fetchProductData().then((d) => setLabelsArray(d));
  }, []);

  const labels = labelsArray;
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
  let qrValue = JSON.stringify({
    productId: label.VariationID,
    productName: label.Name,
    price: label.Price,
    serial: label.Serial_Number,
    owner: "Owned by Silos to Sidewalks Inc.",
  });
  return (
    <div className="product-labels-container">
      <div className="product-label">
        <QRCode value={qrValue} size={150} />
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
