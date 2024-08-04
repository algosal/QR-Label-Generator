import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Hardcoded data for a single label
const labelData = {
  productId: "1",
  Name: "some name",
  Price: "25",
  serial: "12345",
};

// Function to generate 30 labels with the same data
const generateLabels = (data) => {
  return Array.from({ length: 30 }, () => data);
};

const LabelPDF = () => {
  const labels = generateLabels(labelData);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.grid}>
          {labels.map((label, index) => (
            <View key={index} style={styles.label}>
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${label.serial}&size=100x100`}
                style={styles.qrCode}
              />
              <View style={styles.info}>
                <Text style={styles.title}>{label.Name}</Text>
                <Text>Price: ${label.Price}</Text>
                <Text>Serial: {label.serial}</Text>
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
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  label: {
    width: "30%", // 3 labels per row
    marginBottom: 10,
    padding: 10,
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
    fontSize: 10,
    fontWeight: "bold",
  },
  qrCode: {
    width: 100,
    height: 100,
  },
});

export default LabelPDF;
