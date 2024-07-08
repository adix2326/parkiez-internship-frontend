import { myAxios } from "./auth.service";

export const addOperator = async (operatorData) => {
  const response = await myAxios.post("/api/admin/addOperator", operatorData);
  return response.data;
};
