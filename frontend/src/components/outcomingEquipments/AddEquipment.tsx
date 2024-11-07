import React, { useState } from 'react';

const services = [
  "Conseillers Techniques",
  "Audit Interne",
  "Contrôle Permanent",
  "Division des Affaires Juridiques et du Contentieux",
  "Division du Système d'Information",
  "Chargés d'Études",
  "Cellule de la Communication, des Relations Publiques et du Protocole",
  "Cellule de la Traduction et de l'Interprétariat",
  "Service de l'Accueil, du Courrier et de Liaison",
  "Service des Archives et de la Documentation",
  "Secrétariat Particulier",
  "Secrétariat du Président du Conseil d'Administration",
  "Direction du Suivi, des Études et de la Statistique Pétrolière",
  "Direction Financière, Comptable et du Recouvrement",
  "Direction des Ressources Humaines et des Moyens Généraux"
];

const AddEquipmentForm = ({ equipmentId, onClose, onOutgoingEquipment }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [dateOfExit, setDateOfExit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onOutgoingEquipment(equipmentId, employeeName, departmentName, dateOfExit); 
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enregistrer l'équipement sortant</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nom de l'employé</label>
            <input 
              type="text" 
              className="w-full p-2 border" 
              value={employeeName} 
              onChange={(e) => setEmployeeName(e.target.value)} 
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nom du service</label>
            <select 
              className="w-full p-2 border"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            >
              <option value="" disabled>Sélectionnez un service</option>
              {services.map((service, index) => (
                <option key={index} value={service}>{service}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date de sortie</label>
            <input 
              type="date" 
              className="w-full p-2 border" 
              value={dateOfExit} 
              onChange={(e) => setDateOfExit(e.target.value)} 
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Enregistrer</button>
            <button type="button" onClick={onClose} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEquipmentForm;
