import { useAuth } from "~/lib/firebase";

type Props = {};

export const SignOutButton = (props: Props) => {
  const handleClick = () => {
    const auth = useAuth();
    auth.signOut();

    const drawerToggle = document.getElementById('my-drawer') as HTMLInputElement | null;
    if (drawerToggle) {
      drawerToggle.checked = false;
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn btn-neutral"
    >
      Logout
    </button>
  );
};
