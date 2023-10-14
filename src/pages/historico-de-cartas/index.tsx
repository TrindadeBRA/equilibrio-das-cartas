import CardHistory from '@/components/CardHistory';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';

export default function HistoricCards({ posts }: any) {
    // Renderiza o componente normalmente, os dados já foram obtidos do lado do servidor
    return (
        <>
            <Head>
                <title>Últimos Jogos - Equilíbrio das cartas</title>
            </Head>
            <div>
                <Sidebar title="Últimos jogos" contentComponent={() => <CardHistory posts={posts} />} />
            </div>
        </>
    );
}

export async function getServerSideProps(context: any) {
    try {
        // Obtém o user_id do contexto da requisição
        const { user_id } = context.req.cookies; // Supondo que o user_id esteja armazenado em cookies
        const response = await fetch('https://equilibriodascartas.thetrinityweb.com.br/wp-json/custom/v1/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user_id,
            }),
        });

        const posts = await response.json();

        return {
            props: {
                posts,
            },
        };
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        return {
            props: {
                posts: [],
            },
        };
    }
}
