package com.sessionManagement.sessionManagement.controllers;

import com.sessionManagement.sessionManagement.JWT.AuthTokenFilter;
import com.sessionManagement.sessionManagement.JWT.JWTUtils;
import com.sessionManagement.sessionManagement.Payload.EntityInfo.AdminUserInfoResponse;
import com.sessionManagement.sessionManagement.documents.*;
import com.sessionManagement.sessionManagement.repo.AdminRepo;
import com.sessionManagement.sessionManagement.repo.OperatorRepo;
import com.sessionManagement.sessionManagement.repo.ParkingRepo;
import com.sessionManagement.sessionManagement.repo.RoleRepo;
import com.sessionManagement.sessionManagement.services.UserDetails.UserDetailsService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
@RequestMapping("api/admin")
@CrossOrigin( origins = "http://localhost:5173/")
/* api/admin/addParking
addOperator
currentAdmin
forAdmin
*/
@PreAuthorize("hasRole('ADMIN')")
public class AdminController
{
    @Autowired
    private JWTUtils JWTUtils;

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private OperatorRepo operatorRepo;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    ParkingRepo parkingRepo;

    @PostMapping("/addParking")
    public ResponseEntity<?> addParking(@Valid @RequestBody Parking parking) {
        if (parkingRepo.existsById(parking.getParkingId()) ||
                parkingRepo.existsByTitle(parking.getTitle())
        ) {
            return ResponseEntity.badRequest().body("Parking with provided Name or/and Parking ID already exists");
        }
        Map<String, String> errors = getErrorsParking(parking);

        if (!errors.isEmpty())
            return ResponseEntity.badRequest().body(errors);
        return ResponseEntity.ok(parkingRepo.save(parking));
    }

    private static Map<String, String> getErrorsParking(Parking parking) {
        Map<String, String> errors = new HashMap<>();
        if (parking.getParkingId() == null || parking.getParkingId().isEmpty())
            errors.put("parkingId", "Parking ID is required");
        if (parking.getTitle() == null || parking.getTitle().isEmpty())
            errors.put("title", "Title is required");
        if (parking.getAddress() == null || parking.getAddress().isEmpty())
            errors.put("address", "Address is required");
        if (parking.getCostingType() == null || parking.getCostingType().isEmpty())
            errors.put("address", "Address is required");
        return errors;
    }

    @PostMapping("/addOperator")
    public ResponseEntity<?> addOperator(@Valid @RequestBody Operators operator) {
        if (
                operatorRepo.existsByOperatorId(operator.getOperatorId()) ||
                        operatorRepo.existsByPhoneNo(operator.getPhoneNo())
        ) {
            return ResponseEntity.badRequest().body("Operator already exists");
        }
        if (!parkingRepo.existsById(operator.getParkingId())) {
            return ResponseEntity.badRequest().body("No such parking with parking ID exists, first create the parking");
        }
        Set<Role> roles = new HashSet<>();
        Role adminRole = roleRepo.findByName(ERole.ROLE_OPERATOR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
        roles.add(adminRole);
        operator.setRoles(roles);
        operator.setPassword(encoder.encode(operator.getPassword()));
        return ResponseEntity.ok(operatorRepo.save(operator));
    }

    @GetMapping("/forAdmin")
    public String forAdminTest() {
        return "You have access(Admin's)";
    }

    @GetMapping("/currentAdmin")
    public ResponseEntity<?> getCurrentAdmin
            (HttpServletRequest request)
            throws UsernameNotFoundException
    {
        String jwt = parseJwt(request);
//        System.out.println("jwt in current admin: " + jwt);
        String username;
        if( jwt == null )
        {
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token not found in cookies");
        }

        if (JWTUtils.validateJwtToken(jwt))
            username = JWTUtils.getUserNameFromJwtToken(jwt);
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token not found in cookies");
        if( username == null || username == "" )
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Cannot get username");
        }
//        Cookie[] cookies = request.getCookies();
//        String jwtToken = null;
//        System.out.println(Arrays.toString(cookies));

        Optional<Admin> adminOptional = adminRepo.findByUsername(username);

        if (adminOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found");
        }

        Admin admin = adminOptional.get();
        Set<Role> rolesAdmin = admin.getRoles();
        List<String> roles = rolesAdmin.stream()
                .map(role -> role.getName().name())
                .toList();

        AdminUserInfoResponse adminResponse = new AdminUserInfoResponse();
        adminResponse.setId(admin.getAdminId());
        adminResponse.setUsername(admin.getUsername());
        adminResponse.setRoles(roles);
        return ResponseEntity.ok(adminResponse);

    }

    private String parseJwt (HttpServletRequest request)
    {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer "))
        {
            return headerAuth.substring(7);
        }

        return null;
    }
}
