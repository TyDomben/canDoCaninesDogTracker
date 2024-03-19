-- USER ----------------------------------------------------------------
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


INSERT INTO "user" ("name", "username", "password", "phone", "address", "email")
VALUES
('Tiffany', 'tiffadmin', 'candocanines', '294-038-4194', '715 Kelly Knoll Apt. 245', 'tiffany@prime.com'),
('Paul', 'paulvolunteer', 'candocanines', '587-210-5184', '810 Michael Brooks Blvd.', 'paul@prime.com'),
('Ty', 'tyvolunteer', 'candocanines', '933-742-3303', '745 Victoria Course Suite 303', 'ty@prime.com'),
('Hmoov', 'hmoovolunteer', 'candocanines', '050-045-9833', '99072 Clayton Inlet Suite 294', 'hmoov@prime.com'),
('Jesse', 'jessevolunteer', 'candocanines', '5554772625', '6898 Jessica Garden Lane', 'jesse@prime.com'),
('Tiffany', 'tiffanyvolunteer', 'candocanines', '294-038-4194', '715 Kelly Knoll Apt. 245', 'tiffany@prime.com');


-- BEHAVIOR ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "behavior" (
    "id" SERIAL PRIMARY KEY,
    "behavior_category_name" VARCHAR(255) NOT NULL
);

INSERT INTO
    "behavior" ("behavior_category_name")
VALUES
    ('unknown'),
    ('comfortable'),
    ('indifferent'),
    ('uncomfortable');


-- EXERCISE EQUIPMENT ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "exercise_equipment" (
    "id" SERIAL PRIMARY KEY,
    "exercise_equipment" VARCHAR(255) NOT NULL
);

INSERT INTO
    "exercise_equipment" ("exercise_equipment")
VALUES
    ('gentle leader'),
    ('halti head caller'),
    ('collar only(unless pulling)'),
    ('no pull front clip harness'),
    ('walks not recommended for exercise');

-- Food Type ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "food_type" (
    "id" SERIAL PRIMARY KEY,
    "food_type" VARCHAR(255) NOT NULL
);

INSERT INTO
    "food_type" ("food_type")
VALUES
    ('Purina Pro Plan Large Breed Puppy'),
    ('Purina Pro Plan Large Breed Adult'),
    ('Purina Pro Plan Sensitive Skin and Stomach'),
    ('Purina Pro Plan Sport 30/20'),
    ('Other');

-- BREED ------------------------------------------------------
CREATE TABLE IF NOT EXISTS "breed" (
    "id" SERIAL PRIMARY KEY,
    "breed" VARCHAR(255) NOT NULL
);

INSERT INTO
    "breed" ("breed")
VALUES
    ('Labrador'),
    ('Golden Retriever'),
    ('Labrador Mix'),
    ('Golden Retriever Mix'),
    ('Poodle/Poodle Mix'),
    ('Collie'),
    ('I Dont Know');

-- IN_HEAT -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS "in_heat" (
    "id" SERIAL PRIMARY KEY,
    "in_heat" VARCHAR(20) NOT NULL
);

INSERT INTO
    "in_heat" ("in_heat")
VALUES
    ('yes'),
    ('no'),
    ('unknown');

--DOGS ----------------------------------------------------------------
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
    FOREIGN KEY ("user_id") REFERENCES "user"("id")ON DELETE CASCADE,
    FOREIGN KEY ("exercise_equipment") REFERENCES "exercise_equipment"("id")ON DELETE CASCADE,
    FOREIGN KEY ("behavior_with_other_dogs") REFERENCES "behavior"("id")ON DELETE CASCADE,
    FOREIGN KEY ("behavior_with_cats") REFERENCES "behavior"("id")ON DELETE CASCADE,
    FOREIGN KEY ("behavior_with_children") REFERENCES "behavior"("id")ON DELETE CASCADE,
    FOREIGN KEY ("food_type") REFERENCES "food_type"("id")ON DELETE CASCADE,
    FOREIGN KEY ("breed") REFERENCES "breed"("id")ON DELETE CASCADE,
    FOREIGN KEY ("in_heat") REFERENCES "in_heat"("id")ON DELETE CASCADE
);


--HOSTING_REQUEST ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "hosting_request" (
    "id" SERIAL PRIMARY KEY,
    "dog_id" INT NOT NULL,
    "user_id" INT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "date_comments" VARCHAR(255) NOT NULL,
    "appointments" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50),
    FOREIGN KEY ("dog_id") REFERENCES "dogs"("id") ON DELETE CASCADE,
    FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
);

--VOLUNTEER_HOSTING ----------------------
CREATE TABLE IF NOT EXISTS "volunteer_hosting" (
    "id" SERIAL PRIMARY KEY,
    "request_id" INT NOT NULL,
    "user_id" INT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "comments" VARCHAR(500),
    "status" BOOLEAN,
    FOREIGN KEY ("request_id") REFERENCES "hosting_request"("id")ON DELETE CASCADE,
    FOREIGN KEY ("user_id") REFERENCES "user"("id")ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "photo" (
"id" SERIAL PRIMARY KEY,
"dog_id" INT NOT NULL,
"photo" VARCHAR(500),
FOREIGN KEY ("dog_id") REFERENCES "dogs"("id") ON DELETE CASCADE);

