'use client'

import * as React from 'react';
import { assertNonNullable } from '@/utils/utils';

interface IWidgetsVisibilityContext {
    readonly actionsByWidget: Map<string, IWidgetActions | undefined>;
    readonly setWidgetAction: (widgetId: string, actions: IWidgetActions) => void;
}

export interface IWidgetActions {
    readonly open: () => void;
    readonly close: () => void;
}

export const WidgetsVisibilityContext = React.createContext<IWidgetsVisibilityContext | undefined>(undefined);

export const WidgetsVisibilityContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [actionsByWidget, setActionsByWidget] = React.useState(new Map());

    const setWidgetAction = React.useCallback((widgetId: string, actions: IWidgetActions) => {
        setActionsByWidget(actionsByWidget.set(widgetId, actions));
    }, [actionsByWidget]);

    const value: IWidgetsVisibilityContext = {
        actionsByWidget: actionsByWidget,
        setWidgetAction: setWidgetAction
    };

    return (
        <WidgetsVisibilityContext.Provider value={value}>
            {props.children}
        </WidgetsVisibilityContext.Provider>
    );
};

export const useWidgetVisibilityContext = () => {
    const context = React.useContext(WidgetsVisibilityContext);
    assertNonNullable(context);
    return context;
};
