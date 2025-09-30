import Image from "next/image";
import { WidgetsController } from "../custom-menu";

import "./index.scss";

function ControlPanel() {
    return (
        <div className='control-panel'>
            <WidgetsController />
            <Image 
                src="/investment-dashboard-logo.png" 
                alt="Investment Logo" 
                className="logo"
                width={40}
                height={40}
            />
        </div>
    );
}

export default ControlPanel;
