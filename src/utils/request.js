import fetch from 'dva/fetch';
import { getToken } from "../services/auth";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(err => ({ err }));
}

const headers = {
    Host: 'acm.duxy.me',
    Referer: 'http://acm.duxy.me/meter/blog/detail/51',
}

export default function requestWithToken(url, options={}, json=false) {
  console.log(options)
  const newOptions = {
      ...options,
      headers: {
        ...headers,
        ...(options.headers||{}),
        Authorization: `Bearer ${getToken()}`
      }
    }
  if(json) {
    newOptions.headers['Content-Type'] = 'application/json'
  }
  return request(url, newOptions)
}