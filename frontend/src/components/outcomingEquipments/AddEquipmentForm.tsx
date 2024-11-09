import { useState } from 'react';
import axios from 'axios';

const AddEquipmentForm = ({ equipmentId, onClose }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [departmentName, setDepartmentName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/equipments/outgoing/${equipmentId}`, {
      employeeName,
      departmentName
    })
    .then(() => {
      alert('Équipement enregistré comme sortant');
      onClose();  // Fermer le formulaire après soumission
    })
    .catch(error => {
      console.error('Erreur lors de la soumission:', error);
    });
  };

  return (
    <form className="bg-white p-4 shadow-md rounded" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Enregistrer un équipement sortant</h2>
      <div className="mb-4">
        <label className="block mb-2">Nom de l'employé</label>
        <input
          type="text"
          className="border w-full p-2"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Nom du service</label>
        <input
          type="text"
          className="border w-full p-2"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Enregistrer</button>
      <button type="button" className="ml-2 bg-gray-500 text-white px-4 py-2" onClick={onClose}>Annuler</button>
    </form>
  );
};

export default AddEquipmentForm;
