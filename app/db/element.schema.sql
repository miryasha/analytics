CREATE DATABASE element;
///////////////////////////////
DROP TABLE <name>;
//////////////////////////
USE   mupmgx3dxemvuwyw;
 
CREATE TABLE Strategies
(
	`ID` int NOT NULL AUTO_INCREMENT,
	`Strategy_name` varchar(20) NOT NULL,
       PRIMARY KEY (`ID`)
);

/////////////

USE   element;
 
CREATE TABLE Time_frame
(
	`ID` int NOT NULL AUTO_INCREMENT,
	`Time_frame` varchar(20) NOT NULL,
       PRIMARY KEY (`ID`)
);

/////////////////

USE   element;
 
CREATE TABLE Ticker_name
(
	`ID` int NOT NULL AUTO_INCREMENT,
	`Ticker_name` varchar(20) NOT NULL,
    `Ticker_Description` varchar(255) NOT NULL,
    `Ticker_market` varchar(20) NOT NULL,
       PRIMARY KEY (`ID`)
);