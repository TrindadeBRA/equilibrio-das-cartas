import React from 'react';
import { useAuth } from '../Auth/AuthProvider';

const CardHistory = ({ posts }: any) => {
  const { user } = useAuth();

  if (!posts) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
        <div>
          <h2>Seus ultimos 3 jogos:</h2>
          <ul>
            {posts.map((post: any) => (
              <li key={post.ID}>
                Nome: {post.post_title}, ID: {post.ID}
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default CardHistory;