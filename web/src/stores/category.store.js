import { observable, action } from 'mobx'
import axios from 'axios';
import { API_URL } from '../config.js';

class CategoryStore {
  @observable categoriesList = [];

  @action.bound
  async fetchAll() {
    try {
      const result = await axios.get(`${API_URL}/categories`)

      this.categoriesList = result.data;
    } catch(e) {
      console.error(e);
    }
  }
}

export default new CategoryStore();