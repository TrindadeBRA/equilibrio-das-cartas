import React from 'react';
import { useAuth } from '../Auth/AuthProvider';

const CardHistory = ({ posts }) => {
  const { user } = useAuth();

  if (!posts) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>Bem-vindo, {user.first_name} {user.last_name}!</h1>
          <p>Email: {user.email}</p>

          <h2>Seus posts do tipo 'cards-reads':</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.ID}>
                Nome: {post.post_title}, ID: {post.ID}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Você não está autenticado.</p>
      )}
    </div>
  );
};

export default CardHistory;