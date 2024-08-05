import { myAxios } from "./auth.service";
import authHeader from "./auth-header";

export const addParking = async (parkingData) => {
  const params = new URLSearchParams(parkingData);
  const response = await myAxios.post("/api/operator/addParking", params, { headers: authHeader() });
  return response.data;
};
