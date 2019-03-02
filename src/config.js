import qs from 'query-string';

export function readApiKeyFromWindow() {
  const queryString = qs.parse(window.location.search);
  return queryString.api_key;
}


export function readDomainFromEnv() {
  return process.env.REACT_APP_DOMAIN || 'http://localhost:5000';
}
