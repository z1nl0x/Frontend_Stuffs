// src/components/shared/Menu.tsx
import { Link } from 'react-router-dom';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { useAuthState } from '~/components/contexts/UserContext';

export const Menu = () => {
    const { state } = useAuthState();

    // Se o estado não for SIGNED_IN, o menu não deve ser renderizado, 
    // mas a lógica de exibição está no Header, então mantemos apenas o conteúdo.
    if (state.state !== 'SIGNED_IN') {
        return null;
    }

    return (
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Título/Cabeçalho do Menu */}
            <li className="menu-title">
                <span>Bem-vindo(a), {state.currentUser.email}</span>
            </li>
            
            {/* Itens de Navegação */}
            <li>
                <Link to="/home">
                    Página Inicial
                </Link>
            </li>
            <li>
                {/* Exemplo de outro link. Ajuste conforme necessário. */}
                <Link to="/profile">
                    Meu Perfil (Exemplo)
                </Link>
            </li>
            
            <div className="divider"></div> 
            
            {/* Botão de Sair/Deslogar */}
            <li>
                <SignOutButton />
            </li>
        </ul>
    );
}