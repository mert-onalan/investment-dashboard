import { IWidgetVisibility } from "../hooks/use-widget-visibility";

export function getColumnWidgets(pageWidgets: ReadonlyArray<IWidgetVisibility>, columnWidgetIds: ReadonlyArray<string>) {
    return pageWidgets.filter(w =>
        columnWidgetIds.find(wid => wid === w.id) !== undefined
    );
}