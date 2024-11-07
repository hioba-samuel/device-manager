import { useState } from 'react';
import axios from 'axios';

const DefectiveEquipmentForm = ({ equipmentId, onClose }) => {
  const [issueDescription, setIssueDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/equipments/defective/${equipmentId}`, null, {
      params: { issueDescription }
    })
    .then(() => {
      alert('Équipement enregistré comme défectueux');
      onClose();  // Fermer le formulaire après soumission
    })
    .catch(error => {
      console.error('Erreur lors de la soumission:', error);
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 shadow-lg rounded w-80">
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" 
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Enregistrer un équipement défectueux</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Description du problème</label>
            <input
              type="text"
              className="border w-full p-2"
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-red-500 text-white px-4 py-2">Enregistrer</button>
          <button type="button" className="ml-2 bg-gray-500 text-white px-4 py-2" onClick={onClose}>Annuler</button>
        </form>
      </div>
    </div>
  );
};

export default DefectiveEquipmentForm;
