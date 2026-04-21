# Diagrama de base de dades (format DBML)

```dbml
// 1. Taula d'Usuaris
Table users {
  id bigint [primary key, increment]
  name varchar
  email varchar [unique]
  password varchar
  bio text
  avatar_url varchar
  role varchar [note: "enum('user', 'admin') default 'user'"]
  is_banned boolean [note: "default false"]
  created_at timestamp
  updated_at timestamp
}

// 2. Taula de Categories
Table categories {
  id bigint [primary key, increment]
  name varchar
  created_at timestamp
  updated_at timestamp
}

// 3. Taula d'Experiències
Table experiences {
  id bigint [primary key, increment]
  user_id bigint
  title varchar
  body text
  image_url varchar
  latitude decimal
  longitude decimal
  status varchar [note: "enum('esborrany', 'publicada', 'rebutjada') default 'esborrany'"]
  is_reported boolean [note: "default false"]
  published_at timestamp
  created_at timestamp
  updated_at timestamp
}

// 4. Taula pivot Categoria-Experiència
Table category_experience {
  category_id bigint
  experience_id bigint

  indexes {
    (category_id, experience_id) [pk]
  }
}

// 5. Taula de Vots
Table votes {
  id bigint [primary key, increment]
  user_id bigint
  experience_id bigint
  value tinyint [note: "-1 o 1"]
  created_at timestamp
  updated_at timestamp

  indexes {
    (user_id, experience_id) [unique]
  }
}

// 6. Taula de Reports
Table reports {
  id bigint [primary key, increment]
  user_id bigint
  experience_id bigint
  reason text
  status varchar [note: "enum('pending', 'reviewed') default 'pending'"]
  created_at timestamp
  updated_at timestamp
}

// Relacions
Ref: experiences.user_id > users.id
Ref: category_experience.category_id > categories.id
Ref: category_experience.experience_id > experiences.id
Ref: votes.user_id > users.id
Ref: votes.experience_id > experiences.id
Ref: reports.user_id > users.id
Ref: reports.experience_id > experiences.id
```
