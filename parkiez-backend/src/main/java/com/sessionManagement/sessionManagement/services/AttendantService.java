package com.sessionManagement.sessionManagement.services;


import com.sessionManagement.sessionManagement.documents.Attendant;
import com.sessionManagement.sessionManagement.repo.AttendantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttendantService
{
    @Autowired
    private AttendantRepo attendantRepo;

    public String registerAttendant(Attendant attendant)
    {
        try
        {
            if(attendantRepo.existsByPhoneNo(attendant.getPhoneNo()))
            {
                return "Attendant already exists : "+attendant.getPhoneNo();
            }
            else
            {
                System.out.println("In else");
                attendantRepo.save(attendant);
                return "registered attendant : "+attendant.getName();
            }
        }
        catch (Exception e)
        {
            return "ERROR registering attendant: "+e.getMessage();
        }
    }

    void initRolesAndAttendant()
    {

    }

}
