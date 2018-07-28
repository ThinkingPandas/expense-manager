import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';

class ExpenseRow extends React.Component {
  render() {
    const { id, title, category, value, date, handleClickEditExpense, handleClickDeleteExpense } = this.props;

    return (
      <div className="expense-entry row mx-0 mb-2">
        <div className="col-md-9 col-8 px-1">
          <div>
            <small className="font-weight-bold">{title}</small>
          </div>
          <div>
            <small className="expense-category">{category.title}</small>
            <small> {moment(date).format('ll')}</small>
          </div>
        </div>
        <div className="col-md-3 col-4 d-flex justify-content-between flex-column px-1">
          <h6 className="m-0 text-right word-break-all">
            ₱ {numeral(value).format('0,0.00')}
          </h6>
          <div className="row mx-0 justify-content-end">
            <div
              className="circle-btn"
              onClick={() => handleClickEditExpense(id)}
            >
              <span className="material-icons">edit</span>
            </div>
            <div
              className="circle-btn"
              onClick={() => handleClickDeleteExpense(id)}
            >
              <span className="material-icons">delete</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ExpenseRow.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  handleClickEditExpense: PropTypes.func.isRequired,
  handleClickDeleteExpense: PropTypes.func.isRequired,
}

export default ExpenseRow;