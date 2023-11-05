import React from 'react';
import { useAuth } from '../Auth/AuthProvider';
import Image from 'next/image';

const CardHistory = ({ posts }: any) => {

  const { user } = useAuth();

  console.log(posts);

  if (!posts) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {posts.map((post: any) => (
          <div key={post.id} className='flex bg-gray-100 p-4 rounded-xl gap-4 shadow-md'>
            <Image width={80} height={165} src={post.sorted_card_cover_url} alt={post.sorted_card_name} title={post.sorted_card_name} className={`${post.card_position_string === 'Negativa' ? 'transform rotate-180' : ''} rounded border-2 border-[#da18ff] shadow-md`} />
            <div className="flex flex-col justify-center">
              <span>{post.sorted_card_name}</span>
              <span>{post.card_theme_reading}</span>
              <span className='text-gray-500'>{post.formatted_post_date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardHistory;