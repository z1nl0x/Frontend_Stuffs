import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from '~/components/contexts/UserContext';
import { useAuth } from '~/lib/firebase';
import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';

export const ProtectedRoute = () => {
  const { state } = useAuthState();
  const auth = useAuth();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log("Login por redirecionamento concluído com sucesso.");
        }
      })
      .catch((error) => {
        console.error("Erro no retorno do redirect:", error);
      });
  }, [auth]);

  if (state.state === 'UNKNOWN') {
    return <p className="p-4 w-full h-full text-center">Verificando autenticação...</p>;
  }

  if (state.state === 'SIGNED_IN') {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};