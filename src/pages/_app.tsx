import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/components/Auth/AuthContext'; // Importe o seu contexto aqui

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
