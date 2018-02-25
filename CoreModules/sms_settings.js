//node dependencies
var uuid = require('uuid');
var moment = require('moment');
var sync = require('sync');
var async = require('async');
var https = require('https');
const querystring = require('querystring');
var request = require('request');


//database models
var SMS_Providers = require('../Models/SMS_Providers.js');
var ApiResponce = require("../Models/Apiresponce.js");
var ApiMessages = require("../Models/Apimessages.js");

//Other Variables
var config = require("../Config/config.js");




exports.SMS_Testing2 = function (callback) {
    var phone = '8801362790';
    var message = 'hi+from+evontex';
    request({
        method: 'POST',
        url: 'https://alerts.solutionsinfini.com/api/v4/?api_key=A8ecd35d466a2e278ca5d53a8fda8c2d7&sender=EZSHIP&method=sms&to=' + phone + '&message=' + 'Test+sms'
    }, function (error, response, body) {
        console.log(error)
        // console.log(response)
        console.log(body);
        callback({Status:"Message request successfully"});
    })
};
exports.SMS_Testing = function (callback) {
    var MessageData = {
        "sms":
        [
            {
                "to": "8801362790",
                "message": "This is Message from Solutions Infini"
            }
        ]
    };
    var Base_Url = config.solutionsinfini.Base_Url;
    var phone = '8801362790';
    var message = 'hi+from+evontex';
    var newmessage = querystring.escape(message);
    var url = Base_Url + '&sender=EZSHIP&method=sms&to=' + phone + '&message=' + newmessage;
    var formatUrl = querystring.escape(url);
    var result = '';
    var options = {
        host: 'alerts.solutionsinfini.com',
        port: 443,
        method: 'POST',
        path: '/api/v4/?api_key=A8ecd35d466a2e278ca5d53a8fda8c2d7' + '&sender=EZSHIP&method=sms&to=' + phone + '&message=' + 'Test+sms',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    var str = '';
    var req = https.request(options, function (res) {
        var data;
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk);
            str += chunk
        });
        res.on('end', () => {
            callback(str);
        })
    });
    req.end();
};

exports.List_All_SMS_Provider_with_Credit_Balance = function (callback) {
    function SMS_Provider_Listing(callback) {
        process.nextTick(function () {
            SMS_Providers.find({ Status: true }).exec(function (err, Result) {
                callback(null, Result);
            })
        })
    };
    function MSG91BALANCE(callback) {
        process.nextTick(function () {
            var Balance = 0;
            var url = 'https://control.msg91.com/api/balance.php?type=4&authkey=146671AhmDQFfswP58da2e0a';
            var result = '';
            https.get(url, (res) => {
                res.setEncoding('utf8');
                res.on('data', (d) => {
                    result += d;
                })
                var error;
                res.on('end', () => {
                    Balance = parseInt(result);
                    callback(null, Balance);
                })
            });
        })
    }
    function SOLUTIONSINFINIBALANCE(callback) {
        process.nextTick(function () {
            console.log("Entering for http call");
            var Balance = 0;
            var Base_Url = config.solutionsinfini.Base_Url;
            var url = Base_Url + '&method=account.credits';
            var result = '';
            https.get(url, (res) => {
                res.setEncoding('utf8');
                res.on('data', (d) => {
                    result += d;
                })
                var error;
                res.on('end', () => {
                    var Resp = JSON.parse(result);
                    if (Resp.status == "OK") {
                        Balance = parseInt(Resp.data.credits);
                    } else {
                        Balance = 0;
                    }
                    callback(null, Balance);
                })
            });
        });
    }
    sync(function () {
        var Result = SMS_Provider_Listing.sync(null);
        var ProviderData = [];
        async.each(Result, function (item, resp) {
            var Balance = 0;
            if (item.Service_Type == 1) {
                Balance = MSG91BALANCE.sync(null);
            } else if (item.Service_Type == 2) {
                Balance = SOLUTIONSINFINIBALANCE.sync(null);
            }
            ProviderData.push({
                ProviderID: item.ProviderID,
                ProviderName: item.ProviderName,
                Selected_Provider: item.Selected_Provider,
                Balance: Balance
            })
            resp();
        }, function (err) {
            if (!err) {
                return callback(new ApiResponce({
                    success: true,
                    extras: {
                        ProviderData: ProviderData
                    }
                }));
            }
        })
    })
}


exports.Check_for_ProviderID = function (values, callback) {
    var query = {
        ProviderID: values.ProviderID
    };
    SMS_Providers.findOne(query).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                callback(false, Result);
            } else if (Result == null) {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.SMS_PROVIDER_NOT_FOUND
                    }
                }));
            }
        }
    });
}
exports.Change_Provider_Name = function (values, callback) {
    var query = {
        ProviderID: values.ProviderID
    };
    var changes = {
        $set: {
            ProviderName: values.ProviderName
        }
    };
    SMS_Providers.update(query, changes).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            return callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "SMS Provider Name Changed Successfully"
                }
            }));
        }
    })
};
exports.Change_Service_Provider = function (values, callback) {
    var query = {
        ProviderID: values.ProviderID
    };
    var changes = {
        $set: {
            Selected_Provider: true
        }
    };
    var otherquery = {
        ProviderID: {
            $ne: values.ProviderID
        }
    };
    var otherchanges = {
        $set: {
            Selected_Provider: false
        }
    };
    var multiplicity = {
        multi: true
    };
    SMS_Providers.update(query, changes).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "SMS Service Provider Changed Successfully"
                }
            }));
            SMS_Providers.update(otherquery, otherchanges, multiplicity).exec(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("All Others providers set false")
                }
            });
        }
    })
};

exports.Create_SMS_Provider = function (values, callback) {
    var ProviderID = uuid();
    var date = new Date();
    var ProviderData = new SMS_Providers({
        ProviderID: ProviderID,
        ProviderName: values.ProviderName,
        Selected_Provider: false,
        created_at: date,
        updated_at: date
    });
    ProviderData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            return callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "SMS Provider Added Successfully"
                }
            }));
        }
    })
};


