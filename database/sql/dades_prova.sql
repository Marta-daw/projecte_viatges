BEGIN TRANSACTION;
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (1,'Aventures','2026-03-17 16:26:25','2026-03-17 16:26:25');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (2,'Muntanyisme','2026-03-17 16:26:25','2026-03-17 16:26:25');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (3,'Familiar','2026-03-17 16:26:25','2026-03-17 16:26:25');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (4,'Històric','2026-03-17 16:26:25','2026-03-17 16:26:25');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (5,'Romàntic','2026-03-17 16:26:25','2026-03-17 16:26:25');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (6,'Cultura','2026-03-17 16:26:25','2026-03-17 16:26:25');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (7,'Gastronomia','2026-03-17 16:26:25','2026-03-17 16:26:25');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (8,'Relax','2026-03-17 16:26:25','2026-03-17 16:26:25');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (9,'Platja','2026-03-17 16:26:25','2026-03-17 16:26:25');
INSERT INTO "category_experience" ("category_id","experience_id") VALUES (2,1);
INSERT INTO "category_experience" ("category_id","experience_id") VALUES (1,1);
INSERT INTO "category_experience" ("category_id","experience_id") VALUES (5,2);
INSERT INTO "category_experience" ("category_id","experience_id") VALUES (4,2);
INSERT INTO "experiences" ("id","user_id","title","body","image_url","latitude","longitude","status","published_at","created_at","updated_at") VALUES (1,2,'Ruta pels Pirineus: Vall de Núria','## Una escapada inoblidable
Aquest cap de setmana hem fet una ruta impressionant per la **Vall de Núria**. Hem agafat el cremallera des de Ribes de Freser. 
* Vistes espectaculars.
* Clima perfecte.
Recomano portar bon calçat i aigua.','https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',42.3961,2.1534,'publicada','2026-03-15 16:26:26','2026-03-14 16:26:26','2026-03-15 16:26:26');
INSERT INTO "experiences" ("id","user_id","title","body","image_url","latitude","longitude","status","published_at","created_at","updated_at") VALUES (2,3,'Cap de setmana romàntic a Roma','## La Ciutat Eterna
No hi ha res com passejar de nit pel centre de Roma. Vam visitar el Coliseu i vam tirar una moneda a la Fontana di Trevi.
> "Roma no es va fer en un dia, però es pot estimar en un segon."
Un viatge 10/10.','https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',41.8902,12.4922,'publicada','2026-03-16 16:26:26','2026-03-16 16:26:26','2026-03-16 16:26:26');
INSERT INTO "experiences" ("id","user_id","title","body","image_url","latitude","longitude","status","published_at","created_at","updated_at") VALUES (3,2,'Trekking pel Montseny (Esborrany)','Encara estic preparant les fotos d''aquesta ruta. Aviat actualitzaré el post!',NULL,41.7833,2.4,'esborrany',NULL,'2026-03-17 16:26:26','2026-03-17 16:26:26');
INSERT INTO "migrations" ("id","migration","batch") VALUES (1,'0001_01_01_000000_create_users_table',1);
INSERT INTO "migrations" ("id","migration","batch") VALUES (2,'0001_01_01_000001_create_cache_table',1);
INSERT INTO "migrations" ("id","migration","batch") VALUES (3,'0001_01_01_000002_create_jobs_table',1);
INSERT INTO "migrations" ("id","migration","batch") VALUES (4,'2026_03_16_153102_create_experiences_table',1);
INSERT INTO "migrations" ("id","migration","batch") VALUES (5,'2026_03_16_154127_create_categories_table',1);
INSERT INTO "migrations" ("id","migration","batch") VALUES (6,'2026_03_16_154833_create_category_experience_table',1);
INSERT INTO "migrations" ("id","migration","batch") VALUES (7,'2026_03_16_155330_create_votes_table',1);
INSERT INTO "migrations" ("id","migration","batch") VALUES (8,'2026_03_16_160238_create_reports_table',1);
INSERT INTO "users" ("id","name","email","email_verified_at","password","bio","avatar_url","role","remember_token","created_at","updated_at") VALUES (1,'Admin Viatges','admin@viatges.cat',NULL,'$2y$12$lj/IV9uD/Cy1bvOpokVcY.jF6SYPIRtvOrWKHXIlANP21wK6g/5bq','Administrador principal de la plataforma Viatges.',NULL,'admin',NULL,'2026-03-17 16:26:25','2026-03-17 16:26:25');
INSERT INTO "users" ("id","name","email","email_verified_at","password","bio","avatar_url","role","remember_token","created_at","updated_at") VALUES (2,'Marc Viatger','marc@exemple.com',NULL,'$2y$12$dafpgzs9tojcpBTVfb5tNei89fpFXR0KCBaK0N251T43aYuRIRJ2W','Apassionat de la muntanya i la fotografia de paisatges.',NULL,'user',NULL,'2026-03-17 16:26:26','2026-03-17 16:26:26');
INSERT INTO "users" ("id","name","email","email_verified_at","password","bio","avatar_url","role","remember_token","created_at","updated_at") VALUES (3,'Laura Explora','laura@exemple.com',NULL,'$2y$12$oqblbkQhNsxoPJkxDJ8SG.4ZK1FYHIpjIwqMItMbFsR8Dz5814fNK','Sempre buscant racons històrics i escapades romàntiques.',NULL,'user',NULL,'2026-03-17 16:26:26','2026-03-17 16:26:26');
COMMIT;
