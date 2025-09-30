import { investmentGrowthChartWidgetId } from '@/components/widgets/investment-growth-chart-widget';
import { portfolioPieChartWidgetId } from '@/components/widgets/portfolio-pie-chart-widget';
import { riskAnalysisWidgetId } from '@/components/widgets/risk-analysis-widget';
import { stockPriceAnalysisWidgetId } from '@/components/widgets/stock-price-analysis-widget';
import { topPerformersWidgetId } from '@/components/widgets/top-performers-widget';
import { assertNonNullable } from '@/utils/utils';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum WidgetState {
    Visible = 0,
    Collapsing = 1,
    Hidden = 2,
    Expanding = 3
}

export interface IWidgetStateConfiguration {
    readonly widgetId: string;
    readonly state: WidgetState;
}

export interface IWidgetOptions {
    readonly configurations: ReadonlyArray<IWidgetStateConfiguration>;
}

export interface IDashboardState {
    readonly widgets: IWidgetOptions;
}

const initialState: IDashboardState = {
    widgets: {
        configurations: [
            {widgetId: portfolioPieChartWidgetId, state: 0},
            {widgetId: investmentGrowthChartWidgetId, state: 0},
            {widgetId: topPerformersWidgetId, state: 0},
            {widgetId: stockPriceAnalysisWidgetId, state: 0},
            {widgetId: riskAnalysisWidgetId, state: 0}
        ]
    }
};

const investmentDasboardSlice = createSlice({
    name: 'investment-dashboard',
    initialState,
    reducers: {
        setWidgetState: {
            reducer(state, action: PayloadAction<{ widgetId: string; widgetState: WidgetState }>) {
                const {
                    widgetId,
                    widgetState: newState
                } = action.payload;
                const stateConfiguration = state.widgets.configurations.find(wc => wc.widgetId === widgetId);
                assertNonNullable(stateConfiguration);
                stateConfiguration.state = newState;
            },
            prepare(widgetId: string, widgetState: WidgetState) {
                return {
                    payload: {
                        widgetId,
                        widgetState
                    }
                };
            }
        }
    }
});

export const selectWidgetsByIds = createSelector(
    [
        (state: IDashboardState) => state.widgets.configurations,
        (_: IDashboardState, widgetIds: ReadonlyArray<string>) => widgetIds
    ],
    (configurations: ReadonlyArray<IWidgetStateConfiguration>, widgetIds: ReadonlyArray<string>) =>
        configurations.filter(x =>
            widgetIds.find(widgetId => x.widgetId === widgetId) !== undefined
        )
);

export const {
    setWidgetState
} = investmentDasboardSlice.actions;

export default investmentDasboardSlice.reducer;

