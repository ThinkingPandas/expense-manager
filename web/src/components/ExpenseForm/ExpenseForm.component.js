import React from 'react';
import Joi from 'joi';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import * as Datetime from 'react-datetime';
import { inject, observer } from 'mobx-react';

import ModalComponent from '../Modal/modal.component.js';

@inject('categoryStore', 'expenseStore')
@observer
class ExpenseForm extends React.Component {
  state = {
    form: this.props.form || {
      id: '',
      title: '',
      date: moment().toJSON(),
      category_id: this.props.categoryStore.uncategorizedCategory.id,
      value: 0,
    },
  };

  submitForm = async () => {
    try {
      const schema = Joi.object().keys({
        title: Joi.string().required(),
        date: Joi.string().required(),
        category_id: Joi.string().allow(['', null]),
        value: Joi.number().min(1),
      });

      const result = Joi.validate(_.pick(this.state.form, ['title', 'date', 'category_id', 'value']), schema);
      if (!result.error) {
        const { createOne, updateOne, fetchAll, getTotalExpenses } = this.props.expenseStore;

        if(!this.state.form.id) {
          await createOne(this.state.form);
          alert('Successfully created a new expense!')
        } else {
          await updateOne(this.state.form);
          alert('Successfully updated a new expense!')
        }

        await fetchAll();
        await getTotalExpenses();
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

  setDateInput = date => {
    this.setState({ form: { ...this.state.form, ...({ date: date.toJSON() }) } });
  }

  render() {
    const { categoriesList, uncategorizedCategory } = this.props.categoryStore;
    const { title, date, value, category_id } = this.state.form;

    return (
      <ModalComponent
        onClose={this.props.closeModal}
        onSave={this.submitForm}
        title="Expense Form"
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
          <select
            name="category_id"
            className="form-control form-control-sm"
            defaultValue={category_id || uncategorizedCategory.id}
            onChange={this.setStateFromInput}
          >
            {categoriesList.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <Datetime defaultValue={moment(date) || moment()} inputProps={{ placeholder: 'Expense Date' }} onChange={this.setDateInput} />
        </div>

        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupPrepend3">
                ₱
              </span>
            </div>
            <input
              type="number"
              defaultValue={value}
              name="value"
              className=" form-control"
              placeholder="0.00"
              aria-describedby="inputGroupPrepend3"
              onChange={this.setStateFromInput}
            />
          </div>
        </div>
      </ModalComponent>
    );
  }
}

ExpenseForm.propTypes = {
  closeModal: PropTypes.func.required,
  form: PropTypes.object,
}

export default ExpenseForm;
