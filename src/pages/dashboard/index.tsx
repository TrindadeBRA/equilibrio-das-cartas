import DashView from '@/components/DashView';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';
import { useState } from 'react';

const Dashboard = () => {
  return (
    <div>
      <Head>
        <title>Dashboard - Equilíbrio das cartas</title>
      </Head>
      <Sidebar contentComponent={DashView} title="Dashboard"/>
    </div>
  );
};

export default Dashboard;
