package com.api.Zanella.repository;

import org.springframework.data.repository.CrudRepository;
import com.api.Zanella.entities.MotoTitular;

public interface MotoTitularRepository extends CrudRepository<MotoTitular, Long> {

    MotoTitular findByNumChassisAndNumEngine(String  numChassis, String numEngine);
}
