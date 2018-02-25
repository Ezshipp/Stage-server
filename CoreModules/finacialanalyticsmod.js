var ApiResponce = require("../Models/Apiresponce.js");
var ApiMessages = require("../Models/Apimessages.js");
var Customers = require("../Models/Customers.js");
var admin_users = require("../Models/admin_users.js");
var Admin_Logs = require("../Models/Admin_Logs.js");
var operators = require("../Models/operators.js");
var Driver_Expenses = require("../Models/Driver_Expenses.js");
var razorpay = require('../CoreModules/razorpay');
var htmlToPdf = require('html-to-pdf');
var crypto = require('crypto');
var uuid = require('uuid');
var rand = require('csprng');
var Config = require("../Config/config.js");
var config = require("../Config/config.js");
var Counters = require('../Models/Counters.js');
var Customers = require('../Models/Customers.js');
var CUSTOMERSESSION = require('../Models/CUSTOMERSESSION.js');
var CustomerPasswordTries = require('../Models/CustomerPasswordTries.js');
var Cookie = require('../Models/Cookie.js');
var COOKIE_TOKEN_SECURITY = require('../Models/COOKIE_TOKEN_SECURITY.js');
var CustomerForgotPasswordTries = require('../Models/CustomerForgotPasswordTries.js');
var Drivers = require('../Models/Drivers.js');
var Driver_Salaries_Logs = require('../Models/Driver_Salaries_Logs.js');
var Orders = require('../Models/Orders.js');
var ZONES = require('../Models/ZONES.js');
var OTP = require('../Models/OTP.js');
var Guest_OTP = require('../Models/Guest_OTP.js');
var Recursive_Order_MemberShip = require('../Models/Recursive_Order_MemberShip.js');
var Orders_Images = require('../Models/Orders_Images.js');
var Vendors = require('../Models/Vendors.js');
var Vendors_Price = require('../Models/Vendors_Price.js');
var Vendors_Orders = require('../Models/Vendors_Orders.js');
var Vendor_Orders_Detail = require('../Models/Vendor_Orders_Detail.js');
var can_reason = require('../Models/can_reason.js');
var Offers = require('../Models/Offers.js');
var Offers_Percentage = require('../Models/Offers_Percentage.js');
var Offers_Used_Customers = require('../Models/Offers_Used_Customers.js');
var Country = require('../Models/Country.js');
var City = require('../Models/City.js');
var Referral_Relation = require('../Models/Referral_Relation.js');
var Offers_Lottery = require('../Models/Offers_Lottery.js');
var admin_users = require('../Models/admin_users.js');
var Admin_Logs = require('../Models/Admin_Logs.js');
var operators = require('../Models/operators.js');
var Customer_Premium_Pricing = require('../Models/Customer_Premium_Pricing.js');
var Driver_Expenses = require("../Models/Driver_Expenses.js");
var Address_Logs = require("../Models/Address_Logs.js");
var Store_Entity = require("../Models/Store_Entity.js");
var Store_Branch = require("../Models/Store_Branch.js");
var Customer_Invoicing = require("../Models/Customer_Invoicing.js");
var Store_Categories = require("../Models/Store_Categories.js");
var Store_SubCategory_level2 = require("../Models/Store_SubCategory_level2.js");
var Store_SubCategory_level3 = require("../Models/Store_SubCategory_level3.js");
var Customer_Store_Cart_Details = require("../Models/Customer_Store_Cart_Details.js");
var Customer_Store_Cart_Items = require("../Models/Customer_Store_Cart_Items.js");
var Store_Admin_Sessions = require("../Models/Store_Admin_Sessions.js");
var Store_Products = require("../Models/Store_Products.js");
var Store_Products_Addons = require("../Models/Store_Products_Addons.js");
var Store_Products_Images = require("../Models/Store_Products_Images.js");
var sync = require('sync');

var fcmmod = require('../CoreModules/fcmmod.js'); // Setting the Path for FCM Modules
var FCMMod = new fcmmod();
var moment = require('moment');
var msg91mod = require('../CoreModules/msg91mod.js'); // Setting the Path for Message91 Modules
var MSG91MOD = new msg91mod();
var ObjectID = require('mongodb').ObjectID;

