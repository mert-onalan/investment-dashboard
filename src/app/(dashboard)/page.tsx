import ControlPanel from '@/components/control-panel';
import DashboardPanel from '@/components/dashboard-panel';

import './page.scss';

export default function Home() {
  return (
    <div className="investment-dashboard-container">
        <ControlPanel />
        <DashboardPanel />
    </div>
  );
}
