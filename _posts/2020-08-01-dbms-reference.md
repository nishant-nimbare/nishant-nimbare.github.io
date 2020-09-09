---
title: "DBMS Quick Reference"
categories:
  - Reference
tags:
  - Reference
  - sql
  - dbms
---


- TOC
{:toc}




3rd highest salary
```
SELECT * FROM Employee ORDER BY Salary DESC LIMIT 2,1
```

#### Trigger
A trigger is a stored procedure in database which automatically invokes whenever a special event in the database occurs. 
```
create trigger [trigger_name] 
[before | after]  
{insert | update | delete}  
on [table_name]  
[for each row]  
[trigger_body]


eg:
create trigger stud_marks 
before INSERT 
on 
Student 
for each row 
set Student.total = Student.subj1 + Student.subj2 + Student.subj3, Student.per = Student.total * 60 / 100; 
```

print 1 to 10
` select rownum from dual where rownum<=10;` 

or ` SELECT TOP 10 ROW_NUMBER() FROM sys.objects; `
any table with more than 10 rows will do.

#### procedures

```
delimiter //
create procedure disp_gender(INOUT mfgender integer, IN emp_gender varchar(6))  
                     -> begin 
                     -> select COUNT(gender) 
                         INTO mfgender FROM author where gender = emp_gender;   
                     -> end; //
delimiter ;
call disp_gender(@M, "Male");
select @M;
call disp_gender(@F, "Female");
select @F; 

```

```
DROP PROCEDURE LoopDemo;

DELIMITER $$
CREATE PROCEDURE LoopDemo()
BEGIN
	DECLARE x  INT;
	DECLARE str  VARCHAR(255);
        
	SET x = 1;
	SET str =  '';
        
	loop_label:  LOOP
		IF  x > 10 THEN 
			LEAVE  loop_label;
		END  IF;
            
		SET  x = x + 1;
		IF  (x mod 2) THEN
			ITERATE  loop_label;
		ELSE
			SET  str = CONCAT(str,x,',');
		END  IF;
	END LOOP;
	SELECT str;
END$$

DELIMITER ;


CALL LoopDemo();
```

cursors :  https://www.mysqltutorial.org/mysql-cursor/