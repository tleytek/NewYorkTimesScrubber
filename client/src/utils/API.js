import axios from 'axios';

export default {
  searchArticles: data => {
    return axios.post('/api/searchArticles', data);
  },
  saveArticle: data => {
    return axios.post('api/articles', data);
  },
  getSavedArticles: () => {
    return axios.get('/api/articles');
  },
  deleteArticle: id => {
    return axios.delete('/api/articles/' + id);
  }
};
