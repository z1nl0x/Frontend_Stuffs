import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '~/components/contexts/UserContext';
import { Head } from '~/components/shared/Head';
import { SignInWithEmailAndPasswordForm } from '~/components/domain/auth/SignInWithEmailAndPasswordForm';
import { SignUpForm } from '~/components/domain/auth/SignUpForm';

type ViewState = 'SIGN_IN' | 'SIGN_UP';

function Index() {
  const { state } = useAuthState();
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useState<ViewState>('SIGN_IN');

  useEffect(() => {
    if (state.state === 'SIGNED_IN') {
      navigate('/home', { replace: true });
    }
  }, [state.state, navigate]);

  if (state.state === 'SIGNED_IN') {
    return null;
  }

  if (state.state === 'UNKNOWN') {
    return (
      <div className="relative min-h-screen z-10 flex items-center justify-center">
        <p className="text-xl font-semibold">Carregando estado de autenticação...</p>
      </div>
    );
  }

  return (
    <>
      <Head title={currentView === 'SIGN_IN' ? 'Login' : 'Registrar-se'} />
      <div className="relative min-h-screen z-10 flex items-center justify-center p-4 bg-gray-500">
        <div className="w-80 mx-auto">
          
          <div className="card shadow-2xl bg-base-100">

            <div className="tabs tabs-boxed rounded-t-2xl">
              <button
                className={`tab tab-lg flex-1 font-bold ${currentView === 'SIGN_IN' ? 'tab-active bg-primary text-primary-content' : ''}`}
                onClick={() => setCurrentView('SIGN_IN')}
              >
                Login
              </button>
              <button
                className={`tab tab-lg flex-1 font-bold ${currentView === 'SIGN_UP' ? 'tab-active bg-secondary text-secondary-content' : ''}`}
                onClick={() => setCurrentView('SIGN_UP')}
              >
                Registrar
              </button>
            </div>

            <div className="card-body p-8">
              {currentView === 'SIGN_IN' ? (
                <div className="flex flex-col items-center justify-center gap-6">
                  <SignInWithEmailAndPasswordForm />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-6">
                  <SignUpForm />
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;