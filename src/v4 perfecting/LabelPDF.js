import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const LabelPDF = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.grid}>
          {data.map((label, index) => (
            <View key={index} style={styles.label}>
              <Image src={label.qrCode} style={styles.qrCode} />
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
  },
  label: {
    width: "30%",
    margin: "1%",
    padding: 10,
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 120,
  },
  info: {
    marginTop: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
  qrCode: {
    width: 60,
    height: 60,
  },
});

export default LabelPDF;
