import ResultTarotCard from '@/components/ResultTarotCard';
import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/Auth/AuthContext';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { useRouter } from 'next/router';


export default function ResultCardPage({ cardData }: any) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user, router]);

    return (
        <>
            <ProtectedRoute>
                <div>
                    <Sidebar contentComponent={() => <ResultTarotCard cardData={cardData} />} />
                </div>
            </ProtectedRoute>
        </>
    );
}

export async function getServerSideProps(context: any) {
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
