import React from 'react';
import { inject, observer } from 'mobx-react';

@observer
class Header extends React.Component {
  render() {
    return (
      <div className="em-navbar row mx-0">
        <div className="back-btn col-2">
          {this.props.showReport || this.props.viewCategory ? (
            <div onClick={this._handleBack} class="btn">
              <span>◀</span>
            </div>
          ) : null}
        </div>
        <div className="col-8 title-bar">
          <span>EXPENSE MANAGER</span>
        </div>
        <div className="col-2" />
      </div>
    )
  }
}

export default Header;
