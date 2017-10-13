package com.snoop.ml.service;

public interface IAuthenticationService {

    String getToken(); //Se utiliza una vez para generar el refresh token

    String getNewToken();
}
