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
//mongodump -h db.ezshipp.com:1234 -d ezshipp -u ezshippDBA -p ezshippevontex -o
var zone = ZONES;
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
var Customer_Order_Sheets = require("../Models/Customer_Order_Sheets.js");
var Customer_Order_Sheet_Records = require("../Models/Customer_Order_Sheet_Records.js");
var Customer_Order_Queue = require("../Models/Customer_Order_Queue.js");
var Customer_Order_Queue_Directions = require("../Models/Customer_Order_Queue_Directions.js");
var Customer_New_Order_Directional = require("../Models/Customer_New_Order_Directional.js");
var Customer_New_Order_Directions_Data = require("../Models/Customer_New_Order_Directions_Data.js");

var sync = require('sync');
var ExcelMod = require('../CoreModules/excelmod.js'); // Setting the Path for Customer Modules

var fcmmod = require('../CoreModules/fcmmod.js'); // Setting the Path for FCM Modules
var FCMMod = new fcmmod();
var moment = require('moment');
var msg91mod = require('../CoreModules/msg91mod.js'); // Setting the Path for Message91 Modules
var MSG91MOD = new msg91mod();
var ObjectID = require('mongodb').ObjectID;
var customermod = require('../CoreModules/customermod.js'); // Setting the Path for Customer Modules
var CustomerMod = new customermod();

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
var StoreMod = require('../CoreModules/storemod.js'); // Setting the Path for Customer Modules

var cron = require('cron');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var os = require('os');
var XLSX = require('xlsx');
exports.Generate_Random_16_digits_Sequence_Number = function (resp) {
    function CustomerSequenceFunction(Sequence_Code, callback) {
        process.nextTick(function () {
            Customer_New_Order_Directional.findOne({
                Sequence_Code: Sequence_Code
            }).exec(function (err, Result) {
                callback(null, Result)
            })
        })
    }
    sync(function () {
        function Referal() {
            var Sequence_Code;
            var charBank1 = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
            var charBank2 = "1234567898765432123456789";
            var fstring = '';
            var fnumber = '';
            for (var i = 0; i < 5; i++) {
                fstring += charBank1[parseInt(Math.random() * charBank1.length)];
            }
            for (var j = 0; j < 8; j++) {
                fnumber += charBank2[parseInt(Math.random() * charBank2.length)];
            }
            Sequence_Code = 'SEQ' + fstring + fnumber;
            var Result = CustomerSequenceFunction.sync(null, Sequence_Code);
            if (Result != null) {
                Referal();
            } else {
                return Sequence_Code;
            }
        }
        var Code = Referal();
        console.log(Code);
        resp(false, Code);
    })
}
exports.Update_Order_Directional = function (OrderData, callback) {
    console.log(OrderData);
    async.each(OrderData, function (item, resp) {
        Orders.update({ "_id": item._id }, { "Whether_Directional_Sequence": true }, { multi: true }).exec(function (err, Result) {
            if (err) {
                console.log(err);
                resp();
            }
            else if (!err) {
                console.log(Result);
                resp();
            }
        })
    }, function (err) {
        if (!err) {
            callback(false, 'All Orders Updated')
        }
    })
}
exports.Manual_Route_Customer_New_Ongoing_Orders_Sequence_Direction = function (values, OrderData, DriverData, callback) {
    console.log(values);
    function CheckOrderStatus(OrderData, callback) {
        process.nextTick(function () {
            Orders.findOne({ _id: OrderData._id }).exec(function (err, Result) {
                caches(null, Result);
            })
        })
    }
    function OrderDriverRouting(values, OrderData, DriverID, resp) {
        process.nextTick(function () {
            var orderId = String(OrderData._id);
            var querystring = require('querystring');
            var https = require('https');
            var config = require("../Config/config.js");
            var post_data = querystring.stringify({
                'AdminID': values.AdminID,
                'orderId': orderId,
                'DriverID': DriverID
            });
            var result;
            var options = {
                host: "superadmin.ezshipp.com",
                port: 443,
                method: 'POST',
                path: '/Manual_Ordering',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(post_data)
                }
            };
            var str = '';
            var req = https.request(options, function (res) {
                var data;
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    console.log(chunk);
                    str += chunk;
                });
                res.on('end', function () {
                    result = JSON.parse(str);
                    console.log(result);
                    resp(null, result);
                });
            });
            req.write(post_data);
            req.end();
        })
    };

    sync(function () {
        var t = 0;
        var DriverID = String(DriverData._id);
        for (var i = 0; i < OrderData.length; i++) {
            console.log("Entering job " + t);
            var OrderInformation = CheckOrderStatus.sync(null, OrderData[t]);
            if (OrderInformation == null) {
                t++;
            } else if (OrderInformation != null) {
                if (OrderInformation.status == 5 || OrderInformation.status == 9 || OrderInformation.status == 14) {
                    t++;
                } else {
                    var RouteOrder = OrderDriverRouting.sync(null, values, OrderData[t], DriverID);
                    console.log(RouteOrder);
                    t++;
                }
            }
        }
        callback(false, 'All Order are manually routed')
    })
}
exports.Place_Order_Direction_Record = function (values, RecordOrderData, DriverData, callback) {
    function OrderPlacingFunction(OrderData, DriverID, callback) {
        process.nextTick(function () {
            var querystring = require('querystring');
            var https = require('https');
            var config = require("../Config/config.js");
            var post_data = querystring.stringify({
                'CustomerID': OrderData.CustomerID,
                'pickAddress': OrderData.pickAddress,
                'dropAddress': OrderData.dropAddress,
                'pickLatitude': OrderData.pickLatitude,
                'pickLongitude': OrderData.pickLongitude,
                'dropLatitude': OrderData.dropLatitude,
                'dropLongitude': OrderData.dropLongitude,
                'Monthly_Invoice': OrderData.Monthly_Invoice,
                'collectionType': OrderData.collectionType,
                'itemName': OrderData.itemName,
                'itemDescription': '',
                'order_datetime': CustomerMod.DateTime(),
                'orderType': 1,
                'bookingType': 3,
                'receiverName': OrderData.receiverName,
                'receiverPhone': OrderData.receiverPhone,
                'paymentType': 1,
                'paymentId': '',
                'deliverycharge': OrderData.deliverycharge,
                'DriverID': DriverID
            });
            var options = {
                host: config.website,
                port: 443,
                method: 'POST',
                path: '/Vendor_Single_Ordering',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(post_data)
                }
            };
            var str = '';
            var req = https.request(options, function (res) {
                var data;
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    str += chunk;
                });
                res.on('end', function () {
                    var result = JSON.parse(str);
                    callback(null, result);
                });
            });
            req.write(post_data);
            req.end();
        })
    };
    function UpdateRecordOrderPlaced(RecordData, callback) {
        process.nextTick(function () {
            var query = {
                RecordID: RecordData.RecordID
            };
            var changes = {
                $set: {
                    Status: 6,
                    Message: "Order Pick Address and Drop Address Found"
                }
            };
            Customer_Order_Sheet_Records.update(query, changes, function (err, Result) {
                callback(null, 'Record Updated Successfully');
            })
        })
    }
    sync(function () {
        var t = 0;
        var DriverID = String(DriverData._id);
        for (var i = 0; i < RecordOrderData.length; i++) {
            var PlaceRecordOrder = OrderPlacingFunction.sync(null, RecordOrderData[t], DriverID);
            console.log(PlaceRecordOrder);
            var UpdateRecord = UpdateRecordOrderPlaced.sync(null, RecordOrderData[t]);
            t++;
        }
        callback(false, 'All Order Placed and Records also updated')
    })
}
exports.Check_for_Order_Directional_Sequence = function (values, callback) {
    Customer_New_Order_Directional.findOne({ SequenceID: values.SequenceID }, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                callback(false, Result);
            } else if (Result == null) {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Order_Directional_Sequence_Not_Found
                    }
                }));
            }
        }
    })
}
exports.Check_for_Order_QueueID = function (values, callback) {
    Customer_Order_Queue.findOne({ QueueID: values.QueueID }, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                callback(false, Result);
            } else if (Result == null) {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Customer_Order_Queue_Not_Found
                    }
                }));
            }
        }
    })
}
exports.New_Orders_Directions_Sequence_Listing = function (values, callback) {
    var toSkip = parseInt(values.skip);
    var toLimit = parseInt(values.limit);
    var query = {
        Status: true
    };
    var SequenceData = [];
    Customer_New_Order_Directional.count(query).exec(function (err, Count) {
        if (Count >= 0) {
            Customer_New_Order_Directional.find(query).sort('-created_at').skip(toSkip).limit(toLimit).exec(function (err, Result) {
                async.eachSeries(Result, function (item, resp) {
                    var date = moment(item.created_at).utcOffset(330).format('MMM-DD,YYYY h:mm A');
                    SequenceData.push({
                        SequenceID: item.SequenceID,
                        Sequence_Code: item.Sequence_Code,
                        CustomerID: item.CustomerID,
                        CustomerName: item.CustomerName,
                        CustomerPhone: item.CustomerPhone,
                        CustomerEmailID: item.CustomerEmailID,
                        No_Of_Directions: item.No_Of_Directions,
                        No_Of_Records: item.No_Of_Records,
                        date: date
                    })
                    resp();
                }, function (err) {
                    if (!err) {
                        callback(new ApiResponce({
                            success: true,
                            extras: {
                                SequenceData: SequenceData,
                                Count: Count
                            }
                        }));
                    }
                })
            })
        }
    })
}
exports.Queue_Orders_Listing = function (values, callback) {
    var toSkip = parseInt(values.skip);
    var toLimit = parseInt(values.limit);
    var query = {
        Status: true
    };
    var QueueData = [];
    Customer_Order_Queue.count(query).exec(function (err, Count) {
        if (Count >= 0) {
            Customer_Order_Queue.find(query).sort('-created_at').skip(toSkip).limit(toLimit).exec(function (err, Result) {
                async.eachSeries(Result, function (item, resp) {
                    var date = moment(item.created_at).utcOffset(330).format('MMM-DD,YYYY h:mm A');
                    QueueData.push({
                        QueueID: item.QueueID,
                        CustomerID: item.CustomerID,
                        CustomerName: item.CustomerName,
                        CustomerPhone: item.CustomerPhone,
                        CustomerEmailID: item.CustomerEmailID,
                        OrderSheetID: item.OrderSheetID,
                        OrderSheetNumber: item.OrderSheetNumber,
                        filename: item.filename,
                        ProcessStage: item.ProcessStage,
                        No_Of_Directions: item.No_Of_Directions,
                        No_Of_Records: item.No_Of_Records,
                        date: date
                    })
                    resp();
                }, function (err) {
                    if (!err) {
                        callback(new ApiResponce({
                            success: true,
                            extras: {
                                QueueData: QueueData,
                                Count: Count
                            }
                        }));
                    }
                })
            })
        }
    })
}

