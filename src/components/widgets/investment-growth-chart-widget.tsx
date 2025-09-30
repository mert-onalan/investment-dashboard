import * as React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import WidgetHeader from "../widget-header";

import "./investment-growth-chart-widget.scss";

export const investmentGrowthChartWidgetId = 'cdac3ed6-6556-4f8d-9109-afd0af3755b7';

const investmentData = [
    [Date.UTC(2024, 8, 24), 10000],
    [Date.UTC(2024, 9, 24), 10500],
    [Date.UTC(2024, 10, 24), 11200],
    [Date.UTC(2024, 11, 24), 11000],
    [Date.UTC(2025, 0, 24), 11800],
    [Date.UTC(2025, 1, 24), 12500],
    [Date.UTC(2025, 2, 24), 12300],
    [Date.UTC(2025, 3, 24), 13000],
    [Date.UTC(2025, 4, 24), 13500],
    [Date.UTC(2025, 5, 24), 14000],
    [Date.UTC(2025, 6, 24), 14200],
    [Date.UTC(2025, 7, 24), 15000],
    [Date.UTC(2025, 8, 24), 15300],
];

const options: Highcharts.Options = {
    chart: {
        type: "area",
        backgroundColor: "transparent",
    },
    title: undefined,
    xAxis: {
        type: "datetime",
        title: {
            text: null,
        },
    },
    yAxis: {
        title: {
            text: "Value (USD)",
        },
        labels: {
            formatter: function () {
                return "$" + Number(this.value) / 1000 + "k";
            },
        },
    },
    tooltip: {
        pointFormat: "Value: <b>${point.y:,.0f}</b>",
    },
    plotOptions: {
        area: {
            marker: {
                enabled: false,
                symbol: "circle",
                radius: 2,
                states: {
                    hover: {
                        enabled: true,
                    },
                },
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1,
                },
                stops: [
                    [0, Highcharts.getOptions().colors![0] as string],
                    [
                        1,
                        Highcharts.color(Highcharts.getOptions().colors![0])
                            .setOpacity(0)
                            .toString(),
                    ],
                ],
            },
        },
    },
    series: [
        {
            name: "Portfolio Value",
            type: "area",
            data: investmentData,
        },
    ],
    legend: {
        enabled: false,
    },
    credits: {
        enabled: false,
    },
};

interface IInvestmentGrowthChartWidgetProps {
    onClose: () => void;
    canBeClosed: boolean;
}

const InvestmentGrowthChartWidget: React.FC<IInvestmentGrowthChartWidgetProps> = (props) => {
    return (
        <div className='investment-growth-chart-widget'>
            <WidgetHeader onClick={props.onClose} widgetLabel='Investment Growth' isDisabled={props.canBeClosed} />
            <HighchartsReact containerProps={{className: 'chart-container'}} highcharts={Highcharts} options={options} />
        </div>
    );
};

export default InvestmentGrowthChartWidget;
