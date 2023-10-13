import DashView from '@/components/DashView';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';
import { useState } from 'react';

const Dashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>Dashboard - Equilíbrio das cartas</title>
      </Head>
      <Sidebar contentComponent={DashView} />
    </div>
  );
};

export default Dashboard;