exports.GENERATE_CUSTOMERS_NEW_ORDERS_DIRECTION = function (values, CustomerData, AvailableOrdersArray, PickupDataAddress, callback) {
    function BearingAngleFunction(PickData, DropData, callback) {
        process.nextTick(function () {
            var geolib = require('geolib');
            var PickLatLong;
            var DropLatLong;
            var BearingData = [];
            var t = 0;
            for (var i = 0; i < PickData.length; i++) {
                PickLatLong = {
                    latitude: PickData[t].pickLatitude,
                    longitude: PickData[t].pickLongitude
                }
                DropLatLong = {
                    latitude: DropData[t].dropLatitude,
                    longitude: DropData[t].dropLongitude
                }
                var bearangle = geolib.getBearing(PickLatLong, DropLatLong);
                BearingData.push(bearangle);
                t++;
            }
            callback(null, BearingData);
        })
    };
    function DistanceFunction(PickData, DropData, callback) {
        process.nextTick(function () {
            var geolib = require('geolib');
            var PickLatLong;
            var DropLatLong;
            var DistanceData = [];
            var t = 0;
            for (var i = 0; i < PickData.length; i++) {
                if (DropData[t].latlong == false) {
                    DistanceData.push(0);
                    t++;
                } else {
                    PickLatLong = {
                        latitude: PickData[t].pickLatitude,
                        longitude: PickData[t].pickLongitude
                    }
                    DropLatLong = {
                        latitude: DropData[t].dropLatitude,
                        longitude: DropData[t].dropLongitude
                    }

                    var distance = geolib.getDistance(PickLatLong, DropLatLong);
                    // distance /= 1000;
                    DistanceData.push(distance);
                    t++;
                }
            }
            callback(null, DistanceData);
        })
    }
    function DistanceLatLongFunction(PickLatLong, DropLatLong, callback) {
        process.nextTick(function () {
            var geolib = require('geolib');
            var distance = geolib.getDistance(PickLatLong, DropLatLong);
            callback(null, distance);
        })
    }
    function DistanceFetch(beariongarray, orderarrydetailarray, callback) {
        process.nextTick(function () {
            console.log("uday starting  " + JSON.stringify(beariongarray));
            var final_directionarray = [];
            var directioncount;
            var final_orderiddetailarray;
            function barringvaluefunc(barringvalue, final_directionarray, orderarrydetailarray) {
                let insidedirectionarray = [];
                //console.log("uday infunction  " + JSON.stringify(beariongarray));
                if (barringvalue >= 0 && barringvalue < 30) {
                    for (var i = 0; i < beariongarray.length; i++) {
                        if ((0 <= beariongarray[i]) && (30 >= beariongarray[i])) {
                            if (((barringvalue - 30) <= (beariongarray[i] + 360)) && ((barringvalue + 30) >= (beariongarray[i] + 360))) {
                                //console.log("condition 1 " + (barringvalue - 30) + " <= " + beariongarray[i])
                                //console.log("condition 2 " + (barringvalue + 30) + " >= " + beariongarray[i])
                                insidedirectionarray.push(orderarrydetailarray[i]);
                                delete beariongarray[i]
                                delete orderarrydetailarray[i]
                            }
                        } else if ((330 <= beariongarray[i]) && (360 >= beariongarray[i])) {
                            if ((((barringvalue + 360) + 30) >= (beariongarray[i])) && (((360 + barringvalue) - 30) <= (beariongarray[i]))) {
                                //console.log("condition 1 " + (barringvalue - 30) + " <= " + beariongarray[i])
                                //console.log("condition 2 " + (barringvalue + 30) + " >= " + beariongarray[i])
                                insidedirectionarray.push(orderarrydetailarray[i]);
                                delete beariongarray[i]
                                delete orderarrydetailarray[i]
                            }
                        } else {
                            if (((barringvalue - 30) <= beariongarray[i]) && ((barringvalue + 30) >= beariongarray[i])) {
                                //console.log("condition 1 " + (barringvalue - 30) + " <= " + beariongarray[i])
                                //console.log("condition 2 " + (barringvalue + 30) + " >= " + beariongarray[i])
                                insidedirectionarray.push(orderarrydetailarray[i]);
                                delete beariongarray[i]
                                delete orderarrydetailarray[i]
                            }
                        }
                    }
                } else if (barringvalue > 330 && barringvalue <= 360) {


                    for (var i = 0; i < beariongarray.length; i++) {

                        if ((0 <= beariongarray[i]) && (30 >= beariongarray[i])) {


                            if (((barringvalue - 30) <= (beariongarray[i] + 360)) && ((barringvalue + 30) >= (beariongarray[i] + 360))) {

                                //console.log("condition 1 " + (barringvalue - 30) + " <= " + beariongarray[i])

                                //console.log("condition 2 " + (barringvalue + 30) + " >= " + beariongarray[i])

                                insidedirectionarray.push(orderarrydetailarray[i]);
                                delete beariongarray[i]
                                delete orderarrydetailarray[i]

                            }


                        } else {

                            if (((barringvalue - 30) <= beariongarray[i]) && ((barringvalue + 30) >= beariongarray[i])) {

                                //console.log("condition 1 " + (barringvalue - 30) + " <= " + beariongarray[i])

                                //console.log("condition 2 " + (barringvalue + 30) + " >= " + beariongarray[i])

                                insidedirectionarray.push(orderarrydetailarray[i]);
                                delete beariongarray[i]
                                delete orderarrydetailarray[i]
                            }
                        }
                    }

                } else {


                    for (var i = 0; i < beariongarray.length; i++) {
                        //console.log("oncedata:  " + JSON.stringify(insidedirectionarray))
                        //console.log("uday moveing to case 3 " + barringvalue + "  baringvalue " + beariongarray[i])
                        if (beariongarray[i] != "undefined") {
                            if (((barringvalue + 30) >= beariongarray[i]) && ((barringvalue - 30) <= beariongarray[i])) {

                                insidedirectionarray.push(orderarrydetailarray[i]);

                                delete beariongarray[i]
                                delete orderarrydetailarray[i]

                            } else {
                            }
                        }
                    }
                }
                final_directionarray.push(insidedirectionarray);
            }
            for (var i = 0; i < beariongarray.length; i++) {
                //console.log("bearing value " + beariongarray[i] + " postion " + i);
                barringvaluefunc(beariongarray[i], final_directionarray, orderarrydetailarray);
            }
            //console.log("finaldata after completion   :  " + JSON.stringify(final_directionarray))
            return callback(null, final_directionarray);
        })
    }
    function Store_New_Orders_Sequence_Details(CustomerData, No_Of_Directions, BearingArray, RecordOrderArray, callback) {
        process.nextTick(function () {
            var SequenceID = uuid();
            var date = new Date();
            var DirectionalIDArray = [];
            for (var i = 0; i < No_Of_Directions; i++) {
                var DirectionID = uuid();
                DirectionalIDArray.push(DirectionID);
            };
            ExcelMod.Generate_Random_16_digits_Sequence_Number(function (err, Sequence_Code) {
                if (!err) {
                    setTimeout(function () {
                        var SequenceData = new Customer_New_Order_Directional({
                            SequenceID: SequenceID,
                            Sequence_Code: Sequence_Code,
                            CustomerID: CustomerData._id,
                            CustomerName: CustomerData.First_name,
                            CustomerPhone: CustomerData.Phone,
                            CustomerEmailID: CustomerData.Email,
                            No_Of_Directions: No_Of_Directions,
                            No_Of_Records: RecordOrderArray.length,
                            BearingArray: BearingArray,
                            NewOrderArray: RecordOrderArray,
                            DirectionalOrderArray: DirectionalIDArray,
                            Status: true,
                            created_at: date,
                            updated_at: date
                        });
                        SequenceData.save(function (err, Result) {
                            if (err) {
                                console.log(err);
                            } else {
                                callback(null, Result);
                            }
                        })
                    }, 1000);
                }
            })
        })
    };
    function StoreDirectionRecords(SequenceData, DirectionalOrderArrayFinal, callback) {
        process.nextTick(function () {
            var t = 0;
            var Direction_No = 1;
            for (var i = 0; i < SequenceData.No_Of_Directions; i++) {
                var date = new Date();
                var DirectionID = SequenceData.DirectionalOrderArray[t];
                var RecordOrderArray = DirectionalOrderArrayFinal[t];
                var DirectionData = new Customer_New_Order_Directions_Data({
                    DirectionID: DirectionID,
                    SequenceID: SequenceData.SequenceID,
                    CustomerID: SequenceData.CustomerID,
                    CustomerName: SequenceData.CustomerName,
                    CustomerPhone: SequenceData.CustomerPhone,
                    CustomerEmailID: SequenceData.CustomerEmailID,
                    Direction_No: Direction_No,
                    Processing_State: 1,
                    RecordOrderArray: RecordOrderArray,
                    created_at: date,
                    updated_at: date
                });
                DirectionData.save();
                Direction_No++;
                t++;
            };
            setTimeout(function () {
                callback(null, 'All Directions Stored');
            }, 1000);
        })
    };
    function UpdateDirectonOrderPath(Direction_No, PathOrderData, SequenceData, callback) {
        process.nextTick(function () {
            var query = {
                SequenceID: SequenceData.SequenceID,
                Direction_No: Direction_No,
            };
            var changes = {
                $set: {
                    RecordOrderArray: PathOrderData
                }
            };
            var multiplicity = {
                multi: true
            };
            Customer_New_Order_Directions_Data.update(query, changes, multiplicity).exec(function (err, Result) {
                callback(null, 'Updated Successfully');
            })
        })
    }

    function UpdateSheetRecords(RecordIDArray, callback) {
        process.nextTick(function () {
            var query = {
                RecordID: {
                    $in: RecordIDArray
                }
            };
            var changes = {
                $set: {
                    Status: 5,
                    Message: "Record Queue for Order"
                }
            };
            var multiplicity = {
                multi: true
            };
            Customer_Order_Sheet_Records.update(query, changes, multiplicity).exec(function (err, Result) {
                if (!err) {
                    callback(null, "Records Updated Successfully");
                }
            })
        })
    }
    function FindDirectionalRoute(OrderData, DirectionFinalArray, Address, callback) {
        process.nextTick(function () {
            ExcelMod.Find_Direction_Route(OrderData, DirectionFinalArray, Address, function (err, Result) {
                if (!err) {
                    callback(null, Result);
                }
            })
        })
    }
    sync(function () {
        var DropData = [];
        var Total_Weight = 0;
        var Total_Orders = 0;
        var Total_Price = 0;
        var PickData = [];
        var RecordIDArray = [];
        var t = 0;
        var QueueOrderCount = AvailableOrdersArray.length;
        for (var i = 0; i < QueueOrderCount; i++) {
            RecordIDArray.push(AvailableOrdersArray[t].RecordID);
            PickData.push({
                pickAddress: PickupDataAddress.pickAddress,
                pickLatitude: PickupDataAddress.pickLatitude,
                pickLongitude: PickupDataAddress.pickLongitude
            });
            DropData.push({
                dropAddress: AvailableOrdersArray[t].dropAddress,
                dropLatitude: AvailableOrdersArray[t].dropLocation.Latitude,
                dropLongitude: AvailableOrdersArray[t].dropLocation.Longitude
            });
            t++;
        }
        console.log(PickData)
        console.log(DropData)

        var FinalBearingData = [];
        var FinalRecordOrderData = [];
        var BearingData = BearingAngleFunction.sync(null, PickData, DropData);
        console.log(BearingData)

        var DistanceData = DistanceFunction.sync(null, PickData, DropData);
        console.log(DistanceData)
        for (var s = 0; s < BearingData.length; s++) {
            FinalBearingData.push(BearingData[s]);
            FinalRecordOrderData.push(AvailableOrdersArray[s]);
        }
        var DirectionalOrderArrayFinal = [];
        var DirectionalOrderArray = DistanceFetch.sync(null, FinalBearingData, FinalRecordOrderData);
        for (var k = 0; k < DirectionalOrderArray.length; k++) {

            if (DirectionalOrderArray[k].length == 0) {
                console.log("Entering Empty");
            } else {
                DirectionalOrderArrayFinal.push(DirectionalOrderArray[k]);
            }
        }
        var No_Of_Directions = DirectionalOrderArrayFinal.length;
        console.log(No_Of_Directions);
        console.log(DirectionalOrderArrayFinal[No_Of_Directions - 1].length);
        var SequenceData;
        if (No_Of_Directions >= 1) {
            SequenceData = Store_New_Orders_Sequence_Details.sync(null, CustomerData, No_Of_Directions, BearingData, AvailableOrdersArray);
            var StoreDirections = StoreDirectionRecords.sync(null, SequenceData, DirectionalOrderArrayFinal);
        } else {
            console.log("Entering the 0 Directions");
            No_Of_Directions = 1;
            SequenceData = Store_New_Orders_Sequence_Details.sync(null, CustomerData, No_Of_Directions, BearingData, AvailableOrdersArray);
            var StoreDirections = StoreDirectionRecords.sync(null, SequenceData, AvailableOrdersArray);
        }
        var DirNo = 1;
        if (No_Of_Directions >= 1) {
            for (var l = 0; l < No_Of_Directions; l++) {
                var OrderData = DirectionalOrderArrayFinal[l];
                console.log("Length:->" + OrderData.length);
                var DirectionFinalArray = [];
                var Address = {
                    latitude: PickupDataAddress.pickLatitude,
                    longitude: PickupDataAddress.pickLongitude
                };
                var PathOrderData = FindDirectionalRoute.sync(null, OrderData, DirectionFinalArray, Address);
                console.log("Direct No:->" + DirNo);
                console.log(PathOrderData);
                var UpdateDirectionData = UpdateDirectonOrderPath.sync(null, DirNo, PathOrderData, SequenceData);
                console.log(UpdateDirectionData);
                DirNo++;
            }
        } else {
            var OrderData = AvailableOrdersArray;
            console.log("Length:->" + OrderData.length);
            var DirectionFinalArray = [];
            var Address = {
                latitude: PickupDataAddress.pickLatitude,
                longitude: PickupDataAddress.pickLongitude
            };
            var PathOrderData = FindDirectionalRoute.sync(null, OrderData, DirectionFinalArray, Address);
            console.log("Direct No:->" + DirNo);
            console.log(PathOrderData);
            var UpdateDirectionData = UpdateDirectonOrderPath.sync(null, DirNo, PathOrderData, SequenceData);
            console.log(UpdateDirectionData);
        }
        callback(false, 'New Order and Ongoing jobs Orders and Directions are Generated', SequenceData);
    });
};
exports.Script_For_Production_Direction_Route = function (callback) {
    function SequenceDataValues(callback) {
        process.nextTick(function () {
            Customer_New_Order_Directional.findOne({ SequenceID: "1478220e-224d-45ee-bfa3-2eb8ca8eeb53" }).exec(function (err, SequenceData) {
                callback(null, SequenceData);
            })
        })
    }
    function SequenceDataDirectionData(SequenceData, callback) {
        process.nextTick(function () {
            Customer_New_Order_Directions_Data.find({ SequenceID: SequenceData.SequenceID }).exec(function (err, Result) {
                callback(null, Result);
            })
        })
    };
    function FindDirectionalRoute(OrderData, DirectionFinalArray, Address, callback) {
        process.nextTick(function () {
            ExcelMod.Find_Direction_Route(OrderData, DirectionFinalArray, Address, function (err, Result) {
                if (!err) {
                    callback(null, Result);
                }
            })
        })
    }
    function UpdateDirectonOrderPath(Direction_No, PathOrderData, SequenceData, callback) {
        process.nextTick(function () {
            var query = {
                SequenceID: SequenceData.SequenceID,
                Direction_No: Direction_No,
            };
            var changes = {
                $set: {
                    RecordOrderArray: PathOrderData
                }
            };
            var multiplicity = {
                multi: true
            };
            Customer_New_Order_Directions_Data.update(query, changes, multiplicity).exec(function (err, Result) {
                callback(null, 'Updated Successfully');
            })
        })
    }

    sync(function () {
        var SequenceData = SequenceDataValues.sync(null);
        var DirectionResults = SequenceDataDirectionData.sync(null, SequenceData);
        var DirNo = 1;
        for (var i = 0; i < DirectionResults.length; i++) {
            var OrderData = DirectionResults[i].RecordOrderArray;
            console.log("Length:->" + OrderData.length);
            var DirectionFinalArray = [];
            var Address = {
                latitude: 17.4013846,
                longitude: 78.3676405
            };
            var PathOrderData = FindDirectionalRoute.sync(null, OrderData, DirectionFinalArray, Address);
            console.log("Direct No:->" + DirNo);
            console.log(PathOrderData);
            var UpdateDirectionData = UpdateDirectonOrderPath.sync(null, DirNo, PathOrderData, SequenceData);
            console.log(UpdateDirectionData);
            DirNo++;
        };
        callback(false, "Script Runned Successfully");
    })
}

