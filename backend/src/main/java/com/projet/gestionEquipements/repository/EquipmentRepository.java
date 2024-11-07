package com.projet.gestionEquipements.repository;

import com.projet.gestionEquipements.model.Equipment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends MongoRepository<Equipment, String> {
    long countByStatus(String status);

    // Méthode pour obtenir les équipements les plus demandés
    List<Equipment> findTopByOrderByEmployeeNameDesc();


}
