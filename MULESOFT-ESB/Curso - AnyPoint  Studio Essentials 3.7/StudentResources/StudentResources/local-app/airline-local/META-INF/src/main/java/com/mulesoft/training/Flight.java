package com.mulesoft.training;

public class Flight implements java.io.Serializable, Comparable<Flight> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	String airlineName;
	String code;
	String destination;
	String planeType;
	double price;
	int emptySeats;
	String departureDate;
	String origin;
	
	public Flight(String airlineName, String code, String destination,
			String planeType, double price, int emptySeats,
			String departureDate, String origin) {
		this.airlineName = airlineName;
		this.code = code;
		this.destination = destination;
		this.planeType = planeType;
		this.price = price;
		this.emptySeats = emptySeats;
		this.departureDate = departureDate;
		this.origin = origin;
	}
	
	public Flight()	{
		
	}
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getPlaneType() {
		return planeType;
	}

	public void setPlaneType(String planeType) {
		this.planeType = planeType;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getAirlineName() {
		return airlineName;
	}

	public void setAirlineName(String airlineName) {
		this.airlineName = airlineName;
	}

	public int getEmptySeats() {
		return emptySeats;
	}

	public void setEmptySeats(int emptySeats) {
		this.emptySeats = emptySeats;
	}

	public String getDepartureDate() {
		return departureDate;
	}

	public void setDepartureDate(String departureDate) {
		this.departureDate = departureDate;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}
	
	@Override
	public int compareTo(Flight otherFlight) {
		int value = Double.compare(this.getPrice(), otherFlight.getPrice());
		return value;
	}
	
}
