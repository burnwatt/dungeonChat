# Database Schema

## `users`
| column name       | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `id`              | hash      | not null, primary key     |
| `handle`          | string    | not null, indexed, unique |
| `email`           | string    | not null, indexed, unique |
| `password`        | string    | not null                  |
| `date`            | Date      | not null, default Now     |

+ index on `handle, unique: true`
+ index on `email, unique: true`

<!-- has many characters and campaigns -->
<!-- has many messages (shared with characters) -->

## `campaigns`
| column name          | data type | details                   |
|:---------------------|:---------:|:--------------------------|
| `id`                 | hash      | not null, primary key     |
| `cover_art_url`      | string    |                           |
| `password`           | string    |                           |
| `name`               | string    | not null, indexed, unique |
| `description`        | string    |                           |
| `rules`              | string    |                           |
| `character_sheet_id` | ObjectID  | not null                  |
| `created_by`         | hash      | not null                  |
| `characters`         | array     | not null, default []      |
| `is_private`         | boolean   | not null, default false   |
| `date`               | Date      | not null, default Now     |

+ index on `name, unique: true`
<!-- campaigns have many users (through a joins/denormalization?), messages, characters -->
<!-- created_by references users -->

## `messages`
| column name       | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `id`              | hash      | not null, primary key     |
| `campaign_id`     | ObjectID  | not null                  |
| `character_id`    | ObjectID  |                           |
| `user_id`         | ObjectID  | indexed                   |
| `body`            | string    | not null                  |
| `password`        | string    | not null                  |
| `date`            | Date      | not null, default Now     |

<!-- belongs to a user, campaign, character  -->
+ index on `handle, unique: true`
+ index on `email, unique: true`

## `characters`
| column name       | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `id`              | hash      | not null, primary key     |
| `campaign_id`     | ObjectID  | not null                  |
| `user_id`         | ObjectID  | indexed                   |
| `char_attrs`      | Object    |                           |
| `date`            | Date      | not null, default Now     |

<!-- belongs to users and campaigns -->
<!-- has many messages -->


## `character_sheets`
| column name       | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `id`              | hash      | not null, primary key     |
| `name`            | string    | not null, indexed, unique |
| `form_html`       | string    | not null                  |
| `date`            | Date      | not null, default Now     |

<!-- belongs to users and campaigns -->
<!-- has many messages -->