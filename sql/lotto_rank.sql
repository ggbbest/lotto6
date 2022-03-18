-- make test data 
INSERT INTO lotto (	`yyyy` ,`wk` ,`yyyymmdd` ,`chips` ,`numb_tot` ,`numb1` ,
`numb2` ,`numb3` ,`numb4` ,`numb5` ,`numb6` ,`chainId` ,`coin_name` ,`addr` ,`sendTr` )
SELECT `yyyy` ,'1' `wk` ,`yyyymmdd` ,`chips` ,`numb_tot` ,`numb1` ,`numb2` ,`numb3` ,
`numb4` ,`numb5` ,`numb6` ,`chainId` ,`coin_name` ,`addr` ,`sendTr`
FROM lotto WHERE `yyyy`='2022' AND `wk`='11';
-- DELETE FROM lotto WHERE `yyyy`='2022' AND `wk`='10';
COMMIT;

set @winNumb = '13,22,24,34,42,43';
SELECT `yyyy`,`wk`,`yyyymmdd`,`chips`,`chainId`,`coin_name`,`addr`,`sendTr` ,`numb_tot`,`regdate`
FROM lotto 
WHERE numb_tot LIKE @winNumb
AND `yyyy`='2022' AND `wk`='10';

------------------------------------------------------------------------------
-- match logic lotto.c4ei.net
------------------------------------------------------------------------------
-- DECLEAR
-- 6,11,15,24,32,39  28 --996 2022-01-01
set @yyyy='2022', @wk='1', @winNumb = '6,11,15,24,32,39', @w1=6,@w2=11,@w3=15,@w4=24,@w5=32,@w6=39, @winPlusNumb=28; 

-- step 1
UPDATE lotto SET 
	c1 = case when numb1 IN (@w1,@w2,@w3,@w4,@w5,@w6) then 1 ELSE 0 END, 
	c2 = case when numb2 IN (@w1,@w2,@w3,@w4,@w5,@w6) then 1 ELSE 0 END,
	c3 = case when numb3 IN (@w1,@w2,@w3,@w4,@w5,@w6) then 1 ELSE 0 END, 
	c4 = case when numb4 IN (@w1,@w2,@w3,@w4,@w5,@w6) then 1 ELSE 0 END,
	c5 = case when numb5 IN (@w1,@w2,@w3,@w4,@w5,@w6) then 1 ELSE 0 END, 
	c6 = case when numb6 IN (@w1,@w2,@w3,@w4,@w5,@w6) then 1 ELSE 0 END
WHERE yyyy=@yyyy AND wk=@wk;
commit;

-- step 2
UPDATE lotto SET c_tot = (c1+c2+c3+c4+c5+c6) WHERE yyyy=@yyyy AND wk=@wk;
commit;
-- step 3 - find 5 numb match and check plus num set tot 5.5 --> 2nd win
UPDATE lotto SET c_tot = 5.5 WHERE yyyy=@yyyy AND wk=@wk AND c_tot = 5 
    AND (numb1=@winPlusNumb OR numb2=@winPlusNumb OR numb3=@winPlusNumb OR numb4=@winPlusNumb OR numb5=@winPlusNumb OR numb6=@winPlusNumb);
commit;
-- step 4 - set rank
UPDATE lotto 
SET c_rank =  case c_tot when 6 then 1 when 5.5 then 2 when 5 then 3 when 4 then 4 when 3 then 5 ELSE 0 END 
WHERE yyyy=@yyyy AND wk=@wk AND c_tot > 2;
commit;

-- step 5 -- 4,5 sending ship calcu
UPDATE lotto 
SET sendchips = case c_rank when 4 then chips*50 when 5 then chips*5 ELSE 0 END 
WHERE yyyy=@yyyy AND wk=@wk AND (c_rank =4 OR c_rank =5) ;
COMMIT;

-- step 6 -- 4,5 sending ship calcu
DELETE FROM lotto_sum_money WHERE yyyy=@yyyy AND wk=@wk;COMMIT;
INSERT INTO lotto_sum_money (yyyy,wk, coin_name,sumchips,sum_sendchips,real_tot,real_half_tot,amt1st,amt2nd,amt3rd)
SELECT yyyy,wk, coin_name, SUM(chips) sumchips, SUM(sendchips) sum_sendchips, (SUM(chips)-SUM(sendchips)) real_tot
, (SUM(chips)-SUM(sendchips))*0.5 real_half_tot
, (SUM(chips)-SUM(sendchips))*0.5*0.75 amt1st
, (SUM(chips)-SUM(sendchips))*0.5*0.125 amt2nd
, (SUM(chips)-SUM(sendchips))*0.5*0.125 amt3rd
FROM lotto 
WHERE `yyyy`=@yyyy AND `wk`=@wk 
GROUP BY yyyy,wk, coin_name;
COMMIT;


SELECT * FROM lotto  WHERE `yyyy`='2022' AND `wk`='10' AND c_rank >0;
