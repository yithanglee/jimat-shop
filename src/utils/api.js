import axios from 'axios';
import Cookies from 'js-cookie';

import config from 'config';

const fetch = async (method, url, data, options) => {
  const accessToken = Cookies.get('accessToken');
  try {
    let headers = {
      'Content-Type': 'application/json',
      'Jimat-Origin': 'shop'
    }

    if (accessToken) {
      headers = Object.assign(headers, {
        'Authorization': `Bearer ${accessToken}`
      })
    }

    const response = await axios({
      method,
      url,
      data,
      baseURL: config.JIMAT_API,
      timeout: 30000,
      headers: headers,
      ...options,
    });
    return response;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove('accessToken');
        Cookies.remove('isSkipped');
      }
    }
    throw error;
  }
};

const api = {
  GET: (url, options) => fetch('GET', url, {}, options),
  POST: (url, body) => fetch('POST', url, body || {}),
  PUT: (url, body) => fetch('PUT', url, body || {}),
  PATCH: (url, body) => fetch('PATCH', url, body || {}),
  DELETE: (url, body) => fetch('DELETE', url, body || {}),
};

export default api;
