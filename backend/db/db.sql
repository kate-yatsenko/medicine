CREATE TABLE "public"."role" (
	"id" SERIAL primary key,
	"name" VARCHAR(100) unique,
	"canCreateUser" BOOLEAN default false,
	"canReadAllCards" BOOLEAN default false,
	"canUpdateCards" BOOLEAN default false
);

COMMENT ON TABLE "public"."role" IS 'User roles';

CREATE TABLE "public"."user" (
	"id" SERIAL primary key,
	"roleId" integer not null references "public"."role"(id),
	"name" VARCHAR(250) not null,
	"email" varchar(250) unique not null,
	"gender" varchar(1) not null default 'M',
	"birth" timestamp not null,
	"phone" varchar(50) not null,
	"address" varchar(500) not null,
	"created" timestamp not null default now()
);

COMMENT ON TABLE "public"."user" IS 'User info';

CREATE TABLE "public"."entryType" (
	"id" SERIAL primary key,
	"name" VARCHAR(150) unique not null,
	"description" varchar(1000)
);

COMMENT ON TABLE "public"."entryType" IS 'Entry types';

CREATE TABLE "public"."entry" (
	"id" SERIAL primary key,
	"typeId" integer not null references "public"."entryType"(id),
	"userId" integer not null references "public"."user"(id),
	"creatorId" integer not null references "public"."user"(id),
	"title" VARCHAR(250) not null,
	"description" VARCHAR(5000) not null,
	"result" VARCHAR(5000),
	"created" timestamp not null default now()
);

COMMENT ON TABLE "public"."entry" IS 'Medical entries';


/* Fill the base */
INSERT INTO "public"."role" ("name","canCreateUser","canReadAllCards","canUpdateCards")
VALUES ('admin',true,false,true);
INSERT INTO "public"."role" ("name","canReadAllCards","canUpdateCards")
VALUES ('doctor',true,true);
INSERT INTO "public"."role" ("name")
VALUES ('pacient');

INSERT INTO "public"."user" ("roleId","name","email","gender","birth","phone","address")
VALUES (1,'Иванов Иван Иванович','med.admin@gmail.com','m','''2000-01-01 10:00:00-00'',','+380 050 110-01-10','127.0.0.1');

INSERT INTO "public"."entryType" ("name","description")
VALUES ('Анализ','(Лабораторная диаоностика) Совокупность методов, направленных на анализ исследуемого материала с помощью различного специализированного оборудования.');
INSERT INTO "public"."entryType" ("name","description")
VALUES ('Заболевание','Заболевание пациента');
INSERT INTO "public"."entryType" ("name","description")
VALUES ('Визит','Визит пациента к врачу');
