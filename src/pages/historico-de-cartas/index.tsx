import CardHistory from '@/components/CardHistory';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';

export default function HistoricCards({posts}: any) {
    return (
        <>
            <Head>
                <title>Últimos Jogos - Equilíbrio das cartas</title>
            </Head>
            <div>
                <Sidebar title="Últimos jogos" contentComponent={() => <CardHistory posts={posts} />}/>
            </div>
        </>
    )
}

export async function getServerSideProps(context:any) {
    try {
      const response = await fetch('https://equilibriodascartas.thetrinityweb.com.br/wp-json/custom/v1/posts');
      
      const posts = await response.json();
  
      console.log("Posts:", posts)
  
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