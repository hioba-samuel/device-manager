package com.projet.gestionEquipements.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document(collection = "equipments")
@Data
public class Equipment {
    @Id
    private String id;
    private String serialNumber;
    private String model;
    private String type;
    private String status;  // 'available', 'outgoing', 'defective'

    // Information sur l'équipement sortant
    private String employeeName;
    private String departmentName;
    private String dateOfExit;

    // Information sur l'équipement défectueux
    private String issueDescription;
    private String dateOfSignal;

    // Information sur l'équipement entrant
    private String dateOfEntry;


    // je viens d'ajouter mdrrr
    public void setStatus(String status) {
        this.status = status;
    }
    public String getStatus() {
        return this.status;
    }
    // Assurez-vous que cette méthode existe
    public void setDateOfEntry(String dateOfEntry) {
        this.dateOfEntry = dateOfEntry;
    }

    // Si besoin, ajoutez aussi un getter
    public String getDateOfEntry() {
        return this.dateOfEntry;
    }
    // Assurez-vous que cette méthode est bien présente
    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    // Vous pouvez aussi ajouter un getter si besoin
    public String getEmployeeName() {
        return this.employeeName;
    }
    // Assurez-vous que cette méthode est bien présente
    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    // Vous pouvez aussi ajouter un getter si nécessaire
    public String getDepartmentName() {
        return this.departmentName;
    }
    // Assurez-vous que cette méthode est bien présente
    public void setDateOfExit(String dateOfExit) {
        this.dateOfExit = dateOfExit;
    }

    // Vous pouvez aussi ajouter un getter si nécessaire
    public String getDateOfExit() {
        return this.dateOfExit;
    }
    // Assurez-vous que cette méthode est bien présente
    public void setIssueDescription(String issueDescription) {
        this.issueDescription = issueDescription;
    }

    // Vous pouvez aussi ajouter un getter si besoin
    public String getIssueDescription() {
        return this.issueDescription;
    }
    // Ajoutez cette méthode si elle est manquante
    public void setDateOfSignal(String dateOfSignal) {
        this.dateOfSignal = dateOfSignal;
    }

    // Vous pouvez également ajouter un getter si nécessaire
    public String getDateOfSignal() {
        return this.dateOfSignal;
    }
    // Ajoutez cette méthode si elle est manquante
    public String getType() {
        return this.type;
    }

    // Vous pouvez également ajouter un setter si besoin
    public void setType(String type) {
        this.type = type;
    }










































}






