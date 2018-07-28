import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import ModalComponent from '../Modal/modal.component.js';

@inject('categoryStore')
@observer
class CategoryDeleteConfirmModal extends React.Component {
  submitForm = async () => {
    try {
      const { categoryId } = this.props;
      const { deleteOne, fetchAll } = this.props.categoryStore;
      await deleteOne(categoryId);

      await fetchAll();
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
        title="Delete Category"
      >
        Are you sure you want to delete this category?
      </ModalComponent>
    );
  }
}

CategoryDeleteConfirmModal.propTypes = {
  categoryId: PropTypes.string.required,
}

export default CategoryDeleteConfirmModal;
