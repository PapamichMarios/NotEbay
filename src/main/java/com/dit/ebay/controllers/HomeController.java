package com.dit.ebay.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(value = { "/", "/welcome"} )
    public String welcome() {
        return "index";
    }
}
