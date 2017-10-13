package com.snoop.ml.service;

public interface IProductoService {

    String getProductoByCode(Long code);

    Boolean postItem(String item);

}
