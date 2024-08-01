import { myAxios } from "./auth.service";
import authHeader from "./auth-header";

export const addAttendant = async (attendantData) => {
  const response = await myAxios.post("/api/operator/addAttendant", attendantData, { headers: authHeader() });
  
  return response.data;
};
