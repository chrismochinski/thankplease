/*
This is the schema, strictly for reference.
You do not need to run this file.
*/

-- Create user_assets table ✅
CREATE TABLE user_assets (
    ticker VARCHAR(255) NOT NULL,
    total_holding NUMERIC(12, 6),
    -- Add additional columns here
);

//todo
CREATE TABLE users ( 
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash NOT NULL,
    creation_date TIMESTAMP WITH TIME ZONE NOT NULL,
    creation_time_zone VARCHAR(255) NOT NULL,
    -- Add additional columns here
);

-- modify user asset table once connected API 🔳
ALTER TABLE user_assets ADD COLUMN add_date_time TIMESTAMP WITH TIME ZONE; --date and time of purchase with time zone
ALTER TABLE user_assets ADD COLUMN add_time_zone VARCHAR(255); --time zone of purchase
ALTER TABLE user_assets ADD COLUMN add_price NUMERIC(12, 6); --price of asset per token at time of purchase
ALTER TABLE user_assets ADD COLUMN add_market_cap NUMERIC(12, 6); --market cap of asset at time of purchase
ALTER TABLE user_assets ADD COLUMN add_circulating_supply NUMERIC(12, 6); --circulating supply of asset at time of purchase
ALTER TABLE user_assets ADD COLUMN add_volume NUMERIC(12, 6); --volume of asset at time of purchase
ALTER TABLE user_assets ADD COLUMN add_quantity NUMERIC(12, 6); --alternative to adding a NEW TOTAL, which will be selected with a switch so the user has both options - using this will add an amount to the existing total, switching to "change total" will modify the total that is already there
ALTER TABLE user_assets ADD COLUMN add_source VARCHAR(255); --source or app of purchase or earn/mine/mint
ALTER TABLE user_assets ADD COLUMN add_activity_type VARCHAR(255); --purchase, earn, mine, mint, driving, running, etc
ALTER TABLE user_assets ADD COLUMN notes TEXT; --notes about the transaction


-- added late as heck on 1/6/24 for user transaction tracking

//todo
CREATE TABLE user_transactions {
    transaction_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    transaction_ticker VARCHAR(255) NOT NULL,
    transaction_quantity NUMERIC(12, 6) NOT NULL,
    transaction_is_new_total BOOLEAN NOT NULL,
    transaction_type VARCHAR(255) NOT NULL,
    transaction_date_time TIMESTAMP WITH TIME ZONE NOT NULL,
    transaction_time_zone VARCHAR(255) NOT NULL,
    transaction_source VARCHAR(255), -- source or app of purchase or earn/mine/mint
    transaction_activity_type VARCHAR(255), -- purchase, earn, mine, mint, driving, running, etc
    notes TEXT
};


/* 
common queries
*/

-- add new asset, no purchase
INSERT INTO user_assets (ticker) VALUES ('BTC');

-- remove asset by ticker
DELETE FROM user_assets WHERE TICKER = 'THETA';

-- SAMPLE QUERY INTO ALL OF THE user_transactions TABLE:

INSERT INTO user_transaction (
    transaction_ticker, 
    transaction_quantity, 
    transaction_is_new_total, 
    transaction_type, 
    transaction_date_time, 
    transaction_time_zone, 
    user_id, 
    transaction_source, 
    transaction_activity_type, 
    notes
) VALUES (
    'BTC', 
    0.5, 
    TRUE, 
    'Purchase', 
    CURRENT_TIMESTAMP, 
    'UTC', 
    (SELECT user_id FROM users WHERE username = 'Mo'), 
    'CoinGecko', 
    'Purchase', 
    'Initial Test Transaction'
);

