// import { myAxios } from "./auth.service";
import authHeader from "./auth-header";
import axios from "axios";

export const addAttendant = async (attendantData) => {
  const response = await axios.post("http://localhost:8081/api/operator/addAttendant", attendantData, { headers: authHeader() });
  
  return response.data;
};
