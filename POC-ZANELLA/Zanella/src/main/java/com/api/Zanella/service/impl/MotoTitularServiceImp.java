package com.api.Zanella.service.impl;

import com.api.Zanella.entities.MotoTitular;
import com.api.Zanella.repository.MotoTitularRepository;
import com.api.Zanella.service.MotoTitularService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MotoTitularServiceImp implements MotoTitularService {

    @Autowired
    MotoTitularRepository motoTitularRepository;

    @Override
    public MotoTitular getMotoTiularByNumChassisAndNumEngine(String numChassis, String numEngine) {
        return motoTitularRepository.findByNumChassisAndNumEngine(numChassis, numEngine);
    }
}
