import React from 'react';

export default class Footer extends React.Component {
  render() {
    const year = (new Date()).getFullYear();
    return (
      <footer className="footer">
        &copy; Your Company&nbsp;{year}
      </footer>
    );
  }
}
