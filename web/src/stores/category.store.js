import { observable, action, computed } from 'mobx'
import axios from 'axios';
import _ from 'lodash';
import { API_URL } from '../config.js';

class CategoryStore {
  @observable categoriesList = [];

  @action.bound
  async fetchAll() {
    try {
      const result = await axios.get(`${API_URL}/categories`)
      this.categoriesList.replace(result.data);
    } catch(e) {
      console.error(e);
    }
  }

  @action.bound
  async updateOne(data) {
    try {
      await axios.put(`${API_URL}/categories/${data.id}`, data)
    } catch(e) {
      console.error(e);
    }
  }

  @action.bound
  async deleteOne(id) {
    try {
      await axios.delete(`${API_URL}/categories/${id}`)
    } catch(e) {
      console.error(e);
    }
  }

  @computed
  get uncategorizedCategory() {
    return _.find(this.categoriesList, { title: 'Uncategorized' })
  }
}

export default new CategoryStore();