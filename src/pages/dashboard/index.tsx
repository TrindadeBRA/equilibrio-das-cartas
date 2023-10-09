import DashView from '@/components/DashView';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/Auth/AuthContext';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';

const Dashboard = () => {
  const { user } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div>
        <Sidebar contentComponent={DashView} />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
