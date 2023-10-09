import ResultTarotCard from '@/components/ResultTarotCard'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'

export default function ResultCardPage({ cardData }:any) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <div>
                <Sidebar contentComponent={() => <ResultTarotCard cardData={cardData} />} />
            </div>
        </>
    );
}

export async function getServerSideProps(context:any) {
    const { themeReading } = context.query;
    try {
        const response = await fetch('https://equilibriodascartas.thetrinityweb.com.br/wp-json/tarot-api/v1/random-card/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
