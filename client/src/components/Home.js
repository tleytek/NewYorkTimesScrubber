import React from 'react';
import API from '../utils/API';
import { Col, Row, Container } from './Grid';
import { Card, CardHeader, CardBody } from './Card';
import ArticlesCard from './ArticlesCard';
import SavedArticlesCard from './SavedArticlesCard';
import { Button, Input } from './Input';
class Home extends React.Component {
  state = {
    searchTerm: '',
    startYear: '',
    endYear: '',
    articles: [],
    savedArticles: [],
    searching: false,
    loading: false
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
    const { searchTerm, startYear, endYear } = this.state;
    this.setState({ searching: true });
    API.searchArticles({ searchTerm, startYear, endYear }).then(response => {
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
          <CardHeader>
            <Row justifyContent="center">Search</Row>
          </CardHeader>
          <CardBody>
            <form onSubmit={this.handleFormSubmit}>
              <Row justifyContent="center">
                <label>Topic</label>
              </Row>
              <Input
                name="searchTerm"
                value={this.state.searchTerm}
                onChange={this.handleInputChange}
                placeholder="Enter an article topic to search"
              />
              <Row justifyContent="center">
                <label>Begin Year</label>
              </Row>
              <Input
                name="startYear"
                value={this.state.startYear}
                onChange={this.handleInputChange}
                placeholder="E.g. 2000"
              />
              <Row justifyContent="center">
                <label>End Year</label>
              </Row>
              <Input
                name="endYear"
                value={this.state.endYear}
                onChange={this.handleInputChange}
                placeholder="E.g. 2018"
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

export default Home;
