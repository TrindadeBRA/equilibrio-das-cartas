import ProfileEditor from '@/components/ProfileEditor'
import Sidebar from '@/components/Sidebar'
import Head from 'next/head'

export default function MyProfile() {
    return (
        <>
            <Head>
                <title>Meu Perfil - Equilíbrio das cartas</title>
            </Head>
            <div>
                <Sidebar contentComponent={ProfileEditor} title="Meu perfil" />
            </div>
        </>
    )
}
