import Sidebar from '@/components/Sidebar'
import TokensView from '@/components/TokensView'

export default function Tokens() {

    return (
        <>
            <div>
                <Sidebar contentComponent={TokensView} title="Tokens"/>
            </div>
        </>
    )
}
