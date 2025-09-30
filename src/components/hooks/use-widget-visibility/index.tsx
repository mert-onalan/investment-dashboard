"use client";

import * as React from 'react';
import { CollapsibleContainer, WidgetState } from '@/components/collapsible-container';
import { IWidgetActions } from '@/context/widgets-visibility-context';
import { useAppDispatch, useAppSelector } from '@/libs/hooks';
import { setWidgetState } from '@/libs/slices/widget-status-slice';
import { assertNonNullable } from '@/utils/utils';

export interface IWidgetVisibility {
    readonly id: string;
    readonly actions: IWidgetActions;
    readonly Element: React.JSX.Element;
}

interface IUseWidgetVisibilityParameters {
    readonly widgetId: string;
    readonly renderWidgetContent: (onClose: () => void) => React.JSX.Element | null;
}

export const useWidgetVisibility = (parameters: IUseWidgetVisibilityParameters): IWidgetVisibility => {
    const {
        renderWidgetContent
    } = parameters;

    const widgetConfiguration = useAppSelector(x => x.widgets.configurations.find(wc => wc.widgetId === parameters.widgetId));

    assertNonNullable(widgetConfiguration);

    const dispatch = useAppDispatch();

    const onOpen = React.useCallback(() => {
        dispatch(setWidgetState(parameters.widgetId, WidgetState.Visible));
    }, [dispatch, parameters.widgetId]);

    const onClose = React.useCallback(() => {
        dispatch(setWidgetState(parameters.widgetId, WidgetState.Hidden));
    }, [dispatch, parameters.widgetId]);

    const open = React.useCallback(() => {
    dispatch(setWidgetState(parameters.widgetId, WidgetState.Expanding));
    }, [dispatch, parameters.widgetId]);

    const close = React.useCallback(() => {
        dispatch(setWidgetState(parameters.widgetId, WidgetState.Collapsing));
    }, [dispatch, parameters.widgetId]);

    const renderWidget = React.useCallback(() => {
        return renderWidgetContent(close);
    }, [close, renderWidgetContent]);

    const CollapsibleWidgetElement = React.useMemo(
        () =>
            <CollapsibleContainer
                widgetState={widgetConfiguration.state}
                renderWidget={renderWidget}
                onFinishOpening={onOpen}
                onFinishClosing={onClose}
            />,
        [widgetConfiguration.state, renderWidget, onOpen, onClose]
    );

    return {
        id: parameters.widgetId,
        actions: {
            open: open,
            close: close
        },
        Element: CollapsibleWidgetElement
    };
};
