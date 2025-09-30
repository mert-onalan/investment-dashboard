import * as React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import WidgetHeader from "../widget-header";

import "./stock-price-analysis-widget.scss";

export const stockPriceAnalysisWidgetId = '3475fa34-d142-43de-ab9b-a9567f27f2a7';

const ohlcData = [
    [1726444800000, 123.0, 124.1, 122.5, 123.8],
    [1726531200000, 123.8, 125.0, 123.5, 124.5],
    [1726617600000, 124.5, 124.8, 122.9, 123.2],
    [1726704000000, 123.2, 126.1, 123.0, 125.9],
    [1726963200000, 125.9, 127.2, 125.5, 126.8],
    [1727049600000, 126.8, 128.0, 126.5, 127.7],
    [1727136000000, 127.7, 129.5, 127.6, 129.2],
];

const volumeData = [
    [1726444800000, 1600000],
    [1726531200000, 2000000],
    [1726617600000, 1700000],
    [1726704000000, 2200000],
    [1726963200000, 2100000],
    [1727049600000, 2500000],
    [1727136000000, 2800000],
];

const options: Highcharts.Options = {
    chart: {
        backgroundColor: "transparent",
    },
    title: undefined,
    xAxis: {
        type: "datetime",
    },
    yAxis: [
        {
            labels: {
                align: "right",
                x: -3,
            },
            title: {
                text: "OHLC",
            },
            height: "60%",
            lineWidth: 2,
            resize: {
                enabled: true,
            },
        },
        {
            labels: {
                align: "right",
                x: -3,
            },
            title: {
                text: "Volume",
            },
            top: "65%",
            height: "35%",
            offset: 0,
            lineWidth: 2,
        },
    ],
    tooltip: {
        split: true,
    },
    series: [
        {
            type: "candlestick",
            name: "NVDA",
            data: ohlcData,
        },
        {
            type: "column",
            name: "Volume",
            data: volumeData,
            yAxis: 1,
        },
    ],
    credits: {
        enabled: false,
    },
    legend: {
        enabled: false,
    },
    rangeSelector: {
        enabled: false,
    },
    navigator: {
        enabled: false,
    },
    scrollbar: {
        enabled: false,
    },
};

interface IStockPriceAnalysisWidgetProps {
    onClose: () => void;
    canBeClosed: boolean;
}

const StockPriceAnalysisWidget: React.FC<IStockPriceAnalysisWidgetProps> = (props) => {
    return (
        <div className='stock-price-analysis-widget'>
            <WidgetHeader onClick={props.onClose} widgetLabel='Stock Price (NVDA)' isDisabled={props.canBeClosed}/>
            <HighchartsReact containerProps={{className: 'chart-container'}} highcharts={Highcharts} constructorType={"stockChart"} options={options} />
        </div>
    );
};

export default StockPriceAnalysisWidget;
