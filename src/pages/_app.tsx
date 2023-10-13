import '@/styles/globals.css';
import React from 'react';
import { AppProps } from 'next/app';
import { AuthProvider } from '@/components/Auth/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
