import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
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

  const renderAuthForm = () => {
    if (currentView === 'SIGN_IN') {
      return (
        <div className="flex flex-col items-center justify-center gap-6 p-8"> 
          <SignInWithEmailAndPasswordForm />
          
          <button 
            onClick={() => setCurrentView('SIGN_UP')} 
            className="btn btn-link normal-case text-lg text-secondary-focus"
          >
            Ainda não tem conta? **Cadastre-se**
          </button>

          <div className="divider text-lg">OU CONTINUE COM</div>
          <SignInButton />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center gap-6 p-8"> 
          <SignUpForm />
          
          <button 
            onClick={() => setCurrentView('SIGN_IN')} 
            className="btn btn-link normal-case text-lg text-primary-focus"
          >
            Já tem conta? **Faça Login**
          </button>
        </div>
      );
    }
  };

  const renderContent = () => {

    if (state.state === 'SIGNED_IN') {
      return null;
    }
    

    if (state.state === 'UNKNOWN') {
        return <p>Carregando estado de autenticação...</p>;
    }


    return renderAuthForm();
  };

  return (
    <>
      <Head title={currentView === 'SIGN_IN' ? 'Login' : 'Registrar-se'} />
      <div className="relative min-h-screen z-10 flex items-center justify-center">
        <div className="hero-content text-center w-full max-w-3xl bg-transparent"> 
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default Index;