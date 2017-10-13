package com.snoop.ml;

import com.snoop.ml.service.IPreguntaService;
import com.snoop.ml.service.IProductoService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;
//En la properties test #QUESTION colocar codeItem existente en ml y en question valores del json body con item_id
@RunWith(SpringRunner.class)
@SpringBootTest
public class PreguntaTest {

    @Autowired
    private IPreguntaService iPreguntaService;

   @Value("${mercadolibre.question.question}")
    private String question;
    @Value("${mercadolibre.question.codeItem}")
    private Long idItem;

    @Test
    public void askQuestion_returnStringResponse() {
        assertNotNull(iPreguntaService.makeQuestion(idItem, question));
    }

    @Test
    public void receivedAllQuestions_returnStringResponse(){
        assertNotNull(iPreguntaService.viewAllQuestion());
    }
}
