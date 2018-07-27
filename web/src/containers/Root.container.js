import React from 'react';
import { observer } from 'mobx';
import { inject } from 'mobx-react';

import HeaderComponent from '../components/Header.component.js'

@inject('expenseStore')
@observer
class RootContainer extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  render() {
    return (
      <div className="ExpenseManager">
        <HeaderComponent />
      </div>
    )
  }
}

export default RootContainer;
