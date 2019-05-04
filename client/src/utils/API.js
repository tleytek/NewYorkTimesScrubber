import axios from 'axios';

export default {
  searchArticles: data => {
    return axios.post('/api/searchArticles', data);
  }
};
