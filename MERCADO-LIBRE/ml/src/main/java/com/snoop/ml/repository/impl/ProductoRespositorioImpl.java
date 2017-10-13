package com.snoop.ml.repository.impl;

import com.mercadolibre.sdk.Meli;
import com.mercadolibre.sdk.MeliException;
import com.ning.http.client.FluentStringsMap;
import com.ning.http.client.Response;
import com.snoop.ml.repository.IProductoRepositorio;
import com.snoop.ml.service.IAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.IOException;

@Repository
public class ProductoRespositorioImpl implements IProductoRepositorio {

    @Value("${mercadolibre.secretKey}")
    private String clientSecret;
    @Value("${mercadolibre.id}")
    private Long clientId;
    @Value("${mercadolibre.refreshToken}")
    private String refreshToken;
    private Meli m;

    @Autowired
    private IAuthenticationService iAuthenticationService;

    @Override
    public String findProductByCode(Long code) {
        Response r = null;
        m = new Meli(clientId, clientSecret, null, refreshToken);
        String newToken = iAuthenticationService.getNewToken();
        FluentStringsMap params = new FluentStringsMap();
        params.add("access_token", newToken);
        try {
            r = m.get("/items/MLA" + code, params);
            System.out.println("ItemResponse: " + r.getResponseBody());
            return r.getResponseBody();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        } catch (MeliException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean postProducto(String item) {
        m = new Meli(clientId, clientSecret, null, refreshToken);
        String newToken = iAuthenticationService.getNewToken();
        System.out.println("Token: " + newToken);
        FluentStringsMap params = new FluentStringsMap();
        params.add("access_token", newToken);
        try {
            Response r = m.post("/items", params, item);
            System.out.println("Response: " + r.getStatusText());
            return true;
        } catch (MeliException e) {
            e.printStackTrace();
            return false;
        }

    }

}
