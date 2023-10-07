import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Sidebar from '@/components/Sidebar'
import BannerHeader from '@/components/BannerHeader'
import DashView from '@/components/DashView'
import ResultTarotCard from '@/components/ResultTarotCard'

export default function ResultCardPage({ cardData }:any) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    console.log(":::::::::::::::::::", cardData);

    return (
        <>
            <div>
                {/* Certifique-se de passar o componente ResultTarotCard como uma função */}
                <Sidebar contentComponent={() => <ResultTarotCard cardData={cardData} />} />
            </div>
        </>
    );
}

export async function getServerSideProps(context:any) {
    const { selectedThemeValue } = context.query;
    try {
        const response = await fetch('https://equilibriodascartas.thetrinityweb.com.br/wp-json/tarot-api/v1/random-card/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: 555,
                theme: selectedThemeValue,
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
