import { CheckCircleIcon, ShareIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const ResultTarotCard = ({ cardData }: any) => {
  // Certifique-se de que cardData não é nulo ou indefinido antes de acessar suas propriedades
  if (!cardData) {
    return null; // ou exiba uma mensagem de erro ou um componente de carregamento
  }

  const { card_name_pt, card_name_en, card_arcanes_type, card_reading, card_illustration, token_coins, card_position } = cardData;

  const card_position_class = card_position ? '' : 'transform rotate-180';

  return (
    <div className="h-full w-full bg-indigo-100 p-8 rounded-lg shadow-md flex justify-center items-center">
      <div className="flex flex-row">

        <div className={`w-2/5 mb-4 flex flex-col justify-center`}>
          <div className={`${card_position_class} flex justify-center`}>
            <Image width={256} height={422} src={card_illustration} alt={card_name_pt} title={card_name_pt} className="rounded border-2 border-indigo-600" />
          </div>
          <p className='text-center my-2 text-gray-600 italic'>(Posição: {card_position ? 'Positiva' : 'Negativa'})</p>
        </div>

        <div className='w-3/5 flex flex-col justify-center'>
          <h2 className="text-3xl font-semibold">{card_name_pt} <span className='text-lg'>({card_name_en})</span></h2>
          <p className="text-gray-600 mb-4">{card_arcanes_type}</p>
          <p className="text-gray-800 mb-6">{card_reading}</p>
        </div>

      </div>
    </div>
  );
};

export default ResultTarotCard;
