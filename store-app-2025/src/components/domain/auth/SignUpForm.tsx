import { useState, FormEvent } from 'react';
import { useAuth } from '~/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const SignUpForm = () => {

  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Falha ao criar conta. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Crie sua Conta</h2> 
        
        {error && (
          <div className="alert alert-error shadow-lg mb-4">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        <div className="form-control mb-3 max-w-xs mx-auto">
          <label className="label">
            <span className="label-text text-lg font-semibold">Email</span> 
          </label>
          <input
            type="email"
            placeholder="seu@email.com"
            className="input input-bordered input-md w-full" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        
        <div className="form-control mb-6 max-w-xs mx-auto">
          <label className="label">
            <span className="label-text text-lg font-semibold">Senha (Mín. 6 caracteres)</span>
          </label>
          <input
            type="password"
            placeholder="escolha uma senha segura"
            className="input input-bordered input-md w-full" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            minLength={6} 
          />
        </div>
        
        <div className="form-control mt-4 max-w-xs mx-auto">
          <button 
            type="submit" 
            className={`btn btn-primary btn-lg normal-case w-full`} 
            disabled={isLoading}
          >
            {isLoading ? 
            (
              <span className="flex items-center gap-2">
                    <div className="loading loading-spinner loading-sm"></div>
                    Cadastrando...
                </span>
            ) : 'Criar Conta'}
          </button>
        </div>
    </form>
  );
};