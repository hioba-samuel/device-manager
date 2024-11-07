package com.projet.gestionEquipements.service;

import com.projet.gestionEquipements.model.Equipment;
import com.projet.gestionEquipements.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    // Obtenir tous les équipements
    public List<Equipment> getAllEquipments() {
        return equipmentRepository.findAll();
    }

    // Ajouter un équipement entrant
    public Equipment addEquipment(Equipment equipment) {
        equipment.setStatus("available"); // Statut initial
        equipment.setDateOfEntry(java.time.LocalDate.now().toString());
        return equipmentRepository.save(equipment);
    }

    // Enregistrer un équipement comme sortant avec date de sortie
    public Optional<Equipment> markAsOutgoing(String id, String employeeName, String departmentName, String dateOfExit) {
        Optional<Equipment> equipmentOpt = equipmentRepository.findById(id);
        if (equipmentOpt.isPresent()) {
            Equipment equipment = equipmentOpt.get();
            equipment.setStatus("outgoing");
            equipment.setEmployeeName(employeeName);
            equipment.setDepartmentName(departmentName);
            equipment.setDateOfExit(dateOfExit);
            equipmentRepository.save(equipment);
            return Optional.of(equipment);
        }
        return Optional.empty();
    }


    // Enregistrer un équipement comme défectueux
    public Optional<Equipment> markAsDefective(String id, String issueDescription) {
        Optional<Equipment> equipmentOpt = equipmentRepository.findById(id);
        if (equipmentOpt.isPresent()) {
            Equipment equipment = equipmentOpt.get();
            equipment.setStatus("defective");
            equipment.setIssueDescription(issueDescription);
            equipment.setDateOfSignal(java.time.LocalDate.now().toString());
            equipmentRepository.save(equipment);
            return Optional.of(equipment);
        }
        return Optional.empty();
    }

    public List<Equipment> getAvailableEquipments() {
        return equipmentRepository.findAll().stream()
                .filter(equipment -> "available".equals(equipment.getStatus()))
                .collect(Collectors.toList());
    }

    public List<Equipment> getOutgoingEquipments() {
        return equipmentRepository.findAll().stream()
                .filter(equipment -> "outgoing".equals(equipment.getStatus()))
                .collect(Collectors.toList());
    }

    public List<Equipment> getDefectiveEquipments() {
        return equipmentRepository.findAll().stream()
                .filter(equipment -> "defective".equals(equipment.getStatus()))
                .collect(Collectors.toList());
    }

    // Supprimer un équipement
    public void deleteEquipment(String id) {
        equipmentRepository.deleteById(id);
    }

    public Map<String, Long> getEquipmentStatistics() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", equipmentRepository.count());
        stats.put("available", equipmentRepository.countByStatus("available"));
        stats.put("outgoing", equipmentRepository.countByStatus("outgoing"));
        stats.put("defective", equipmentRepository.countByStatus("defective"));
        return stats;
    }

    // Obtenir les appareils les plus demandés
    public List<Map.Entry<String, Long>> getMostRequestedDevices() {
        List<Equipment> outgoingEquipments = getOutgoingEquipments();

        return outgoingEquipments.stream()
                .collect(Collectors.groupingBy(Equipment::getType, Collectors.counting()))
                .entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder())) // Trie par nombre décroissant
                .collect(Collectors.toList());
    }

    // Méthode pour obtenir le classement des services utilisant le plus de matériel
    public List<Map.Entry<String, Long>> getTopServices() {
        List<Equipment> outgoingEquipments = getOutgoingEquipments();

        return outgoingEquipments.stream()
                .collect(Collectors.groupingBy(Equipment::getDepartmentName, Collectors.counting()))
                .entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder())) // Trie par nombre décroissant
                .collect(Collectors.toList());
    }


}
