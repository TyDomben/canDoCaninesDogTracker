-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
---------------------------------------------------------------- USER TABLE ----------------------------------------------------------------


CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    "username" VARCHAR(80),
    "password" VARCHAR(1000),
    "phone" VARCHAR(255),
    "address" VARCHAR(255),
    "email" VARCHAR(255),
    "admin" BOOLEAN
);

---------------------------------------------------------------- BEHAVIOR TABLE ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "behavior" (
    "id" SERIAL PRIMARY KEY,
    "behavior_category_name" VARCHAR(255) NOT NULL
);
INSERT INTO "behavior" ("behavior_category_name")
VALUES ('unknown'), ('comfortable'), ('indefferent'), ('uncomfortable');


---------------------------------------------------------------- EXERCISE EQUIPMENT TABLE ------------------------------------------------------


CREATE TABLE IF NOT EXISTS "exercise_equipment" (
    "id" SERIAL PRIMARY KEY,
    "exercise_equipment" VARCHAR(255) NOT NULL
);

INSERT INTO "exercise_equipment" ("exercise_equipment")
VALUES ('gentle leader'), ('halti head caller'), ('collar only(unless pulling)'), ('no pull front clip harness'), ('walks not recommended for exercise');

---------------------------------------------------------------- Food Type ------------------------------------------------------

CREATE TABLE IF NOT EXISTS "food_type" (
    "id" SERIAL PRIMARY KEY,
    "food_type" VARCHAR(255) NOT NULL
);

INSERT INTO "food_type" ("food_type")
VALUES ('Purina Pro Plan Large Breed Puppy'), ('Purina Pro Plan Large Breed Adult'), ('Purina Pro Plan Sensitive Skin and Stomach'), ('Purina Pro Plan Sport 30/20'), ('Other');

---------------------------------------------------------------- Breed ------------------------------------------------------

CREATE TABLE IF NOT EXISTS "breed" (
    "id" SERIAL PRIMARY KEY,
    "breed" VARCHAR(255) NOT NULL
);

INSERT INTO "breed" ("breed")
VALUES ('Labrador'), ('Golden Retriever'), ('Labrador Mix'), ('Golden Retriever Mix'), ('Poodle/Poodle Mix'), ('Collie'), ('I Dont Know');

---------------------------------------------------------------- In Heat Table-----------------------------------------------------------

CREATE TABLE IF NOT EXISTS "in_heat"

	("id" SERIAL PRIMARY KEY,
	"condition" VARCHAR(20) NOT NULL
	);
INSERT INTO "in_heat" ("condition") 
VALUES ('yes'), ('no'), ('unknown');
---------------------------------------------------------------- DOGS TABLE ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "dogs" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user"("id") NOT NULL,
    "dog_name" VARCHAR(255) NOT NULL,
    "age" VARCHAR(50) NOT NULL,
    "breed" INT NOT NULL,
    "spayed_neutered" BOOLEAN NOT NULL,
    "food_type" INT NOT NULL,
    "food_amount" VARCHAR(255) NOT NULL,
    "meals_per_day" INT NOT NULL,
    "eating_times" VARCHAR(255) NOT NULL,
    "medical_conditions" VARCHAR(255) NOT NULL,
    "recovering_from_surgery" BOOLEAN NOT NULL,
    "medications" VARCHAR(255) NOT NULL,
    "in_heat" INT NOT NULL,
    "potty_routine" VARCHAR(255) NOT NULL,
    "potty_habits_notes" VARCHAR(255) NOT NULL,
    "limit_water" BOOLEAN NOT NULL,
    "limit_toy_play" BOOLEAN NOT NULL,
    "watch_carefully" BOOLEAN NOT NULL,
    "ingest_toys" BOOLEAN NOT NULL,
    "keep_away" BOOLEAN NOT NULL,
    "shares_toys" BOOLEAN NOT NULL,    
    "exercise_equipment" INT NOT NULL,
    "crate_manners" VARCHAR(255) NOT NULL,
    "house_manners" VARCHAR(255) NOT NULL,
    "living_with_other_dogs" BOOLEAN NOT NULL,
    "living_with_cats" BOOLEAN NOT NULL,
    "living_with_children_ten_and_up" BOOLEAN NOT NULL,
    "living_with_children_younger_ten" BOOLEAN NOT NULL,
    "living_with_adults" BOOLEAN NOT NULL,
    "living_with_small_animals" BOOLEAN NOT NULL,
    "living_with_large_animals" BOOLEAN NOT NULL,
    "behavior_with_other_dogs" INT NOT NULL,
    "behavior_with_cats" INT NOT NULL,
    "behavior_with_children" INT NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "user"("id"),
    FOREIGN KEY ("exercise_equipment") REFERENCES "exercise_equipment"("id"),
    FOREIGN KEY ("behavior_with_other_dogs") REFERENCES "behavior"("id"),
    FOREIGN KEY ("behavior_with_cats") REFERENCES "behavior"("id"),
    FOREIGN KEY ("behavior_with_children") REFERENCES "behavior"("id"),
    FOREIGN KEY ("food_type") REFERENCES "food_type"("id"),
    FOREIGN KEY ("breed") REFERENCES "breed"("id"),
    FOREIGN KEY ("in_heat") REFERENCES "in_heat"("id")
    
);

