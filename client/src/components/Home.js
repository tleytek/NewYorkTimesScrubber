import React from 'react';
import API from '../utils/API';
import { Row } from './Grid';
import { Card, CardHeader, CardBody } from './Card';
import { FormButton, Input } from './Input';
import { List, ListItem, ListSpinner, ListLink, ListButton } from './List';
import { socket } from '../App';
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
    socket.emit('getAllArticlesReq');
    socket.on('getAllArticlesRes', data => this.setState({ savedArticles: data }));
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
    socket.emit('saveArticleReq', article);
    this.getArticles();
  };

  duplicatePrevention = currentArticleUrl => {
    return this.state.savedArticles.find(savedArticle => {
      return savedArticle.url === currentArticleUrl;
    });
  };

  renderContent(searchState, searchedItems) {
    if (searchState && searchedItems.length >= 0) {
      return <ListSpinner />;
    }
    if (!searchState && searchedItems.length > 0) {
      return this.renderList(searchedItems);
    }
    return (
      <div className="list-group-item beige">
        <div className="row justify-content-center align-items-center">No Articles</div>
      </div>
    );
  }

  renderList = listArray =>
    listArray.map(listItem => (
      <ListItem>
        <ListLink {...listItem} />
        {this.duplicatePrevention(listItem.web_url) ? (
          <ListButton className="btn orange mr-3" disabled>
            Saved
          </ListButton>
        ) : (
          <ListButton
            className="btn orange mr-3"
            onClick={() => this.saveArticle({ title: listItem.headline.main, url: listItem.web_url })}
          >
            Save
          </ListButton>
        )}
      </ListItem>
    ));

  render() {
    let { searchTerm, startYear, endYear, articles, searching } = this.state;

    return (
      <div>
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

          <List>{this.renderContent(searching, articles)}</List>
        </Card>
      </div>
    );
  }
}

export default Home;
