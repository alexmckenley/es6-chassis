import React from 'react';

const { Component, PropTypes } = React;

export default class MenuItem extends Component {
  onItemClick(e) {
    e.preventDefault();
    /* eslint-disable */
    window.alert('You clicked ' + this.props.item.label);
    /* eslint-enable */
  }

  render() {
    return (
      <li key={'menu-item-' + this.props.item.id}>
        <a href="#" onClick={this.onItemClick}>
          {this.props.item.label}
        </a>
      </li>
    );
  }
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
};
