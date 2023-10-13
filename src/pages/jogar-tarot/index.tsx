import PlayTarotCard from '@/components/PlayTarotCard'
import Sidebar from '@/components/Sidebar'

export default function PlayTarot() {
    return (
        <>
            <div>
                <Sidebar contentComponent={PlayTarotCard} title="Começar um jogo"/>
            </div>
        </>
    )
}
