package com.snoop.ml.service.impl;

import com.snoop.ml.repository.IProductoRepositorio;
import com.snoop.ml.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductoServiceImpl implements IProductoService{

    @Autowired
    IProductoRepositorio productoRepositorio;

    @Override
    public String getProductoByCode(Long code) {
        return productoRepositorio.findProductByCode(code);
    }

    @Override
    public Boolean postItem(String item) {
        return productoRepositorio.postProducto(item);
    }

}
