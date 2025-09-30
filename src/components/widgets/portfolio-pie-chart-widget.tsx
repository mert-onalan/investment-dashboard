import * as React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import WidgetHeader from '../widget-header';

import './portfolio-pie-chart-widget.scss';

export const portfolioPieChartWidgetId = 'edc509f9-3f73-461d-a6d1-8b612ea3bf56';

const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];

const portfolioData = [
    { name: 'Stocks', y: 55, color: colors[0] },
    { name: 'Bonds', y: 25, color: colors[1] },
    { name: 'Real Estate', y: 10, color: colors[2] },
    { name: 'Commodities', y: 5, color: colors[3] },
    { name: 'Cash & Equivalents', y: 5, color: colors[4] }
];

const options: Highcharts.Options = {
    chart: {
        type: 'pie',
        backgroundColor: 'transparent',
    },
    title: undefined,
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Allocation',
        type: 'pie',
        innerSize: '60%',
        data: portfolioData
    }],
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemStyle: {
            color: '#333',
            fontWeight: 'normal'
        }
    },
    credits: {
        enabled: false
    },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false
                        }
                    }
                }
            }
        }]
    }
};

interface IPortfolioPieChartWidgetProps {
    onClose: () => void;
    canBeClosed: boolean;
}

const PortfolioPieChartWidget: React.FC<IPortfolioPieChartWidgetProps> = (props) => {
    return (
        <div className='portfolio-pie-chart-widget'>
            <WidgetHeader onClick={props.onClose} widgetLabel='Portfolio Distrubition' isDisabled={props.canBeClosed} />
            <HighchartsReact containerProps={{className: 'chart-container'}} highcharts={Highcharts} options={options} />
        </div>
    );
};

export default PortfolioPieChartWidget;