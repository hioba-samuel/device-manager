import React, { useState } from 'react';
import AddEquipmentForm from '@/components/outcomingEquipments/AddEquipment';
import DefectiveEquipmentForm from '@/components/defectiveEquipments/AddEquipmentForm';
import axios from 'axios';
import Pagination from "@/components/Pagination";

const EquipmentTable = ({ equipments, pageType }) => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [isOutgoingFormOpen, setIsOutgoingFormOpen] = useState(false);
  const [isDefectiveFormOpen, setIsDefectiveFormOpen] = useState(false);

  // État de pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Ajuster ce nombre pour définir le nombre d'éléments par page

  const handleRowClick = (equipment) => {
    setSelectedEquipment(equipment);
    if (equipment.status === 'available') {
      setIsOutgoingFormOpen(true);
    } else if (equipment.status === 'outgoing') {
      setIsDefectiveFormOpen(true);
    }
  };

  const closeForms = () => {
    setIsOutgoingFormOpen(false);
    setIsDefectiveFormOpen(false);
    setSelectedEquipment(null);
  };

  const handleOutgoingEquipment = (equipmentId, employeeName, departmentName, dateOfExit) => {
    const url = `http://localhost:8080/api/equipments/outgoing/${equipmentId}?employeeName=${employeeName}&departmentName=${departmentName}&dateOfExit=${dateOfExit}`;

    axios.put(url)
      .then(() => {
        alert('Équipement enregistré comme sortant avec succès !');
        // Mettez à jour les équipements si nécessaire.
      })
      .catch(err => {
        console.error("Erreur lors de l'enregistrement de l'équipement :", err);
        alert("Une erreur s'est produite lors de l'enregistrement. Veuillez réessayer.");
      });
  };

  // Fonction pour supprimer un équipement
  const handleDeleteEquipment = (equipmentId) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet équipement ?");
    if (confirmDelete) {
      const url = `http://localhost:8080/api/equipments/${equipmentId}`;
  
      axios.delete(url)
        .then(() => {
          alert('Équipement supprimé avec succès !');
          window.location.reload(); // Recharge la page après suppression
        })
        .catch(err => {
          console.error("Erreur lors de la suppression de l'équipement :", err);
          alert("Une erreur s'est produite lors de la suppression. Veuillez réessayer.");
        });
    }
  };
  

  // Tri et pagination des équipements
  const sortedEquipments = [...equipments].sort((a, b) => new Date(b.dateOfEntry) - new Date(a.dateOfEntry));
  const indexOfLastEquipment = currentPage * itemsPerPage;
  const indexOfFirstEquipment = indexOfLastEquipment - itemsPerPage;
  const currentEquipments = sortedEquipments.slice(indexOfFirstEquipment, indexOfLastEquipment);
  const totalPages = Math.ceil(sortedEquipments.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {pageType === 'available' && (
              <>
                <th className="border px-4 py-2">Date d'Entrée</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Numéro de Série</th>
                <th className="border px-4 py-2">Modèle</th>
                <th className="border px-4 py-2">Statut</th>
                <th className="border px-4 py-2">Actions</th>
              </>
            )}
            {pageType === 'outgoing' && (
              <>
                <th className="border px-4 py-2">Numéro de Série</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Modèle</th>
                <th className="border px-4 py-2">Date de Sortie</th>
                <th className="border px-4 py-2">Nom du Service</th>
                <th className="border px-4 py-2">Nom de l'Employé</th>
                <th className="border px-4 py-2">Actions</th>
              </>
            )}
            {pageType === 'defective' && (
              <>
                <th className="border px-4 py-2">Numéro de Série</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Modèle</th>
                <th className="border px-4 py-2">Date de Signal</th>
                <th className="border px-4 py-2">Problème</th>
                <th className="border px-4 py-2">Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {currentEquipments.map((equipment) => (
            <tr 
              key={equipment.id} 
              onClick={() => handleRowClick(equipment)} 
              className="cursor-pointer hover:bg-gray-100"
            >
              {pageType === 'available' && (
                <>
                  <td className="border px-4 py-2">{equipment.dateOfEntry}</td>
                  <td className="border px-4 py-2">{equipment.type}</td>
                  <td className="border px-4 py-2">{equipment.serialNumber}</td>
                  <td className="border px-4 py-2">{equipment.model}</td>
                  <td className="border px-4 py-2">{equipment.status}</td>
                  <td className="border px-4 py-2">
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteEquipment(equipment.id); }} className="text-red-600">Supprimer</button>
                  </td>
                </>
              )}
              {pageType === 'outgoing' && (
                <>
                  <td className="border px-4 py-2">{equipment.serialNumber}</td>
                  <td className="border px-4 py-2">{equipment.model}</td>
                  <td className="border px-4 py-2">{equipment.type}</td>
                  <td className="border px-4 py-2">{equipment.dateOfExit}</td>
                  <td className="border px-4 py-2">{equipment.departmentName}</td>
                  <td className="border px-4 py-2">{equipment.employeeName}</td>
                  <td className="border px-4 py-2">
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteEquipment(equipment.id); }} className="text-red-600">Supprimer</button>
                  </td>
                </>
              )}
              {pageType === 'defective' && (
                <>
                  <td className="border px-4 py-2">{equipment.serialNumber}</td>
                  <td className="border px-4 py-2">{equipment.model}</td>
                  <td className="border px-4 py-2">{equipment.type}</td>
                  <td className="border px-4 py-2">{equipment.dateOfSignal}</td>
                  <td className="border px-4 py-2">{equipment.issueDescription}</td>
                  <td className="border px-4 py-2">
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteEquipment(equipment.id); }} className="text-red-600">Supprimer</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {isOutgoingFormOpen && selectedEquipment && (
        <AddEquipmentForm 
          equipmentId={selectedEquipment.id} 
          onClose={closeForms} 
          onOutgoingEquipment={handleOutgoingEquipment} 
        />
      )}
      {isDefectiveFormOpen && selectedEquipment && (
        <DefectiveEquipmentForm 
          equipmentId={selectedEquipment.id} 
          onClose={closeForms} 
        />
      )}

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        paginate={paginate} 
      />
    </div>
  );
};

export default EquipmentTable;
