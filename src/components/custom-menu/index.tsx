"use client";

import * as React from "react";
import { useWidgetVisibilityContext } from "@/context/widgets-visibility-context";
import { useAppSelector } from "@/libs/hooks";
import {
    selectWidgetsByIds,
    WidgetState,
} from "@/libs/slices/widget-status-slice";
import { assertNonNullable } from "@/utils/utils";
import MenuIcon from '@mui/icons-material/Menu';
import {
    IconButton,
    ListItemText,
    Menu,
    MenuItem,
    Switch,
} from "@mui/material";
import { widgetIds, widgetLabels } from "../widgets/registry";

function isWidgetVisible(state: WidgetState) {
    return state === WidgetState.Expanding || state === WidgetState.Visible;
}

export interface IWidgetContollerItem {
    widgetId: string;
    widgetLabel: string;
    isVisible: boolean;
    disabled: boolean;
}

export const WidgetsController = () => {
    const [menuElement, setMenuElement] = React.useState<HTMLElement | null>(null);
    const pageWidgetConfigurations = useAppSelector((state) => selectWidgetsByIds(state, widgetIds));
    const isOnlyOneWidgetVisible = pageWidgetConfigurations.filter((w) => isWidgetVisible(w.state)).length === 1;
    const widgetsVisibilityContext = useWidgetVisibilityContext();

    const handleMenuItemSwitch = React.useCallback(
        (widgetId: string, checked: boolean) => {
            const actions = widgetsVisibilityContext.actionsByWidget.get(widgetId);
            assertNonNullable(actions);

            if (checked) {
                actions.open();
            } else {
                actions.close();
            }
        },
        [widgetsVisibilityContext.actionsByWidget]
    );

    const widgetControllerItems: IWidgetContollerItem[] =
        pageWidgetConfigurations.map((widgetConfiguration) => {
            const isVisible = isWidgetVisible(widgetConfiguration.state);
            const widgetLabel = widgetLabels[widgetConfiguration.widgetId];
            assertNonNullable(widgetLabel);
            return {
                widgetId: widgetConfiguration.widgetId,
                widgetLabel,
                isVisible,
                disabled: isVisible && isOnlyOneWidgetVisible,
            };
        });

    const handleMenuOpen = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) =>
            setMenuElement(event.currentTarget),
        []
    );

    const handleMenuClose = React.useCallback(() => setMenuElement(null), []);

    return (
        <>
            <IconButton onClick={handleMenuOpen} title='Configure Widgets'>
                <MenuIcon fontSize="large" color='primary' />
            </IconButton>
            <Menu
                anchorEl={menuElement}
                open={menuElement !== null}
                onClose={handleMenuClose}
            >
                {widgetControllerItems.map((widgetMenuItem) => (
                    <MenuItem key={widgetMenuItem.widgetId}>
                        <ListItemText primary={widgetMenuItem.widgetLabel} />
                        <Switch
                            checked={widgetMenuItem.isVisible}
                            onChange={(_, checked) =>
                                handleMenuItemSwitch(
                                    widgetMenuItem.widgetId,
                                    checked
                                )
                            }
                            disabled={widgetMenuItem.disabled}
                        />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