exports.Find_Direction_Route = function (OrderData, DirectionFinalArray, Address, callback) {
    function DistanceLatLongFunction(PickLatLong, DropLatLong, callback) {
        process.nextTick(function () {
            var geolib = require('geolib');
            var distance = geolib.getDistance(PickLatLong, DropLatLong);
            callback(null, distance);
        })
    }
    sync(function () {
        var PathOrderData = FindDirectionRoute(OrderData, DirectionFinalArray, Address, callback);
        function FindDirectionRoute(OrderData, DirectionFinalArray, Address, callback) {
            if (OrderData.length <= 1) {
                DirectionFinalArray.push(OrderData[0]);
                callback(false, DirectionFinalArray);
            } else if (OrderData.length > 1) {
                var NewFinalOrderData = [];
                var NewArray = [];
                var t = 0;
                for (var i = 0; i < OrderData.length; i++) {
                    var PickLatLong = {
                        latitude: Address.latitude,
                        longitude: Address.longitude
                    };
                    var DropLatLong = {
                        latitude: OrderData[t].dropLocation.Latitude,
                        longitude: OrderData[t].dropLocation.Longitude
                    };
                    var distance = DistanceLatLongFunction.sync(null, PickLatLong, DropLatLong);
                    NewArray.push({
                        distance: distance,
                        OrderData: OrderData[t]
                    })
                    t++;
                }
                var NewSortedArray = NewArray.sort(function (a, b) {
                    if (b.distance < a.distance) {
                        return 1;
                    } else if (b.distance > a.distance) {
                        return -1;
                    } else if (b.distance == a.distance) {
                        return 0;
                    }
                });
                DirectionFinalArray.push(NewSortedArray[0].OrderData);
                console.log("DirectionFinalArray Element Pushed");
                console.log(DirectionFinalArray);
                Address = {
                    latitude: NewSortedArray[0].OrderData.dropLocation.Latitude,
                    longitude: NewSortedArray[0].OrderData.dropLocation.Longitude
                };
                console.log(Address);
                var pk = 1;
                for (var m = 1; m < NewSortedArray.length; m++) {
                    NewFinalOrderData.push(NewSortedArray[pk].OrderData);
                    pk++;
                }
                FindDirectionRoute(NewFinalOrderData, DirectionFinalArray, Address, callback);
            }
        }
    })
}

