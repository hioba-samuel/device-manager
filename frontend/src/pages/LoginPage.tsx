// pages/LoginPage.tsx
import { useRouter } from 'next/router';
import { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Vérifiez les informations d'identification
    if (username === 'DSI' && password === 'HsNoPb@m$ù&²£#^€') {
      localStorage.setItem('authenticated', 'true'); // Sauvegarde de l'état de connexion
      router.push('/'); // Redirection vers la page d'accueil en cas de connexion réussie
    } else {
      alert('Identifiant ou mot de passe incorrect');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

