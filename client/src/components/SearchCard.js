import React from 'react';

class SearchCard extends React.Component {
  state = {
    searchTerm: ''
  };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchTerm);
  };

  render() {
    return (
      <div className="card">
        <form onSubmit={this.onFormSubmit}>
          <label>New York Times Search</label>
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={e => this.setState({ searchTerm: e.target.value })}
          />
        </form>
      </div>
    );
  }
}

export default SearchCard;