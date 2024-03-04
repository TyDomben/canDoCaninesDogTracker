-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
---------------------------------------------------------------- ROLES TABLE ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "roles" (
    "id" SERIAL PRIMARY KEY,
    "role_name" VARCHAR(255)
);
INSERT INTO "roles" ("id", "role_name")
VALUES ('1', 'admin'),
('2', 'raiser'),
('3', 'sitter');
---------------------------------------------------------------- USER TABLE ----------------------------------------------------------------


CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    "username" VARCHAR(80),
    "password" VARCHAR(1000),
    "phone" VARCHAR(255),
    "address" VARCHAR(255),
    "email" VARCHAR(255),
    "role_id" INT,
    FOREIGN KEY ("role_id") REFERENCES "roles"("id")
);
---------------------------------------------------------------- DOGS TABLE ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "dogs" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "age" INT NOT NULL,
    "breed" VARCHAR(255) NOT NULL,
    "spayed_neutered" BOOLEAN NOT NULL,
    "food_type" VARCHAR(255) NOT NULL,
    "food_amount" VARCHAR(255) NOT NULL,
    "meals_per_day" INT NOT NULL,
    "eating_times" VARCHAR(255) NOT NULL,
    "medical_conditions" VARCHAR(255) NOT NULL,
    "recovering_from_surgery" BOOLEAN NOT NULL,
    "medications" VARCHAR(255) NOT NULL,
    "in_heat" INT NOT NULL,
    "potty_routine" VARCHAR(255) NOT NULL,
    "potty_habits_notes" VARCHAR(255) NOT NULL,
    "exercise_limitations" INT NOT NULL,
    "exercise_equipment" INT NOT NULL,
    "crate_manners" VARCHAR(255) NOT NULL,
    "house_manners" VARCHAR(255) NOT NULL,
    "living_with_other_dogs" BOOLEAN NOT NULL,
    "living_with_cats" BOOLEAN NOT NULL,
    "living_with_children_>_ten" BOOLEAN NOT NULL,
    "living_with_children_<_ten" BOOLEAN NOT NULL,
    "living_with_adults" BOOLEAN NOT NULL,
    "living_with_small_animals" BOOLEAN NOT NULL,
    "living_with_large_animals" BOOLEAN NOT NULL,
    "behavior_with_other_dogs" INT NOT NULL,
    "behavior_with_cats" INT NOT NULL,
    "behavior_with_children" INT NOT NULL,
    FOREIGN KEY ("exercise_limitations") REFERENCES "exercise_limitations"("id"),
    FOREIGN KEY ("exercise_equipment") REFERENCES "exercise_equipment"("id"),
    FOREIGN KEY ("behavior_with_other_dogs") REFERENCES "behavior"("id"),
    FOREIGN KEY ("behavior_with_cats") REFERENCES "behavior"("id"),
    FOREIGN KEY ("behavior_with_children") REFERENCES "behavior"("id")
    
);
INSERT INTO "dogs" (
    "name",
    "age",
    "breed",
    "spayed_neutered",
    "food_type",
    "food_amount",
    "meals_per_day",
    "eating_times",
    "medical_conditions",
    "recovering_from_surgery",
    "medications",
    "in_heat",
    "potty_routine",
    "potty_habits_notes",
    "exercise_limitations",
    "exercise_equipment",
    "crate_manners",
    "house_manners",
    "living_with_other_dogs",
    "living_with_cats",
    "living_with_children_>_ten",
    "living_with_children_<_ten",
    "living_with_adults",
    "living_with_small_animals",
    "living_with_large_animals",
    "behavior_with_other_dogs",
    "behavior_with_cats",
    "behavior_with_children")
VALUES ('Loki', '2', 'Labrador Retriever', true, 'Blue Buffalo', '1 cup', '3', '6 am', 'none', false, 'none', '1', 'every 3 hours', 'takes a long time', '1', '1', 'feels safe in crate', 'gets on the couch', true, true, false, false, true, true, true, '1', '1', '1');

---------------------------------------------------------------- DOG HOSTING TABLE ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "dog_hosting" (
    "id" SERIAL PRIMARY KEY,
    "dog_id" INT NOT NULL,
    "user_id" INT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "date_comments" VARCHAR(255) NOT NULL,
    "appointments" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "admin_id" INT NOT NULL,
    FOREIGN KEY ("dog_id") REFERENCES "dogs"("id"),
    FOREIGN KEY ("user_id") REFERENCES "user"("id")
);

INSERT INTO "dog_hosting" (
    "dog_id",
    "user_id",
    "start_date",
    "end_date",
    "date_comments",
    "appointments",
    "status",
    "admin_id"
)
VALUES('1', '1', '4-1-2024', '4-7-2024', 'Vacation to Hawaii', 'no appointments', 'not confirmed', '1');
--admin_id is not doing anything.. is there supposed to be an admin table with confirm and deny = 1 or 2 --


---------------------------------------------------------------- BEHAVIOR TABLE ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "behavior" (
    "id" SERIAL PRIMARY KEY,
    "behavior_category_name" VARCHAR(255) NOT NULL
);
INSERT INTO "behavior" ("behavior_category_name")
VALUES ('rowdy'), ('barks a lot'), ('calm');


CREATE TABLE IF NOT EXISTS "dog_behavior" (
    "dog_id" INT NOT NULL,
    "behavior_id" INT NOT NULL,
    PRIMARY KEY ("dog_id", "behavior_id"),
    FOREIGN KEY ("dog_id") REFERENCES "dogs"("id"),
    FOREIGN KEY ("behavior_id") REFERENCES "behavior"("id")
);

INSERT INTO "dog_behavior" ("dog_id", "behavior_id")
VALUES('1','1');


---------------------------------------------------------------- EXERCISE EQUIPMENT TABLE ------------------------------------------------------


CREATE TABLE IF NOT EXISTS "exercise_equipment" (
    "id" SERIAL PRIMARY KEY,
    "exercise_equipment" VARCHAR(255) NOT NULL
);

INSERT INTO "exercise_equipment" ("exercise_equipment")
VALUES ('treadmill');

---------------------------------------------------------------- EXERCISE LIMITATION TABLE ------------------------------------------------------


CREATE TABLE IF NOT EXISTS "exercise_limitations" (
    "id" SERIAL PRIMARY KEY,
    "exercise_limitations" VARCHAR(255) NOT NULL
);

INSERT INTO "exercise_limitations" ("exercise_limitations")
VALUES ('no running more than 15 minutes');