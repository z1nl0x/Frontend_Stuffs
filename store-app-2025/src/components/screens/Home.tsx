import { Head } from "~/components/shared/Head";
import { useAuthState } from "~/components/contexts/UserContext";
import { SignOutButton } from "~/components/domain/auth/SignOutButton";

function Home() {
  const { state } = useAuthState();
  
  if (state.state !== 'SIGNED_IN') {
    return null; 
  }

  return (
    <>
      <Head title="Home" />
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-cyan-500">
          🚀 Bem-vindo(a) à Área Privada!
        </h1>
        <p className="text-2xl mb-8">
          Olá, **{state.currentUser.email}**! Você está logado com sucesso.
        </p>
        <div className="flex gap-4">
            <SignOutButton />
        </div>
      </div>
    </>
  );
}

export default Home;