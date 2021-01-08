/* eslint-disable */
import axios from 'axios';
import localStorage from 'local-storage';

const callApi = async (data, method, url) => {
  console.log('Data inside callapi :', data);
  try {
    const baseUrl = 'http://localhost:9000/api' + url;
    const response = await axios({
      method,
      url: baseUrl,
      data,
    });
    localStorage.set('token', response.data);
    const token = localStorage.get('token');
    console.log('Token:::::', token);
  } catch (error) {
    console.log('Inside catch', error.response);
    return { status: 'error', message: 'This is a error message' };
  }
};
export default callApi;
