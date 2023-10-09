import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from './AuthContext'; // Importe o seu contexto de autenticação

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Obtém o estado de autenticação do contexto
  const router = useRouter();

  // Verifica se o usuário está autenticado ao carregar a página
  useEffect(() => {
    if (!user) {
      // Se o usuário não estiver autenticado, redirecione para a página de login
      router.push('/');
    }
  }, [user, router]);

  // Se o usuário estiver autenticado ou estiver redirecionado para a página de login, renderize o conteúdo da página
  return user ? children : null;
};

export default ProtectedRoute;
