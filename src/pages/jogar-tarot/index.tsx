import PlayTarotCard from '@/components/PlayTarotCard'
import { useEffect, useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Sidebar from '@/components/Sidebar'
import DashView from '@/components/DashView'
import { useAuth } from '@/components/Auth/AuthContext';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { useRouter } from 'next/router'

export default function PlayTarot() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user, router]);

    return (
        <>
            <div>
                <Sidebar contentComponent={PlayTarotCard} />
            </div>
        </>
    )
}