exports.Queue_Customer_Orders_and_Generate_Orders = function (values, CustomerData, AvailableOrdersArray, SheetData, callback) {
    function BearingAngleFunction(PickData, DropData, callback) {
        process.nextTick(function () {
            var geolib = require('geolib');
            var PickLatLong;
            var DropLatLong;
            var BearingData = [];
            var t = 0;
            for (var i = 0; i < PickData.length; i++) {
                PickLatLong = {
                    latitude: PickData[t].pickLatitude,
                    longitude: PickData[t].pickLongitude
                }
                DropLatLong = {
                    latitude: DropData[t].dropLatitude,
                    longitude: DropData[t].dropLongitude
                }
                var bearangle = geolib.getBearing(PickLatLong, DropLatLong);
                BearingData.push(bearangle);
                t++;
            }
            callback(null, BearingData);
        })
    };
    function DistanceFunction(PickData, DropData, callback) {
        process.nextTick(function () {
            var geolib = require('geolib');
            var PickLatLong;
            var DropLatLong;
            var DistanceData = [];
            var t = 0;
            for (var i = 0; i < PickData.length; i++) {
                if (DropData[t].latlong == false) {
                    DistanceData.push(0);
                    t++;
                } else {
                    PickLatLong = {
                        latitude: PickData[t].pickLatitude,
                        longitude: PickData[t].pickLongitude
                    }
                    DropLatLong = {
                        latitude: DropData[t].dropLatitude,
                        longitude: DropData[t].dropLongitude
                    }

                    var distance = geolib.getDistance(PickLatLong, DropLatLong);
                    // distance /= 1000;
                    DistanceData.push(distance);
                    t++;
                }
            }
            callback(null, DistanceData);
        })
    }
    function DistanceFetch(beariongarray, orderarrydetailarray, callback) {
        process.nextTick(function () {
            console.log("uday starting  " + JSON.stringify(beariongarray));
            var final_directionarray = [];
            var directioncount;
            var final_orderiddetailarray;
            function barringvaluefunc(barringvalue, final_directionarray, orderarrydetailarray) {
                let insidedirectionarray = [];
                //console.log("uday infunction  " + JSON.stringify(beariongarray));
                if (barringvalue >= 0 && barringvalue < 30) {
                    for (var i = 0; i < beariongarray.length; i++) {
                        if ((0 <= beariongarray[i]) && (30 >= beariongarray[i])) {
                            if (((barringvalue - 30) <= (beariongarray[i] + 360)) && ((barringvalue + 30) >= (beariongarray[i] + 360))) {
                                //console.log("condition 1 " + (barringvalue - 30) + " <= " + beariongarray[i])
                                //console.log("condition 2 " + (barringvalue + 30) + " >= " + beariongarray[i])
                                insidedirectionarray.push(orderarrydetailarray[i]);
                                delete beariongarray[i]
                                delete orderarrydetailarray[i]
                            }
                        } else if ((330 <= beariongarray[i]) && (360 >= beariongarray[i])) {
                            if ((((barringvalue + 360) + 30) >= (beariongarray[i])) && (((360 + barringvalue) - 30) <= (beariongarray[i]))) {
                                //console.log("condition 1 " + (barringvalue - 30) + " <= " + beariongarray[i])
                                //console.log("condition 2 " + (barringvalue + 30) + " >= " + beariongarray[i])
                                insidedirectionarray.push(orderarrydetailarray[i]);
                                delete beariongarray[i]
                                delete orderarrydetailarray[i]
                            }
                        } else {
                            if (((barringvalue - 30) <= beariongarray[i]) && ((barringvalue + 30) >= beariongarray[i])) {
                                //console.log("condition 1 " + (barringvalue - 30) + " <= " + beariongarray[i])
                                //console.log("condition 2 " + (barringvalue + 30) + " >= " + beariongarray[i])
                                insidedirectionarray.push(orderarrydetailarray[i]);
                                delete beariongarray[i]
                                delete orderarrydetailarray[i]
                            }
                        }
                    }
                } else if (barringvalue > 330 && barringvalue <= 360) {


                    for (var i = 0; i < beariongarray.length; i++) {

                        if ((0 <= beariongarray[i]) && (30 >= beariongarray[i])) {


                            if (((barringvalue - 30) <= (beariongarray[i] + 360)) && ((barringvalue + 30) >= (beariongarray[i] + 360))) {

                                //console.log("condition 1 " + (barringvalue - 30) + " <= " + beariongarray[i])

                                //console.log("condition 2 " + (barringvalue + 30) + " >= " + beariongarray[i])

                                insidedirectionarray.push(orderarrydetailarray[i]);
                                delete beariongarray[i]
                                delete orderarrydetailarray[i]

                            }


                        } else {

                            if (((barringvalue - 30) <= beariongarray[i]) && ((barringvalue + 30) >= beariongarray[i])) {

                                //console.log("condition 1 " + (barringvalue - 30) + " <= " + beariongarray[i])

                                //console.log("condition 2 " + (barringvalue + 30) + " >= " + beariongarray[i])

                                insidedirectionarray.push(orderarrydetailarray[i]);
                                delete beariongarray[i]
                                delete orderarrydetailarray[i]
                            }
                        }
                    }

                } else {


                    for (var i = 0; i < beariongarray.length; i++) {
                        //console.log("oncedata:  " + JSON.stringify(insidedirectionarray))
                        //console.log("uday moveing to case 3 " + barringvalue + "  baringvalue " + beariongarray[i])
                        if (beariongarray[i] != "undefined") {
                            if (((barringvalue + 30) >= beariongarray[i]) && ((barringvalue - 30) <= beariongarray[i])) {

                                insidedirectionarray.push(orderarrydetailarray[i]);

                                delete beariongarray[i]
                                delete orderarrydetailarray[i]

                            } else {
                            }
                        }
                    }
                }
                final_directionarray.push(insidedirectionarray);
            }
            for (var i = 0; i < beariongarray.length; i++) {
                //console.log("bearing value " + beariongarray[i] + " postion " + i);
                barringvaluefunc(beariongarray[i], final_directionarray, orderarrydetailarray);
            }
            //console.log("finaldata after completion   :  " + JSON.stringify(final_directionarray))
            return callback(null, final_directionarray);
        })
    }
    function Store_Queue_Details(SheetData, No_Of_Directions, BearingArray, RecordOrderArray, callback) {
        process.nextTick(function () {
            var QueueID = uuid();
            var date = new Date();
            var DirectionalIDArray = [];
            for (var i = 0; i < No_Of_Directions; i++) {
                var DirectionID = uuid();
                DirectionalIDArray.push(DirectionID);
            };
            setTimeout(function () {
                var QueueData = new Customer_Order_Queue({
                    QueueID: QueueID,
                    CustomerID: SheetData.CustomerID,
                    CustomerName: SheetData.CustomerName,
                    CustomerPhone: SheetData.CustomerPhone,
                    CustomerEmailID: SheetData.CustomerEmailID,
                    OrderSheetID: SheetData.OrderSheetID,
                    OrderSheetNumber: SheetData.OrderSheetNumber,
                    filename: SheetData.filename,
                    ProcessStage: 1,
                    No_Of_Directions: No_Of_Directions,
                    No_Of_Records: RecordOrderArray.length,
                    BearingArray: BearingArray,
                    RecordOrderArray: RecordOrderArray,
                    DirectionalOrderArray: DirectionalIDArray,
                    Status: true,
                    created_at: date,
                    updated_at: date
                });
                QueueData.save(function (err, Result) {
                    if (err) {
                        console.log(err);
                    } else {
                        callback(null, Result);
                    }
                })
            }, 1000);
        })
    };
    function StoreDirectionRecords(QueueData, DirectionalOrderArrayFinal, callback) {
        process.nextTick(function () {
            var t = 0;
            var Direction_No = 1;
            for (var i = 0; i < QueueData.No_Of_Directions; i++) {
                var date = new Date();
                var DirectionID = QueueData.DirectionalOrderArray[t];
                var RecordOrderArray = DirectionalOrderArrayFinal[t];
                var DirectionData = new Customer_Order_Queue_Directions({
                    DirectionID: DirectionID,
                    QueueID: QueueData.QueueID,
                    CustomerID: QueueData.CustomerID,
                    CustomerName: QueueData.CustomerName,
                    CustomerPhone: QueueData.CustomerPhone,
                    CustomerEmailID: QueueData.CustomerEmailID,
                    Direction_No: Direction_No,
                    Processing_State: 1,
                    RecordOrderArray: RecordOrderArray,
                    created_at: date,
                    updated_at: date
                });
                DirectionData.save();
                Direction_No++;
                t++;
            };
            setTimeout(function () {
                callback(null, 'All Directions Stored');
            }, 1000);
        })
    }

    function UpdateSheetRecords(RecordIDArray, callback) {
        process.nextTick(function () {
            var query = {
                RecordID: {
                    $in: RecordIDArray
                }
            };
            var changes = {
                $set: {
                    Status: 5,
                    Message: "Record Queue for Order"
                }
            };
            var multiplicity = {
                multi: true
            };
            Customer_Order_Sheet_Records.update(query, changes, multiplicity).exec(function (err, Result) {
                if (!err) {
                    callback(null, "Records Updated Successfully");
                }
            })
        })
    }
    sync(function () {
        var DropData = [];
        var Total_Weight = 0;
        var Total_Orders = 0;
        var Total_Price = 0;
        var PickData = [];
        var RecordIDArray = [];
        var t = 0;
        var QueueOrderCount = AvailableOrdersArray.length;
        for (var i = 0; i < QueueOrderCount; i++) {
            RecordIDArray.push(AvailableOrdersArray[t].RecordID);
            PickData.push({
                pickAddress: AvailableOrdersArray[t].pickAddress,
                pickLatitude: AvailableOrdersArray[t].pickLatitude,
                pickLongitude: AvailableOrdersArray[t].pickLongitude
            });
            DropData.push({
                dropAddress: AvailableOrdersArray[t].dropAddress,
                dropLatitude: AvailableOrdersArray[t].dropLatitude,
                dropLongitude: AvailableOrdersArray[t].dropLongitude
            });
            t++;
        }
        var FinalBearingData = [];
        var FinalRecordOrderData = [];
        var BearingData = BearingAngleFunction.sync(null, PickData, DropData);
        var DistanceData = DistanceFunction.sync(null, PickData, DropData);
        for (var s = 0; s < BearingData.length; s++) {
            FinalBearingData.push(BearingData[s]);
            FinalRecordOrderData.push(AvailableOrdersArray[s]);
        }
        var DirectionalOrderArrayFinal = [];
        var DirectionalOrderArray = DistanceFetch.sync(null, FinalBearingData, FinalRecordOrderData);
        for (var k = 0; k < DirectionalOrderArray.length; k++) {

            if (DirectionalOrderArray[k].length == 0) {
                console.log("Entering Empty");
            } else {
                DirectionalOrderArrayFinal.push(DirectionalOrderArray[k]);
            }
        }
        var No_Of_Directions = DirectionalOrderArrayFinal.length;
        console.log(No_Of_Directions);
        if (No_Of_Directions >= 1) {
            var QueueData = Store_Queue_Details.sync(null, SheetData, No_Of_Directions, BearingData, AvailableOrdersArray);
            var StoreDirections = StoreDirectionRecords.sync(null, QueueData, DirectionalOrderArrayFinal);
        } else {
            console.log("Entering the 0 Directions");
            No_Of_Directions = 1;
            var QueueData = Store_Queue_Details.sync(null, SheetData, No_Of_Directions, BearingData, AvailableOrdersArray);
            var StoreDirections = StoreDirectionRecords.sync(null, QueueData, AvailableOrdersArray);
        }
        var UpdateRecords = UpdateSheetRecords.sync(null, RecordIDArray);
        callback('Record Order Queue and Directions are Generated');
    })
}
exports.Get_No_of_Available_Orders = function (values, callback) {
    var query = {
        OrderSheetID: values.OrderSheetID,
        Status: 4
    };
    Customer_Order_Sheet_Records.count(query).exec(function (err, Count) {
        if (Count >= 0) {
            callback(false, Count);
        }
    })
};
exports.Find_All_Available_Records_for_Orders = function (values, callback) {
    var query = {
        OrderSheetID: values.OrderSheetID,
        Status: 4
    };
    Customer_Order_Sheet_Records.find(query).limit(parseInt(values.no_of_orders)).sort('-created_at').exec(function (err, Result) {
        if (!err) {
            callback(false, Result);
        }
    })
}

