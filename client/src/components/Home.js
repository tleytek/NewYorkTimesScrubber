import React from 'react';
import API from '../utils/API';
import { Row, Container } from './Grid';
import { Card, CardHeader, CardBody } from './Card';
import SavedArticlesCard from './SavedArticlesCard';
import { FormButton, Input } from './Input';
import { List, ListItem } from './List';
import Spinner from './Spinner';
class Home extends React.Component {
  state = {
    searchTerm: '',
    startYear: '',
    endYear: '',
    articles: [],
    savedArticles: [],
    searchingArticles: false
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
      title: article.title,
      url: article.url
    }).then(this.getArticles());
  };

  articleParityCheck = currentArticleUrl => {
    return this.state.savedArticles.find(savedArticle => {
      return savedArticle.url === currentArticleUrl;
    });
  };

  searchStatus(searchState, searchedItems) {
    if (searchState && searchedItems.length >= 0) {
      return <Spinner />;
    }
    if (!searchState && searchedItems.length > 0) {
      return this.renderList(searchedItems);
    }
    return (
      <div className="list-group-item" style={{ backgroundColor: `#f8ecc2` }}>
        <div className="row justify-content-center align-items-center">No Articles</div>
      </div>
    );
  }

  renderList = listArray =>
    listArray.map(listItem => (
      <ListItem articleParityCheck={this.articleParityCheck} saveArticle={this.saveArticle} {...listItem} />
    ));

  render() {
    let { searchTerm, startYear, endYear, articles, searching } = this.state;

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
                value={searchTerm}
                onChange={this.handleInputChange}
                placeholder="Enter an article topic to search"
              />
              <Row justifyContent="center">
                <label>Begin Year</label>
              </Row>
              <Input name="startYear" value={startYear} onChange={this.handleInputChange} placeholder="E.g. 2000" />
              <Row justifyContent="center">
                <label>End Year</label>
              </Row>
              <Input name="endYear" value={endYear} onChange={this.handleInputChange} placeholder="E.g. 2018" />
              <Row justifyContent="center">
                <FormButton onClick={this.handleFormSubmit}>Search</FormButton>
              </Row>
            </form>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Row justifyContent="center">Results</Row>
          </CardHeader>

          <List>{this.searchStatus(searching, articles)}</List>
        </Card>
        <SavedArticlesCard savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />
      </Container>
    );
  }
}

export default Home;
