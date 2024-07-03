package com.sessionManagement.sessionManagement.controllers;

import com.sessionManagement.sessionManagement.JWT.JWTUtils;
import com.sessionManagement.sessionManagement.Payload.LoginRequest;
import com.sessionManagement.sessionManagement.Payload.AdminSignUpRequest;
import com.sessionManagement.sessionManagement.Payload.MessageResponse;
import com.sessionManagement.sessionManagement.Payload.EntityInfo.AdminUserInfoResponse;
import com.sessionManagement.sessionManagement.documents.Admin;
import com.sessionManagement.sessionManagement.documents.ERole;
import com.sessionManagement.sessionManagement.documents.Role;
import com.sessionManagement.sessionManagement.repo.AdminRepo;
import com.sessionManagement.sessionManagement.repo.RoleRepo;
import com.sessionManagement.sessionManagement.services.UserDetails.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")

/*

1)api/auth/signin (using username and password as JSON payload)
2)adminsignup (using JSON payload, use role as:)
 "roles" : ["admin"]

*/
public class AuthController
{
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    AdminRepo adminRepo;

    @Autowired
    RoleRepo roleRepo;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JWTUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateAdmin(@Valid @RequestBody LoginRequest loginRequest)
    {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new AdminUserInfoResponse(userDetails.getId(),
                                                userDetails.getUsername(),
                                                roles));

    }

    @PostMapping("adminsignup")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody AdminSignUpRequest signUpRequest)
    {
        if(adminRepo.existsByUsername(signUpRequest.getUsername()))
        {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username already exists"));
        }

//        Creating new Admin
        Admin admin = new Admin(signUpRequest.getUsername(),
                                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if(strRoles == null)
        {
            Role userRole = roleRepo.findByName(ERole.ROLE_USER)
                    .orElseThrow( () -> new RuntimeException("Error: Role is not found") );
            roles.add(userRole);
        }
        else
        {
            strRoles.forEach(role ->
            {
                switch (role)
                {
                    case "admin":
                        Role adminRole = roleRepo.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow( () -> new RuntimeException("Error: Role is not found ("+role+").") );
                        roles.add(adminRole);
                        break;
                    case "operator":
                        Role opRole = roleRepo.findByName(ERole.ROLE_OPERATOR)
                                .orElseThrow( () -> new RuntimeException("Error: Role is not found ("+role+").") );
                        roles.add(opRole);
                        break;
                    case "attendant":
                        Role atRole = roleRepo.findByName(ERole.ROLE_ATTENDANT)
                                .orElseThrow( () -> new RuntimeException("Error: Role is not found ("+role+").") );
                        roles.add(atRole);
                        break;
                    default:
                        Role userRole = roleRepo.findByName(ERole.ROLE_USER)
                                .orElseThrow( () -> new RuntimeException("Error: Role is not found ("+role+").") );
                        roles.add(userRole);
                }
            });
        }

        admin.setRoles(roles);
        adminRepo.save(admin);

        return ResponseEntity.ok(new MessageResponse("Successfully added admin ("+signUpRequest.getUsername()+")."));

    }
}
