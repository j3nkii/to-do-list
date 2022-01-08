CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"importance" VARCHAR (100) NOT NULL,
	"dueBy" DATE,
	"completed" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks" 
	("task", "importance", "dueBy", "completed") 
VALUES 
	('Make Dinner', 'High', 'today', FALSE),
	('Drink beer', 'Very High', 'now', FALSE);

SELECT * FROM "tasks";