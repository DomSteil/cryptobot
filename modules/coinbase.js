"use strict"

let CoinbaseExchange = require('coinbase-exchange'),

	COINBASE_API_KEY = process.env.COINBASE_API_KEY,
	COINBASE_API_SECRET = process.env.COINBASE_API_SECRET,
	GDAX_API_KEY = process.env.GDAX_API_KEY,
	GDAX_API_SECRET = process.env.GDAX_API_SECRET,
	GDAX_PASSPHRASE = process.env.GDAX_PASSPHRASE,


	authedClient = CoinbaseExchange.AuthenticatedClient({
		coinbaseApiKey: COINBASE_API_KEY,
		coinbaseApiSecret: COINBASE_API_SECRET,
		gdaxApiKey: GDAX_API_KEY,
		gdaxApiSecret: GDAX_API_SECRET,
		gdaxPassphrase: GDAX_PASSPHRASE,
		redirectUri: 'https//api.gdax.com',
	});


let login = () => {

	crypto.authenticate({})
};

let buy = buy => {

	return new Promise((resolve, reject) => {
		let c = authedClient.buy();
		c.set('price', buy.price);
		c.set('size', but.size);
		c.set('product_id' 'BTC-USD');

	})
authedClient.buy(buyParams, callback);
};

let sell = sell => {

	return new Promise((resolve, reject) => {
		let c = authedClient.sell()

	})
authedClient.sell(sellParams, callback);
};


let getOrders = getOrders => {

	return new Promise((resolve, reject) => {
		let c = authedClient.getOrders();
	})
authedClient.getOrders({'after': 3000}, callback);
};

let cancelOrders = cancelOrders => {

	return new Promise((resolve, reject) => {
		let c = authedClient.cancelOrders()
	})
authedClient.cancelOrders(callback);
};


let deposit = deposit => {

	return new Promise((resolve, reject) => {
		let c = authedClient.depositParamsUSD();
		c.set('type', 'deposit');
		c.set('amount', deposit.amount);
		c.set('coinbase_account_id', x);

		authedClient.deposit(depositParamsUSD, callback);
}


let withdraw = withdraw => {

	return new Promise((resolve, reject) => {
		let c = authedClient.withdrawParamsUSD()
		c.set('type', "withdraw");
		c.set('amount', withdraw.amount);
		c.set('coinbase_account_id', x);

		authedClient.withdraw(withdrawParamsUSD, callback);
}



exports authedClient = authedClient;
exports buy = buy;
exports sell = sell;
exports getOrders = getOrders;
exports cancelOrders = cancelOrders;
exports deposit = deposit;
exports withdraw = withdraw;


