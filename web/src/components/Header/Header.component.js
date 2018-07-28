import React from 'react';
import { Link } from 'simple-react-router';
import { inject, observer } from 'mobx-react';

@observer
class Header extends React.Component {
  render() {
    return (
      <div className="em-navbar row mx-0">
        <div className="back-btn col-2">
          {window.location.pathname !== '/' ? (
            <Link href="/">
              <div className="btn">
                <span>◀</span>
              </div>
            </Link>
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
