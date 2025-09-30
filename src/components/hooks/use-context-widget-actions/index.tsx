"use client";

import * as React from 'react';
import { useWidgetVisibilityContext } from '@/context/widgets-visibility-context';
import { IWidgetVisibility } from '../use-widget-visibility';

export const useContextWidgetActions = (widgets: ReadonlyArray<IWidgetVisibility>) => {
    const context = useWidgetVisibilityContext();

    React.useEffect(
        () => {
            for (const widget of widgets) {
                context.setWidgetAction(widget.id, widget.actions);
            }
        },
        [context, widgets]
    );
};