var distance = require('google-distance-matrix');
distance.key(config.Google_Api_Key);
distance.units('imperial');
distance.mode('driving');
var base64ImageToFile = require('base64image-to-file');
var knoxClient = require('knox').createClient({
    key: require('../Config/config.js').S3AccessKey,
    secret: require('../Config/config.js').S3Secret,
    bucket: require('../Config/config.js').S3Bucket
});
var fs = require('fs');
var htmlToPdf = require('html-to-pdf');
var async = require('async');
var StoreMod = require('../CoreModules/storemod.js'); // Setting the Path for Customer Modulesvar StoreMod = require('../CoreModules/storemod.js'); // Setting the Path for Customer Modules
var FinancialAnalyticsMod = require('../CoreModules/finacialanalyticsmod.js'); // Setting the Path for Customer Modulesvar StoreMod = require('../CoreModules/storemod.js'); // Setting the Path for Customer Modules

//Formatted String
exports.Format_Beautify_String = function (string) {
    string = string.replace(/\s\s+/g, ' ');
    string = string.replace(/  +/g, ' ');
    string = string.replace(/^ /, '');
    string = string.replace(/\s\s*$/, '');
    string = titleString(string);
    function titleString(str) {
        var myArr = str.toLowerCase().split(" ");
        for (var a = 0; a < myArr.length; a++) {
            myArr[a] = myArr[a].charAt(0).toUpperCase() + myArr[a].substr(1);
        }
        return myArr.join(" ");
    }
    return string;
};
//Fixed Monthly Wise Price Analytics for Interval
exports.Fixed_Monthly_Wise_Analytics_Order_Price_Between_Dates = function (values, callback) {
    function OrderPriceFunction(from_moment, to_moment, callback) {
        process.nextTick(function () {
            from_moment = from_moment.subtract(330, 'minutes')
            to_moment = to_moment.subtract(330, 'minutes');
            var query;
            query = {
                Date: {
                    $gte: from_moment,
                    $lte: to_moment
                },
                WhetherStoreOrder: false,
                Whether_Deleted: false,
                status: 14
            }
            var Price = 0;
            Orders.find(query).exec(function (err, Result) {
                if (!err) {
                    async.each(Result, function (item, resp) {
                        Customers.findOne({ _id: item.userId }).exec(function (err, CustomerData) {
                            if (err) {
                                resp();
                            } else {
                                if (CustomerData == null) {
                                    resp();
                                } else if (CustomerData != null) {
                                    if (CustomerData.Premium_User == true && CustomerData.Premium_Status == true) {
                                        resp();
                                    } else {
                                        Price += Number(item.deliverycharge);
                                        resp();
                                    }
                                }
                            }
                        })
                    }, function (err) {
                        if (!err) {
                            callback(null, Price);
                        }
                    })
                }
            })
        })
    }
    sync(function () {
        var PriceMonthWiseData = [];
        var startDateMoment = moment(values.from_date, 'DD/MM/YYYY').subtract(330, 'minutes');
        var endDateMoment = moment(values.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days');
        var differenceMonth = Math.abs(startDateMoment.diff(endDateMoment, 'months')) + 1;
        var startMonth = 0;
        var endMonth = 1;
        var from_moment;
        var to_moment;
        for (var month = 1; month <= differenceMonth; month++) {
            if (month == differenceMonth) {
                from_moment = moment(values.from_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(startMonth, 'month');
                to_moment = moment(values.to_date, 'DD/MM/YYYY').subtract(330, 'minutes');
                var Price = OrderPriceFunction.sync(null, from_moment, to_moment);

                PriceMonthWiseData.push({
                    From_Date: from_moment.format('DD-MM-YYYY'),
                    To_Date: to_moment.format('DD-MM-YYYY'),
                    Price: Price
                });
                startMonth++;
                endMonth++;
            } else {
                from_moment = moment(values.from_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(startMonth, 'month');
                to_moment = moment(values.from_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(endMonth, 'month');
                var Price = OrderPriceFunction.sync(null, from_moment, to_moment);
                PriceMonthWiseData.push({
                    From_Date: from_moment.format('DD-MM-YYYY'),
                    To_Date: to_moment.format('DD-MM-YYYY'),
                    Price: Price
                });
                startMonth++;
                endMonth++;
            }
        }

        return callback(new ApiResponce({
            success: true,
            extras: {
                PriceMonthWiseData: PriceMonthWiseData
            }
        }));
    })
}
//Monthly Wise Price Analytics for Interval
exports.Monthly_Wise_Analytics_Order_Price_Between_Dates = function (values, callback) {
    function OrderPriceFunction(from_moment, to_moment, callback) {
        process.nextTick(function () {
            var query;
            query = {
                Date: {
                    $gte: from_moment,
                    $lte: to_moment
                },
                WhetherStoreOrder: false,
                Whether_Deleted: false,
                status: 14,
                "eventLog.status": 14
            }
            var Price = 0;
            Orders.find(query).exec(function (err, Result) {
                if (!err) {
                    async.each(Result, function (item, resp) {
                        Customers.findOne({ _id: item.userId }).exec(function (err, CustomerData) {
                            if (err) {
                                resp();
                            } else {
                                if (CustomerData == null) {
                                    resp();
                                } else if (CustomerData != null) {
                                    if (CustomerData.Premium_User == true && CustomerData.Premium_Status == true) {
                                        resp();
                                    } else {
                                        Price += Number(item.deliverycharge);
                                        resp();
                                    }
                                }
                            }
                        })
                    }, function (err) {
                        if (!err) {
                            callback(null, Price);
                        }
                    })
                }
            })
        })
    }
    sync(function () {
        var PriceMonthWiseData = [];
        var startDateMoment = moment(values.from_date, 'DD/MM/YYYY').subtract(330, 'minutes');
        var endDateMoment = moment(values.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days');

        var differenceMonth = Math.abs(startDateMoment.diff(endDateMoment, 'months')) + 1;
        var startMonth = 0;
        var from_moment;
        var to_moment;
        for (var month = 1; month <= differenceMonth; month++) {
            from_moment = moment(values.from_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(startMonth, 'month').startOf('month');
            to_moment = moment(values.from_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(startMonth, 'month').endOf('month');

            var Price = OrderPriceFunction.sync(null, from_moment, to_moment);
            PriceMonthWiseData.push({
                Date: from_moment.format('MMMM-YYYY'),
                Price: Price
            });
            startMonth++;
        }

        return callback(new ApiResponce({
            success: true,
            extras: {
                PriceMonthWiseData: PriceMonthWiseData
            }
        }));
    })
}
//Day Wise Price Analytics for Interval
exports.Day_Wise_Analytics_Order_Price_Between_Dates = function (values, callback) {
    function OrderPriceFunction(from_moment, to_moment, callback) {
        process.nextTick(function () {
            from_moment = from_moment.subtract(330, 'minutes');
            to_moment = to_moment.subtract(330, 'minutes');
            var query;
            query = {
                Date: {
                    $gte: from_moment,
                    $lte: to_moment
                },
                WhetherStoreOrder: false,
                Whether_Deleted: false,
                status: 14,
                "eventLog.status": 14
            }
            console.log("qygeuhijlsl;akl;kal;z;alk;l;'l");
            console.log(query);
            var Price = 0;
            Orders.find(query).exec(function (err, Result) {
                if (!err) {
                    async.each(Result, function (item, resp) {
                        Customers.findOne({ _id: item.userId }).exec(function (err, CustomerData) {
                            if (err) {
                                resp();
                            } else {
                                if (CustomerData == null) {
                                    resp();
                                } else if (CustomerData != null) {
                                    if (CustomerData.Premium_User == true && CustomerData.Premium_Status == true) {
                                        resp();
                                    } else {
                                        Price += Number(item.deliverycharge);
                                        resp();
                                    }
                                }
                            }
                        })
                    }, function (err) {
                        if (!err) {
                            callback(null, Price);
                        }
                    })
                }
            })
        })
    }
    sync(function () {
        var PriceDayWiseData = [];
        var startDateMoment = moment(values.from_date, 'DD/MM/YYYY').utcOffset(330)
        var endDateMoment = moment(values.to_date, 'DD/MM/YYYY').utcOffset(330).add(1, 'days');
        console.log("udaaaaaaaaklakljlalkl;kal;k;akl;kal;kl;ka");
        console.log(startDateMoment);
        console.log(endDateMoment);
        var differenceDays = Math.abs(startDateMoment.diff(endDateMoment, 'days'));
        var startDay = 0;
        var endDay = 1;
        var from_moment;
        var to_moment;
        for (var day = 0; day < differenceDays; day++) {
            from_moment = moment(values.from_date, 'DD/MM/YYYY').add(startDay, 'days');
            to_moment = moment(values.from_date, 'DD/MM/YYYY').add(endDay, 'days');
            var Price = OrderPriceFunction.sync(null, from_moment, to_moment);
            PriceDayWiseData.push({
                Date: from_moment.utcOffset(330).format('DD/MM/YYYY'),
                Price: Price
            });
            startDay++;
            endDay++;
        }

        return callback(new ApiResponce({
            success: true,
            extras: {
                PriceDayWiseData: PriceDayWiseData
            }
        }));
    })
}
//Hour Wise Price Analytics for Today
exports.Hour_Wise_Analytics_Order_Price_Today = function (callback) {
    function OrderPriceFunction(interval, callback) {
        process.nextTick(function () {
            var from_moment = moment(interval, 'H').utcOffset(330).subtract(390, 'minute');
            var to_moment = moment(interval, 'H').utcOffset(330).subtract(330, 'minute');
            var query;
            query = {
                Date: {
                    $gte: from_moment,
                    $lte: to_moment
                },
                WhetherStoreOrder: false,
                Whether_Deleted: false,
                status: 14,
                "eventLog.status": 14
            }
            var Price = 0;
            Orders.find(query).exec(function (err, Result) {
                if (!err) {
                    async.each(Result, function (item, resp) {
                        Customers.findOne({ _id: item.userId }).exec(function (err, CustomerData) {
                            if (err) {
                                resp();
                            } else {
                                if (CustomerData == null) {
                                    resp();
                                } else if (CustomerData != null) {
                                    if (CustomerData.Premium_User == true && CustomerData.Premium_Status == true) {
                                        resp();
                                    } else {
                                        Price += Number(item.deliverycharge);
                                        resp();
                                    }
                                }
                            }
                        })
                    }, function (err) {
                        if (!err) {
                            callback(null, Price);
                        }
                    })
                }
            })
        })
    }
    sync(function () {
        var PriceIntervalData = [];
        var format = 'H:mm:ss';
        var time = moment().utcOffset(330).format(format);
        var timearray = time.split(':');
        var hour = parseInt(timearray[0]);
        var minute = parseInt(timearray[1]);
        var interval;
        if (minute == 0) {
            interval = hour;
        } else {
            interval = hour + 1;
        };
        for (var int = 1; int <= interval; int++) {
            var Price = OrderPriceFunction.sync(null, int);
            PriceIntervalData.push({
                interval: int,
                Price: Price
            });
        }
        return callback(new ApiResponce({
            success: true,
            extras: {
                PriceIntervalData: PriceIntervalData
            }
        }));
    })
};
//Hour Wise Price Analytics for Date Wise
exports.Hour_Wise_Analytics_Date_Wise_Order_Price_Today = function (values, callback) {

    function OrderPriceFunction(from_moment, to_moment, callback) {
        process.nextTick(function () {
            var query;
            query = {
                Date: {
                    $gte: from_moment,
                    $lte: to_moment
                },
                WhetherStoreOrder: false,
                Whether_Deleted: false,
                status: 14
            }
            var Price = 0;
            Orders.find(query).exec(function (err, Result) {
                if (!err) {
                    async.each(Result, function (item, resp) {
                        Customers.findOne({ _id: item.userId }).exec(function (err, CustomerData) {
                            if (err) {
                                resp();
                            } else {
                                if (CustomerData == null) {
                                    resp();
                                } else if (CustomerData != null) {
                                    if (CustomerData.Premium_User == true && CustomerData.Premium_Status == true) {
                                        resp();
                                    } else {
                                        Price += Number(item.deliverycharge);
                                        resp();
                                    }
                                }
                            }
                        })
                    }, function (err) {
                        if (!err) {
                            callback(null, Price);
                        }
                    })
                }
            })
        })
    }
    sync(function () {
        var PriceIntervalData = [];
        var date = moment(values.Date, "DD/MM/YYYY").subtract(330, "minutes");
        var start = 0;
        var end = 1;
        for (var int = 1; int <= 24; int++) {
            var from_moment = moment(values.Date, "DD/MM/YYYY").subtract(330, "minutes").add(start, "hours");
            var to_moment = moment(values.Date, "DD/MM/YYYY").subtract(330, "minutes").add(end, "hours");
            var Price = OrderPriceFunction.sync(null, from_moment, to_moment);
            PriceIntervalData.push({
                interval: int,
                Price: Price
            });
            start++;
            end++;
        }
        return callback(new ApiResponce({
            success: true,
            extras: {
                PriceIntervalData: PriceIntervalData
            }
        }));
    })
}
//Find All Price Analytics Order Type Wise
exports.Find_All_OrderTypes_Collection_Date_Range = function (values, callback) {
    var from_moment = moment(values.from_date, 'DD/MM/YYYY').subtract(330, 'minutes');
    var to_moment = moment(values.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days');
    function OrderPriceFunction(type, callback) {
        process.nextTick(function () {
            var query;
            if (type == 1) {
                //Cancelled Orders
                query = {
                    Date: {
                        $gte: from_moment,
                        $lte: to_moment
                    },
                    WhetherStoreOrder: false,
                    Whether_Deleted: false,
                    status: 5
                }
            } else if (type == 2) {
                //Ongoing Orders
                query = {
                    Date: {
                        $gte: from_moment,
                        $lte: to_moment
                    },
                    WhetherStoreOrder: false,
                    Whether_Deleted: false,
                    status: {
                        $in: [1, 7, 10, 11, 12, 15, 18, 16]
                    }
                }
            } else if (type == 3) {
                //Completed Jobs
                query = {
                    Date: {
                        $gte: from_moment,
                        $lte: to_moment
                    },
                    WhetherStoreOrder: false,
                    Whether_Deleted: false,
                    status: 14,
                    "eventLog.status": 14
                }
            } else if (type == 4) {
                //Instant Orders
                query = {
                    Date: {
                        $gte: from_moment,
                        $lte: to_moment
                    },
                    WhetherStoreOrder: false,
                    Whether_Deleted: false,
                    bookingType: 1,
                    status: 14
                }
            } else if (type == 5) {
                //4hours Orders
                query = {
                    Date: {
                        $gte: from_moment,
                        $lte: to_moment
                    },
                    WhetherStoreOrder: false,
                    Whether_Deleted: false,
                    bookingType: 2,
                    status: 14
                }

            } else if (type == 6) {
                //Same Day Orders
                query = {
                    Date: {
                        $gte: from_moment,
                        $lte: to_moment
                    },
                    WhetherStoreOrder: false,
                    Whether_Deleted: false,
                    bookingType: 3,
                    status: 14
                }
            } else if (type == 7) {
                //ios
                query = {
                    Date: {
                        $gte: from_moment,
                        $lte: to_moment
                    },
                    WhetherStoreOrder: false,
                    Whether_Deleted: false,
                    "Devices.DeviceType": 1
                }
            } else if (type == 8) {
                //anndoid
                query = {
                    Date: {
                        $gte: from_moment,
                        $lte: to_moment
                    },
                    WhetherStoreOrder: false,
                    Whether_Deleted: false,
                    "Devices.DeviceType": 2
                }
            } else if (type == 9) {
                //web
                query = {
                    Date: {
                        $gte: from_moment,
                        $lte: to_moment
                    },
                    WhetherStoreOrder: false,
                    Whether_Deleted: false,
                    "Devices.DeviceType": 3
                }
            } else if (type == 10) {
                //cash on delivery
                query = {
                    "Date": {
                        $gte: from_moment,
                        $lte: to_moment
                    },
                    "Whether_Deleted": false,
                    "paymentType": 1,
                    "status": 14,
                    $or: [
                        {
                            "eventLog": { $elemMatch: { "status": "11" } },
                            "collectionType": 1
                        }, {
                            "eventLog": { $elemMatch: { "status": "14" } },
                            "collectionType": 2
                        }
                    ]
                }
                console.log(query);
            } else if (type == 11) {
                //online delivery
                query = {
                    Date: {
                        $gte: from_moment,
                        $lte: to_moment
                    },
                    WhetherStoreOrder: false,
                    Whether_Deleted: false,
                    paymentType: 2,
                    status: 14
                }
            }
            console.log(query);
            var Price = 0;
            Orders.find(query).exec(function (err, Result) {
                if (!err) {
                    async.each(Result, function (item, resp) {
                        Customers.findOne({ _id: item.userId }).exec(function (err, CustomerData) {
                            if (err) {
                                resp();
                            } else {
                                if (CustomerData == null) {
                                    resp();
                                } else if (CustomerData != null) {
                                    if (CustomerData.Premium_User == true && CustomerData.Premium_Status == true) {
                                        resp();
                                    } else {
                                        Price += parseFloat(item.deliverycharge);
                                        resp();
                                    }
                                }
                            }
                        })
                    }, function (err) {
                        if (!err) {
                            callback(null, Price);
                        }
                    })
                }
            })
        })
    }
    function ExceedPriceFunction(callback) {
        process.nextTick(function () {
            var query;
            //Premium Customer Price
            query = {
                Date: {
                    $gte: from_moment,
                    $lte: to_moment
                },
                WhetherStoreOrder: false,
                Whether_Deleted: false,
                status: 14
            }
            var Price = 0;
            Orders.find(query).exec(function (err, Result) {
                if (!err) {
                    var Price = 0;
                    async.each(Result, function (item, resp) {
                        var ExceededAmount = item.ExceededAmount;
                        var tot = 0;
                        if (item.Monthly_Invoice == true) {
                            tot = 0;
                        } else {
                            tot = ExceededAmount;
                        };
                        Price += tot;
                        resp();
                    }, function (err) {
                        if (!err) {
                            callback(null, Price);
                        }
                    })
                }
            })
        })
    }
    function PremiumPriceFunction(callback) {
        process.nextTick(function () {
            var query;
            //Premium Customer Price
            query = {
                Date: {
                    $gte: from_moment,
                    $lte: to_moment
                },
                WhetherStoreOrder: false,
                Whether_Deleted: false,
                status: 14
            }
            var Price = 0;
            Orders.find(query).exec(function (err, Result) {
                if (!err) {
                    async.each(Result, function (item, resp) {
                        Customers.findOne({ _id: item.userId }).exec(function (err, CustomerData) {
                            if (err) {
                                resp();
                            } else {
                                if (CustomerData == null) {
                                    resp();
                                } else if (CustomerData != null) {
                                    if (CustomerData.Premium_User == true && CustomerData.Premium_Status == true) {
                                        if (CustomerData.Premium_Pricing_Set == true) {
                                            if (item.bookingType == 1) {
                                                Price += CustomerData.Premium_Instant_Pricing;
                                            } else if (item.bookingType == 2) {
                                                Price += CustomerData.Premium_4hours_Pricing;
                                            } else if (item.bookingType == 3) {
                                                Price += CustomerData.Premium_Same_Day_Pricing;
                                            }
                                            resp();
                                        } else {
                                            Price += Number(item.deliverycharge);
                                            resp();
                                        }
                                    } else {
                                        resp();
                                    }
                                }
                            }
                        })
                    }, function (err) {
                        if (!err) {
                            callback(null, Price);
                        }
                    })
                }
            })
        })
    }

    sync(function () {
        var type;
        type = 1;
        var Cancelled_Price = OrderPriceFunction.sync(null, type);
        type = 2;
        var Ongoing_Price = OrderPriceFunction.sync(null, type);
        type = 3;
        var Completed_Price = OrderPriceFunction.sync(null, type);
        type = 4;
        var Instant_Price = OrderPriceFunction.sync(null, type);
        type = 5;
        var Four_Hours_Price = OrderPriceFunction.sync(null, type);
        type = 6;
        var Same_Day_Price = OrderPriceFunction.sync(null, type);
        type = 7;
        var IOS_Price = OrderPriceFunction.sync(null, type);
        type = 8;
        var Android_Price = OrderPriceFunction.sync(null, type);
        type = 9;
        var Web_Price = OrderPriceFunction.sync(null, type);
        type = 10;
        var COD_Price = OrderPriceFunction.sync(null, type);
        type = 11;
        var Online_Price = OrderPriceFunction.sync(null, type);
        var Premium_Customer_Price = PremiumPriceFunction.sync(null);
        var Total_ExceededAmount = ExceedPriceFunction.sync(null);

        var Total_Pricing = {
            Cancelled_Price: Cancelled_Price,
            Ongoing_Price: Ongoing_Price,
            Completed_Price: Completed_Price,
            Instant_Price: Instant_Price,
            Four_Hours_Price: Four_Hours_Price,
            Same_Day_Price: Same_Day_Price,
            IOS_Price: IOS_Price,
            Android_Price: Android_Price,
            Web_Price: Web_Price,
            COD_Price: COD_Price,
            Online_Price: Online_Price,
            Premium_Customer_Price: Premium_Customer_Price,
            Total_ExceededAmount: Total_ExceededAmount
        };
        return callback(new ApiResponce({
            success: true,
            extras: {
                Total_Pricing: Total_Pricing
            }
        }));
    })
}

exports.Find_Top_Customer_Date_Range = function (values, callback) {
    var from_moment = moment(values.from_date, 'DD/MM/YYYY').subtract(330, 'minutes');
    var to_moment = moment(values.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days');
    function OrderDateFunction(callback) {
        process.nextTick(function () {
            var query = {
                Whether_Deleted: false,
                WhetherStoreOrder: false,
                Date: {
                    $gte: from_moment,
                    $lte: to_moment
                },
                status: 14,
                "eventLog.status": 14
            }
            Orders.find(query).exec(function (err, Result) {
                callback(null, Result);
            });
        })
    }
    function CustomerOrderCount(CustomerID, callback) {
        process.nextTick(function () {
            var query = {
                Whether_Deleted: false,
                WhetherStoreOrder: false,
                Date: {
                    $gte: from_moment,
                    $lte: to_moment
                },
                status: 14,
                userId: CustomerID
            }
            Orders.count(query).exec(function (err, Count) {
                callback(null, Count);
            })
        })
    }
    function CustomerDataFunction(CustomerID, callback) {
        process.nextTick(function () {
            Customers.findOne({ _id: CustomerID }).exec(function (err, CustomerData) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, CustomerData);
                }
            })
        })
    }
    sync(function () {
        var CustomerData = [{
            OrderCount: 0,
            customerName: "No Customer Found this Interval",
            CustomerID: ""
        }]
        var CustomerID;
        var OrderResult = OrderDateFunction.sync(null);
        if (OrderResult.length <= 0) {
            return callback(false, CustomerData);
        } else {
            OrderResult = OrderResult.reduceRight(function (r, a) {
                r.some(function (b) { return a.userId === b.userId; }) || r.push(a);
                return r;
            }, []);
            async.eachSeries(OrderResult, function (item, resp) {
                var CustomerProfileData = CustomerDataFunction.sync(null, item.userId);
                if (CustomerProfileData == null) {
                    resp();
                } else if (CustomerProfileData != null) {
                    if (CustomerProfileData.Premium_User == true && CustomerProfileData.Premium_Status == true) {
                        resp();
                    } else {
                        var Count = CustomerOrderCount.sync(null, item.userId);
                        if (CustomerData[0].OrderCount < Count) {
                            CustomerData.splice(0, 1);
                            var customerName = FinancialAnalyticsMod.Format_Beautify_String(item.customerName);
                            CustomerData.push({
                                OrderCount: Count,
                                customerName: customerName,
                                CustomerID: item.userId
                            })
                            resp();
                        } else {
                            resp();
                        }
                    }
                }

            }, function (err) {
                return callback(false, CustomerData);
            });
        }
    })
};
exports.Find_Top_Driver_Date_Range = function (values, callback) {
    var from_moment = moment(values.from_date, 'DD/MM/YYYY').subtract(330, 'minutes');
    var to_moment = moment(values.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days');
    function DriverDataFunction(callback) {
        process.nextTick(function () {
            var query = {
                acc_status: 3
            };
            Drivers.find(query).exec(function (err, Result) {
                callback(null, Result);
            });
        })
    }
    function DriverOrderCount(DriverID, callback) {
        process.nextTick(function () {
            var query = {
                Whether_Deleted: false,
                WhetherStoreOrder: false,
                Date: {
                    $gte: from_moment,
                    $lte: to_moment
                },
                status: 14,
                "eventLog.driverid": String(DriverID),
                "eventLog.status": 14
            }
            Orders.count(query).exec(function (err, Count) {
                callback(null, Count);
            })
        })
    }
    sync(function () {
        var DriverData = [{
            OrderCount: 0,
            DriverName: "No Driver Found this Interval",
            DriverID: ""
        }]
        var CustomerID;
        var DriverResult = DriverDataFunction.sync(null);
        async.eachSeries(DriverResult, function (item, resp) {
            var Count = DriverOrderCount.sync(null, item._id);
            if (DriverData[0].OrderCount < Count) {
                DriverData.splice(0, 1);
                var name = item.name + ' ' + item.lname
                var DriverName = FinancialAnalyticsMod.Format_Beautify_String(name);
                DriverData.push({
                    OrderCount: Count,
                    DriverName: DriverName,
                    DriverID: item._id
                })
                resp();
            } else {
                resp();
            }
        }, function (err) {
            return callback(false, DriverData);
        });
    })
};