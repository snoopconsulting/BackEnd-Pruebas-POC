package com.mulesoft.training;

import java.util.ArrayList;

import org.mule.DefaultMuleMessage;
import org.mule.api.MuleEventContext;
import org.mule.api.MuleMessage;
import org.mule.api.lifecycle.Callable;
import org.mule.util.CaseInsensitiveHashMap; 
public class CreateResponse implements Callable {
  @Override
  public Object onCall(MuleEventContext eventContext) throws Exception {
    MuleMessage message = eventContext.getMessage();
    Object payload = message.getPayload();
    if(payload instanceof ArrayList<?>) {
      @SuppressWarnings("unchecked")
      ArrayList<CaseInsensitiveHashMap> mapsOfAccounts = (ArrayList<CaseInsensitiveHashMap>) payload; 
      MuleMessage newMessage = new DefaultMuleMessage(message);
      String finalPayload = "<style> " +
      		"@import url(http://fonts.googleapis.com/css?family=Roboto:400,300);" +
      		"body {" +
      		"width: 100%;" +
      		"background-color: #fff;" +
      		"font-weight: 300;" +
      		"font-family: 'Roboto', sans-serif;" +
      		"}" + "</style>" + 
                      "<p><b>Account Created!</b><br>" +
                      "Existing Accounts:</p><br>";
      
      for(int i = 0; i < mapsOfAccounts.size(); i++) {
        mapsOfAccounts.get(i).put("NAME", "Account Name: " + mapsOfAccounts.get(i).get("NAME") + "<br>");
        mapsOfAccounts.get(i).put("STREET", "Street: " + mapsOfAccounts.get(i).get("STREET") + "<br>");
        mapsOfAccounts.get(i).put("CITY", "City: " + mapsOfAccounts.get(i).get("CITY") + "<br>");
        mapsOfAccounts.get(i).put("COUNTRY", "Country: " + mapsOfAccounts.get(i).get("COUNTRY") + "<br>");
        mapsOfAccounts.get(i).put("STATE", "State: " + mapsOfAccounts.get(i).get("STATE") + "<br>");
        mapsOfAccounts.get(i).put("POSTAL", "Postal: " + mapsOfAccounts.get(i).get("POSTAL") + "<br><br>");
        finalPayload += mapsOfAccounts.get(i).get("NAME").toString() + 
                        mapsOfAccounts.get(i).get("STREET").toString() + 
                        mapsOfAccounts.get(i).get("CITY").toString() + 
                        mapsOfAccounts.get(i).get("COUNTRY").toString() + 
                        mapsOfAccounts.get(i).get("STATE").toString() + 
                        mapsOfAccounts.get(i).get("POSTAL").toString();
      }
      newMessage.setPayload(finalPayload);
      return newMessage;
    }
    else return message;
  }
  

}
