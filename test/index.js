var express = require('express');
var paypal = require('../index')
var app = express();
app.use(express.static(__dirname));


app.post('/makepay', function(req, res) {
    paypal.pay(res, req, "Test paypal pay", ["localhost:3000", "localhost:3000/cancel.html" ]);
});


app.listen(3000);
console.log('test is listening on 3000');
