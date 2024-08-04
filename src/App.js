import React, { useEffect, useState } from "react";
import { fetchProductData } from "./services/productService";
import QRGenerator from "./components/QRGenerator";
import PDFGenerator from "./components/PDFGenerator";

const App = () => {
  const [productData, setProductData] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProductData();
        setProductData(data[0].QR_Code); // Adjust based on your data structure
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <h1>QR Code and PDF Label Generator</h1>
      <QRGenerator data={productData} />
      <PDFGenerator data={productData} />
    </div>
  );
};

export default App;
