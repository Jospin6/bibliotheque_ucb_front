import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.ucb-library.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Échec de la connexion. Veuillez vérifier vos identifiants.');
  }
};

export const addTeacher = async (teacherData: {
  name: string;
  email: string;
  department: string;
}) => {
  try {
    const response = await api.post('/teachers', teacherData);
    return response.data;
  } catch (error) {
    throw new Error("Échec de l'ajout de l'enseignant. Veuillez réessayer.");
  }
};

export default api;