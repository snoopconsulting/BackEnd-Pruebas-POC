package com.mulesoft.training.rest;

import java.util.ArrayList;
import java.util.HashMap;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.json.*;

import com.mulesoft.training.Flight;


@Path("/flight/{flightDest}")
public class Ticket implements TicketService, java.io.Serializable {
	
	HashMap<String, ArrayList<Flight>> flightMap = new HashMap<String, ArrayList<Flight>>();
	ArrayList<Flight> FlightsList = new ArrayList<Flight>();
	
	public Ticket()	{
		FlightsList.add(new Flight("United","ER38sd","SFO","Boing 737",400.00,0,"2015/03/20","MUA"));
		FlightsList.add(new Flight("United","ER45if","LAX","Boing 737",345.99,52,"2015/02/11","MUA"));
		FlightsList.add(new Flight("United","ER45jd","LAX","Boing 777",346.00,12,"2015/04/11","MUA"));
		FlightsList.add(new Flight("United","ER0945","LAX","Boing 707",423.00,0,"2015/06/11","MUA"));
		FlightsList.add(new Flight("United","ER9fje","CLE","Boing 727",845.00,32,"2015/07/11","MUA"));
		FlightsList.add(new Flight("United","ER3kfd","CLE","Boing 747",245.00,13,"2015/08/11","MUA"));
		FlightsList.add(new Flight("United","ER39rk","SFO","Boing 757",945.00,54,"2015/09/11","MUA"));
		FlightsList.add(new Flight("United","ER39rj","SFO","Boing 777",954.00,23,"2015/02/12","MUA"));
		FlightsList.add(new Flight("United","ER95jf","PDF","Boing 787",234.00,23,"2015/02/12","MUA"));
		FlightsList.add(new Flight("United","ER49fd","PDX","Boing 777",853.00,0,"2015/02/13","MUA"));
		FlightsList.add(new Flight("United","ER95jf","PDX","Boing 777",483.00,95,"2015/02/20","MUA"));
		FlightsList.add(new Flight("United","ER04kf","PDX","Boing 777",532.00,30,"2015/02/12","MUA"));
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

	@GET
	@Produces("application/json")
	@Override
	public String findFlight(@PathParam("flightDest") String destination) {
		if(this.flightMap.containsKey(destination))	{
			JSONArray jsonArray = new JSONArray(flightMap.get(destination));
			return jsonArray.toString();
		}
		return null;
	}
}
