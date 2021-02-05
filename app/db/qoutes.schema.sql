

CREATE TABLE qoutes_daily
(
	`ID` int NOT NULL AUTO_INCREMENT,
	`Symbol` varchar(20) NOT NULL,
      `date`  varchar(20) NOT NULL,
      `Open` varchar(20) NOT NULL,
      `High`  varchar(20) NOT NULL ,
      `Low`   varchar(20) NOT NULL,
      `Close` varchar(20) NOT NULL,
	`Volume` varchar(20) NOT NULL,
	PRIMARY KEY (`ID`)
);


///////////////////
USE   
CREATE TABLE list_calling_stock
(
	`ID` int NOT NULL AUTO_INCREMENT,
	`ticker` varchar(20) NOT NULL,
      
	PRIMARY KEY (`ID`)
);



///////////////////
USE   
CREATE TABLE list_calling_forex
(
	`ID` int NOT NULL AUTO_INCREMENT,
	`ticker` varchar(20) NOT NULL,
      
	PRIMARY KEY (`ID`)
);