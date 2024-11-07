import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar';
import EquipmentTable from '@/components/EquipmentTable';
import SearchBar from '@/components/SearchBar'; // Assurez-vous que ce composant est disponible
import { FaPlus, FaFileDownload } from 'react-icons/fa'; 
import jsPDF from 'jspdf'; // Importer jsPDF
import 'jspdf-autotable'; // Importer l'extension autotable pour jsPDF

const Outgoing = () => {
  const [equipments, setEquipments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // État pour afficher/cacher le formulaire
  const [searchTerm, setSearchTerm] = useState(''); // État pour la recherche

  useEffect(() => {
    // Récupérer tous les équipements depuis l'API
    axios.get('http://localhost:8080/api/equipments/outgoing')
      .then(response => {
        setEquipments(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des équipements :", error);
      });
  }, []);

  const handleDownload = () => {
    const doc = new jsPDF();
    const tableColumn = ["Numéro de série", "Type", "Modèle","Sortie", "Nom Employé","Nom Service"];
    const tableRows = equipments.map(equipment => [
      equipment.serialNumber,
      equipment.type,
      equipment.model,
      equipment.dateOfExit,
      equipment.employeeName,
      equipment.departmentName,
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Liste des équipements sortants", 14, 15);
    doc.save("outgoing_equipments.pdf"); // Nom du fichier
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="flex-1 ml-64"> 
          <div className="p-16">
            <h2 className="text-2xl font-semibold mb-9">Equipements Sortants</h2>

            {/* Composant de recherche */}
            <div className="flex justify-center mb-4">
              <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            </div>

            <div className="flex items-center justify-between mb-4">
              {/* Bouton de téléchargement */}
              <button 
                onClick={handleDownload} 
                className="bg-blue-500 text-white px-4 py-2 flex items-center ml-auto"
              >
                <FaFileDownload className="mr-2" /> Télécharger (PDF)
              </button>
            </div>

            <div className="p-6">
              {/* Filtrer les équipements en fonction de la recherche */}
              <EquipmentTable 
                equipments={equipments.filter(equipment => 
                  equipment.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  equipment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  equipment.model.toLowerCase().includes(searchTerm.toLowerCase())
                )} 
                pageType="outgoing" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outgoing;
