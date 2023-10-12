import DashView from '@/components/DashView';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

export default function HistoricCards() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

 

    return (
        <>
            <div>
                <Sidebar contentComponent={DashView} />
            </div>
        </>
    )
}
