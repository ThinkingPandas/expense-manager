import React from 'react';
import numeral from 'numeral';
import { Link } from 'simple-react-router';
import ReactTooltip from 'react-tooltip';
import { inject, observer } from 'mobx-react';
import '../App.scss';

import HeaderComponent from '../components/Header/Header.component.js';
import ExpenseRow from '../components/ExpenseRow/ExpenseRow.component.js';
import ExpenseForm from '../components/ExpenseForm/ExpenseForm.component.js';

@inject('expenseStore', 'categoryStore')
@observer
class Dashboard extends React.Component {
  state = {
    createExpenseModalOpened: false,
  };

  async componentWillMount() {
    const { categoryStore, expenseStore } = this.props;
    await expenseStore.fetchAll();
    await expenseStore.getTotalExpenses();
    await categoryStore.fetchAll();
  }

  render() {
    const { expensesList, totalExpenses } = this.props.expenseStore;
    const { categoriesList } = this.props.categoryStore;
    const { createExpenseModalOpened } = this.state;

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
                <h2>₱{numeral(totalExpenses).format('0,0.00')}</h2>
                <small>TOTAL EXPENSE</small>
              </div>
              <div className="action-buttons row mx-0 my-2">
                <div className="col-sm-4 px-0 col-6 d-flex justify-content-center">
                  <Link href="/report">
                    <div className="btn">
                      <small>SHOW REPORT</small>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-4 px-0 col-6 d-flex justify-content-center">
                  <Link href="/categories">
                    <div className="btn">
                      <small>CATEGORIES</small>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-4 col-12 d-flex justify-content-center em-expense">
                  <button
                    className="btn"
                    disabled={categoriesList.length === 0}
                    onClick={() =>
                      this.setState({ createExpenseModalOpened: true })
                    }
                  >
                    <small>CREATE EXPENSE</small>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 px-0 mt-2">
              <h5>EXPENSE LIST</h5>
              {expensesList.length ? (
                <div>
                  {expensesList.map((r, i) => (
                    <ExpenseRow key={r.id} {...r} />
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

        {createExpenseModalOpened && (
          <ExpenseForm closeModal={() => this.setState({ createExpenseModalOpened: false })} />
        )}
      </div>
    );
  }
}

export default Dashboard;
