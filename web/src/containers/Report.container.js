import React from 'react';
import { inject, observer } from 'mobx-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import '../App.scss';

import HeaderComponent from '../components/Header/Header.component.js';

@inject('reportsStore')
@observer
class ReportContainer extends React.Component {
  async componentWillMount() {
    await this.props.reportsStore.fetchBarChartData();
    await this.props.reportsStore.fetchDoughnutChartData();
  }

  render() {
    const { doughnutChartTotals } = this.props.reportsStore;

    return (
      <div className="ExpenseManager">
        <HeaderComponent />
        <div className="em-body">
          <div className="em-report row mx-0 my-3">
            <div className="col-12">
              <h4>MONTHLY REPORT</h4>
            </div>
            <div className="col-8">
              <Bar
                height={500}
                data={this.props.reportsStore.chartDataObject}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
            <div className="col-4">
              <Doughnut
                data={this.props.reportsStore.doughnutDataObject}
                height={500}
                options={{
                  maintainAspectRatio: false,
                  tooltips: {
                    enabled: true,
                    callbacks: {
                      label: function(tooltipItems, data) {

                        return `${data.labels[tooltipItems.index]} - ${data.datasets[0].data[tooltipItems.index]}% ($${doughnutChartTotals[tooltipItems.index].toFixed(2)})`;
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportContainer;
