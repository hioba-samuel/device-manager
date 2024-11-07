/*
// src/main/java/com/projet/gestionEquipements/service/DatabaseInitializer.java

package com.projet.gestionEquipements;

import com.projet.gestionEquipements.model.User;
import com.projet.gestionEquipements.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Vérifier si l'utilisateur existe déjà
        if (!userRepository.existsByUsername("testuser")) {
            User user = new User();
            user.setUsername("testuser");
            user.setPassword(passwordEncoder.encode("password"));
            userRepository.save(user);
        }
    }
}
*/
