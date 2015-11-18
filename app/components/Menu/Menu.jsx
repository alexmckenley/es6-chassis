import styles from './_Menu.scss';
import React from 'react';
import MenuItem from './MenuItem';

const { Component, PropTypes } = React;

export default class Menu extends Component {
  render() {
    return (
      <ul className={styles.menu}>
        {this.props.items.map((item, key) => {
          return (<MenuItem item={item} key={key} />);
        }, this)}
      </ul>
    );
  }
}

Menu.defaultProps = {
  items: [],
};

Menu.propTypes = {
  items: PropTypes.array.isRequired,
};
