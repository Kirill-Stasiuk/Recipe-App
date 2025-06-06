import axios from "axios";
import type { Response } from "express";

export const makeApiCall = async (url: string, res: Response, errorMessage: string) => {
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: errorMessage });
  }
}