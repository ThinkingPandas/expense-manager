import { observable, computed, toJS, action } from 'mobx';
import axios from 'axios';
import _ from 'lodash';
import { API_URL } from '../config.js';

class ReportsStore {
  @observable barChartLabels = [];
  @observable barChartData = [];

  @observable doughnutChartLabels = [];
  @observable doughnutChartData = [];
  @observable doughnutChartTotals = [];

  @computed
  get chartDataObject() {
    return {
      labels: toJS(this.barChartLabels),
      datasets: [
        {
          label: 'Cost',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: toJS(this.barChartData),
        },
      ],
    };
  }

  @computed
  get doughnutDataObject() {
    return {
      labels: toJS(this.doughnutChartLabels),
      datasets: [
        {
          data: toJS(this.doughnutChartData),
          backgroundColor: [
            '#FF6633',
            '#FFB399',
            '#FF33FF',
            '#FFFF99',
            '#00B3E6',
            '#E6B333',
            '#3366E6',
            '#999966',
            '#99FF99',
            '#B34D4D',
            '#80B300',
            '#809900',
            '#E6B3B3',
            '#6680B3',
            '#66991A',
            '#FF99E6',
          ],
        },
      ],
    };
  }

  @action.bound
  async fetchBarChartData() {
    const result = await axios.get(`${API_URL}/reports/bar`);

    this.barChartLabels.replace(_.reverse(Object.keys(result.data.data)));
    this.barChartData.replace(_.reverse(Object.values(result.data.data)));
  }

  @action.bound
  async fetchDoughnutChartData() {
    const result = await axios.get(`${API_URL}/reports/doughnut`);

    this.doughnutChartLabels.replace(Object.keys(result.data.data));
    this.doughnutChartData.replace(Object.values(result.data.data).map((d) => d.percent));
    this.doughnutChartTotals.replace(Object.values(result.data.data).map((d) => d.total));
  }
}

export default new ReportsStore();
