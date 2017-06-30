package com.mycode;

import java.util.ArrayList;

import javax.jws.WebParam;
import javax.jws.WebService;

@WebService
public interface IHelloWorld {
 
	ArrayList sayHi(@WebParam(name = "nombre")String text, @WebParam(name = "edad") int age);
	
	
	
}
