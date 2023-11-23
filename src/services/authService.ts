import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
});

const authService = {
  signUp: async (userData: {
    email: string;
    name: string;
    password: string;
  }) => {
    const response = await api.post(`${API_BASE_URL}/user/signup`, userData);
    localStorage.setItem("token", response.data.token);
    return response;
  },
  signIn: async (userData: { email: string; password: string }) => {
    const response = await api.post(`${API_BASE_URL}/user/signin`, userData);
    localStorage.setItem("token", response.data.token);
    return response;
  },
  getToken: () => {
    return localStorage.getItem("token");
  },
  removeToken: () => {
    localStorage.removeItem("token");
  },
};

export default authService;