exports.Newupload = function (req, res) {
    var newForm = new formidable.IncomingForm();
    newForm.keepExtensions = true;

    var tmpFile;
    newForm.parse(req, function (err, fields, files) {
        tmpFile = files.file.path;
    })

    newForm.on('end', function () {

        var workbook = XLSX.readFile(tmpFile, {
            cellFormula: false,
            cellHTML: false,
            raw: false,
            cellNF: false,
            cellStyles: false,
            sheetRows: 4000,
            cellHTML: false,
            cellText: false
        });
        var ExcelResult = {
            SheetNames: workbook.SheetNames,
            Sheets: workbook.Sheets[workbook.SheetNames[0]]
        };
        var RowData = ExcelResult.Sheets['!ref'];
        var splitted = RowData.split(':');
        var senva_val = splitted[1];
        var newval = senva_val.length;
        var lastRow = parseInt(senva_val.slice(1, newval)) - 1;
        console.log(lastRow);
        var ParseData = [];
        for (var i = 2; i <= lastRow; i++) {
            console.log("values  >>  " + i);

            var level_Two_Category = ExcelResult.Sheets['A' + i].v;
            var Product_Name = ExcelResult.Sheets['B' + i].v;
            var Selling_Price = ExcelResult.Sheets['C' + i].v;
            var Avilable_Quantity = ExcelResult.Sheets['D' + i].v;
            var datavalu = {};
            console.log(Product_Name);
            ExcelMod.valuesendtoapi(level_Two_Category, Product_Name, Selling_Price, Avilable_Quantity);
        }
        res.send(new ApiResponce({
            success: true,
            extras: {
                Status: 'Sheet is Processing',
                ExcelResult: ExcelResult
            }
        }));
    })
}
exports.valuesendtoapi = function (level_Two_Category, Product_Name, Selling_Price, Avilable_Quantity) {
    console.log("api hitting")
    var querystring = require('querystring');
    var https = require('https');
    var fs = require('fs');
    var post_data = querystring.stringify({
        "SessionID": "97fa365d-0931-4e09-a4ea-caa5ea8ae099",
        "StoreAdminID": "595b330eb638b63066006954",
        "BranchID": "fbfbd9cc-c59e-4f4c-92f0-c0ed93a26b36",
        "CategoryID": "6bfbaefc-72aa-4d3f-8ccf-bcb85e18099c",
        "ProductName": Product_Name,
        "ProductDescription": " ",
        "Actual_Price": Selling_Price,
        "Selling_Price": Selling_Price,
        "OfferAvailable": false,
        "OfferPercent": 0,
        "ProductWeight": "1",
        "Avaiable_Quantity": Avilable_Quantity,
        "Product_Addon_Available": false,
        "Whether_Existing_Product_Addon": false,
        "Level2CategoryAvailable": true,
        "Level2CategoryName": level_Two_Category,
        "Level3CategoryAvailable": false,
        "Level3CategoryName": "Special Occasion Pizza"
    });
    var result = '';
    var options = {
        host: 'mystore.ezshipp.com',
        port: 443,
        method: 'POST',
        path: '/Add_Store_Product_EXCEL',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };
    var str = '';
    var req = https.request(options, function (res) {
        var data;
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk);
            return "Product Added Successfully"
        });
    });
    req.write(post_data);
    req.end();
}



