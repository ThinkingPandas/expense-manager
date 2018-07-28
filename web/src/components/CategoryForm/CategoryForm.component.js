import React from 'react';
import Joi from 'joi';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import ModalComponent from '../Modal/modal.component.js';

@inject('categoryStore')
@observer
class CategoryForm extends React.Component {
  state = {
    form: this.props.form || {
      id: '',
      title: '',
      description: '',
    },
  };

  submitForm = async () => {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().allow('').optional(),
      });

      const result = Joi.validate(_.pick(this.state.form, ['title', 'description']), schema);
      if (!result.error) {
        const { createOne, updateOne, fetchAll } = this.props.categoryStore;

        if(!this.state.form.id) {
          await createOne(this.state.form);
          alert('Successfully created a new category!')
        } else {
          await updateOne(this.state.form);
          alert('Successfully updated a category!')
        }

        await fetchAll();
        this.props.closeModal();
      } else {
        alert(`Some fields in the form are invalid. Please correct them. \n${result.error.message}`);
      }
    } catch(e) {
      alert('Something went wrong!')
      console.error(e);
    }
  };

  setStateFromInput = event => {
    var form = {};
    form[event.target.name] = event.target.value;
    this.setState({ form: { ...this.state.form, ...form } });
  };

  render() {
    const { title, description } = this.state.form;

    return (
      <ModalComponent
        onClose={this.props.closeModal}
        onSave={this.submitForm}
        title="Category Form"
      >
        <div className="form-group">
          <input
            defaultValue={title}
            name="title"
            placeholder="Title"
            type="text"
            className="form-control form-control-sm"
            onChange={this.setStateFromInput}
          />
        </div>

        <div className="form-group">
          <input
            defaultValue={description}
            name="description"
            placeholder="Description"
            type="text"
            className="form-control form-control-sm"
            onChange={this.setStateFromInput}
          />
        </div>
      </ModalComponent>
    );
  }
}

CategoryForm.propTypes = {
  closeModal: PropTypes.func.required,
  form: PropTypes.object,
}

export default CategoryForm;
