import DashView from '@/components/DashView';
import Sidebar from '@/components/Sidebar';

export default function HistoricCards() {
    return (
        <>
            <div>
                <Sidebar title="Últimos jogos" contentComponent={DashView} />
            </div>
        </>
    )
}
