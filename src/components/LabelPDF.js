import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import QRCode from "react-qr-code";

// Sample data for 30 labels
const generateLabels = (data) => {
  let labels = [];
  for (let i = 0; i < 30; i++) {
    const item = data[i % data.length]; // Use modulo to loop through data
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
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  label: {
    width: "30%",
    margin: "1%",
    padding: 10,
    border: "1px solid black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    marginLeft: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LabelPDF;
