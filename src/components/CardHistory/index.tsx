import React from 'react';
import { useAuth } from '../Auth/AuthProvider';
import Image from 'next/image';

const CardHistory = ({ posts }: any) => {

  console.log(">>>>", posts);

  const { user } = useAuth();

  if (!posts) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {posts.map((post: any) => (
          <div key={post.id} className='flex bg-gray-200 p-4 rounded-xl gap-4'>
            <Image width={80} height={165} src={post.sorted_card_cover_url} alt={post.sorted_card_name} title={post.sorted_card_name} className="rounded border-2 border-[#da18ff]" />
            <div className="flex flex-col justify-center">
              <span>Carta: {post.sorted_card_name}</span>
              <span>Data: {post.formatted_post_date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardHistory;