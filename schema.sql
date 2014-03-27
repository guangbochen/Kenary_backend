
DROP DATABASE RaspberryPi_DB;
CREATE DATABASE IF NOT EXISTS RaspberryPi_DB;
USE RaspberryPi_DB;

CREATE TABLE IF NOT EXISTS temperatures(
    id              INTEGER NOT NULL AUTO_INCREMENT,
    temperature_c   DOUBLE NULL,
    minus_threshold DOUBLE NULL,
    plus_threshold  DOUBLE NULL,
    is_alarm        TINYINT(1) NOT NULL DEFAULT 0,
    created_at      TIMESTAMP NULL,
    updated_at      TIMESTAMP NULL,
    PRIMARY KEY (id)
);

INSERT INTO temperatures (id, temperature_c, minus_threshold, plus_threshold, is_alarm, created_at, updated_at) VALUES
(1, 20, -10, 40, 0, NOW(), NOW()),
(2, 22, -10, 40, 0, NOW(), NOW()),
(3, -24, -10, 40, 1, NOW(), NOW()),
(4, 26, -10, 40, 0, NOW(), NOW()),
(5, 10, -10, 40, 0, NOW(), NOW()),
(6, 30, -10, 40, 0, NOW(), NOW()),
(7, 42, -10, 40, 1, NOW(), NOW()),
(8, 26, -10, 40, 0, NOW(), NOW());

CREATE TABLE IF NOT EXISTS temp_alarms(
    id              INTEGER NOT NULL AUTO_INCREMENT,
    temperature_id  INTEGER NULL,
    temperature_c   DOUBLE NULL,
    minus_threshold DOUBLE NULL,
    plus_threshold  DOUBLE NULL,
    description     VARCHAR(255) NULL,
    is_active       TINYINT(1) NOT NULL DEFAULT 0,
    is_solved       TINYINT(1) NOT NULL DEFAULT 0,
    created_at      TIMESTAMP NULL,
    updated_at      TIMESTAMP NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (temperature_id) REFERENCES temperatures(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO temp_alarms (id, temperature_id, temperature_c, minus_threshold, plus_threshold, description, is_active, is_solved, created_at, updated_at) VALUES
(1, 3, -24, -10, 40, 'The temp. is lower than minimun temperature threshold', 1, 1, NOW(), NOW()),
(2, 7, 42, -10, 40, 'The temp. is higher than maximun temperature threshold', 1, 1, NOW(), NOW());


CREATE TABLE IF NOT EXISTS noises(
    id            INTEGER NOT NULL AUTO_INCREMENT,
    noise_lvl     DOUBLE NULL,
    threshold     DOUBLE NULL,
    is_alarm      TINYINT(1) NOT NULL DEFAULT 0,
    created_at    TIMESTAMP NULL,
    updated_at    TIMESTAMP NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS noise_alarms(
    id              INTEGER NOT NULL AUTO_INCREMENT,
    noise_id        INTEGER NULL,
    noise_lvl       DOUBLE NULL,
    threshold       DOUBLE NULL,
    description     VARCHAR(255) NULL,
    is_active       TINYINT(1) NOT NULL DEFAULT 0,
    is_solved       TINYINT(1) NOT NULL DEFAULT 0,
    created_at      TIMESTAMP NULL,
    updated_at      TIMESTAMP NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (noise_id) REFERENCES noises(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

/* CREATE TABLE IF NOT EXISTS airs( */
/*     id            INTEGER NOT NULL AUTO_INCREMENT, */
/*     air           DOUBLE NULL, */
/*     base_air      DOUBLE NULL, */
/*     is_alarm      TINYINT(1) NOT NULL DEFAULT 0, */
/*     created_at    TIMESTAMP NULL, */
/*     updated_at    TIMESTAMP NULL, */
/*     PRIMARY KEY (id) */
/* ); */

/* CREATE TABLE IF NOT EXISTS alarms( */
/*     id              INTEGER NOT NULL AUTO_INCREMENT, */
/*     temperatures_id INTEGER NULL, */
/*     noises_id       INTEGER NULL, */
/*     airs_id         INTEGER NULL, */
/*     type            VARCHAR(255) NULL, */
/*     description     VARCHAR(255) NULL, */
/*     trigger_value   DOUBLE NULL, */
/*     alarm_value     DOUBLE NULL, */
/*     is_active       TINYINT(1) NOT NULL DEFAULT 0, */
/*     created_at      TIMESTAMP NULL, */
/*     updated_at      TIMESTAMP NULL, */
/*     PRIMARY KEY (id), */
/*     FOREIGN KEY (temperatures_id) REFERENCES temperatures(id) */
/*         ON DELETE CASCADE */
/*         ON UPDATE CASCADE, */
/*     FOREIGN KEY (noises_id) REFERENCES noises(id) */
/*         ON DELETE CASCADE */
/*         ON UPDATE CASCADE, */
/*     FOREIGN KEY (airs_id) REFERENCES airs(id) */
/*         ON DELETE CASCADE */
/*         ON UPDATE CASCADE */
/* ); */

