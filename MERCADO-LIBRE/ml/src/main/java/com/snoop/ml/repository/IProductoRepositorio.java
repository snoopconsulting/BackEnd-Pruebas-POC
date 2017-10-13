package com.snoop.ml.repository;

public interface IProductoRepositorio {

    String findProductByCode(Long code);

    Boolean postProducto(String item);

}