exports.Edit_Sheet_Record = function (values, RecordData, CustomerData, callback) {
    function UpdateRecordDataValues(values, RecordData, CustomerData, callback) {
        process.nextTick(function () {
            var query = {
                RecordID: RecordData.RecordID
            };
            var changes = {
                $set: {
                    itemName: values.itemName,
                    pickAddress: CustomerData.Default_Pickup_Address,
                    dropAddress: values.dropAddress,
                    receiverName: values.receiverName,
                    receiverPhone: values.receiverPhone,
                    Status: 1,
                    Message: "Record Updated and Processed Initiated",
                },
                $unset: {
                    pickLatitude: "",
                    pickLongitude: "",
                    dropLatitude: "",
                    dropLongitude: ""
                }
            };
            Customer_Order_Sheet_Records.update(query, changes, function (err, Result) {
                callback(null, 'Record Updated and Initiated');
            })
        })
    }

    function FindLatLong(Address, callback) {
        process.nextTick(function () {
            CustomerMod.Address_Lat_Long_Function(Address, function (err, LatLongData) {
                if (!err) {
                    callback(null, LatLongData);
                }
            })
        })
    }
    function UpdateLatLongRecord(RecordData, PickData, DropData, callback) {
        process.nextTick(function () {
            var query = {
                RecordID: RecordData.RecordID
            };
            var changes = {
                $set: {
                    pickLatitude: parseFloat(PickData.latitude),
                    pickLongitude: parseFloat(PickData.longitude),
                    dropLatitude: parseFloat(DropData.latitude),
                    dropLongitude: parseFloat(DropData.longitude),
                    Status: 2,
                    Message: "Order Pick Address and Drop Address Found"
                }
            };
            Customer_Order_Sheet_Records.update(query, changes, function (err, Result) {
                callback(null, 'Update Lat Long successfully');
            })
        })
    }

    function UpdateRecordError(type, RecordData, callback) {
        process.nextTick(function () {
            var Status = 8;
            var Message = "";
            if (type == 1) {
                Message = "Pick Address not Found"
            } else if (type == 2) {
                Message = "Drop Address not Found"
            } else if (type == 3) {
                Message = "Pick Address not in zone"
            } else if (type == 4) {
                Message = "Drop Address not in zone"
            } else if (type == 5) {
                Message = "Pick Address and Drop Address not in same zone"
            }
            var query = {
                RecordID: RecordData.RecordID
            };
            var changes = {
                $set: {
                    Status: Status,
                    Message: Message
                }
            };
            Customer_Order_Sheet_Records.update(query, changes, function (err, Result) {
                callback(null, 'Error Updated successfully');
            })
        })
    }
    function UpdateZoneMatch(RecordData, callback) {
        process.nextTick(function () {
            var query = {
                RecordID: RecordData.RecordID
            };
            var changes = {
                $set: {
                    Status: 3,
                    Message: "Pick Address and Drop Address are in Same Zone"
                }
            };
            Customer_Order_Sheet_Records.update(query, changes, function (err, Result) {
                callback(null, 'Zone Status successfully');
            })
        })
    }
    function UpdateRecordProcessedSheet(RecordData, callback) {
        process.nextTick(function () {
            Customer_Order_Sheets.findOneAndUpdate({
                OrderSheetID: RecordData.OrderSheetID
            }, {
                    $set: {
                        OrderSheetID: RecordData.OrderSheetID
                    },
                    $inc: {
                        "Processed_Records": 1
                    }
                }, {
                    upsert: true,
                    returnNewDocument: true
                }).exec(function (err, Result) {
                    callback(null, 'Processed 1 Record in Sheet');
                })
        })
    }
    function UpdateRecordRemoveOneProcessedSheet(RecordData, callback) {
        process.nextTick(function () {
            Customer_Order_Sheets.findOneAndUpdate({
                OrderSheetID: RecordData.OrderSheetID
            }, {
                    $set: {
                        OrderSheetID: RecordData.OrderSheetID
                    },
                    $inc: {
                        "Processed_Records": -1
                    }
                }, {
                    upsert: true,
                    returnNewDocument: true
                }).exec(function (err, Result) {
                    callback(null, 'Decremented 1 Record in Sheet');
                })
        })
    }
    function UpdateSheetAllRecordProcessed(SheetData, callback) {
        process.nextTick(function () {
            var query = {
                OrderSheetID: SheetData.OrderSheetID
            }
            var changes = {
                $set: {
                    ProcessStage: 3
                }
            }
            Customer_Order_Sheets.update(query, changes, function (err, Result) {
                callback(null, 'Sheet Processing Completed Successfully');
            })
        })
    }
    function UpdateRecordCompleted(RecordData, callback) {
        process.nextTick(function () {
            var query = {
                RecordID: RecordData.RecordID
            };
            var changes = {
                $set: {
                    Status: 4,
                    Message: "Record Ready for Order"
                }
            };
            Customer_Order_Sheet_Records.update(query, changes, function (err, Result) {
                callback(null, 'Record Processing Completed');
            })
        })
    }
    function ZoneFindingFunction(data, callback) {
        process.nextTick(function () {
            var Latitude = parseFloat(data.latitude);
            var Longitude = parseFloat(data.longitude);
            console.log(data);
            var zones = ZONES;
            var query = {
                'polygons': {
                    $geoIntersects: {
                        $geometry: {
                            type: "Point",
                            coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)]
                        }
                    }
                }
            }
            zones.findOne(query).exec(function (err, Result) {
                callback(null, Result);
            });
        });
    }
    sync(function () {
        //Update Record
        var UpdateRecord = UpdateRecordDataValues.sync(null, values, RecordData, CustomerData);
        if (RecordData.Status != 8) {
            var DecrementOneRecordSheet = UpdateRecordRemoveOneProcessedSheet.sync(null, RecordData);
        } else {

        }
        //fetch Pick Address

        var PickData = FindLatLong.sync(null, CustomerData.Default_Pickup_Address);
        if (PickData.latlong == true) {
            //fetch Drop Address
            var DropData = FindLatLong.sync(null, values.dropAddress);
            if (DropData.latlong == true) {
                var UpdateLatLong = UpdateLatLongRecord.sync(null, RecordData, PickData, DropData);

                var pickupzoneObj = ZoneFindingFunction.sync(null, PickData);
                if (pickupzoneObj != null) {
                    var dropupzoneObj = ZoneFindingFunction.sync(null, DropData);
                    if (dropupzoneObj != null) {
                        if (pickupzoneObj.city_id == dropupzoneObj.city_id) {
                            //Update Pick and drop same zone
                            var ZoneStatus = UpdateZoneMatch.sync(null, RecordData);
                            var UpdateRecordSheetProcessed = UpdateRecordProcessedSheet.sync(null, RecordData);
                            var CompleteRecord = UpdateRecordCompleted.sync(null, RecordData);
                        } else {
                            //Pick Address and Drop Address not in same zone
                            var RecordError = UpdateRecordError.sync(null, 5, RecordData);
                        }
                    } else {
                        //drop Address not in zone
                        var RecordError = UpdateRecordError.sync(null, 4, RecordData);
                    }
                } else {
                    //pick Address not in zone
                    var RecordError = UpdateRecordError.sync(null, 3, RecordData);
                }

            } else {
                //Set Record Process Fail by Drop Address not found
                var RecordError = UpdateRecordError.sync(null, 2, RecordData);

            }
        } else {
            //Set Record Process Fail by Pick Address not found
            var RecordError = UpdateRecordError.sync(null, 1, RecordData);
        }
        callback(new ApiResponce({
            success: true,
            extras: {
                Status: "Record Successfully Updated and Processed"
            }
        }));
    })
}
exports.Search_All_Customer_Order_Sheets = function (values, callback) {
    var query = {
        CustomerID: values.CustomerID,
        Status: true,
        $or: [
            {
                CustomerName: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                CustomerPhone: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                CustomerEmailID: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                filename: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                FileUrl: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }
        ]
    };
    Customer_Order_Sheets.find(query).exec(function (err, Result) {
        if (!err) {
            var SheetData = [];
            async.eachSeries(Result, function (item, resp) {
                if (item.FileUrl == "") {
                    item.FileUrl = item.FileUrl;
                } else {
                    item.FileUrl = config.S3URL + item.FileUrl;
                }
                var date = moment(item.created_at).utcOffset(330).format('MMM-DD,YYYY h:mm A')
                SheetData.push({
                    OrderSheetID: item.OrderSheetID,
                    filename: item.filename,
                    OrderSheetNumber: item.OrderSheetNumber,
                    Total_Records: item.Total_Records,
                    Processed_Records: item.Processed_Records,
                    FileUrl: item.FileUrl,
                    ProcessStage: item.ProcessStage,
                    Status: item.Status,
                    date: date
                })
                resp();
            }, function (err) {
                if (!err) {
                    callback(new ApiResponce({
                        success: true,
                        extras: {
                            SheetData: SheetData
                        }
                    }));
                }
            })
        }
    })
}

