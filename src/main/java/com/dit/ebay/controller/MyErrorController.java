package com.dit.ebay.controller;

import com.dit.ebay.exception.BadRequestException;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/*
@RestController
public class MyErrorController implements ErrorController {

    @RequestMapping("/error")
    public BadRequestException handleError() {
        //do something like logging
        return new BadRequestException("Sorry, not valid requested url path.");
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}
*/