import { useAuth } from "../hooks/useAuthHook";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, logout} = useAuth();
  return (
    // Header avec options de connexion/déconnexion
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Mon Hôtel</Link>
      <nav>
        {isAuthenticated ? (
          <button onClick={logout} className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition-colors">Déconnexion</button>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 rounded">Connexion</Link>
            <Link to="/register" className="px-4 py-2 rounded ml-2">Inscription</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
