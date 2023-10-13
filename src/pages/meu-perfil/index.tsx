import ProfileEditor from '@/components/ProfileEditor'
import Sidebar from '@/components/Sidebar'

export default function MyProfile() {
    return (
        <>
            <div>
                <Sidebar contentComponent={ProfileEditor} title="Meu perfil"/>
            </div>
        </>
    )
}
