package ted.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HomeController {

    // Forward everything to front end except from ./<whatever>
    @RequestMapping(value = {"/welcome", "/sign-in", "/sign-up", "/profile/**"}, method = RequestMethod.GET )
    public String index() {
        return "forward:/index.html";
    }

    // Only for testing
    @GetMapping("/aaa")
    @ResponseBody
    public String aaa() {
        System.out.println("aaaaaaaaaaa invoked");
        return "aaa";
    }
}