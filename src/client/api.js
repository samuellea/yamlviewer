const axios = require('axios');

export const getGithubFile = (url) => {
  const request = axios.create({ baseURL: `/api/fetch?url=${url}` })
  return request.get().then(({ data }) => {
    return data;
  })
}