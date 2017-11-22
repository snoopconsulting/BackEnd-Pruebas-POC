package com.api.Zanella.service;

import com.api.Zanella.entities.MotoTitular;

public interface MotoTitularService {

    MotoTitular getMotoTiularByNumChassisAndNumEngine(String  numChassis, String numEngine);
}