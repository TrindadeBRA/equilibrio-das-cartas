import Image from 'next/image';

const ResultTarotCard = ({ cardData }:any) => {
  // Certifique-se de que cardData não é nulo ou indefinido antes de acessar suas propriedades
  if (!cardData) {
    return null; // ou exiba uma mensagem de erro ou um componente de carregamento
  }

  const { title, positive_meaning, negative_meaning, thumbnail_url, card_english_name } = cardData;

  return (
    <div>
      <h2>Carta sorteada: {title} ({card_english_name})</h2>
      <p>Positive Meaning: {positive_meaning}</p>
      <p>Negative Meaning: {negative_meaning}</p>
      <Image width={256} height={422} src={thumbnail_url} alt="Tarot Card" loading="lazy" className='' />
    </div>
  );
};

export default ResultTarotCard;
