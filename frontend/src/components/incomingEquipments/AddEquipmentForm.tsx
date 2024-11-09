import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Importer l'icône de fermeture

const AddEquipmentForm = ({ onAdd, onCancel }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [model, setModel] = useState('');
  const [type, setType] = useState('');
  const [dateOfEntry, setDateOfEntry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEquipment = {
      serialNumber,
      model,
      status: 'disponible', // Statut par défaut
      type,
      dateOfEntry,
    };
    onAdd(newEquipment);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"> {/* Overlay pour la modal */}
      <div className="bg-white p-4 border rounded shadow-md w-80 relative"> {/* Taille réduite */}
        <FaTimes
          className="absolute top-2 right-2 cursor-pointer text-red-500"
          onClick={onCancel}
        />
        <h3 className="text-lg font-semibold mb-4 text-center">Ajouter un Équipement</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Numéro de Série</label>
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Modèle</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Date d'Entrée</label>
            <input
              type="date"
              value={dateOfEntry}
              onChange={(e) => setDateOfEntry(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default AddEquipmentForm;
