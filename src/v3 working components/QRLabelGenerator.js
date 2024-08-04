import React, { useState } from "react";
import QRCode from "react-qr-code";
import { PDFDownloadLink } from "@react-pdf/renderer";
import LabelPDF from "./LabelPDF"; // Ensure this path is correct
import "./QRLabelGenerator.css"; // Import CSS file

const mockData = [
  {
    VariationID: "1",
    ProductID: "1",
    Name: "Moonlight Hash - Small",
    Product_Picture_Text: "http://example.com/var_pic1.jpg",
    Serial_Number_Purchased: "022000293213",
    QR_Code_Purchased: "QR7256260006S",
    Serial_Number: "7256260006",
    QR_Code: "QR7256260006",
    Price: "25.00",
    Description: "Small variation of Moonlight Hash",
    Metrics: "grams",
    Quantity_In_Metrics: "2.00",
    Quantity_In_Text: "10g",
    Internal_Rating: "4.50",
    External_Rating: "4.20",
    Number_Of_Internal_Ratings: "10",
    Number_Of_External_Ratings: "50",
    Certificate_Of_Analysis_Link:
      '[{"name":"COAs\\/http:\\/\\/example.com\\/coas\\/1.pdf","usrName":"1.pdf","size":null,"type":null,"thumbnail":"COAs\\/thhttp:\\/\\/example.com\\/coas\\/1.pdf","thumbnail_type":null,"thumbnail_size":null,"searchStr":"1.pdf,!:sStrEnd"}]',
    CreatedAt: "2024-07-14 08:14:19",
    UpdatedAt: "2024-08-03 23:42:32",
    UserPRice: "0.00",
  },
  {
    VariationID: "2",
    ProductID: "2",
    Name: "Moonlight Hash - Large",
    Product_Picture_Text: "http://example.com/var_pic2.jpg",
    Serial_Number_Purchased: "022000293214",
    QR_Code_Purchased: "QR7256260007S",
    Serial_Number: "7256260007",
    QR_Code: "QR7256260007",
    Price: "50.00",
    Description: "Large variation of Moonlight Hash",
    Metrics: "grams",
    Quantity_In_Metrics: "5.00",
    Quantity_In_Text: "25g",
    Internal_Rating: "4.70",
    External_Rating: "4.30",
    Number_Of_Internal_Ratings: "15",
    Number_Of_External_Ratings: "60",
    Certificate_Of_Analysis_Link:
      '[{"name":"COAs\\/http:\\/\\/example.com\\/coas\\/2.pdf","usrName":"2.pdf","size":null,"type":null,"thumbnail":"COAs\\/thhttp:\\/\\/example.com\\/coas\\/2.pdf","thumbnail_type":null,"thumbnail_size":null,"searchStr":"2.pdf,!:sStrEnd"}]',
    CreatedAt: "2024-07-15 09:14:19",
    UpdatedAt: "2024-08-04 11:42:32",
    UserPRice: "0.00",
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
    // Use window.print() to print only the active label
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write(`<h1>${mockData[index].Name}</h1>`);
    printWindow.document.write(
      `<img src="${mockData[index].QR_Code_Purchased}" alt="QR Code" />`
    );
    printWindow.document.write(`<p>Price: $${mockData[index].Price}</p>`);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
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
