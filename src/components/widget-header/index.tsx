import * as React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import "./index.scss";

interface IWidgetHeaderProps {
    onClick: () => void;
    widgetLabel: string;
    isDisabled?: boolean;
}

const WidgetHeader: React.FC<IWidgetHeaderProps> = (props) => {
    return (
        <div className='widget-header'>
            <div className="widget-name">{props.widgetLabel}</div>
            <IconButton onClick={props.onClick} disabled={props.isDisabled}>
                <CloseIcon />
            </IconButton>
        </div>
    );
};

export default WidgetHeader;