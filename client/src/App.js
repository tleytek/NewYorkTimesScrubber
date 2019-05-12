import React from 'react';
import API from './utils/API';
import { Col, Row, Container } from './components/Grid';
import { Card, CardHeader, CardBody } from './components/Card';
import ArticlesCard from './components/ArticlesCard';
import SavedArticlesCard from './components/SavedArticlesCard';
import { Button, Input } from './components/Input';
class App extends React.Component {
  state = {
    searchTerm: '',
    beginDate: '',
    endDate: '',
    articles: [],
    savedArticles: [],
    searching: false
  };

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    API.getArticles().then(res => {
      this.setState({ savedArticles: res.data });
    });
  };

  deleteArticle = id => {
    API.deleteArticle(id).then(res => this.getArticles());
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  /* Calls the searchArticles function and in 
   the promise we set the articles state to the response of searchArticles */
  handleFormSubmit = event => {
    event.preventDefault();
    const { searchTerm, beginDate, endDate } = this.state;
    this.setState({ searching: true });
    API.searchArticles({ searchTerm, beginDate, endDate }).then(response => {
      this.setState({ articles: response.data, searching: false });
    });
  };

  saveArticle = article => {
    console.log('imworking');
    API.saveArticle({
      title: article.headline.main,
      url: article.web_url
    }).then(this.getArticles());
  };

  render() {
    return (
      <Container>
        <Card>
          <CardHeader>Search</CardHeader>
          <CardBody>
            <form onSubmit={this.handleFormSubmit}>
              <Row justifyContent="center">
                <label>Topic</label>
              </Row>
              <Input
                name="searchTerm"
                value={this.state.searchTerm}
                onChange={this.handleInputChange}
                placeholder="Search for an article"
              />
              <Row justifyContent="center">
                <Button onClick={this.handleFormSubmit}>Search</Button>
              </Row>
            </form>
          </CardBody>
        </Card>
        <ArticlesCard
          searchedArticles={this.state.articles}
          saveArticle={this.saveArticle}
          savedArticles={this.state.savedArticles}
          searchState={this.state.searching}
        />
        <SavedArticlesCard savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
      </Container>
    );
  }
}

export default App;
