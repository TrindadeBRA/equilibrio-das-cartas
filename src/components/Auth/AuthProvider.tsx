import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  tokens_coins: string;
  avatar_url: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Acessa o cookie 'first_name' e 'email'
    const first_name = getCookie('first_name');
    const last_name = getCookie('last_name');
    const email = getCookie('email');
    const tokens_coins = getCookie('tokens_coins');
    const avatar_url = getCookie('avatar_url');

    // Se os cookies existirem, atualize o estado do usuário
    if (first_name && email && last_name && tokens_coins && avatar_url) {
      setUser({
        first_name: first_name,
        last_name: last_name,
        email: email,
        tokens_coins: tokens_coins,
        avatar_url: avatar_url,
      });
    }
  }, []); // Executa este efeito apenas uma vez durante a montagem do componente

  // Função para obter o valor do cookie por nome
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
