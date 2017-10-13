package com.snoop.ml.repository.impl;

import com.mercadolibre.sdk.Meli;
import com.snoop.ml.repository.IAuthenticationRepositorio;
import com.mercadolibre.sdk.AuthorizationFailure;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository
public class AuthenticationRepositorioImpl implements IAuthenticationRepositorio{

    @Value("${mercadolibre.secretKey}")
    private String clientSecret;
    @Value("${mercadolibre.id}")
    private Long clientId;
    @Value("${mercadolibre.refreshToken}")
    private String refreshToken;
    @Value("${mercadolibre.code}")
    private String code;
    private Meli m;

    @Override
    public String getAccessToken() {//este metodo se ejecuta solo  para obtener primero el code y despues el refreshToken que se coloca en properties
        m = new Meli(clientId, clientSecret);
        String redirectUrl = m.getAuthUrl("http://localhost", Meli.AuthUrls.MLA);
        System.out.println("RedirectUrl: " + redirectUrl);
        try {
            m.authorize(code,"http://localhost");
            System.out.println("Token: " + m.getAccessToken() + "\n");
            System.out.println("RefreshToken: " + m.getRefreshToken() + "\n");
        } catch (AuthorizationFailure authorizationFailure) {
            authorizationFailure.printStackTrace();
        }
        return m.getAccessToken();
    }

    public String generateToken(){
        m = new Meli(clientId, clientSecret, null, refreshToken  );
        try {
            m.refreshAccessToken();
            return  m.getAccessToken();
        } catch (AuthorizationFailure authorizationFailure) {
            authorizationFailure.printStackTrace();
            return null;
        }


    }
}
