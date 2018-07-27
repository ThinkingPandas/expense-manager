import React from 'react';
import { inject, observer } from 'mobx-react';
import '../App.scss';

import HeaderComponent from '../components/Header/Header.component.js';

@inject('uiStore')
@observer
class ReportContainer extends React.Component {
  render() {
    return (
      <div className="ExpenseManager">
        <HeaderComponent />
        <div className="em-body">
          <div className="em-report row mx-0 my-3">
            <div className="col-12">
              <h4>REPORT</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportContainer;
