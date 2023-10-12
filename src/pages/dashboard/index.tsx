import DashView from '@/components/DashView';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

const Dashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Sidebar contentComponent={DashView} />
    </div>
  );
};

export default Dashboard;
