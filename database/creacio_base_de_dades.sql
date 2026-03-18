BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "cache" (
	"key"	varchar NOT NULL,
	"value"	text NOT NULL,
	"expiration"	integer NOT NULL,
	PRIMARY KEY("key")
);
CREATE TABLE IF NOT EXISTS "cache_locks" (
	"key"	varchar NOT NULL,
	"owner"	varchar NOT NULL,
	"expiration"	integer NOT NULL,
	PRIMARY KEY("key")
);
CREATE TABLE IF NOT EXISTS "categories" (
	"id"	integer NOT NULL,
	"name"	varchar NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "category_experience" (
	"category_id"	integer NOT NULL,
	"experience_id"	integer NOT NULL,
	PRIMARY KEY("category_id","experience_id"),
	FOREIGN KEY("category_id") REFERENCES "categories"("id") on delete cascade,
	FOREIGN KEY("experience_id") REFERENCES "experiences"("id") on delete cascade
);
CREATE TABLE IF NOT EXISTS "experiences" (
	"id"	integer NOT NULL,
	"user_id"	integer NOT NULL,
	"title"	varchar NOT NULL,
	"body"	text NOT NULL,
	"image_url"	varchar,
	"latitude"	numeric,
	"longitude"	numeric,
	"status"	varchar NOT NULL DEFAULT 'esborrany' CHECK("status" IN ('esborrany', 'publicada', 'rebutjada')),
	"published_at"	datetime,
	"created_at"	datetime,
	"updated_at"	datetime,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "users"("id") on delete cascade
);
CREATE TABLE IF NOT EXISTS "failed_jobs" (
	"id"	integer NOT NULL,
	"uuid"	varchar NOT NULL,
	"connection"	text NOT NULL,
	"queue"	text NOT NULL,
	"payload"	text NOT NULL,
	"exception"	text NOT NULL,
	"failed_at"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "job_batches" (
	"id"	varchar NOT NULL,
	"name"	varchar NOT NULL,
	"total_jobs"	integer NOT NULL,
	"pending_jobs"	integer NOT NULL,
	"failed_jobs"	integer NOT NULL,
	"failed_job_ids"	text NOT NULL,
	"options"	text,
	"cancelled_at"	integer,
	"created_at"	integer NOT NULL,
	"finished_at"	integer,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "jobs" (
	"id"	integer NOT NULL,
	"queue"	varchar NOT NULL,
	"payload"	text NOT NULL,
	"attempts"	integer NOT NULL,
	"reserved_at"	integer,
	"available_at"	integer NOT NULL,
	"created_at"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "migrations" (
	"id"	integer NOT NULL,
	"migration"	varchar NOT NULL,
	"batch"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
	"email"	varchar NOT NULL,
	"token"	varchar NOT NULL,
	"created_at"	datetime,
	PRIMARY KEY("email")
);
CREATE TABLE IF NOT EXISTS "reports" (
	"id"	integer NOT NULL,
	"user_id"	integer NOT NULL,
	"experience_id"	integer NOT NULL,
	"reason"	text,
	"status"	varchar NOT NULL DEFAULT 'pending' CHECK("status" IN ('pending', 'reviewed')),
	"created_at"	datetime,
	"updated_at"	datetime,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("experience_id") REFERENCES "experiences"("id") on delete cascade,
	FOREIGN KEY("user_id") REFERENCES "users"("id") on delete cascade
);
CREATE TABLE IF NOT EXISTS "sessions" (
	"id"	varchar NOT NULL,
	"user_id"	integer,
	"ip_address"	varchar,
	"user_agent"	text,
	"payload"	text NOT NULL,
	"last_activity"	integer NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "users" (
	"id"	integer NOT NULL,
	"name"	varchar NOT NULL,
	"email"	varchar NOT NULL,
	"email_verified_at"	datetime,
	"password"	varchar NOT NULL,
	"bio"	text,
	"avatar_url"	varchar,
	"role"	varchar NOT NULL DEFAULT 'user' CHECK("role" IN ('user', 'admin')),
	"remember_token"	varchar,
	"created_at"	datetime,
	"updated_at"	datetime,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "votes" (
	"id"	integer NOT NULL,
	"user_id"	integer NOT NULL,
	"experience_id"	integer NOT NULL,
	"value"	integer NOT NULL,
	"created_at"	datetime,
	"updated_at"	datetime,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("experience_id") REFERENCES "experiences"("id") on delete cascade,
	FOREIGN KEY("user_id") REFERENCES "users"("id") on delete cascade
);
CREATE INDEX IF NOT EXISTS "cache_expiration_index" ON "cache" (
	"expiration"
);
CREATE INDEX IF NOT EXISTS "cache_locks_expiration_index" ON "cache_locks" (
	"expiration"
);
CREATE UNIQUE INDEX IF NOT EXISTS "failed_jobs_uuid_unique" ON "failed_jobs" (
	"uuid"
);
CREATE INDEX IF NOT EXISTS "jobs_queue_index" ON "jobs" (
	"queue"
);
CREATE INDEX IF NOT EXISTS "sessions_last_activity_index" ON "sessions" (
	"last_activity"
);
CREATE INDEX IF NOT EXISTS "sessions_user_id_index" ON "sessions" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_unique" ON "users" (
	"email"
);
CREATE UNIQUE INDEX IF NOT EXISTS "votes_user_id_experience_id_unique" ON "votes" (
	"user_id",
	"experience_id"
);
COMMIT;
