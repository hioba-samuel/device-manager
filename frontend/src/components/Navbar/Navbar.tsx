import { useRouter } from 'next/router';

const Navbar = () => {

  const router = useRouter();


  const handleHomeClick = () => {
    router.push('/'); // Redirige vers la page d'accueil
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticated'); // Supprimer l'état de connexion
    router.push('/LoginPage'); // Redirection vers la page de connexion
  }; // Redirection vers la page de connexion


    return (
    <nav className="bg-blue-600 p-4 text-white fixed w-full top-0 flex justify-between">
      <h1 className="text-2xl font-semibold">Gestion des équipements</h1> {/* Augmenté la taille du titre */}
      <div className="flex space-x-4">

      <button
        onClick={handleHomeClick}
        className="text-lg hover:underline"
      >
        Accueil
      </button>

        <button onClick={handleLogout} className="text-lg hover:underline">
        Déconnexion
      </button>

      </div>
    </nav>
  );
};

export default Navbar;
