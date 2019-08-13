package com.dit.ebay.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {

    // Forward everything to front end except from ./<whatever>
    @RequestMapping(value = {"/welcome", "/home", "/", "/signup", "/login", "/users", "/users/**", "/applications", "/applications/**","/profile/**"}, method = RequestMethod.GET )
    public String index() {
        return "index";
    }
}