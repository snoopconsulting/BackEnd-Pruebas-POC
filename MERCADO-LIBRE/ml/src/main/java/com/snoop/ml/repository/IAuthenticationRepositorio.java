package com.snoop.ml.repository;

public interface IAuthenticationRepositorio {
    String getAccessToken();
    String generateToken();
}
