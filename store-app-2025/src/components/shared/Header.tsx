// src/components/shared/Header.tsx
import { useAuthState } from '~/components/contexts/UserContext';

export const Header = () => {
    const { state } = useAuthState();
    
    // O usuário está logado?
    const isSignedIn = state.state === 'SIGNED_IN';
    
    // Apenas renderiza o label do drawer se o usuário estiver logado.
    const kanjiElement = isSignedIn ? (
        // Se logado, o kanji é um label que abre o drawer.
        <label 
            htmlFor="my-drawer" // ID do input do drawer (ver Router.tsx)
            className="text-4xl font-black text-cyan-300 cursor-pointer hover:text-cyan-100 transition-colors drawer-button"
        >
            水
        </label>
    ) : (
        // Se deslogado, é apenas o logo.
        <span className="text-4xl font-black text-cyan-300">
            水
        </span>
    );
    
    return (
        <nav className="p-4 flex items-center justify-between sticky top-0 z-50 bg-cyan-900 shadow-lg">
            {kanjiElement}
        </nav>
    );
}