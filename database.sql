-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(80) UNIQUE NOT NULL,
    "password" VARCHAR(1000) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role_id" INT NOT NULL,
    FOREIGN KEY ("role_id") REFERENCES "roles"("id")
);

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
    "behavior_with_children" INT NOT NULL
);

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
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
);

CREATE TABLE IF NOT EXISTS "roles" (
    "id" SERIAL PRIMARY KEY,
    "role_name" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "behavior" (
    "id" SERIAL PRIMARY KEY,
    "behavior_category_name" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "exercise_equipment" (
    "id" SERIAL PRIMARY KEY,
    "exercise_equipment" INT NOT NULL
);

CREATE TABLE IF NOT EXISTS "exercise_limitations" (
    "id" SERIAL PRIMARY KEY,
    "exercise_limitations" INT NOT NULL
);