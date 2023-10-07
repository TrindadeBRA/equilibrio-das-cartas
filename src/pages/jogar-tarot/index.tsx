import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Sidebar from '@/components/Sidebar'
import PlayTarotCard from '@/components/PlayTarotCard'

// ... restante do seu código

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <div>
                <Sidebar contentComponent={PlayTarotCard} />
            </div>
        </>
    )
}
