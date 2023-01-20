import axios from "axios";

const {
  REACT_APP_BASE_URL,
  REACT_APP_RAPID_API_KEY,
  REACT_APP_RAPID_API_HOST,
} = process.env;

const BASE_URL = REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    //  NOTE: Uncomment when needed
    // Authorization: `Bearer *token*`,
    "X-RapidAPI-Key": REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": REACT_APP_RAPID_API_HOST,
  },
});

//  NOTE: Auth. Uncomment when needed
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

//  NOTE: Auth. Uncomment when needed
// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401 || error.response.status === 403) {
//       LoginStore.logOut();
//     }
//     return Promise.reject(error);
//   }
// );

//  NOTE: Uncomment when needed
// const publicAxios = axios.create({
//   baseURL: `${BASE_URL}`,
//   headers: { "Content-Type": "multipart/form-data" },
// });

//  NOTE: Uncomment when needed
// export { publicAxios, BASE_URL };

export default instance;
