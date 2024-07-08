import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = 'http://localhost:8081';
const user = JSON.parse(localStorage.getItem('user'));
const token = user ? user.token : null;

export const myAxios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
  },
});

const API_URL = BASE_URL + "/api/auth/";
const ADMIN_URL = BASE_URL + "/api/admin/";

class AuthService {
  async login(username, password) {
    const response = await axios.post(API_URL + "signin", { username, password });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  async getCurrentUser() {
    const response = await axios.get(ADMIN_URL + "currentAdmin", { headers: authHeader() });
    return response.data;
  }

  getCurrentUserFromStorage() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
