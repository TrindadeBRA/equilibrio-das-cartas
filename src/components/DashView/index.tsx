import React from 'react';
import { useAuth } from '../Auth/AuthProvider';

const ProfileComponent: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      {user ? (
        <div>
          <h1>Bem-vindo, {user.first_name} {user.last_name}!</h1>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Você não está autenticado.</p>
      )}
    </div>
  );
};

export default ProfileComponent;
