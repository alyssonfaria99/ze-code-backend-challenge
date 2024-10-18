CREATE TABLE partner (
  id VARCHAR(255) PRIMARY KEY,
  tradingName VARCHAR(255) NOT NULL,
  ownerName VARCHAR(255) NOT NULL,
  document VARCHAR(255) NOT NULL,
  UNIQUE(document)
);

CREATE TABLE coverageArea (
  id VARCHAR(255) PRIMARY KEY,
  partner_id VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL CHECK (type = 'MultiPolygon'),
  coordinates MultiPolygon NOT NULL SRID 4326,
  FOREIGN KEY(partner_id) REFERENCES partner(id),
  SPATIAL INDEX(coordinates)
);

CREATE TABLE address (
  id VARCHAR(255) PRIMARY KEY,
  partner_id VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL CHECK (type = 'Point'),
  coordinates Point NOT NULL SRID 4326,
  FOREIGN KEY(partner_id) REFERENCES partner(id)
);
