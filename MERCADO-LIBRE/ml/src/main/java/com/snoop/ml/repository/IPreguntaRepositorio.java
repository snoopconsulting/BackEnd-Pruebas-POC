package com.snoop.ml.repository;

public interface IPreguntaRepositorio {

    String askQuestion(Long codeItem, String question);

    String viewReceivedQuestion();
}
