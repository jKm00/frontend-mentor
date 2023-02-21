import axios from "axios";

const axiosApi = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
})

const apiRequest = <T>(method: any, url: any, body: T) => {

  return axiosApi({
    method,
    url,
    data: body,
  })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((err) => {
      return Promise.resolve(err)
    })

}

const get = (url: any) => apiRequest('get', url, null);

const API = {
  get
};

export default API;