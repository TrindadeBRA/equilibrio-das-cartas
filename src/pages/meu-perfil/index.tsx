import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Sidebar from '@/components/Sidebar'
import ProfileEditor from '@/components/ProfileEditor'

// ... restante do seu código

export default function MeuPerfil() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <div>
                <Sidebar contentComponent={ProfileEditor} />
            </div>
        </>
    )
}
