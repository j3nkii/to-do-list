CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"importance" VARCHAR (100) NOT NULL,
	"due-by" DATE,
);

INSERT INTO "tasks" 
	("task", "importance", "due-by") 
VALUES 
	('Make Dinner', 'High', 'today'),
	('Drink beer', 'Very High', 'now'),

SELECT * FROM "tasks";