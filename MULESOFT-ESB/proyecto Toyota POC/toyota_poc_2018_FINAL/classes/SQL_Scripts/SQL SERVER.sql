USE [master]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- Tabla para casos C16,C17,C18,C19,C20--
-- Las inserciones usar casos C17, C19 o C20 --
CREATE TABLE [dbo].[flights](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[code] [varchar](10) NULL,
	[price] [int] NULL,
	[origin] [varchar](30) NULL,
	[destination] [varchar](30) NULL,
	[departureDate] [varchar](30) NULL,
	[airlineName] [varchar](30) NULL,
	[planeType] [varchar](30) NULL,
	[emptySeats] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO



-- Tablas para P01 --

CREATE TABLE logins
(
	ID int IDENTITY(1,1),
	fecha_hora smalldatetime,
	usuario varchar(50),
	status varchar(20)
)
GO

INSERT INTO logins VALUES (GETDATE(), 'ToyotaAdmin18', 'Procesado');
INSERT INTO logins VALUES (GETDATE(), 'SnoopMain', 'Procesado');
INSERT INTO logins VALUES (GETDATE(), 'Mule12', 'Erróneo');


CREATE TABLE conexiones
(
	ID int IDENTITY(1,1),
	fecha_hora smalldatetime,
	origen varchar(50),
	status varchar(20)
)
GO


INSERT INTO conexiones VALUES (GETDATE(), 'MuleESB', 'Procesado');
INSERT INTO conexiones VALUES (GETDATE(), 'MuleESB', 'Procesado');
INSERT INTO conexiones VALUES (GETDATE(), 'MuleESB', 'Erróneo');

CREATE TABLE usuarios
(
	ID int IDENTITY(1,1),
	usuario varchar(50),
	status varchar(20)
)
GO


INSERT INTO usuarios VALUES ('SnoopMain', 'Procesado');
INSERT INTO usuarios VALUES ('ToyotaAdmin18', 'Procesado');
INSERT INTO usuarios VALUES ('Mule12', 'Procesado');
