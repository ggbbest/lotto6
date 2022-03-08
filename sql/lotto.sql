-------------------------------------------------------
select @@global.time_zone, @@session.time_zone,@@system_time_zone;
SET GLOBAL time_zone='+09:00';
SET time_zone='+09:00';
select NOW();
COMMIT;
-------------------------------------------------------
SELECT WEEK(NOW());
SELECT WEEK('20210306');
SELECT DATE_FORMAT(NOW(), '%Y%m%d') AS today_date FROM DUAL;


CREATE TABLE `lotto` (
	`idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`yyyy` VARCHAR(4) NOT NULL COLLATE 'utf8_unicode_ci',
	`wk` VARCHAR(2) NOT NULL COLLATE 'utf8_unicode_ci',
	`yyyymmdd` VARCHAR(8) NOT NULL COLLATE 'utf8_unicode_ci',
	`chips` INT(4) NOT NULL,
	`numb_tot` VARCHAR(20) NULL COLLATE 'utf8_unicode_ci',
	`numb1` TINYINT(2) NOT NULL,
	`numb2` TINYINT(2) NOT NULL,
	`numb3` TINYINT(2) NOT NULL,
	`numb4` TINYINT(2) NOT NULL,
	`numb5` TINYINT(2) NOT NULL,
	`numb6` TINYINT(2) NOT NULL,
	`addr` VARCHAR(70) NOT NULL COLLATE 'utf8_unicode_ci',
	`sendTr` VARCHAR(300) NULL COLLATE 'utf8_unicode_ci',
	`win_rank` INT(1) NOT NULL DEFAULT '0',
	`regdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`idx`) USING BTREE
)
COLLATE='utf8_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=11
;


SELECT YEAR(DATETIME) AS YEAR
SELECT DATE_FORMAT(NOW(), '%Y%m%d') AS today_date FROM DUAL;
SELECT concat( DATE_FORMAT(NOW(), '%Y') ,'_' ,WEEK(NOW()) ); 
SELECT WEEK(NOW());
SELECT WEEK('20210306');
SELECT DATE_FORMAT(NOW(), '%Y%m%d') AS today_date FROM DUAL;

SELECT DATE_FORMAT(NOW(), '%Y') AS today_date FROM DUAL;
SELECT concat( DATE_FORMAT(NOW(), '%Y') ,'_' ,WEEK(NOW()) ); 


insert into `lotto` (`yyyy`,`wk`,`yyyymmdd`,`chips`,`addr`,`sendTr`
,`numb_tot`,`numb1`,`numb2`,`numb3`,`numb4`,`numb5`,`numb6`)
select YEAR(NOW()), WEEK(NOW()), DATE_FORMAT(NOW(), '%Y%m%d'), 
1 chips, '' addr, '' sendTr
,'1,2,3,4,5,6',1,2,3,4,5,6
from dual;


