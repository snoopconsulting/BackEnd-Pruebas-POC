package com.mulesoft.training;

import java.util.ArrayList;

import javax.jws.WebService;

@WebService
public interface TicketService {
	
	public ArrayList<Flight> findFlight(String destination);
}
