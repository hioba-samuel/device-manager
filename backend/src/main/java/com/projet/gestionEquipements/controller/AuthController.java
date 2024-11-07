//package com.projet.gestionEquipements.controller;
//
//import com.projet.gestionEquipements.model.User;
//import com.projet.gestionEquipements.repository.UserRepository;
//import com.projet.gestionEquipements.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import java.security.Principal;
//
//@RestController
//@RequestMapping("/api")
//public class AuthController {
//
//    @Autowired
//    private UserService userService;
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//
//    @PostMapping("/register")
//    public ResponseEntity<User> register(@RequestBody User user) {
//        User newUser = userService.register(user);
//        return ResponseEntity.ok(newUser);
//    }
//    @PostMapping("/create")
//    public ResponseEntity<String> createUser(@AuthenticationPrincipal UserDetails userDetails, @RequestBody User newUser) {
//        if (userDetails != null) { // Vérifie si l'utilisateur est connecté
//            newUser.setPassword(passwordEncoder.encode(newUser.getPassword())); // Encode le mot de passe
//            userRepository.save(newUser);
//            return ResponseEntity.ok("Utilisateur créé avec succès !");
//        }
//        return ResponseEntity.status(403).body("Accès refusé. Vous devez être connecté pour créer un utilisateur.");
//    }
//
///*    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody User loginRequest) {
//        User user = userRepository.findByUsername(loginRequest.getUsername());
//        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
//            // Vous pouvez générer un JWT ou gérer la session ici
//            return ResponseEntity.ok("Connexion réussie");
//        }
//        return ResponseEntity.status(401).body("Nom d'utilisateur ou mot de passe incorrect");
//    }*/
//
//
//}
