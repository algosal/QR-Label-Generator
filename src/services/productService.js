import axios from "axios";

const API_URL =
  "https://silotosidewalks.com/app/REST/v1/product_variations.php";

export const fetchProductData = async () => {
  try {
    const response = await axios.get(API_URL);
    // console.log(response);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};
