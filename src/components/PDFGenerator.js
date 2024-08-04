import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    border: "1px solid black",
    width: "30%",
    textAlign: "center",
  },
});

const QRLabelDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {Array.from({ length: 30 }).map((_, index) => (
        <View style={styles.section} key={index}>
          <Text>{data}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

const PDFGenerator = ({ data }) => (
  <div>
    <PDFDownloadLink
      document={<QRLabelDocument data={data} />}
      fileName="labels.pdf"
    >
      {({ loading }) => (loading ? "Generating document..." : "Download PDF")}
    </PDFDownloadLink>
  </div>
);

export default PDFGenerator;
