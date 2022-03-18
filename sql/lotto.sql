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

--////////////////////////////////////////////////////////////////////////////////////////////////
CREATE TABLE `lotto` (
	`idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`yyyy` VARCHAR(4) NOT NULL COLLATE 'utf8_unicode_ci',
	`wk` VARCHAR(2) NOT NULL COLLATE 'utf8_unicode_ci',
	`yyyymmdd` VARCHAR(8) NOT NULL COLLATE 'utf8_unicode_ci',
	`chips` DECIMAL(10,4) NOT NULL DEFAULT '0.0000',
	`numb_tot` VARCHAR(20) NULL COLLATE 'utf8_unicode_ci',
	`numb1` TINYINT(2) NOT NULL,
	`numb2` TINYINT(2) NOT NULL,
	`numb3` TINYINT(2) NOT NULL,
	`numb4` TINYINT(2) NOT NULL,
	`numb5` TINYINT(2) NOT NULL,
	`numb6` TINYINT(2) NOT NULL,
	`chainId` VARCHAR(10) NULL COLLATE 'utf8_unicode_ci',
	`coin_name` VARCHAR(10) NULL COLLATE 'utf8_unicode_ci',
	`addr` VARCHAR(70) NOT NULL COLLATE 'utf8_unicode_ci',
	`sendTr` VARCHAR(100) NULL COLLATE 'utf8_unicode_ci',
	`regdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`c1` TINYINT(1) NOT NULL DEFAULT '0',
	`c2` TINYINT(1) NOT NULL DEFAULT '0',
	`c3` TINYINT(1) NOT NULL DEFAULT '0',
	`c4` TINYINT(1) NOT NULL DEFAULT '0',
	`c5` TINYINT(1) NOT NULL DEFAULT '0',
	`c6` TINYINT(1) NOT NULL DEFAULT '0',
	`c_tot` DECIMAL(2,1) NOT NULL DEFAULT '0.0',
	`c_rank` TINYINT(1) NOT NULL DEFAULT '0',
	`sendYN` VARCHAR(1) NOT NULL DEFAULT 'N' COLLATE 'utf8_unicode_ci',
	`sendchips` DECIMAL(10,4) NOT NULL DEFAULT '0.0000',
	`sendDate` DATETIME NULL,
	`memo` VARCHAR(100) NULL COLLATE 'utf8_unicode_ci',
	PRIMARY KEY (`idx`) USING BTREE,
	INDEX `addr` (`addr`) USING BTREE,
	INDEX `yyyy_wk` (`yyyy`, `wk`) USING BTREE
)
COLLATE='utf8_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;

INSERT INTO lotto_num (`yyyy`,`wk`,`yyyymmdd`) SELECT '2202','12','22020326' FROM DUAL;
COMMIT;
--////////////////////////////////////////////////////////////////////////////////////////////////
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

CREATE TABLE `lotto_sum_money` (
	`idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`yyyy` VARCHAR(4) NOT NULL COLLATE 'utf8_unicode_ci',
	`wk` VARCHAR(2) NOT NULL COLLATE 'utf8_unicode_ci',
	`coin_name` VARCHAR(10) NULL COLLATE 'utf8_unicode_ci',
	`sumchips` DECIMAL(10,4) NOT NULL DEFAULT '0.0000',
	`sum_sendchips` DECIMAL(10,4) NOT NULL DEFAULT '0.0000',
	`real_tot` DECIMAL(10,4) NOT NULL DEFAULT '0.0000',
	`real_half_tot` DECIMAL(10,4) NOT NULL DEFAULT '0.0000',
	`amt1st` DECIMAL(10,4) NOT NULL DEFAULT '0.0000',
	`amt2nd` DECIMAL(10,4) NOT NULL DEFAULT '0.0000',
	`amt3rd` DECIMAL(10,4) NOT NULL DEFAULT '0.0000',
	`regdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`idx`) USING BTREE,
	INDEX `yyyy_wk_coin_name` (`yyyy`, `wk`, `coin_name`) USING BTREE
)
COMMENT='회차별 로또 금액 합 real_half_tot 금액을 1,2,3 등이 나눔'
COLLATE='utf8_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;

CREATE TABLE `lotto_rank` (
	`idx` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`yyyy` VARCHAR(4) NOT NULL COLLATE 'utf8_unicode_ci',
	`wk` VARCHAR(2) NOT NULL COLLATE 'utf8_unicode_ci',
	`coin_name` VARCHAR(10) NULL COLLATE 'utf8_unicode_ci',
	`c_rank` INT(4) NOT NULL DEFAULT '0',
	`rankCnt` INT(4) NOT NULL DEFAULT '0',
	`chipSum` DECIMAL(10,4) NOT NULL DEFAULT '0.0000',
	`regdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`idx`) USING BTREE,
	INDEX `idx_lotto_rank_1` (`yyyy`, `wk`, `coin_name`) USING BTREE
)
COLLATE='utf8_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;
