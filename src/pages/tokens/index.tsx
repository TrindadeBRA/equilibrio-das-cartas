import Sidebar from '@/components/Sidebar'
import TokensView from '@/components/TokensView'
import Head from 'next/head'

export default function Tokens() {

    return (
        <>
            <Head>
                <title>Tokens - Equilíbrio das cartas</title>
            </Head>
            <div>
                <Sidebar contentComponent={TokensView} title="Tokens" />
            </div>
        </>
    )
}
