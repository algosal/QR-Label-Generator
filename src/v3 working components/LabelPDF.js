import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import QRCode from "react-qr-code";

// Helper function to generate 30 labels
const generateLabels = (data) => {
  const labels = [];
  for (let i = 0; i < 30; i++) {
    const item = data[i % data.length]; // Loop through data
    labels.push(item);
  }
  return labels;
};

const LabelPDF = ({ data }) => {
  const labels = generateLabels(data);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.grid}>
          {labels.map((label, index) => (
            <View key={index} style={styles.label}>
              <QRCode value={label.QR_Code} size={60} />
              <View style={styles.info}>
                <Text style={styles.title}>{label.Name}</Text>
                <Text>Price: ${label.Price}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    padding: 10, // Padding around the edges
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
  },
  label: {
    width: "30%", // Adjust as necessary
    height: "15%", // Adjust as necessary
    margin: "1%",
    padding: 5,
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  info: {
    marginTop: 5,
  },
  title: {
    fontSize: 8, // Adjust font size as necessary
    fontWeight: "bold",
  },
});

export default LabelPDF;
