------------- SQLite3 Dump File -------------

-- ------------------------------------------
-- Dump of "projects"
-- ------------------------------------------

DROP TABLE IF EXISTS "projects";

CREATE TABLE "projects"(
    "id"   Integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" Text    NOT NULL
);


-- ------------------------------------------
-- Dump of "technologies"
-- ------------------------------------------

DROP TABLE IF EXISTS "technologies";

CREATE TABLE "technologies"(
    "id"   Integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" Text    NOT NULL
);


BEGIN;
INSERT INTO "technologies" ("id","name") VALUES ( 1,'JavaScript' );
INSERT INTO "technologies" ("id","name") VALUES ( 2,'TypeScript' );
INSERT INTO "technologies" ("id","name") VALUES ( 3,'ES6+' );
INSERT INTO "technologies" ("id","name") VALUES ( 4,'HTML5' );
INSERT INTO "technologies" ("id","name") VALUES ( 5,'CSS3' );
INSERT INTO "technologies" ("id","name") VALUES ( 6,'Less' );
COMMIT;

-- ------------------------------------------
-- Dump of "project_technologies"
-- ------------------------------------------

DROP TABLE IF EXISTS "project_technologies";

CREATE TABLE "project_technologies"(
    "project_id"    Integer NOT NULL,
    "technology_id" Integer NOT NULL,
    PRIMARY KEY ( "project_id", "technology_id" )
);


