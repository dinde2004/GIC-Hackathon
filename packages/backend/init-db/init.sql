-- Create approved instruments table
CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    instrument_group VARCHAR(255),
    instrument VARCHAR(255),
    department VARCHAR(255),
    risk_country VARCHAR(255),
    exchange VARCHAR(255),
    trade_ccy VARCHAR(3),
    settlement_ccy VARCHAR(3),
    is_approved BOOLEAN DEFAULT FALSE
);

-- Load CSV data into the table
COPY requests (instrument_group, instrument, department, risk_country, exchange, trade_ccy, settlement_ccy)
FROM '/docker-entrypoint-initdb.d/approved_instruments.csv'
DELIMITER ','
CSV HEADER;

-- Create table for
CREATE TABLE limits (
    id SERIAL PRIMARY KEY,
    instrument_group VARCHAR(255),
    counterparty VARCHAR(255),
    currency VARCHAR(3),
    available_limit VARCHAR(255),
    used_limit NUMERIC DEFAULT 0,
    data_date DATE
);

-- Load CSV data into the table
COPY limits (instrument_group, counterparty, currency, available_limit, data_date)
FROM '/docker-entrypoint-initdb.d/available_limits.csv'
DELIMITER ','
CSV HEADER;

-- Remove commas from the available_limit column
UPDATE limits
SET available_limit = REPLACE(available_limit, ',', '');

-- Transform available_limit column to NUMERIC
ALTER TABLE limits
ALTER COLUMN available_limit TYPE NUMERIC USING available_limit::NUMERIC;

-- Create table for users
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    hashed_password VARCHAR NOT NULL,
    persona VARCHAR,
    department VARCHAR
);

-- Function that triggers a notification on trade limit update
CREATE OR REPLACE FUNCTION notify_trade_limit_update() RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify('trade_limit_update', row_to_json(NEW)::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to fire after INSERT or UPDATE
CREATE TRIGGER trade_limit_update_trigger
AFTER INSERT OR UPDATE ON limits
FOR EACH ROW EXECUTE FUNCTION notify_trade_limit_update();