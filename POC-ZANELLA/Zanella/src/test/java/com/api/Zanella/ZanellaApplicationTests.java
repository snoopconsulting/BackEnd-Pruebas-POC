package com.api.Zanella;

import com.api.Zanella.service.MotoTitularService;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ZanellaApplicationTests {

    @Autowired
    MotoTitularService motoTitularService;

	@Test
	public void contextLoads() {
	}

    @Test
	public void getMotorcycleBychassisAndEngine_returnObject(){
      assertNotNull(motoTitularService.getMotoTiularByNumChassisAndNumEngine("mrrtttgg1575733", "cbcee7456878"));//Proporcionar parametros existentes en la db
    }

}
