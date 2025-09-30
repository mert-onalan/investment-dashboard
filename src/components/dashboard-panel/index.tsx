"use client";

import * as React from "react";
import { useContextWidgetActions } from "../hooks/use-context-widget-actions";
import { useWidgetsConfiguration } from "../hooks/use-dashboard-widget-configuraiton";
import { useWidgetVisibility } from "../hooks/use-widget-visibility";
import InvestmentGrowthChartWidget, { investmentGrowthChartWidgetId } from "../widgets/investment-growth-chart-widget";
import PortfolioPieChartWidget, { portfolioPieChartWidgetId } from "../widgets/portfolio-pie-chart-widget";
import { getDashboardWidgetsConfiguration } from "../widgets/registry";
import RiskAnalysisWidget, { riskAnalysisWidgetId } from "../widgets/risk-analysis-widget";
import { getColumnWidgets } from "../widgets/selectors";
import StockPriceAnalysisWidget, { stockPriceAnalysisWidgetId } from "../widgets/stock-price-analysis-widget";
import TopPerformersChartWidget, { topPerformersWidgetId } from "../widgets/top-performers-widget";

import "./index.scss";

export default function DashboardPanel() {
    const widgetsConfiguration = useWidgetsConfiguration(
        getDashboardWidgetsConfiguration()
    );

    const renderPortfolioPieChartWidget = React.useCallback(
        (onClose: () => void) => <PortfolioPieChartWidget onClose={onClose} canBeClosed={widgetsConfiguration.isOnlyOneWidgetOpen} />,
        [widgetsConfiguration.isOnlyOneWidgetOpen]
    );

    const renderInvestmentGrowthChartWidget = React.useCallback(
        (onClose: () => void) => <InvestmentGrowthChartWidget onClose={onClose} canBeClosed={widgetsConfiguration.isOnlyOneWidgetOpen} />,
        [widgetsConfiguration.isOnlyOneWidgetOpen]
    );

    const renderTopPerformersChartWidget = React.useCallback(
        (onClose: () => void) => <TopPerformersChartWidget onClose={onClose} canBeClosed={widgetsConfiguration.isOnlyOneWidgetOpen} />,
        [widgetsConfiguration.isOnlyOneWidgetOpen]
    );

    const renderStockpriceAnalysisWidget = React.useCallback(
        (onClose: () => void) => <StockPriceAnalysisWidget onClose={onClose} canBeClosed={widgetsConfiguration.isOnlyOneWidgetOpen} />,
        [widgetsConfiguration.isOnlyOneWidgetOpen]
    );

    const renderRiskAnalysisWidget = React.useCallback(
        (onClose: () => void) => <RiskAnalysisWidget onClose={onClose} canBeClosed={widgetsConfiguration.isOnlyOneWidgetOpen} />,
        [widgetsConfiguration.isOnlyOneWidgetOpen]
    );

    const portfolioPieChartWidgetContainer = useWidgetVisibility({
        widgetId: portfolioPieChartWidgetId,
        renderWidgetContent: renderPortfolioPieChartWidget
    });

    const investmentGrowthChartWidgetContainer = useWidgetVisibility({
        widgetId: investmentGrowthChartWidgetId,
        renderWidgetContent: renderInvestmentGrowthChartWidget
    });

    const topPerformersChartWidgetContainer = useWidgetVisibility({
        widgetId: topPerformersWidgetId,
        renderWidgetContent: renderTopPerformersChartWidget
    });

    const stockpriceAnalysisWidgetContainer = useWidgetVisibility({
        widgetId: stockPriceAnalysisWidgetId,
        renderWidgetContent: renderStockpriceAnalysisWidget,
    });

    const riskAnalysisWidgetContainer = useWidgetVisibility({
        widgetId: riskAnalysisWidgetId,
        renderWidgetContent: renderRiskAnalysisWidget,
    });

    const widgets = React.useMemo(
        () => [
            portfolioPieChartWidgetContainer,
            investmentGrowthChartWidgetContainer,
            topPerformersChartWidgetContainer,
            stockpriceAnalysisWidgetContainer,
            riskAnalysisWidgetContainer,
        ],
        [portfolioPieChartWidgetContainer, investmentGrowthChartWidgetContainer, topPerformersChartWidgetContainer, stockpriceAnalysisWidgetContainer, riskAnalysisWidgetContainer]
    );

    useContextWidgetActions(widgets);

    const [firstColumnWidgets, secondColumnWidgets] = React.useMemo(
        () => [
            getColumnWidgets(widgets, widgetsConfiguration.parameters.firstColumn.widgetIds),
            getColumnWidgets(widgets, widgetsConfiguration.parameters.secondColumn.widgetIds),
        ],
        [widgetsConfiguration.parameters.firstColumn.widgetIds, widgetsConfiguration.parameters.secondColumn.widgetIds, widgets]
    );

    return (
        <div className='investment-dashboard'>
            <div className='dashboard-container'>
                {widgetsConfiguration.parameters.firstColumn
                    .isColumnShown ? (
                    <div className='widget-column-container'>
                        {firstColumnWidgets.map((widget) => (
                            <React.Fragment key={widget.id}>
                                {widget.Element}
                            </React.Fragment>
                        ))}
                    </div>
                ) : undefined}
                {widgetsConfiguration.parameters.secondColumn
                    .isColumnShown ? (
                    <div className='widget-column-container'>
                        {secondColumnWidgets.map((widget) => (
                            <React.Fragment key={widget.id}>
                                {widget.Element}
                            </React.Fragment>
                        ))}
                    </div>
                ) : undefined}
            </div>
        </div>
    );
}
