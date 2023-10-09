import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, token) => {
    setUser({ email, token });
    console.log('Usuário logado:', { email, token });
  };

  const logout = () => {
    setUser(null);
    console.log('Usuário desconectado');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
