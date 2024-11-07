package com.projet.gestionEquipements.controller;

import com.projet.gestionEquipements.model.Equipment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.projet.gestionEquipements.service.EquipmentService;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/equipments")
public class EquipmentController {

    @Autowired
    private EquipmentService equipmentService;

    // Obtenir tous les équipements
    @GetMapping
    public List<Equipment> getAllEquipments() {
        return equipmentService.getAllEquipments();
    }

    // Ajouter un équipement entrant
    @PostMapping("/add")
    public Equipment addEquipment(@RequestBody Equipment equipment) {
        return equipmentService.addEquipment(equipment);
    }

    // Enregistrer un équipement comme sortant
    @PutMapping("/outgoing/{id}")
    public Optional<Equipment> markAsOutgoing(@PathVariable String id, @RequestParam String employeeName, @RequestParam String departmentName, @RequestParam String dateOfExit) {
        return equipmentService.markAsOutgoing(id, employeeName, departmentName, dateOfExit);
    }

    // Obtenir les équipements de statut 'available'
    @GetMapping("/available")
    public List<Equipment> getAvailableEquipments() {
        return equipmentService.getAvailableEquipments();
    }

    // Enregistrer un équipement comme défectueux
    @PutMapping("/defective/{id}")
    public Optional<Equipment> markAsDefective(@PathVariable String id, @RequestParam String issueDescription) {
        return equipmentService.markAsDefective(id, issueDescription);
    }


    // Obtenir les équipements de statut 'outgoing'
    @GetMapping("/outgoing")
    public List<Equipment> getOutgoingEquipments() {
        return equipmentService.getOutgoingEquipments();
    }

    // Obtenir les équipements de statut 'defective'
    @GetMapping("/defective")
    public List<Equipment> getDefectiveEquipments() {
        return equipmentService.getDefectiveEquipments();
    }

    // Endpoint pour récupérer les statistiques des équipements
    @GetMapping("/statistics")
    public Map<String, Long> getEquipmentStatistics() {
        return equipmentService.getEquipmentStatistics();
    }

    // Endpoint pour obtenir les appareils les plus demandés (sortants)
    @GetMapping("/most-requested")
    public List<Map.Entry<String, Long>> getMostRequestedDevices() {
        return equipmentService.getMostRequestedDevices();
    }

    @GetMapping("/top-services")
    public List<Map.Entry<String, Long>> getTopServices() {
        return equipmentService.getTopServices();
    }

    // Supprimer un équipement
    @DeleteMapping("/{id}")
    public void deleteEquipment(@PathVariable String id) {
        equipmentService.deleteEquipment(id);
    }
}
