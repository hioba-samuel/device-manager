import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-700 text-white fixed top-14"> {/* top-16 correspond à la hauteur du navbar */}
      <nav className="mt-10">
        <ul>
        
          <li className="mb-4">
            <Link href="/outgoing" className="block p-4 text-lg">Équipements Sortants</Link>
          </li>
          <li className="mb-4">
            <Link href="/defective" className="block p-4 text-lg">Équipements Défectueux</Link>
          </li>
          <li className="mb-4">
            <Link href="/available" className="block p-4 text-lg">Équipements Disponibles</Link>
          </li>
          <li className="mb-4">
            <Link href="/statistique" className="block p-4 text-lg">Statistique</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
