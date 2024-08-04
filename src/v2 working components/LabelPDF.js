// src/components/LabelPDF.js
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import QRCode from "qrcode";

const generateLabels = (data) => {
  let labels = [];
  for (let i = 0; i < 30; i++) {
    const item = data[i % data.length];
    labels.push(item);
  }
  return labels;
};

const generateQRCode = async (value) => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(value, {
      width: 100,
      margin: 1,
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error("Error generating QR code", error);
    return "";
  }
};

const LabelPDF = ({ data }) => {
  // Debugging: Log data to ensure it is being passed correctly
  console.log("Data received in LabelPDF:", data);

  const labels = generateLabels(data);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {labels.map((label, index) => {
          const row = Math.floor(index / 3);
          const column = index % 3;
          const qrCodeDataURL = generateQRCode(label.QR_Code); // Generate QR code

          return (
            <View
              key={index}
              style={[
                styles.label,
                {
                  marginTop: row * 70,
                  marginLeft: column * 180,
                },
              ]}
            >
              {qrCodeDataURL && (
                <Image src={qrCodeDataURL} style={styles.qrCode} />
              )}
              <View style={styles.info}>
                <Text style={styles.title}>{label.Name}</Text>
                <Text>Price: ${label.Price}</Text>
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
  },
  label: {
    width: 180,
    height: 70,
    border: "1px solid black",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  qrCode: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default LabelPDF;
