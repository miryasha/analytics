
/////////////////////////////////////
//pending


CREATE TABLE watchList
(
	`ID` int NOT NULL AUTO_INCREMENT,
	`ticker` varchar(20) NOT NULL,
      `market`  varchar(20) NOT NULL,
      `strategy` varchar(20) NOT NULL,
      `marketTrend`  varchar(20) NOT NULL ,
      `timeFrame`   varchar(20) NOT NULL,
      `startingDate` varchar(20) NOT NULL,
	`durationWD` varchar(20) NOT NULL,
      
	PRIMARY KEY (`ID`)
);

//////////////////////////////

