package com.sessionManagement.sessionManagement.controllers;

import com.sessionManagement.sessionManagement.documents.Attendant;
import com.sessionManagement.sessionManagement.services.AttendantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/attendant")
@PreAuthorize("hasRole('ATTENDANT')")
public class AttendantController
{
    @Autowired
    private AttendantService attendantService;

    @GetMapping("/forAttendant")
    public  String forAttendantTest()
    {
        return "You have access(Attendant's)";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("registerAttendant")
    public String addAttendant(@RequestBody Attendant attendant)
    {
        return attendantService.registerAttendant(attendant);
    }
}

