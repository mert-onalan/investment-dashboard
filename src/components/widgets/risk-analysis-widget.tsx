import * as React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import WidgetHeader from '../widget-header';

import './risk-analysis-widget.scss';

export const riskAnalysisWidgetId = '7e911941-4a7e-433c-9f77-a7ce1da4aca6';

const riskReturnData = [
    { name: 'NVDA', x: 3.5, y: 45.5 },
    { name: 'MSFT', x: 1.8, y: 32.1 },
    { name: 'AMZN', x: 2.9, y: 28.9 },
    { name: 'GOOGL', x: 2.2, y: 25.2 },
    { name: 'META', x: 3.1, y: 22.7 },
    { name: 'JPM', x: 1.5, y: 15.4 },
    { name: 'JNJ', x: 0.9, y: 12.1 },
    { name: 'TSLA', x: 4.2, y: 38.5 },
];

const options: Highcharts.Options = {
    chart: {
        type: 'scatter',
        backgroundColor: 'transparent',
    },
    title: undefined,
    xAxis: {
        title: {
            text: 'Risk (Standard Deviation)'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Expected Return (%)'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: 'Risk: {point.x}<br>Return: {point.y}%'
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                style: {
                    fontSize: '11px',
                    fontWeight: 'normal',
                    color: '#555'
                }
            }
        }
    },
    series: [{
        type: 'scatter',
        name: 'Investments',
        color: 'rgba(119, 152, 191, .5)',
        data: riskReturnData
    }],
    credits: {
        enabled: false
    }
};

interface IRiskAnalysisWidgetProps {
    onClose: () => void;
    canBeClosed: boolean;
}

const RiskAnalysisWidget: React.FC<IRiskAnalysisWidgetProps> = (props) => {
    return (
        <div className='risk-analysis-widget'>
            <WidgetHeader onClick={props.onClose} widgetLabel='Risk vs. Return Analysis' isDisabled={props.canBeClosed}/>
            <HighchartsReact containerProps={{className: 'chart-container'}} highcharts={Highcharts} options={options} />
        </div>
    );
};

export default RiskAnalysisWidget;