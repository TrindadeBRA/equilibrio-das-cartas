import PlayTarotCard from '@/components/PlayTarotCard'
import Sidebar from '@/components/Sidebar'
import Head from 'next/head'

export default function PlayTarot() {
    return (
        <>
            <Head>
                <title>Jogar Carta - Equilíbrio das cartas</title>
            </Head>
            <div>
                <Sidebar contentComponent={PlayTarotCard} title="Começar um jogo" />
            </div>
        </>
    )
}
