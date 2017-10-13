package com.snoop.ml.repository.impl;

import com.mercadolibre.sdk.Meli;
import com.mercadolibre.sdk.MeliException;
import com.ning.http.client.FluentStringsMap;
import com.ning.http.client.Response;
import com.snoop.ml.repository.IPreguntaRepositorio;
import com.snoop.ml.service.IAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.IOException;

@Repository
public class PreguntaRepositorioImpl implements IPreguntaRepositorio {

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
    public String askQuestion(Long codeItem, String questionBody) {
        Response r = null;
        m = new Meli(clientId, clientSecret, null, refreshToken);
        String newToken = iAuthenticationService.getNewToken();
        FluentStringsMap params = new FluentStringsMap();
        params.add("access_token", newToken);
        try {
            r = m.post("/questions/MLA" + codeItem, params, questionBody);
            System.out.println("ResponseSuccessPublishQuestion: " + r.getResponseBody());
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
    public String viewReceivedQuestion() {
        Response r = null;
        m = new Meli(clientId, clientSecret, null, refreshToken);
        String newToken = iAuthenticationService.getNewToken();
        FluentStringsMap params = new FluentStringsMap();
        params.add("access_token", newToken);
        try {
            r = m.get("/my/received_questions/search", params);
            System.out.println("ResponseSuccessViewAllQuestion: " + r.getResponseBody());
            return r.getResponseBody();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        } catch (MeliException e) {
            e.printStackTrace();
            return null;
        }
    }
}
