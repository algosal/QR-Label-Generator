import axios from "axios";

const API_URL = "your_api_endpoint";

export const fetchProductData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};
