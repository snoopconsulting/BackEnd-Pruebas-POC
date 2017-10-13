package com.snoop.ml.service.impl;

import com.snoop.ml.repository.IAuthenticationRepositorio;
import com.snoop.ml.service.IAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements IAuthenticationService{

    @Autowired
    private IAuthenticationRepositorio iAuthenticationRepositorio;

    @Override
    public String getToken() {
        return iAuthenticationRepositorio.getAccessToken();
    }

    @Override
    public String getNewToken() {
        return iAuthenticationRepositorio.generateToken();
    }
}
