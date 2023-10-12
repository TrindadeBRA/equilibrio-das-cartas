import PlayTarotCard from '@/components/PlayTarotCard'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'

export default function PlayTarot() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <div>
                <Sidebar contentComponent={PlayTarotCard} />
            </div>
        </>
    )
}
