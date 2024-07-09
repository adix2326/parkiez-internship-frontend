import { myAxios } from "./auth.service";
import authHeader from "./auth-header";

export const addOperator = async (operatorData) => {
  const response = await myAxios.post("/api/admin/addOperator", operatorData, { headers: authHeader() });
  return response.data;
};
