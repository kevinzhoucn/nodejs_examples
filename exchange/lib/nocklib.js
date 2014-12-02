'use strict';

var crypto = require('crypto')
  , db = require('./db')
  , exchange = require('./exchange')
  , priceFloor = 35
  , priceRange = 10
  , volFloor = 80
  , volRange = 40;

function encryptPassword(plainText) {
  return crypto.createHash('md5').update(plainText).digest('hex');
}

module.exports = {
  createUser: function(username, email, password, callback) {
    var user = {username: username, email: email
      , password: encryptPassword(password)};
    db.insertOne('users', user, callback);
  },
  
  generateRandomOrder: function(exchangeData) {
    var order = {};
    if (Math.random() > 0.5) order.type = exchange.BUY
    else order.type = exchange.SELL
     
    var buyExists = exchangeData.buys 
                    && exchangeData.buys.prices.peek();
    var sellExists = exchangeData.sells 
                    && exchangeData.sells.prices.peek();
    var ran = Math.random();

    if (!buyExists && !sellExists)
      order.price = Math.floor(ran * priceRange) + priceFloor;
    else if (buyExists && sellExists) {
      if (Math.random() > 0.5)
        order.price = exchangeData.buys.prices.peek();
      else
        order.price = exchangeData.sells.prices.peek();
    } else if (buyExists) {
      order.price = exchangeData.buys.prices.peek();
    } else {
      order.price = exchangeData.sells.prices.peek();
    }
  
    var shift = Math.floor(Math.random() * priceRange / 2);
    
    if (Math.random() > 0.5) order.price += shift;
    else order.price -= shift;
    order.volume = Math.floor(Math.random() * volRange) + volFloor;
    return order;
  }
}