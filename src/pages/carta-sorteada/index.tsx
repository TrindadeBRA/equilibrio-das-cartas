import ResultTarotCard from '@/components/ResultTarotCard';
import Sidebar from '@/components/Sidebar';

function parseCookies(cookieString) {
    return cookieString.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.split('=').map(c => c.trim());
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
                user_id: 1,
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
