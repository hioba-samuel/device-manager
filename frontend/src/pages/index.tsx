import EquipmentTable from '@/components/EquipmentTable';
import AddEquipmentForm from '@/components/incomingEquipments/AddEquipmentForm';
import Navbar from '@/components/Navbar/Navbar';
import SearchBar from '@/components/SearchBar'; // Importer le composant de recherche
import Sidebar from '@/components/Sidebar';
import axios from 'axios';
import jsPDF from 'jspdf'; // Importer jsPDF
import 'jspdf-autotable'; // Importer l'extension autotable pour jsPDF
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaFileDownload, FaPlus } from 'react-icons/fa';

const HomePage = () => {
  const router = useRouter();
  const [equipments, setEquipments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(''); // État pour la recherche
  

  useEffect(() => {
    
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/LoginPage'); // Redirection vers la page de connexion
    }





    // Récupérer tous les équipements depuis l'API
    axios.get('http://localhost:8080/api/equipments')
      .then(response => {
        setEquipments(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des équipements :", error);
      });
  }, [router]);

  const handleAddEquipment = (newEquipment) => {
    axios.post('http://localhost:8080/api/equipments/add', newEquipment)
      .then(response => {
        setEquipments([...equipments, response.data]);
        setShowAddForm(false);
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout de l'équipement :", error);
      });
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    const tableColumn = ["Numéro de série", "Type", "Modèle","Statut"];
    const tableRows = equipments.map(equipment => [
      equipment.serialNumber,
      equipment.type,
      equipment.model,
      equipment.status,

    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Liste des équipements", 14, 15);
    doc.save("equipments.pdf"); // Nom du fichier
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="flex-1 ml-64"> 
          <div className="p-16">
            <h2 className="text-2xl font-semibold mb-9">Tous les équipements</h2>

            {/* Composant de recherche */}
            <div className="flex justify-center mb-4">
              <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            </div>

            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-500 text-white px-4 py-2 flex items-center"
              >
                <FaPlus className="mr-2" /> Ajouter un équipement
              </button>
              
              {/* Bouton de téléchargement aligné à droite */}
              <button 
                onClick={handleDownload} 
                className="bg-blue-500 text-white px-4 py-2 flex items-center ml-auto"
              >
                <FaFileDownload className="mr-2" /> Télécharger (PDF)
              </button>
            </div>

            {showAddForm && (
              <AddEquipmentForm onAdd={handleAddEquipment} onCancel={() => setShowAddForm(false)} />
            )}

            {/* Filtrer les équipements en fonction de la recherche */}
            <EquipmentTable equipments={equipments.filter(equipment => 
              equipment.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
              equipment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
              equipment.model.toLowerCase().includes(searchTerm.toLowerCase())
            )} pageType="available" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
