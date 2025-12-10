import { useAuthState } from '~/components/contexts/UserContext';

export const Header = () => {
    const { state } = useAuthState();
    
    const isSignedIn = state.state === 'SIGNED_IN';
    
    const kanjiElement = isSignedIn ? (
        <label 
            htmlFor="my-drawer"
            className="text-4xl font-black text-cyan-300 cursor-pointer hover:text-cyan-100 transition-colors drawer-button"
        >
            水  MENU
        </label>
    ) : (
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