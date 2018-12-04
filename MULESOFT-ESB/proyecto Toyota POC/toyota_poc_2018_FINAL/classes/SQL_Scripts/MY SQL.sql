
-- Tabla para casos DB_REST C11,C12,C13,C14,C15--
CREATE SCHEMA toyotapoc;

USE toyotapoc;

CREATE TABLE flights
(
	id int PRIMARY KEY AUTO_INCREMENT,
    code varchar(10),
    price int,
    origin varchar(30),	
    destination varchar(30),
    departureDate varchar(30),
    airlineName varchar(30),
    planeType varchar(30),
    emptySeats int
);

INSERT INTO flights (code,price,origin,destination,departureDate,airlineName,planeType,emptySeats) VALUES ('ER45if',345.99,'MUA','LAX','2015/02/11','United','Boeing 737',52);
INSERT INTO flights (code,price,origin,destination,departureDate,airlineName,planeType,emptySeats) VALUES ('ER45jd',346,'MUA','LAX','2015/04/11','United','Boeing 777',12);
INSERT INTO flights (code,price,origin,destination,departureDate,airlineName,planeType,emptySeats) VALUES  ('ER0945',423,'MUA','LAX','2015/06/11','United','Boeing 707',0);
INSERT INTO flights (code,price,origin,destination,departureDate,airlineName,planeType,emptySeats) VALUES  ('ER9fje',845,'MUA','CLE','2015/07/11','United','Boeing 727',32);
INSERT INTO flights (code,price,origin,destination,departureDate,airlineName,planeType,emptySeats) VALUES  ('ER3kfd',245,'MUA','CLE','2015/08/11','United','Boeing 747',13);