INSERT INTO "dogs" (
    "user_id",
    "dog_name",
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
    "limit_water",
    "limit_toy_play",
    "watch_carefully",
    "ingest_toys",
    "keep_away",
    "shares_toys",    
    "exercise_equipment",
    "crate_manners",
    "house_manners",
    "living_with_other_dogs",
    "living_with_cats",
    "living_with_children_ten_and_up",
    "living_with_children_younger_ten",
    "living_with_adults",
    "living_with_small_animals",
    "living_with_large_animals",
    "behavior_with_other_dogs",
    "behavior_with_cats",
    "behavior_with_children")
VALUES ('1','Loki', '2', '1', true, '1', '1 cup', '3', '6 am', 'none', false, 'none', '1', 'every 3 hours', 'takes a long time',true, true, true, true, true, true, '1', 'feels safe in crate', 'gets on the couch', true, true, false, false, true, true, true, '1', '1', '1');
---------------------------------------------------------------- DOG HOSTING TABLE ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "hosting_request" (
    "id" SERIAL PRIMARY KEY,
    "dog_id" INT NOT NULL,
    "user_id" INT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "date_comments" VARCHAR(255) NOT NULL,
    "appointments" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50),
    FOREIGN KEY ("dog_id") REFERENCES "dogs"("id"),
    FOREIGN KEY ("user_id") REFERENCES "user"("id")
);

INSERT INTO "hosting_request" (
    "dog_id",
    "user_id",
    "start_date",
    "end_date",
    "date_comments",
    "appointments",
    "status"
)
VALUES('1', '1', '4-1-2024', '4-7-2024', 'Vacation to Hawaii', 'no appointments', 'not confirmed');

-----------------------------------------VOLUNTEER TO HOST TABLE ----------------------

CREATE TABLE IF NOT EXISTS "volunteer_hosting" (
    "id" SERIAL PRIMARY KEY,
    "request_id" INT NOT NULL,
    "user_id" INT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "comments" VARCHAR(500),
    "status" BOOLEAN,
    FOREIGN KEY ("request_id") REFERENCES "hosting_request"("id"),
    FOREIGN KEY ("user_id") REFERENCES "user"("id")
);

INSERT INTO "volunteer_hosting" (
"request_id", "user_id", "start_date", "end_date", "comments", "status")
VALUES('1', '1', '4-1-2024', '4-7-2024', 'no comments', false);

-------------------------------- QUERIES --------------------------

---------- REQUEST A HOST (POST) ----------
 
         INSERT INTO "hosting_request" (
          "dog_id",
          "user_id",
          "start_date",
          "end_date",
          "date_comments",
          "appointments",
          "status"
        ) VALUES ('1', '1', '4-10-2024', '4-17-2024', 'going on vacation', 'no appointments', false)
        RETURNING "id";
        
        
------- REQUEST A HOST (GET) ---------
SELECT 
"dogs"."id" AS "dog_id",
"user"."id" AS "user_id",
"hosting_request"."start_date",
"hosting_request"."end_date",
"hosting_request"."date_comments",
"hosting_request"."appointments",
"hosting_request"."status"
FROM 
"hosting_request"
JOIN 
"dogs" ON "dogs"."id" = "hosting_request"."dog_id"
JOIN 
"user" ON "user"."id" = "hosting_request"."user_id"
WHERE 
"hosting_request"."id" = 2;

-------- VOLUNTEER TO HOST (POST) -------
INSERT INTO "volunteer_hosting" (
          "request_id",
          "user_id",
          "start_date",
          "end_date",
          "comments",
          "status"
        ) VALUES ('2', '1', '4-10-2024', '4-13-2024', 'can take from 10-13 April', false)
        RETURNING "id";
        
---------- VOLUNTEER TO HOST (GET) --------
SELECT 
"hosting_request"."id" AS "request_id",
"user"."id" AS "user_id",
"volunteer_hosting"."start_date",
"volunteer_hosting"."end_date",
"volunteer_hosting"."comments",
"volunteer_hosting"."status"
FROM 
"volunteer_hosting"
JOIN 
"hosting_request" ON "hosting_request"."id" = "volunteer_hosting"."request_id"
JOIN 
"user" ON "user"."id" = "volunteer_hosting"."user_id"
WHERE 
"hosting_request"."id" = $2;