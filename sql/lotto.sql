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
	`idx`       BIGINT(20) NOT NULL AUTO_INCREMENT,
	`yyyy`      VARCHAR(4) NULL COLLATE 'utf8_unicode_ci',
	`wk`        VARCHAR(2) NULL COLLATE 'utf8_unicode_ci',
	`yyyymmdd`  VARCHAR(8) NULL COLLATE 'utf8_unicode_ci',
    `chips`     INT(11) NULL,
	`addr`      VARCHAR(70) NULL COLLATE 'utf8_unicode_ci',
	`sendTr`    VARCHAR(300) NULL COLLATE 'utf8_unicode_ci',
	`win_rank`  INT(11) NULL,
	`regdate`   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`idx`) USING BTREE
)
COLLATE='utf8_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=9
;
SELECT YEAR(DATETIME) AS YEAR
SELECT DATE_FORMAT(NOW(), '%Y%m%d') AS today_date FROM DUAL;
SELECT concat( DATE_FORMAT(NOW(), '%Y') ,'_' ,WEEK(NOW()) ); 
SELECT WEEK(NOW());
SELECT WEEK('20210306');
SELECT DATE_FORMAT(NOW(), '%Y%m%d') AS today_date FROM DUAL;

SELECT DATE_FORMAT(NOW(), '%Y') AS today_date FROM DUAL;
SELECT concat( DATE_FORMAT(NOW(), '%Y') ,'_' ,WEEK(NOW()) ); 


insert into `lotto` (`yyyy`,`wk`,`yyyymmdd`,`chips`,`addr`,`sendTr`)
select YEAR(DATETIME), WEEK(NOW()), DATE_FORMAT(NOW(), '%Y%m%d'), 1, '', '' from dual;

