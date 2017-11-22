package com.api.Zanella.controller;

import com.api.Zanella.entities.MotoTitular;
import com.api.Zanella.service.MotoTitularService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class MotoTitularController {

    @Autowired
    MotoTitularService motoTitularService;

    @CrossOrigin()  
    @RequestMapping(value = "/rest/motorcycle/{numChassis}/{numEngine}", method = RequestMethod.GET)
    public MotoTitular getMotorcycleByChasAndEng(@PathVariable String numChassis, @PathVariable String numEngine){
        return motoTitularService.getMotoTiularByNumChassisAndNumEngine(numChassis, numEngine);
    }
}
