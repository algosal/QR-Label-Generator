import React from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import QRCode from "qrcode";
import "./QRLabelGenerator.css"; // Import the CSS file

const generatePDF = async (label) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size (in points)
  const { width, height } = page.getSize();

  const numColumns = 3;
  const numRows = 10;

  const labelWidth = (width - 60) / numColumns; // Margin around the page
  const labelHeight = (height - 60) / numRows; // Margin around the page

  const margin = 20; // Margin around each label
  const qrCodeSize = 80; // QR code size
  const textXOffset = 100; // X offset for the text relative to the QR code

  // Increased top margin to push labels further down
  const topMargin = -70; // Top margin for the first row

  // Generate QR code with product ID included
  // const qrCodeDataUrl = await QRCode.toDataURL(
  //   JSON.stringify(
  //     `{productId: ${label.productId}\nproductName: ${label.productName}\nprice: ${label.price}\nserial: ${label.serial}}`
  //   )
  // );

  const qrCodeDataUrl = await QRCode.toDataURL(
    JSON.stringify({
      productId: label.productId,
      productName: label.productName,
      price: label.price,
      serial: label.serial,
      owner: "Owned by Silos to Sidewalks Inc.",
    })
  );

  const qrImage = await pdfDoc.embedPng(qrCodeDataUrl);

  for (let i = 0; i < 30; i++) {
    const row = Math.floor(i / numColumns);
    const col = i % numColumns;

    const x = col * labelWidth + margin;
    const y = height - (row + 1) * labelHeight + margin + topMargin; // Adjusted position with top margin

    page.drawImage(qrImage, {
      x: x + margin,
      y: y + margin,
      width: qrCodeSize, // QR code size
      height: qrCodeSize, // QR code size
    });

    // Calculate vertical center for text
    const textY = y + margin + qrCodeSize / 2;

    // Draw product info without Product ID
    page.drawText(`Name: ${label.productName}`, {
      x: x + textXOffset,
      y: textY + 10, // Centered relative to the QR code
      size: 10,
    });
    page.drawText(`Price: $${label.price}`, {
      x: x + textXOffset,
      y: textY - 5, // Centered relative to the QR code
      size: 10,
    });
    page.drawText(`Serial: ${label.serial}`, {
      x: x + textXOffset,
      y: textY - 20, // Centered relative to the QR code
      size: 10,
    });
  }

  // Serialize PDF to bytes
  const pdfBytes = await pdfDoc.save();

  // Download the PDF
  saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "labels.pdf");
};

const QRLabelGenerator = ({ label }) => {
  return (
    <button className="generate-button" onClick={() => generatePDF(label)}>
      Generate PDF
    </button>
  );
};

export default QRLabelGenerator;
