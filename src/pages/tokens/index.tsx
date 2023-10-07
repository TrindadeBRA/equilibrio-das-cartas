import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Sidebar from '@/components/Sidebar'
import TokensView from '@/components/TokensView'

// ... restante do seu código

export default function Tokens() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <div>
                <Sidebar contentComponent={TokensView} />
            </div>
        </>
    )
}
