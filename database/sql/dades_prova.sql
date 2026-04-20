BEGIN TRANSACTION;
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (1,'Aventures','2026-04-09 14:27:14','2026-04-09 14:27:14');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (2,'Muntanyisme','2026-04-09 14:27:14','2026-04-09 14:27:14');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (3,'Familiar','2026-04-09 14:27:14','2026-04-09 14:27:14');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (4,'Històric','2026-04-09 14:27:14','2026-04-09 14:27:14');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (5,'Romàntic','2026-04-09 14:27:14','2026-04-09 14:27:14');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (6,'Cultura','2026-04-09 14:27:14','2026-04-09 14:27:14');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (7,'Gastronomia','2026-04-09 14:27:14','2026-04-09 14:27:14');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (8,'Relax','2026-04-09 14:27:14','2026-04-09 14:27:14');
INSERT INTO "categories" ("id","name","created_at","updated_at") VALUES (9,'Platja','2026-04-09 14:27:14','2026-04-09 14:27:14');
INSERT INTO "category_experience" ("category_id","experience_id") VALUES (2,1);
INSERT INTO "category_experience" ("category_id","experience_id") VALUES (1,1);
INSERT INTO "category_experience" ("category_id","experience_id") VALUES (5,2);
INSERT INTO "category_experience" ("category_id","experience_id") VALUES (4,2);
INSERT INTO "category_experience" ("category_id","experience_id") VALUES (1,7);
INSERT INTO "category_experience" ("category_id","experience_id") VALUES (1,8);
INSERT INTO "category_experience" ("category_id","experience_id") VALUES (9,3);
INSERT INTO "experiences" ("id","user_id","title","body","image_url","latitude","longitude","status","is_reported","published_at","created_at","updated_at") VALUES (1,2,'Ruta pels Pirineus: Vall de Núria','## Una escapada inoblidable
Aquest cap de setmana hem fet una ruta impressionant per la **Vall de Núria**. Hem agafat el cremallera des de Ribes de Freser. 
* Vistes espectaculars.
* Clima perfecte.
Recomano portar bon calçat i aigua.','https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',42.3961,2.1534,'publicada',1,'2026-04-07 14:27:15','2026-04-06 14:27:15','2026-04-07 14:27:15');
INSERT INTO "experiences" ("id","user_id","title","body","image_url","latitude","longitude","status","is_reported","published_at","created_at","updated_at") VALUES (2,3,'Cap de setmana romàntic a Roma','## La Ciutat Eterna
No hi ha res com passejar de nit pel centre de Roma. Vam visitar el Coliseu i vam tirar una moneda a la Fontana di Trevi.
> "Roma no es va fer en un dia, però es pot estimar en un segon."
Un viatge 10/10.','https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',41.8902,12.4922,'publicada',0,'2026-04-08 14:27:15','2026-04-08 14:27:15','2026-04-08 14:27:15');
INSERT INTO "experiences" ("id","user_id","title","body","image_url","latitude","longitude","status","is_reported","published_at","created_at","updated_at") VALUES (3,2,'Trekking pel Montseny (Esborrany)','Encara estic preparant les fotos d''aquesta ruta. Aviat actualitzaré el post!tttsaefaesfaesfasefasfe',NULL,41.7833,2.4,'esborrany',1,NULL,'2026-04-09 14:27:15','2026-04-16 16:41:05');
INSERT INTO "experiences" ("id","user_id","title","body","image_url","latitude","longitude","status","is_reported","published_at","created_at","updated_at") VALUES (4,1,'Trekking en Montserrat','Una experiencia increíble explorando las montañas de Montserrat. Ideal para amantes de la naturaleza y el senderismo. La ruta ofrece vistas espectaculares de los acantilados y formaciones rocosas únicas.','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3',41.5853,1.8353,'publicada',1,'2026-04-09 14:27:15','2026-04-09 14:27:15','2026-04-09 14:27:15');
INSERT INTO "experiences" ("id","user_id","title","body","image_url","latitude","longitude","status","is_reported","published_at","created_at","updated_at") VALUES (7,1,'Experiencia de Prueba','Hola','/storage/experiences/6IJzbYus461AZ2t0Yvww4X4tGBRji9iPbbx6zFTT.jpg',41.3232011022385,-5.361328125,'publicada',0,'2026-04-11 14:20:13','2026-04-11 14:20:13','2026-04-11 14:20:13');
INSERT INTO "experiences" ("id","user_id","title","body","image_url","latitude","longitude","status","is_reported","published_at","created_at","updated_at") VALUES (8,1,'asdfsda','asdfasdf',NULL,40.2585687639126,-2.1533203125,'publicada',0,'2026-04-11 14:49:37','2026-04-11 14:49:37','2026-04-11 14:49:37');
INSERT INTO "reports" ("id","user_id","experience_id","reason","status","created_at","updated_at") VALUES (1,3,1,'Aquesta ruta és perillosa i la descripció no ho avisa.','pending','2026-04-09 14:27:15','2026-04-09 14:27:15');
INSERT INTO "reports" ("id","user_id","experience_id","reason","status","created_at","updated_at") VALUES (2,1,1,'He rebut diverses queixes externes.','pending','2026-04-09 14:27:15','2026-04-09 14:27:15');
INSERT INTO "reports" ("id","user_id","experience_id","reason","status","created_at","updated_at") VALUES (3,1,3,'asdfadsfdasf','pending','2026-04-16 16:41:05','2026-04-16 16:41:05');
INSERT INTO "users" ("id","name","email","email_verified_at","password","bio","avatar_url","role","remember_token","created_at","updated_at","is_banned") VALUES (1,'Admin Viatges','admin@viatges.cat',NULL,'$2y$12$ug1d3ba1liE.tzM/kl7wu.c4qn7pBYQLtAgl0Gy8MlXL6l8Su.Svm','Administrador principal de la plataforma Viatges.',NULL,'admin',NULL,'2026-04-09 14:27:14','2026-04-09 14:27:14',0);
INSERT INTO "users" ("id","name","email","email_verified_at","password","bio","avatar_url","role","remember_token","created_at","updated_at","is_banned") VALUES (2,'Marc Viatger','marc@exemple.com',NULL,'$2y$12$GsegadGuSoiHJQrpseY.Se3hj2UA763z90BmLDYlVhjCo4/WjosjG','Apassionat de la muntanya i la fotografia de paisatges.',NULL,'user',NULL,'2026-04-09 14:27:14','2026-04-09 14:27:14',0);
INSERT INTO "users" ("id","name","email","email_verified_at","password","bio","avatar_url","role","remember_token","created_at","updated_at","is_banned") VALUES (3,'Laura Explora','laura@exemple.com',NULL,'$2y$12$PjdZpXoAmwLaQXbPEeE68esrYPeohtQQnvGETjt4.W75.jng/RSDi','Sempre buscant racons històrics i escapades romàntiques.',NULL,'user',NULL,'2026-04-09 14:27:15','2026-04-09 14:27:15',0);
INSERT INTO "votes" ("id","user_id","experience_id","value","created_at","updated_at") VALUES (1,2,2,1,'2026-04-09 14:27:15','2026-04-09 14:27:15');
INSERT INTO "votes" ("id","user_id","experience_id","value","created_at","updated_at") VALUES (2,3,1,1,'2026-04-09 14:27:15','2026-04-09 14:27:15');
INSERT INTO "votes" ("id","user_id","experience_id","value","created_at","updated_at") VALUES (3,2,3,-1,'2026-04-09 14:27:15','2026-04-09 14:27:15');
INSERT INTO "votes" ("id","user_id","experience_id","value","created_at","updated_at") VALUES (4,1,7,1,'2026-04-14 16:27:29','2026-04-19 09:34:44');
INSERT INTO "votes" ("id","user_id","experience_id","value","created_at","updated_at") VALUES (5,1,3,-1,'2026-04-16 16:40:59','2026-04-16 16:41:02');
INSERT INTO "votes" ("id","user_id","experience_id","value","created_at","updated_at") VALUES (7,1,1,1,'2026-04-19 09:46:05','2026-04-19 09:46:06');
COMMIT;
