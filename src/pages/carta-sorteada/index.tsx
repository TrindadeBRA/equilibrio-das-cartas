import ResultTarotCard from '@/components/ResultTarotCard';
import Sidebar from '@/components/Sidebar';

function parseCookies(cookieString:any) {
    return cookieString.split(';').reduce((cookies:any, cookie:any) => {
        const [name, value]:any = cookie.split('=').map((c: string) => c.trim());
        cookies[name] = value;
        return cookies;
    }, {});
}

export default function ResultCardPage({ cardData }: any) {
    return (
        <>
            <div>
                <Sidebar title="Jogo simples" contentComponent={() => <ResultTarotCard cardData={cardData} />} />
            </div>
        </>
    );
}

export async function getServerSideProps(context: any) {
    const { themeReading } = context.query;
    const { user_id } = context.req.cookies; // Supondo que o user_id esteja armazenado em cookies

    try {
        const cookies = parseCookies(context.req.headers.cookie || ''); // Parse os cookies

        const token = cookies.jwt; // Obtenha o token JWT do cookie

        const response = await fetch('https://equilibriodascartas.thetrinityweb.com.br/wp-json/tarot-api/v1/random-card/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Adicione o token aos cabeçalhos
            },
            body: JSON.stringify({
                user_id: user_id,
                theme: themeReading,
            }),
        });

        if (response.ok) {
            const cardData = await response.json();
            return {
                props: {
                    cardData,
                },
            };
        } else {
            throw new Error('Error fetching data');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                cardData: null,
            },
        };
    }
}
