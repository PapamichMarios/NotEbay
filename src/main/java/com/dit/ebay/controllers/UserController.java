package com.dit.ebay.controllers;

import com.dit.ebay.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping(value = "/users")
    public String getEmployees(){
        return "users";
    }

    //@PostMapping(value = "/employees")
    //public User addEmployees(User employee){
    //    return userRepository.save(employee);
    //}
}
