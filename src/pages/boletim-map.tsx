import dynamic from 'next/dynamic';
import React from 'react';
import { useAuth } from 'src/hooks/useAuth';

const BoletimMap = dynamic(import('../components/Boletim/BoletimMap'), {
  ssr: false,
});

const BoletimMapPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <>
      <BoletimMap />
    </>
  );
};

export default BoletimMapPage;
