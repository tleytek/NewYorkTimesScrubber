import React from 'react';
import API from '../utils/API';
import { Row } from './Grid';
import { Card, CardHeader } from './Card';
import { List, ListItem, ListSpinner, ListButton } from './List';
import { socket } from '../App';

class Saved extends React.Component {
  state = {
    savedArticles: [],
    loadingArticles: false
  };

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    this.setState({ loadingArticles: true });
    socket.emit('getAllArticlesReq');
    socket.on('getAllArticlesRes', data =>
      this.setState({ savedArticles: data, loadingArticles: false })
    );
  };

  deleteArticle = id => {
    API.deleteArticle(id).then(res => this.getArticles());
  };

  renderList = listArray =>
    listArray.map(listItem => (
      <ListItem>
        <a className="alert-link mx-2" href={listItem.url}>
          {listItem.title}
        </a>
        <ListButton
          className="btn btn-danger mr-3"
          onClick={() => this.deleteArticle(listItem._id)}>
          Remove
        </ListButton>
      </ListItem>
    ));

  renderContent(searchState, listArray) {
    if (searchState && listArray.length >= 0) {
      return <ListSpinner />;
    }
    if (!searchState && listArray.length > 0) {
      return this.renderList(listArray);
    }
    return (
      <div className="list-group-item beige">
        <div className="row justify-content-center align-items-center">No Saved Articles</div>
      </div>
    );
  }

  render() {
    const { loadingArticles, savedArticles } = this.state;
    return (
      <div>
        <Card>
          <CardHeader>
            <Row justifyContent="center">Saved</Row>
          </CardHeader>

          <List>{this.renderContent(loadingArticles, savedArticles)}</List>
        </Card>
      </div>
    );
  }
}

export default Saved;
