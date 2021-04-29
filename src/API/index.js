import axios from 'axios';

const httpInstance = axios.create({
 baseURL: 'https://asse7okojl.execute-api.us-west-1.amazonaws.com/dev/',
});

httpInstance.interceptors.response.use(null, (error) => {
 const expectedError =
  error.response && error.response.status >= 400 && error.response.status < 500;
 if (!expectedError) {
  // Loggear mensaje de error a un servicio como Sentry
  // Mostrar error genérico al usuario
  return Promise.reject(error);
 }
});

export default httpInstance;
