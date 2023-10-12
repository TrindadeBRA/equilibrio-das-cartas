import ProfileEditor from '@/components/ProfileEditor'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'

export default function MyProfile() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

 

    return (
        <>
            <div>
                <Sidebar contentComponent={ProfileEditor} />
            </div>
        </>
    )
}
