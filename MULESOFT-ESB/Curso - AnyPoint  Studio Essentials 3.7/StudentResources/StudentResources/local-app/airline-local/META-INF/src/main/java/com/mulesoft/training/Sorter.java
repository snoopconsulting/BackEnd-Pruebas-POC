package com.mulesoft.training;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.mule.api.MuleEventContext;
import org.mule.api.MuleMessage;
import org.mule.api.lifecycle.Callable;

public class Sorter implements Callable	{

	@Override
	public Object onCall(MuleEventContext eventContext) throws Exception {
		MuleMessage currentMessage = eventContext.getMessage();
		if(currentMessage.getPayload() instanceof ArrayList)	{
			@SuppressWarnings("unchecked")
			ArrayList<Flight> payload = (ArrayList<Flight>) currentMessage.getPayload();{
				Collections.sort(payload);
				currentMessage.setPayload(payload);
			}
		} else {
			return currentMessage;
		}
		return currentMessage;
	}
}
