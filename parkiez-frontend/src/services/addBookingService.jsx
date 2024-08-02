import { myAxios } from "./auth.service";
import authHeader from "./auth-header";

export const addBooking = async (bookingData) => {
  const response = await myAxios.post("/api/attendant/addBooking", bookingData, { headers: authHeader() });
  return response.data;
};
