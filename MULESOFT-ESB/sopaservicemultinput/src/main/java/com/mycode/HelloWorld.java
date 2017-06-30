package com.mycode;

import java.util.ArrayList;

public class HelloWorld implements IHelloWorld{

	@Override
	public ArrayList sayHi(String text, int age) {
		
		ArrayList user = new ArrayList<Object>();
		user.add(text);
		user.add(age);
	    
		return user;
	}
	
	
	
}
