import axios from 'axios';

console.log('TODO: Remove API key before deploying, obvs...');

const baseURL = 'https://api.unsplash.com/search/photos';
const params =
  '?page=1&client_id=HeumkG2NOb1CfEnaeX-Eg-bLKk1nFnOfO_QG8x_7JFE&query=';
const urlWithParams = `${baseURL}${params}`;

const customFetch = axios.create({
  baseURL: urlWithParams,
});

export default customFetch;
