import { myAxios } from "./auth.service";
import authHeader from "./auth-header";
import axios from "axios";

export const addBooking = async (bookingData) => {
  console.log("add booking from service started");
  console.log("booking data: ", bookingData);
  // const params = new URLSearchParams(bookingData);
  // console.log("params from makeEntry: ", params);
  const response = await axios.post("http://localhost:8081/api/attendant/addBooking", bookingData, { headers: authHeader() });
  console.log("after getting response, response: ", response);
  return response.data;
};
