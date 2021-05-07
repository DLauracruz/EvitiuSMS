import axios from 'axios';

const httpInstance = axios.create({
 baseURL: 'https://asse7okojl.execute-api.us-west-1.amazonaws.com/dev/',
});

httpInstance.interceptors.response.use(null, (error) => {
 const expectedError =
  error.response && error.response.status >= 400 && error.response.status < 500;
 if (!expectedError) {
  return Promise.reject(error);
 }
});

export default httpInstance;
