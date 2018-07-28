import { observable, action } from 'mobx'
import axios from 'axios';
import { API_URL } from '../config.js';

class ExpenseStore {
  @observable totalExpenses = 0;
  @observable expensesList = [];

  @action.bound
  async fetchAll() {
    try {
      const result = await axios.get(`${API_URL}/expenses`)

      this.expensesList = result.data;
    } catch(e) {
      console.error(e);
    }
  }

  @action.bound
  async createOne(data) {
    try {
      await axios.post(`${API_URL}/expenses`, data)
    } catch(e) {
      console.error(e);
    }
  }

  @action.bound
  async updateOne(data) {
    try {
      await axios.put(`${API_URL}/expenses/${data.id}`, data)
    } catch(e) {
      console.error(e);
    }
  }

  @action.bound
  async getTotalExpenses(data) {
    try {
      const result = await axios.get(`${API_URL}/total_expenses`)
      console.log(result);
      this.totalExpenses = result.data.data.totalExpenses;
    } catch(e) {
      console.error(e);
    }
  }
}

export default new ExpenseStore();