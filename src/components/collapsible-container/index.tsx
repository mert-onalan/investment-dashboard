"use client";

import * as React from "react";
import { CircularProgress, Paper } from "@mui/material";
import classNames from "classnames";

import "./index.scss";

export enum WidgetState {
    Visible = 0,
    Collapsing = 1,
    Hidden = 2,
    Expanding = 3,
}

enum WidgetTransientState {
    Expanded = 0,
    Collapsed = 1,
}

interface ICollapsibleContainerProps {
    readonly className?: string;
    readonly widgetState: WidgetState;
    readonly renderWidget: () => React.JSX.Element | null;
    readonly onFinishOpening: () => void;
    readonly onFinishClosing: () => void;
}

export const CollapsibleContainer: React.FC<React.PropsWithChildren<ICollapsibleContainerProps>> = (props) => {
    const { onFinishOpening, onFinishClosing } = props;
    const [transientState, setTransientState] = React.useState<WidgetTransientState | undefined>();
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (transientState === WidgetTransientState.Collapsed) {
            onFinishClosing();
        }
        if (transientState === WidgetTransientState.Expanded) {
            onFinishOpening();
        }
    }, [transientState, onFinishClosing, onFinishOpening]);

    React.useEffect(() => {
        if (props.widgetState === WidgetState.Visible || props.widgetState === WidgetState.Expanding) {
            setIsLoading(true);
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
        setTransientState(undefined);
    }, [props.widgetState]);

    const onAnimationEnd = React.useCallback(() => {
        if (props.widgetState === WidgetState.Collapsing) {
            setTransientState(WidgetTransientState.Collapsed);
        }
        if (props.widgetState === WidgetState.Expanding) {
            setTransientState(WidgetTransientState.Expanded);
        }
    }, [props.widgetState]);

    if (transientState === WidgetTransientState.Collapsed ||props.widgetState === WidgetState.Hidden) {
        return null;
    }

    return (
        <Paper
            className={classNames("widget-container", props.className, {
                "collapse-animation": props.widgetState === WidgetState.Collapsing,
                "expand-animation": props.widgetState === WidgetState.Expanding,
            })}
            onAnimationEnd={onAnimationEnd}
            sx={{ borderRadius: '15px' }}
        >
            {
            isLoading 
                ? <div className='loading-container'>
                    <CircularProgress />
                </div>
                : props.renderWidget()
            }
        </Paper>
    );
};
