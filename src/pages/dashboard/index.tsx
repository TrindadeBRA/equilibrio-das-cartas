import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Sidebar from '@/components/Sidebar'
import BannerHeader from '@/components/BannerHeader'
import DashView from '@/components/DashView'

// ... restante do seu código

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <div>
                <Sidebar contentComponent={DashView} />
            </div>
        </>
    )
}
