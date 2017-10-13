package com.snoop.ml.service.impl;

import com.snoop.ml.repository.IPreguntaRepositorio;
import com.snoop.ml.service.IPreguntaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PreguntaServiceImpl implements IPreguntaService {

    @Autowired
    IPreguntaRepositorio iPreguntaRepositorio;

    @Override
    public String makeQuestion(Long codeItem, String question) {
        return iPreguntaRepositorio.askQuestion(codeItem, question);
    }

    @Override
    public String viewAllQuestion() {
        return iPreguntaRepositorio.viewReceivedQuestion();
    }
}
