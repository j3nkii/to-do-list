CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"importance" VARCHAR (100) NOT NULL,
	"dueBy" DATE,
	"dateCompleted" DATE, DEFAULT null
	"completed" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks" 
	("task", "importance", "dueBy", "completed") 
VALUES 
	('Make Dinner', 'High', '1999-01-01', FALSE),
	('Eat Dinner', 'Low', '2020-01-01', FALSE),
	('Go to Church', 'Urgent', 'today', FALSE),
	('Make Dinner', 'High', 'today', FALSE),
	('Drink beer', 'Urgent', 'now', FALSE);

SELECT * FROM "tasks";
