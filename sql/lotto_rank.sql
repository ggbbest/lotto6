-- make test data 
INSERT INTO lotto (	`yyyy` ,`wk` ,`yyyymmdd` ,`chips` ,`numb_tot` ,`numb1` ,
`numb2` ,`numb3` ,`numb4` ,`numb5` ,`numb6` ,`chainId` ,`coin_name` ,`addr` ,`sendTr` )
SELECT `yyyy` ,'10' `wk` ,`yyyymmdd` ,`chips` ,`numb_tot` ,`numb1` ,`numb2` ,`numb3` ,
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
set @yyyy='2022', @wk='10', @winNumb = '18,25,34,35,39,45', @w1=18,@w2=25,@w3=34,@w4=35,@w5=39,@w6=45, @winPlusNumb=43; 
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
UPDATE lotto SET c_rank =  case c_tot when 6 then 1 when 5.5 then 2 when 5 then 3 when 4 then 4 when 3 then 5 ELSE 0 END 
WHERE yyyy=@yyyy AND wk=@wk AND c_tot > 2;
commit;


SELECT * FROM lotto  WHERE `yyyy`='2022' AND `wk`='10' AND c_rank >0;
