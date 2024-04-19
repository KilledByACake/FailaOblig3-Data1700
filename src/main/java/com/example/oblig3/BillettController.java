package com.example.oblig3;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;

@RestController
public class BillettController {
    private final ArrayList<Billett> alleBilletter = new ArrayList<>();

    @PostMapping("/lagre")
    public void lagreKunde(Billett innBilletter){
        alleBilletter.add(innBilletter);
    }
    @GetMapping("/hentAlle")
    public ArrayList<Billett> hentAlle(){
        return alleBilletter;
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){
        alleBilletter.clear();
    }
}
