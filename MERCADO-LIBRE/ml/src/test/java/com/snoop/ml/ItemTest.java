package com.snoop.ml;

import com.snoop.ml.service.IProductoService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ItemTest {

    @Autowired
    private IProductoService productoService;
    @Value("${mercadolibre.question.codeItem}")
    private Long idItem;

    @Test
    public  void getItem_returnItem(){
        assertNotNull(productoService.getProductoByCode(idItem));
    }

    @Test
    public  void publishItem(){
       String item ="{\n" +
               "\"title\":\"items de prueba TEST no ofertar\",\n" +
               "\"category_id\":\"MLA352543\",\n" +
               "\"price\":111,\n" +
               "\"currency_id\":\"ARS\",\n" +
               "\"available_quantity\":1,\n" +
               "\"buying_mode\":\"buy_it_now\",\n" +
               "\"listing_type_id\":\"bronze\",\n" +
               "\"condition\":\"new\",\n" +
               "\"description\": \"Item:, no ofertar, es un test\",\n" +
               "\"video_id\": \"xxxxx\",\n" +
               "\"warranty\": \"1xxxx\",\n" +
               "}";
       assertEquals(true,productoService.postItem(item));
    }


}
