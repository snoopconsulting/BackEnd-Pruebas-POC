package com.snoop.ml.controllers;
/*
post: http://localhost:8080/producto/publish
peticion tipo post y colocar en el body el json con formato item ml

get item: http://localhost:8080/producto/{idItem}
*/
import com.snoop.ml.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/producto")
class ProductoController {

    @Autowired
    IProductoService productoService;

    @RequestMapping(value = "/{code}", method = RequestMethod.GET)
    public String getProducto(@PathVariable Long code) {
        return productoService.getProductoByCode(code);
    }

    @RequestMapping(value = "/publish/", method = RequestMethod.POST)
    public void pusblisItem(@RequestBody String itemRequest) {
        productoService.postItem(itemRequest);
    }
}


