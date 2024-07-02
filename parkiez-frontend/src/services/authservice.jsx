import axios from 'axios';

const API_URL = "http://localhost:8081/api/auth/";

const login = (username, password) => {
  console.log(API_URL + "signin");
  return axios.post(API_URL + "signin", {
    username,
    password
  });
};

const register = (username, password, roles) => {
  return axios.post(API_URL + "adminsignup", {
    username,
    password,
    roles
  });
};

export default {
  login,
  register
};
