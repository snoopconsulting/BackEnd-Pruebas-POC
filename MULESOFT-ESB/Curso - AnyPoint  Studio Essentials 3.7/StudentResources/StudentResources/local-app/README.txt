# ---------------------------------------------- #
# Anypoint Platform Essentials Local Application #
# ---------------------------------------------- #

Description:
    This application is to be used for participants who are unable to connect to AWS within their environments.  Database will be run locally when your Mule Application runs, via a Derby Database.  SOAP Web service and REST Web service used in class are implemented locally as well.  All backend-logic is self-contained within backendServices.xml.  Users of this application should implement their mule configurations within a separate mule config file.  ie. airlineservices.xml.

Import:
    Anypoint Studio > File > Import > Anypoint Studio Generated Deployable Archive (.zip)

Service Access:
    Each service is exposed an available when the mule application is ran.
    The services and where they are available are:
        
        ---------------------------------------------------------------------------- 
        # SERVICE NAME ------- # ADDRESS  ---------------------------------------- #
        # American Database    # AccountDBConnector (preconfigured)                #
        # Account Database     # AccountDBConnector (preconfigured)                #
        # Delta SOAP Service   # http://localhost:8887/delta                       #
        # Delta SOAP WSDL      # src/main/resources/delta.wsdl                     #
        # United REST Service  # http://localhost:8887/united/flights/{destinatin} #
        ----------------------------------------------------------------------------

Salesforce:
    This local implementation does not resolve the need to connect to Salesforce.  In order to complete the lab on Batch Processing, the ability to hit the SF api is required.
