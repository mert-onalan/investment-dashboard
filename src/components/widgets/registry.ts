import { portfolioPieChartWidgetId } from './portfolio-pie-chart-widget';
import { investmentGrowthChartWidgetId } from './investment-growth-chart-widget';
import { topPerformersWidgetId } from './top-performers-widget';
import { stockPriceAnalysisWidgetId } from './stock-price-analysis-widget';
import { riskAnalysisWidgetId } from './risk-analysis-widget';
import { IPageWidgetsConfiguration } from '../hooks/use-dashboard-widget-configuraiton';

export const widgetLabels: Record<string, string> = {
  [portfolioPieChartWidgetId]: 'Portfolio Distribution',
  [investmentGrowthChartWidgetId]: 'Investment Growth',
  [topPerformersWidgetId]: 'Top Performing Stocks',
  [stockPriceAnalysisWidgetId]: 'Stock Price',
  [riskAnalysisWidgetId]: 'Risk-Return Analysis',
} as const;

export const widgetIds = [
  portfolioPieChartWidgetId,
  investmentGrowthChartWidgetId,
  topPerformersWidgetId,
  stockPriceAnalysisWidgetId,
  riskAnalysisWidgetId,
] as const;

export const widgetMap: ReadonlyMap<string, string> =
  new Map<string, string>(Object.entries(widgetLabels) as [string, string][]);

  interface IDashboardWidgetIdsByColumn {
      readonly firstColumn: ReadonlyArray<string>;
      readonly secondColumn: ReadonlyArray<string>;
  }
  
export function getDashboardWidgetsConfiguration(): IPageWidgetsConfiguration<IDashboardWidgetIdsByColumn> {
    const firstColumnWidgetIds = [portfolioPieChartWidgetId, investmentGrowthChartWidgetId, topPerformersWidgetId];
    const secondColumnWidgetIds = [stockPriceAnalysisWidgetId, riskAnalysisWidgetId];

    return {
        allWidgetIds: [
            ...firstColumnWidgetIds,
            ...secondColumnWidgetIds
        ],
        widgetIdsByColumn: {
            firstColumn: firstColumnWidgetIds,
            secondColumn: secondColumnWidgetIds
        }
    };
};