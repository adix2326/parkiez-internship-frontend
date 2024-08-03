import { myAxios } from "./auth.service";
import authHeader from "./auth-header";

export const addBooking = async (bookingData) => {
  const params = new URLSearchParams(bookingData);
  const response = await myAxios.post("/api/attendant/addBooking", params, { headers: authHeader() });
  return response.data;
};

