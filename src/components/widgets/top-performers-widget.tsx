import * as React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import WidgetHeader from '../widget-header';

import './top-performers-widget.scss';

export const topPerformersWidgetId = '9e4cd8e2-d617-4a58-818a-27b86a107069';

const topPerformersData = [
    { name: 'NVDA', y: 45.5, color: '#91cc75' },
    { name: 'MSFT', y: 32.1, color: '#73c0de' },
    { name: 'AMZN', y: 28.9, color: '#5470c6' },
    { name: 'GOOGL', y: 25.2, color: '#fac858' },
    { name: 'META', y: 22.7, color: '#ee6666' }
];

const options: Highcharts.Options = {
    chart: {
        type: 'bar',
        backgroundColor: 'transparent',
    },
    title: undefined,
    xAxis: {
        categories: topPerformersData.map(d => d.name),
        title: {
            text: null
        },
        gridLineWidth: 0,
        lineWidth: 0,
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Performance (%)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        gridLineWidth: 0,
    },
    tooltip: {
        valueSuffix: '%'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true,
                format: '{y}%'
            },
            borderRadius: 3,
        }
    },
    series: [{
        name: 'Year-to-Date Performance',
        type: 'bar',
        data: topPerformersData,
    }],
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    }
};

interface ITopPerformersWidgetProps {
    onClose: () => void;
    canBeClosed: boolean;
}

const TopPerformersWidget: React.FC<ITopPerformersWidgetProps> = (props) => {
    return (
        <div className='top-performers-widget'>
            <WidgetHeader onClick={props.onClose} widgetLabel='Top Performing Stocks (YTD)' isDisabled={props.canBeClosed} />
            <HighchartsReact containerProps={{className: 'chart-container'}} highcharts={Highcharts} options={options} />
        </div>
    );
};

export default TopPerformersWidget;