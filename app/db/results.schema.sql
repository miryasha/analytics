
   USE mupmgx3dxemvuwyw;

    CREATE TABLE  results 
    (  ID   int NOT NULL AUTO_INCREMENT,
     symbol           varchar(20) NOT NULL,
     market           varchar(30) NOT NULL,
     strategy         varchar(30) NOT NULL,
     marketTrend      varchar(20) NOT NULL,
     timeFrame        varchar(20) NOT NULL,
     durationWD       varchar(20) NOT NULL, 
     statusTrade      varchar(30) NOT NULL,
     startingDate     varchar(20) NOT NULL,  
     startPrice       varchar(20) NOT NULL,
     endigDate        varchar(20) NOT NULL, 
     endPrice         varchar(20) NOT NULL,
     maxHigh          varchar(20) NOT NULL,
     dateMax          varchar(20) NOT NULL, 
     maxHitAfterDays  varchar(20) NOT NULL,
     minLow           varchar(20) NOT NULL, 
     dateMin           varchar(20) NOT NULL,
     minHitAfterDays   varchar(20) NOT NULL, 
     maxDiffToOpen     varchar(20) NOT NULL,
     maxDiffToClose    varchar(20) NOT NULL,
     minDiffToOpen     varchar(20) NOT NULL,
     openDiffToClose   varchar(20) NOT NULL,
     
     PRIMARY KEY (ID) );
  


  ////////////////////
 USE mupmgx3dxemvuwyw;

CREATE TABLE  pending_results 
    (  ID   int NOT NULL AUTO_INCREMENT, 
     symbol varchar(20) NOT NULL,
     dateTD   varchar(20) NOT NULL,
     open    varchar(20) NOT NULL,
     high   varchar(20) NOT NULL,
     low     varchar(20) NOT NULL,
     close    varchar(20) NOT NULL, 
     
     market    varchar(20) NOT NULL,  
     strategy  varchar(20) NOT NULL,
     marketTrend        varchar(20) NOT NULL, 
     timeFrame         varchar(20) NOT NULL,
     startingDate      varchar(20) NOT NULL,
     durationWD       varchar(20) NOT NULL, 
     
     PRIMARY KEY (ID) );







