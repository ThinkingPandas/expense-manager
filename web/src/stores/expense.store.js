import { observable, action } from 'mobx'
import axios from 'axios';
import { API_URL } from '../config.js';

class ExpenseStore {
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
}

export default new ExpenseStore();