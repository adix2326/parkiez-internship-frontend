import { myAxios } from "./auth.service";
import authHeader from "./auth-header";

export const makeExit = async (formData) => {
    const params = new URLSearchParams(formData);
  console.log("params from makeExit: ", params);
  const response = await myAxios.post("/api/attendant/exit", params, { headers: authHeader() });
  return response.data;
};