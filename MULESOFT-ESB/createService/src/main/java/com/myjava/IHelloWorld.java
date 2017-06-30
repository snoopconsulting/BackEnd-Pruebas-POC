package com.myjava;

import javax.jws.WebParam;
import javax.jws.WebService;

@WebService
public interface IHelloWorld {
  
	int searchRecord(@WebParam(name = "id") int id);
}
