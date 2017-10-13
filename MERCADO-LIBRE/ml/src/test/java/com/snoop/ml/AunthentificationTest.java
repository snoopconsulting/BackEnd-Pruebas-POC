package com.snoop.ml;

import com.snoop.ml.service.IAuthenticationService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AunthentificationTest {

    @Autowired
    private IAuthenticationService iAuthenticationService;

    @Test
    public void authentication_getToken(){
       assertNotNull(iAuthenticationService.getNewToken());
    }

}
