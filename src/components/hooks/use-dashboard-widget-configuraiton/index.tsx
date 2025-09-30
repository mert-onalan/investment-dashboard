"use client";

import { useAppSelector } from "@/libs/hooks";
import { selectWidgetsByIds, WidgetState } from "@/libs/slices/widget-status-slice";

function isWidgetOpen(state: WidgetState) {
    return state === WidgetState.Visible || state === WidgetState.Expanding;
}

export type WidgetIdsByColumn<T extends object> = { [ K in keyof T ]: ReadonlyArray<string> };

export interface IPageWidgetsConfiguration<T extends object> {
    readonly allWidgetIds: ReadonlyArray<string>;
    readonly widgetIdsByColumn: WidgetIdsByColumn<T>;
}

export interface IColumnRenderParameters {
    readonly isColumnShown: boolean;
    readonly widgetIds: ReadonlyArray<string>;
}

export type RenderParametersByColumn<T extends object> = { [ K in keyof T ]: IColumnRenderParameters };

export interface IWidgetsPageDescriptor<T extends object> {
    readonly isOnlyOneWidgetOpen: boolean;
    readonly parameters: RenderParametersByColumn<T>;
}

export const useWidgetsConfiguration = <T extends object>(parameters: IPageWidgetsConfiguration<T>): IWidgetsPageDescriptor<T> => {
    const pageWidgetConfigurations = useAppSelector(state => selectWidgetsByIds(state, parameters.allWidgetIds));

    const columnConfigurationEntries = Object.entries<ReadonlyArray<string>>(parameters.widgetIdsByColumn).map(columnToWidgetIds => {
        const [column, columnWidgetIds] = columnToWidgetIds;

        const isColumnShown = pageWidgetConfigurations
            .filter(wc => columnWidgetIds.find(widgetId => wc.widgetId === widgetId) !== undefined)
            .some(wc => isWidgetOpen(wc.state));

        const columnConfiguration: IColumnRenderParameters = {
            isColumnShown: isColumnShown,
            widgetIds: columnWidgetIds
        };

        return [column, columnConfiguration];
    });

    const openWidgets = pageWidgetConfigurations.filter(wc => isWidgetOpen(wc.state));

    return {
        isOnlyOneWidgetOpen: openWidgets.length === 1,
        parameters: Object.fromEntries(columnConfigurationEntries)
    };
};
