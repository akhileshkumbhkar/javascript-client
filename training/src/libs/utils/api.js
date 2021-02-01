/* eslint-disable */
import axios from 'axios';
import localStorage from 'local-storage';

const callApi = async (data, method, url) => {
  try {
    console.log('Inside try of api')
    const baseUrl = 'http://localhost:9000/api' + url;
    const response = await axios({
      url: baseUrl,
      method,
      data,
      headers: {
        authorization: localStorage.get('token',)
      },
    });
    return response.data;
  } catch (error) {
    console.log('Inside catch of api', error , error.response);
    return { status: 'error', message: 'This is a error message' };
  }
};
export default callApi;
