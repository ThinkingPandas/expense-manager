import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import ModalComponent from '../Modal/modal.component.js';

@inject('expenseStore')
@observer
class ExpenseDeleteConfirmModal extends React.Component {
  submitForm = async () => {
    try {
      const { expenseId } = this.props;
      const { deleteOne, fetchAll, getTotalExpenses } = this.props.expenseStore;
      await deleteOne(expenseId);

      await fetchAll();
      await getTotalExpenses();
      this.props.closeModal();
    } catch(e) {
      alert('Something went wrong!')
      console.error(e)
    }
  }

  render() {
    return (
      <ModalComponent
        onClose={this.props.closeModal}
        onSave={this.submitForm}
        onSaveText="CONFIRM"
        title="Delete Expense"
      >
        Are you sure you want to delete this expense?
      </ModalComponent>
    );
  }
}

ExpenseDeleteConfirmModal.propTypes = {
  expenseId: PropTypes.string.required,
}

export default ExpenseDeleteConfirmModal;
