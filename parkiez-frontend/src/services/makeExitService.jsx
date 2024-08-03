import { myAxios } from "./auth.service";
import authHeader from "./auth-header";

export const makeExit = async (formData) => {
    const params = new URLSearchParams(formData);
  const response = await myAxios.post("/api/attendant/exit", params, { headers: authHeader() });
  return response.data;
};

