import React from 'react';
import '../App.scss';

import HeaderComponent from '../components/Header/Header.component.js';

class NotFound extends React.Component {
  render() {
    return (
      <div className="ExpenseManager">
        <HeaderComponent />
        <h1>Page not found</h1>
        <a href="/">Go back to home</a>
      </div>
    );
  }
}

export default NotFound;
