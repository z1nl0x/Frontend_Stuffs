import { useRef, useState } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import { SignInWithEmailAndPasswordForm } from '~/components/domain/auth/SignInWithEmailAndPasswordForm';

function Index() {
  const { state } = useAuthState();
  const [isOpen, setIsOpen] = useState(true);
  const completeButtonRef = useRef(null);

  const renderContent = () => {

    switch (state.state) {
      case 'SIGNED_IN':
        return (
          <div className="flex flex-col items-center gap-6 p-8"> 
            <h1 className="text-4xl font-bold">Bem-vindo(a), {state.currentUser.email}!</h1>
            <p className="text-xl">Você está logado com sucesso.</p>
            <SignOutButton />
          </div>
        );
      case 'SIGNED_OUT':
      case 'UNKNOWN':
        return (
          <div className="flex flex-col items-center justify-center gap-6 p-8"> 
            <SignInWithEmailAndPasswordForm />
            <div className="divider text-lg">OU CONTINUE COM</div>
            <SignInButton />
          </div>
        );
      default:
        return <p>Carregando estado de autenticação...</p>;
    }
  };

  return (
    <>
      <Head title="LOGIN" />
           
      <div className="relative min-h-screen z-10 flex items-center justify-center">
        <div className="hero-content text-center w-full max-w-3xl bg-transparent"> 
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default Index;