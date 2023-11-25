// pages/api/data-endpoint.js

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Make a GET request to your backend API
    const response = await axios.get("https://your-backend-api.com/data");

    // Extract the data from the response
    const data = response.data;

    // Return the data as JSON
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
// Studying new fetch method
// Update
