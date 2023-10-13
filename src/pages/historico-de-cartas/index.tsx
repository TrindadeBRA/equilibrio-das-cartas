import DashView from '@/components/DashView';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';

export default function HistoricCards() {
    return (
        <>
            <Head>
                <title>Últimos Jogos - Equilíbrio das cartas</title>
            </Head>
            <div>
                <Sidebar title="Últimos jogos" contentComponent={DashView} />
            </div>
        </>
    )
}
