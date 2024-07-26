import { myAxios } from "./auth.service";
import authHeader from "./auth-header";

export const addParking = async (parkingData) => {
  const response = await myAxios.post("/api/operator/addParking", parkingData, { headers: authHeader() });
  return response.data;
};