exports.Find_All_Customer_Order_Sheets = function (values, callback) {
    var query = {
        CustomerID: values.CustomerID,
        Status: true
    };
    var toSkip = parseInt(values.skip);
    var toLimit = parseInt(values.limit);
    Customer_Order_Sheets.count(query).exec(function (err, Count) {
        if (Count >= 0) {
            Customer_Order_Sheets.find(query).skip(toSkip).limit(toLimit).exec(function (err, Result) {
                if (!err) {
                    var SheetData = [];
                    async.eachSeries(Result, function (item, resp) {
                        if (item.FileUrl == "") {
                            item.FileUrl = item.FileUrl;
                        } else {
                            item.FileUrl = config.S3URL + item.FileUrl;
                        }
                        var date = moment(item.created_at).utcOffset(330).format('MMM-DD,YYYY h:mm A')
                        SheetData.push({
                            OrderSheetID: item.OrderSheetID,
                            filename: item.filename,
                            OrderSheetNumber: item.OrderSheetNumber,
                            Total_Records: item.Total_Records,
                            Processed_Records: item.Processed_Records,
                            FileUrl: item.FileUrl,
                            ProcessStage: item.ProcessStage,
                            Status: item.Status,
                            date: date
                        })
                        resp();
                    }, function (err) {
                        if (!err) {
                            callback(new ApiResponce({
                                success: true,
                                extras: {
                                    SheetData: SheetData,
                                    Count: Count
                                }
                            }));
                        }
                    })
                }
            })
        }
    })
}
exports.Search_All_Sheets_Records = function (values, callback) {
    var query = {
        OrderSheetID: values.OrderSheetID,
        $or: [
            {
                CustomerName: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                CustomerPhone: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                CustomerEmailID: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                itemName: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                pickAddress: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                dropAddress: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                receiverName: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                receiverPhone: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                Message: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }
        ]
    };
    Customer_Order_Sheet_Records.find(query).exec(function (err, Result) {
        if (!err) {
            var RecordData = [];
            async.eachSeries(Result, function (item, resp) {
                var Date = moment(item.created_at).utcOffset(330).format('MMM-DD,YYYY h:mm A')
                RecordData.push({
                    OrderSheetID: item.OrderSheetID,
                    OrderSheetNumber: item.OrderSheetNumber,
                    Date: Date,
                    RecordID: item.RecordID,
                    itemName: item.itemName,
                    pickAddress: item.pickAddress,
                    dropAddress: item.dropAddress,
                    pickLatitude: item.pickLatitude,
                    pickLongitude: item.pickLongitude,
                    dropLatitude: item.dropLatitude,
                    dropLongitude: item.dropLongitude,
                    receiverName: item.receiverName,
                    receiverPhone: item.receiverPhone,
                    Status: item.Status,
                    Message: item.Message
                })
                resp();
            }, function (err) {
                if (!err) {
                    callback(new ApiResponce({
                        success: true,
                        extras: {
                            RecordData: RecordData
                        }
                    }));
                }
            })
        }
    })
}
exports.Find_All_Sheets_Records = function (values, callback) {
    var query = {
        OrderSheetID: values.OrderSheetID
    };
    var toSkip = parseInt(values.skip);
    var toLimit = parseInt(values.limit);
    var ProcessQuery = {
        OrderSheetID: values.OrderSheetID,
        Status: {
            $ne: 8
        }
    }
    var Order_Queue_Query = {
        OrderSheetID: values.OrderSheetID,
        Status: 5
    }
    var Order_Place_Query = {
        OrderSheetID: values.OrderSheetID,
        Status: 6
    }
    var Order_Error_Query = {
        OrderSheetID: values.OrderSheetID,
        Status: 8
    }
    Customer_Order_Sheet_Records.count(ProcessQuery).exec(function (err, Processed_Records) {
        if (Processed_Records >= 0) {
            Customer_Order_Sheet_Records.count(Order_Queue_Query).exec(function (err, Order_Queue_Records) {
                if (Order_Queue_Records >= 0) {
                    Customer_Order_Sheet_Records.count(Order_Place_Query).exec(function (err, Order_Placed_Records) {
                        if (Order_Placed_Records >= 0) {
                            Customer_Order_Sheet_Records.count(Order_Error_Query).exec(function (err, Order_Error_Records) {
                                if (Order_Error_Records >= 0) {
                                    Customer_Order_Sheet_Records.count(query).exec(function (err, Count) {
                                        if (Count >= 0) {
                                            Customer_Order_Sheet_Records.find(query).skip(toSkip).limit(toLimit).exec(function (err, Result) {
                                                if (!err) {
                                                    var RecordData = [];
                                                    async.eachSeries(Result, function (item, resp) {
                                                        var Date = moment(item.created_at).utcOffset(330).format('MMM-DD,YYYY h:mm A')
                                                        RecordData.push({
                                                            OrderSheetID: item.OrderSheetID,
                                                            OrderSheetNumber: item.OrderSheetNumber,
                                                            Date: Date,
                                                            RecordID: item.RecordID,
                                                            itemName: item.itemName,
                                                            pickAddress: item.pickAddress,
                                                            dropAddress: item.dropAddress,
                                                            pickLatitude: item.pickLatitude,
                                                            pickLongitude: item.pickLongitude,
                                                            dropLatitude: item.dropLatitude,
                                                            dropLongitude: item.dropLongitude,
                                                            receiverName: item.receiverName,
                                                            receiverPhone: item.receiverPhone,
                                                            Status: item.Status,
                                                            Message: item.Message
                                                        })
                                                        resp();
                                                    }, function (err) {
                                                        if (!err) {
                                                            callback(new ApiResponce({
                                                                success: true,
                                                                extras: {
                                                                    RecordData: RecordData,
                                                                    Count: Count,
                                                                    Processed_Records: Processed_Records,
                                                                    Order_Queue_Records: Order_Queue_Records,
                                                                    Order_Placed_Records: Order_Placed_Records,
                                                                    Order_Error_Records: Order_Error_Records
                                                                }
                                                            }));
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}
exports.UploadFileAWS = function (nfile, fname, contentType, callback) {
    // Upload to the S3 Bucket
    fs.readFile(nfile, function (err, buf) {
        var req = knoxClient.put(fname, {
            'Content-Length': buf.length,
            'Content-Type': contentType
        });
        req.on('response', function (rest) {
            if (rest.statusCode == 200) {
                // Delete the Local File
                fs.unlink(nfile, function () {
                    callback(false, new ApiResponce({ success: true, extras: { Status: "Uploaded Successfully" } }));
                })
            } else {
                console.log("AWS Upload Fails");
            }
        });
        req.end(buf);
    })
};

exports.Storing_Excel_Order_Records = function (req, res) {
    function generateFilename() {
        var date = new Date().getTime();
        var charBank = "abcdefghijklmnopqrstuvwxyz";
        var fstring = '';
        for (var i = 0; i < 15; i++) {
            fstring += charBank[parseInt(Math.random() * 26)];
        }
        return (fstring += date);
    }
    var nfile, fname, values, tmpFile;
    var filename, filesplit, extension, contentType;
    var newForm = new formidable.IncomingForm();
    newForm.keepExtensions = true;
    newForm.parse(req, function (err, fields, files) {
        values = fields;
        fname = generateFilename();
        tmpFile = files.file.path;
        filename = files.file.name;
        filesplit = filename.split('.');
        extension = filesplit[(filesplit.length) - 1];
        contentType = files.file.type;
    });
    newForm.on('end', function () {
        if (values.CustomerID != null) {
            CustomerMod.Check_for_CustomerID(values, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    if (CustomerData.Premium_User == true && CustomerData.Premium_Status == true) {
                        if (CustomerData.Default_Pickup_Location_Exist == true) {
                            if (CustomerData.Premium_Pricing_Set == true) {
                                nfile = os.tmpDir() + '/' + fname + '.' + extension;
                                fname = fname + '.' + extension;
                                fs.rename(tmpFile, nfile, function () {
                                    Counters.findOneAndUpdate({
                                        _id: "ordersheet"
                                    }, {
                                            $set: {
                                                _id: "ordersheet"
                                            },
                                            $inc: {
                                                "seq": 1
                                            }
                                        }, {
                                            upsert: true,
                                            returnNewDocument: true
                                        }).exec(function (err, Result) {
                                            var OrderSheetNumber = parseInt(Result.seq) + 1;
                                            var OrderSheetID = uuid();
                                            var ProcessStage = 1;
                                            var date = new Date();
                                            var SheetInformation = new Customer_Order_Sheets({
                                                OrderSheetID: OrderSheetID,
                                                CustomerID: values.CustomerID,
                                                CustomerName: CustomerData.First_name,
                                                CustomerEmailID: CustomerData.Email,
                                                CustomerPhone: CustomerData.Phone,
                                                OrderSheetNumber: OrderSheetNumber,
                                                filename: filename,
                                                Total_Records: 0,
                                                Processed_Records: 0,
                                                ProcessStage: ProcessStage,
                                                Status: true,
                                                created_at: date,
                                                updated_at: date
                                            })
                                            SheetInformation.save(function (err, SheetData) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    var workbook = XLSX.readFile(nfile, {
                                                        cellFormula: false,
                                                        cellHTML: false,
                                                        raw: false,
                                                        cellNF: false,
                                                        cellStyles: false,
                                                        sheetRows: 4000,
                                                        cellHTML: false,
                                                        cellText: false
                                                    });
                                                    var ExcelResult = {
                                                        SheetNames: workbook.SheetNames,
                                                        Sheets: workbook.Sheets[workbook.SheetNames[0]]
                                                    };
                                                    var RowData = ExcelResult.Sheets['!ref'];
                                                    var splitted = RowData.split(':');
                                                    var senva_val = splitted[1];
                                                    var newval = senva_val.length;
                                                    var lastRow = parseInt(senva_val.slice(1, newval)) - 1;
                                                    var ParseData = [];
                                                    for (var i = 2; i <= lastRow; i++) {
                                                        var itemName = ExcelResult.Sheets['A' + i].v;
                                                        var dropAddress = ExcelResult.Sheets['B' + i].v;
                                                        var receiverName = ExcelResult.Sheets['C' + i].v;
                                                        var receiverPhone = ExcelResult.Sheets['D' + i].v;
                                                        ParseData.push({
                                                            'itemName': itemName,
                                                            'pickAddress': CustomerData.Default_Pickup_Address,
                                                            'dropAddress': dropAddress,
                                                            'receiverName': receiverName,
                                                            'receiverPhone': receiverPhone
                                                        });
                                                    }
                                                    res.send(new ApiResponce({
                                                        success: true,
                                                        extras: {
                                                            Status: 'Sheet is Processing',
                                                            SheetData: SheetData
                                                        }
                                                    }));
                                                    ExcelMod.UploadFileAWS(nfile, fname, contentType, function (err, responcer) {
                                                        if (!err) {
                                                            var ExcelUpdateQuery = {
                                                                OrderSheetID: SheetData.OrderSheetID
                                                            };
                                                            var excelUpdateChanges = {
                                                                $set: {
                                                                    FileUrl: fname,
                                                                    ProcessStage: 2,
                                                                    Processed_Records: 0,
                                                                    Total_Records: ParseData.length
                                                                }
                                                            };
                                                            Customer_Order_Sheets.update(ExcelUpdateQuery, excelUpdateChanges, function (err, Result) {
                                                                if (!err) {
                                                                    console.log("Uploaded to AWS");
                                                                    ExcelMod.Process_Parsed_Excel_Data(ParseData, CustomerData, SheetData, function (err, ProcessingStatus) {
                                                                        if (!err) {
                                                                            console.log(ProcessingStatus);
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        })
                                })
                            } else {
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.PREMIUM_CUSTOMER_PRICING_NOT_EXIST
                                    }
                                }));
                            }
                        } else {
                            res.send(new ApiResponce({
                                success: false,
                                extras: {
                                    msg: ApiMessages.PREMIUM_CUSTOMER_PICKUP_LOCATION_NOT_EXIST
                                }
                            }));
                        }
                    } else {
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.PREMIUM_CUSTOMER_NOT_FOUND
                            }
                        }));
                    }
                }
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    })
}
exports.Process_Parsed_Excel_Data = function (ParseOrderData, CustomerData, SheetData, callback) {
    function StoreRecord(OrderData, CustomerData, SheetData, callback) {
        process.nextTick(function () {
            var date = new Date();
            var RecordID = uuid();
            var deliverycharge = CustomerData.Premium_Same_Day_Pricing;
            var RecordData = new Customer_Order_Sheet_Records({
                OrderSheetID: SheetData.OrderSheetID,
                OrderSheetNumber: SheetData.OrderSheetNumber,
                RecordID: RecordID,
                CustomerID: CustomerData._id,
                CustomerName: CustomerData.First_name,
                CustomerPhone: CustomerData.Phone,
                CustomerEmailID: CustomerData.Email,
                itemName: OrderData.itemName,
                deliverycharge: deliverycharge,
                pickAddress: OrderData.pickAddress,
                dropAddress: OrderData.dropAddress,
                receiverName: OrderData.receiverName,
                receiverPhone: OrderData.receiverPhone,
                Status: 1,
                Message: "Record Stored and Processed Initiated",
                created_at: date,
                updated_at: date,
            });
            RecordData.save(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, Result);
                }
            })
        })
    }
    function FindLatLong(Address, callback) {
        process.nextTick(function () {
            CustomerMod.Address_Lat_Long_Function(Address, function (err, LatLongData) {
                if (!err) {
                    callback(null, LatLongData);
                }
            })
        })
    }
    function UpdateLatLongRecord(RecordData, PickData, DropData, callback) {
        process.nextTick(function () {
            var query = {
                RecordID: RecordData.RecordID
            };
            var changes = {
                $set: {
                    pickLatitude: parseFloat(PickData.latitude),
                    pickLongitude: parseFloat(PickData.longitude),
                    dropLatitude: parseFloat(DropData.latitude),
                    dropLongitude: parseFloat(DropData.longitude),
                    Status: 2,
                    Message: "Order Pick Address and Drop Address Found"
                }
            };
            Customer_Order_Sheet_Records.update(query, changes, function (err, Result) {
                callback(null, 'Update Lat Long successfully');
            })
        })
    }

    function UpdateRecordError(type, RecordData, callback) {
        process.nextTick(function () {
            var Status = 8;
            var Message = "";
            if (type == 1) {
                Message = "Pick Address not Found"
            } else if (type == 2) {
                Message = "Drop Address not Found"
            } else if (type == 3) {
                Message = "Pick Address not in zone"
            } else if (type == 4) {
                Message = "Drop Address not in zone"
            } else if (type == 5) {
                Message = "Pick Address and Drop Address not in same zone"
            }
            var query = {
                RecordID: RecordData.RecordID
            };
            var changes = {
                $set: {
                    Status: Status,
                    Message: Message
                }
            };
            Customer_Order_Sheet_Records.update(query, changes, function (err, Result) {
                callback(null, 'Error Updated successfully');
            })
        })
    }
    function UpdateZoneMatch(RecordData, callback) {
        process.nextTick(function () {
            var query = {
                RecordID: RecordData.RecordID
            };
            var changes = {
                $set: {
                    Status: 3,
                    Message: "Pick Address and Drop Address are in Same Zone"
                }
            };
            Customer_Order_Sheet_Records.update(query, changes, function (err, Result) {
                callback(null, 'Zone Status successfully');
            })
        })
    }
    function UpdateRecordProcessedSheet(SheetData, callback) {
        process.nextTick(function () {
            Customer_Order_Sheets.findOneAndUpdate({
                OrderSheetID: SheetData.OrderSheetID
            }, {
                    $set: {
                        OrderSheetID: SheetData.OrderSheetID
                    },
                    $inc: {
                        "Processed_Records": 1
                    }
                }, {
                    upsert: true,
                    returnNewDocument: true
                }).exec(function (err, Result) {
                    callback(null, 'Processed 1 Record in Sheet');
                })
        })
    }
    function UpdateSheetAllRecordProcessed(SheetData, callback) {
        process.nextTick(function () {
            var query = {
                OrderSheetID: SheetData.OrderSheetID
            }
            var changes = {
                $set: {
                    ProcessStage: 3
                }
            }
            Customer_Order_Sheets.update(query, changes, function (err, Result) {
                callback(null, 'Sheet Processing Completed Successfully');
            })
        })
    }
    function UpdateRecordCompleted(RecordData, callback) {
        process.nextTick(function () {
            var query = {
                RecordID: RecordData.RecordID
            };
            var changes = {
                $set: {
                    Status: 4,
                    Message: "Record Ready for Order"
                }
            };
            Customer_Order_Sheet_Records.update(query, changes, function (err, Result) {
                callback(null, 'Record Processing Completed');
            })
        })
    }
    function ZoneFindingFunction(data, callback) {
        process.nextTick(function () {
            var Latitude = parseFloat(data.latitude);
            var Longitude = parseFloat(data.longitude);
            console.log(data);
            var zones = ZONES;
            var query = {
                'polygons': {
                    $geoIntersects: {
                        $geometry: {
                            type: "Point",
                            coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)]
                        }
                    }
                }
            }
            zones.findOne(query).exec(function (err, Result) {
                callback(null, Result);
            });
        });
    }
    sync(function () {
        var OrderParseData = ParseOrderData;
        for (var i = 0; i < OrderParseData.length; i++) {
            //Store Order Data and Initiate it
            var RecordData = StoreRecord.sync(null, OrderParseData[i], CustomerData, SheetData);
            //fetch Pick Address
            var PickData = FindLatLong.sync(null, RecordData.pickAddress);
            if (PickData.latlong == true) {
                //fetch Drop Address
                var DropData = FindLatLong.sync(null, RecordData.dropAddress);
                if (DropData.latlong == true) {
                    var UpdateLatLong = UpdateLatLongRecord.sync(null, RecordData, PickData, DropData);

                    var pickupzoneObj = ZoneFindingFunction.sync(null, PickData);
                    if (pickupzoneObj != null) {
                        var dropupzoneObj = ZoneFindingFunction.sync(null, DropData);
                        if (dropupzoneObj != null) {
                            if (pickupzoneObj.city_id == dropupzoneObj.city_id) {
                                //Update Pick and drop same zone
                                var ZoneStatus = UpdateZoneMatch.sync(null, RecordData);
                                var UpdateRecordSheetProcessed = UpdateRecordProcessedSheet.sync(null, SheetData);
                                var CompleteRecord = UpdateRecordCompleted.sync(null, RecordData);
                            } else {
                                //Pick Address and Drop Address not in same zone
                                var RecordError = UpdateRecordError.sync(null, 5, RecordData);
                            }
                        } else {
                            //drop Address not in zone
                            var RecordError = UpdateRecordError.sync(null, 4, RecordData);
                        }
                    } else {
                        //pick Address not in zone
                        var RecordError = UpdateRecordError.sync(null, 3, RecordData);
                    }
                } else {
                    //Set Record Process Fail by Drop Address not found
                    var RecordError = UpdateRecordError.sync(null, 2, RecordData);
                }
            } else {
                //Set Record Process Fail by Pick Address not found
                var RecordError = UpdateRecordError.sync(null, 1, RecordData);
            }
        };
        var TotalRecordProcessed = UpdateSheetAllRecordProcessed.sync(null, SheetData);
        callback(false, 'All Record Processed');
    })
}
exports.Check_for_Sheet_RecordID = function (values, callback) {
    Customer_Order_Sheet_Records.findOne({ RecordID: values.RecordID }, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                callback(false, Result);
            } else if (Result == null) {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Sheet_Record_Not_Found
                    }
                }));
            }
        }
    })
}

exports.Check_for_Order_SheetID = function (values, callback) {
    Customer_Order_Sheets.findOne({ OrderSheetID: values.OrderSheetID }, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                callback(false, Result);
            } else if (Result == null) {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Order_Sheet_Not_Found
                    }
                }));
            }
        }
    })
}


