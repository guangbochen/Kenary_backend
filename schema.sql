DROP DATABASE raspberry_pi;
CREATE DATABASE IF NOT EXISTS raspberry_pi;
USE raspberry_pi;

CREATE TABLE IF NOT EXISTS devices(
  id              INTEGER NOT NULL AUTO_INCREMENT,
  device_id       VARCHAR(255) NULL,
  country         VARCHAR(255) NULL,
  state           VARCHAR(255) NULL,
  city            VARCHAR(255) NULL,
  suburb          VARCHAR(255) NULL,
  address         VARCHAR(255) NULL,
  position        VARCHAR(255) NULL,
  postcode        INTEGER NULL,
  manager_email   VARCHAR(255) NULL,
  contact_number  VARCHAR(255) NULL,
  created_at      TIMESTAMP NULL,
  updated_at      TIMESTAMP NULL,
  PRIMARY KEY (id)
);
INSERT INTO devices (id, device_id, country, state, city, suburb, address, position, 
  postcode, manager_email, contact_number, created_at, updated_at) VALUES
(1, 'KENARI0001', 'Australia', 'NSW', 'Sydney', 'Ultimo', '15 Broadway', 'Building 5 Lv3 Chemical Lab',
'2009', 'steven.guangbo.chen@gmail.com', '041-111-1111', NOW(), NOW());

CREATE TABLE IF NOT EXISTS temp_configs(
  id              INTEGER NOT NULL AUTO_INCREMENT,
  device_id       INTEGER NULL,
  min_threshold   DOUBLE NULL,
  max_threshold   DOUBLE NULL,
  cycle_time      INTEGER NULL,
  created_at      TIMESTAMP NULL,
  updated_at      TIMESTAMP NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (device_id) REFERENCES devices(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);
INSERT INTO temp_configs (id, device_id, max_threshold, min_threshold, cycle_time, created_at, updated_at) VALUES
(1, 1, 40, -10, 10, NOW(), NOW());

CREATE TABLE IF NOT EXISTS noise_configs(
  id              INTEGER NOT NULL AUTO_INCREMENT,
  device_id       INTEGER NULL,
  threshold   DOUBLE NULL,
  cycle_time      INTEGER NULL,
  created_at      TIMESTAMP NULL,
  updated_at      TIMESTAMP NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (device_id) REFERENCES devices(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);
INSERT INTO noise_configs (id, device_id, threshold, cycle_time, created_at, updated_at) VALUES
(1, 1, 40, 10, NOW(), NOW());

CREATE TABLE IF NOT EXISTS temperatures(
  id              INTEGER NOT NULL AUTO_INCREMENT,
  temperature_c   DOUBLE NULL,
  max_threshold  DOUBLE NULL,
  min_threshold DOUBLE NULL,
  is_alarm        TINYINT(1) NOT NULL DEFAULT 0,
  created_at      TIMESTAMP NULL,
  updated_at      TIMESTAMP NULL,
  PRIMARY KEY (id)
);
INSERT INTO temperatures (id, temperature_c, max_threshold, min_threshold, is_alarm, created_at, updated_at) VALUES
(1, 20, 40, -10, 0, '2014-03-28 07:00:00', '2014-03-28 07:00:00'),
(2, 22, 40, -10, 0, '2014-03-28 08:00:00', '2014-03-28 08:00:00'),
(3, -24, 40, -10, 1, '2014-03-28 09:00:00', '2014-03-28 09:00:00'),
(4, 26, 40, -10, 0, '2014-03-28 10:00:00', '2014-03-28 10:00:00'),
(5, 13, 40, -10, 0, '2014-03-28 11:00:00', '2014-03-28 11:00:00'),
(6, 30, 40, -10, 0, '2014-03-28 12:00:00', '2014-03-28 12:00:00'),
(7, 42, 40, -10, 1, '2014-03-28 13:00:00', '2014-03-28 13:00:00'),
(8, 26, 40, -10, 0, '2014-03-28 14:00:00', '2014-03-28 14:00:00');

CREATE TABLE IF NOT EXISTS temp_alarms(
  id              INTEGER NOT NULL AUTO_INCREMENT,
  temperature_id  INTEGER NULL,
  temperature_c   DOUBLE NULL,
  max_threshold  DOUBLE NULL,
  min_threshold DOUBLE NULL,
  description     VARCHAR(255) NULL,
  image           VARCHAR(255) NULL,
  is_active       TINYINT(1) NOT NULL DEFAULT 0,
  is_solved       TINYINT(1) NOT NULL DEFAULT 0,
  created_at      TIMESTAMP NULL,
  updated_at      TIMESTAMP NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (temperature_id) REFERENCES temperatures(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);
INSERT INTO temp_alarms (id, temperature_id, temperature_c, min_threshold, max_threshold, 
  description, image, is_active, is_solved, created_at, updated_at) VALUES
(1, 3, -24, -10, 40, 'The temp. is lower than minimun temperature threshold', 
  '/uploads/snapshot1.jpg', 1, 0, '2014-03-28 09:00:00', '2014-03-28 09:00:00'),
(2, 7, 42, -10, 40, 'The temp. is higher than maximun temperature threshold', 
  '/uploads/snapshot2.jpg', 1, 0, '2014-03-28 13:00:00', '2014-03-28 13:00:00');


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

