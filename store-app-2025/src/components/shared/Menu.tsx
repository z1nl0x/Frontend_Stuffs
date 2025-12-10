import { Link } from 'react-router-dom';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { useAuthState } from '~/components/contexts/UserContext';

export const Menu = () => {
    const { state } = useAuthState();

    if (state.state !== 'SIGNED_IN') {
        return null;
    }

    return (
        <ul className="menu p-4 w-3/4 md:w-80 min-h-full bg-base-200 text-base-content">
            <div className="menu-title text-black">
                <span>Bem-vindo(a), {state.currentUser.email}</span>
            </div>
            <div className="divider"></div> 
            <li>
                <Link to="/home">
                    Página Inicial
                </Link>
            </li>
            <li>
                <Link to="/profile">
                    Meu Perfil
                </Link>
            </li>
            <div className="divider"></div> 
            <li>
                <SignOutButton />
            </li>
        </ul>
    );
}