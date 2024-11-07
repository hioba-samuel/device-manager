import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar/Navbar';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsPage = () => {
  const [totalEquipments, setTotalEquipments] = useState(0);
  const [availableEquipments, setAvailableEquipments] = useState(0);
  const [outgoingEquipments, setOutgoingEquipments] = useState(0);
  const [defectiveEquipments, setDefectiveEquipments] = useState(0);
  const [mostRequestedDevices, setMostRequestedDevices] = useState([]);
  const [topServices, setTopServices] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('/api/equipments/statistics');
        setTotalEquipments(response.data.total);
        setAvailableEquipments(response.data.available);
        setOutgoingEquipments(response.data.outgoing);
        setDefectiveEquipments(response.data.defective);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
      }
    };

    const fetchMostRequestedDevices = async () => {
      try {
        const response = await axios.get('/api/equipments/most-requested');
        setMostRequestedDevices(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des appareils les plus demandés:', error);
      }
    };

    const fetchTopServices = async () => {
      try {
        const response = await axios.get('/api/equipments/top-services');
        setTopServices(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du classement des services:', error);
      }
    };

    fetchStatistics();
    fetchMostRequestedDevices();
    fetchTopServices();
  }, []);

  const data = {
    labels: ['Disponibles', 'Sortants', 'Défectueux'],
    datasets: [
      {
        label: 'Répartition des Équipements',
        data: [availableEquipments, outgoingEquipments, defectiveEquipments],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Statistiques des Équipements</h1>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-center">Répartition des Statuts des Équipements:</h2>
          <div className="max-w-md mx-auto">
            <Pie data={data} />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-center">Appareils les Plus Demandés:</h2>
          <table className="min-w-full max-w-xs border border-gray-300 mx-auto">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="border border-gray-300 p-1">Appareil</th>
                <th className="border border-gray-300 p-1">Demandés</th>
              </tr>
            </thead>
            <tbody>
              {mostRequestedDevices.map((device, index) => (
                <tr key={index} className="border-b border-gray-300 text-center">
                  <td className="border border-gray-300 p-1">{Object.keys(device)[0]}</td>
                  <td className="border border-gray-300 p-1">{Object.values(device)[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-xl font-bold text-center">Classement des Services:</h2>
          <table className="min-w-full max-w-xs border border-gray-300 mx-auto">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="border border-gray-300 p-1">Service</th>
                <th className="border border-gray-300 p-1">Équipements</th>
              </tr>
            </thead>
            <tbody>
              {topServices.map((service, index) => (
                <tr key={index} className="border-b border-gray-300 text-center">
                  <td className="border border-gray-300 p-1">{Object.keys(service)[0]}</td>
                  <td className="border border-gray-300 p-1">{Object.values(service)[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
