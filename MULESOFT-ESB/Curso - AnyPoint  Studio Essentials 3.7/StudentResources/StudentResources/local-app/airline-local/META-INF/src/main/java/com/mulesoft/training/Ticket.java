package com.mulesoft.training;

import java.util.ArrayList;
import java.util.HashMap;

import javax.jws.WebService;

@WebService(endpointInterface = "com.mulesoft.training.TicketService",
	serviceName = "TicketService")

public class Ticket implements TicketService, java.io.Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3876728262603716709L;
	HashMap<String, ArrayList<Flight>> flightMap = new HashMap<String, ArrayList<Flight>>();
	ArrayList<Flight> FlightsList = new ArrayList<Flight>();
	
	public Ticket()	{
		FlightsList.add(new Flight("Delta","A1B2C3","SFO","Boing 737",400.00,40,"2015/03/20","MUA"));
		FlightsList.add(new Flight("Delta","A1B2C4","LAX","Boing 737",199.99,10,"2015/02/11","MUA"));
		FlightsList.add(new Flight("Delta","A134DS","LAX","Boing 777",750.00,40,"2015/04/11","MUA"));
		FlightsList.add(new Flight("Delta","A1B34S","CLE","Boing 707",420.00,50,"2015/06/11","MUA"));
		FlightsList.add(new Flight("Delta","A12342","CLE","Boing 727",308.00,17,"2015/07/11","MUA"));
		FlightsList.add(new Flight("Delta","A1QWER","LAX","Boing 747",496.00,18,"2015/08/11","MUA"));
		FlightsList.add(new Flight("Delta","A1ASD4","CLE","Boing 757",736.00,40,"2015/09/11","MUA"));
		FlightsList.add(new Flight("Delta","A1BTT4","SFO","Boing 777",593.00,30,"2015/02/12","MUA"));
		FlightsList.add(new Flight("Delta","A14244","SFO","Boing 787",294.00,10,"2015/02/12","MUA"));
		FlightsList.add(new Flight("Delta","A1FGF4","PDX","Boing 777",958.00,80,"2015/02/13","MUA"));
		FlightsList.add(new Flight("Delta","AFFFC4","PDX","Boing 777",283.00,30,"2015/02/20","MUA"));
		FlightsList.add(new Flight("Delta","A1B3D4","PDX","Boing 777",385.00,10,"2015/02/12","MUA"));
		injector(this.FlightsList);
	}
	
	private void injector(ArrayList<Flight> flightList)	{
		for(Flight f : flightList)	{
			
			if(this.flightMap.containsKey(f.getDestination()))	{
				flightMap.get(f.getDestination()).add(f);
			} 	
			else  {
				ArrayList<Flight> newFlight = new ArrayList<Flight>();
				newFlight.add(f);
				flightMap.put(f.getDestination(), newFlight);
			}
		}
	}

	@Override
	public ArrayList<Flight> findFlight(String destination) {
		if(this.flightMap.containsKey(destination))	{
			return flightMap.get(destination);
		}
		return null;
	}
}
