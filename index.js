'use strict';

var paypal = require('paypal-rest-sdk');
var PRICE = "1";
var CURRENCY = "USD";

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM',
    'headers': {
        'custom': 'header'
    }
});

exports.pay = function (res, req, description, urls) {
    var payment = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": urls[0],
            "cancel_url": urls[1]
        },
        "transactions": [{
            "amount": {
                "total": PRICE,
                "currency": CURRENCY
            },
            "description": description
        }]
    };

    paypal.payment.create(payment, function (error, payment) {
        if (error) {
            console.log(error);
        } else {
            if (payment.payer.payment_method === 'paypal') {
                req.paymentId = payment.id;
                var redirectUrl;
                console.log(payment);
                for (var i = 0; i < payment.links.length; i++) {
                    var link = payment.links[i];
                    if (link.method === 'REDIRECT') {
                        redirectUrl = link.href;
                    }
                }
                res.redirect(redirectUrl);
            }
        }
    });
}