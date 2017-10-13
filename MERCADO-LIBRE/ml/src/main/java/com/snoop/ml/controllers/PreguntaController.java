package com.snoop.ml.controllers;
/*
post question: http://localhost:8080/question/ask/{id-item}
peticion tipo post y colocar en el body el json con formato question ml
example body:  {
       "text":"Test question api.",
       "item_id":"MLA{id-item}"
       }
get received question: http://localhost:8080/question/view/received
 */
import com.snoop.ml.service.IPreguntaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/question")
public class PreguntaController {

    @Autowired
    IPreguntaService iPreguntaService;

    @RequestMapping(value = "/ask/{code}", method = RequestMethod.POST)
    public String pusblishQuestion(@PathVariable Long code, @RequestBody String bodyQuestion) {
        return iPreguntaService.makeQuestion(code, bodyQuestion);
    }

    @RequestMapping(value = "/view/received", method = RequestMethod.GET)
    public String receivedQuestions() {
        return iPreguntaService.viewAllQuestion();
    }
}

