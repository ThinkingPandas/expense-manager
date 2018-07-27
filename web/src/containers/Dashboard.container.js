import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import ReactTooltip from 'react-tooltip';
import { inject, observer } from 'mobx-react';
import '../App.scss';

import HeaderComponent from '../components/Header.component.js';

@inject('expenseStore')
@observer
class Dashboard extends React.Component {
  async componentWillMount() {
    const { fetchAll } = this.props.expenseStore;
    await fetchAll();
  }

  render() {
    const { expensesList } = this.props.expenseStore;

    return (
      <div className="ExpenseManager">
        <HeaderComponent />
        <div className="em-body">
          <div className="em-dash-table row m-3">
            <div
              onClick={() => this._handleControlModal('createExpense', 'open')}
              className="em-fab-expense"
              data-tip="Create Expense"
            >
              <span>+</span>
              <ReactTooltip />
            </div>

            <div className="em-dash-header">
              <div className="total-expense mt-2">
                <h2>₱{numeral(100000).format('0,0.00')}</h2>
                <small>TOTAL EXPENSE</small>
              </div>
              <div className="action-buttons row mx-0 my-2">
                <div className="col-sm-4 px-0 col-6 d-flex justify-content-center">
                  <div
                    className="btn"
                    onClick={() => this._handleNavigate('showReport')}
                  >
                    <small>SHOW REPORT</small>
                  </div>
                </div>
                <div className="col-sm-4 px-0 col-6 d-flex justify-content-center">
                  <div
                    className="btn"
                    onClick={() => this._handleNavigate('viewCategory')}
                  >
                    <small>CATEGORIES</small>
                  </div>
                </div>
                <div className="col-sm-4 col-12 d-flex justify-content-center em-expense">
                  <div
                    className="btn"
                    onClick={() =>
                      this._handleControlModal('createExpense', 'open')
                    }
                  >
                    <small>CREATE EXPENSE</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 px-0 mt-2">
              <h5>EXPENSE LIST</h5>
              {expensesList.length ? (
                <div>
                  {expensesList.map((r, i) => (
                    <div className="expense-entry row mx-0 mb-2">
                      <div className="col-md-9 col-8 px-1">
                        <div>
                          <small className="font-weight-bold">{r.title}</small>
                        </div>
                        <div>
                          <small className="expense-category">
                            {r.category.title}
                          </small>
                          <small> {moment(r.date).format('ll')}</small>
                        </div>
                      </div>
                      <div className="col-md-3 col-4 d-flex justify-content-between flex-column px-1">
                        <h6 className="m-0 text-right word-break-all">
                          ₱ {numeral(r.value).format('0,0.00')}
                        </h6>
                        <div className="row mx-0 justify-content-end">
                          <div
                            className="circle-btn"
                            onClick={() =>
                              this._handleControlModal('editExpense', 'open')
                            }
                          >
                            <span className="material-icons">edit</span>
                          </div>
                          <div
                            className="circle-btn"
                            onClick={() =>
                              this._handleControlModal('deleteExpense', 'open')
                            }
                          >
                            <span className="material-icons">delete</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="d-flex my-5 p-5 justify-content-center align-items-center">
                  <h6 className="text-muted">NO EXPENSE DATA</h6>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
