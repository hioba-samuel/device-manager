import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white fixed w-full top-0 flex justify-between">
      <h1 className="text-2xl font-semibold">Gestion des équipements</h1> {/* Augmenté la taille du titre */}
      <div className="flex space-x-4">
        <Link href="/" className="text-lg hover:underline"> {/* Augmenté la taille des liens */}
          Accueil
        </Link>
        <Link href="/logout" className="text-lg hover:underline"> {/* Augmenté la taille des liens */}
          Déconnexion
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
