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
var Store_Branch = require("../Models/Store_Branch.js");

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
var StoreMod = require('../CoreModules/storemod.js'); // Setting the Path for Customer Modules

var cron = require('cron');
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
exports.Update_Order_Title_Case = function (callback) {
    function OrderDataFunction(callback) {
        process.nextTick(function () {
            var thisMoment = moment().subtract(1, "day");
            Orders.find({ Date: { $gte: thisMoment } }, { _id: 1, customerName: 1, SenderName: 1, receiverName: 1 }).exec(function (err, Result) {
                callback(null, Result);
            })
        })
    }
    function UpdateOrderName(OrderData, callback) {
        process.nextTick(function () {
            var query = {
                _id: OrderData._id
            };
            var customerName = StoreMod.Format_Beautify_String(OrderData.customerName);
            var SenderName = StoreMod.Format_Beautify_String(OrderData.SenderName);
            var receiverName = StoreMod.Format_Beautify_String(OrderData.receiverName);

            var changes = {
                $set: {
                    customerName: customerName,
                    SenderName: SenderName,
                    receiverName: receiverName
                }
            };
            var multiplicity = {
                multi: false
            };
            Orders.update(query, changes, multiplicity).exec(function (err, Result) {
                callback(null, "Order Name Updated Successfully")
            });
        })
    }
    sync(function () {
        var Result = OrderDataFunction.sync(null);
        async.eachSeries(Result, function (item, resp) {
            var UpdateOrder = UpdateOrderName.sync(null, item);
            resp();
        }, function (err) {
            callback("Order Names Updated Successfully");
        })
    })
}
exports.Update_Customer_Title_Case = function (callback) {
    function CustomerDataFunction(callback) {
        process.nextTick(function () {
            var thisMoment = moment().subtract(1, "day");
            Customers.find({ acc_status: 1, Verify: 0, Signup_Date: { $gte: thisMoment } }, { _id: 1, First_name: 1 }).exec(function (err, Result) {
                callback(null, Result);
            })
        })
    }
    function UpdateCustomerName(CustomerData, callback) {
        process.nextTick(function () {
            var query = {
                _id: CustomerData._id
            };
            var First_name = StoreMod.Format_Beautify_String(CustomerData.First_name);
            var changes = {
                $set: {
                    First_name: First_name
                }
            };
            var multiplicity = {
                multi: false
            };
            Customers.update(query, changes, multiplicity).exec(function (err, Result) {
                callback(null, "Customer Name Updated Successfully")
            })
        })
    }
    sync(function () {
        var Result = CustomerDataFunction.sync(null);
        async.eachSeries(Result, function (item, resp) {
            var UpdateCustomer = UpdateCustomerName.sync(null, item);
            resp();
        }, function (err) {
            callback("Customer Names Updated Successfully");
        })
    })
}

var Promotional_Contacts = require("../Models/Promotional_Contacts.js");
exports.Store_Contacts_for_Promotional = function (callback) {
    function OrderDataFunction(resp) {
        process.nextTick(function () {
            console.log("Entering function");
            var query = {
                Whether_Deleted: false,
                Whether_PRomotional_Stored: {
                    $ne: true
                }
            };
            var selections = {
                customerName: 1,
                customerPhone: 1,
                customerEmail: 1,
                SenderName: 1,
                SenderPhoneNumber: 1,
                receiverName: 1,
                receiverPhone: 1,
                PromotionalDataStored: 1
            }
            var Orders = require('../Models/Orders.js');
            Orders.find(query, selections).exec(function (err, Result) {
                resp(null, Result);
            })
        })
    }
    function StoreCustomerDetailsFunction(OrderData, callback) {
        process.nextTick(function () {
            var Name = "";
            var PhoneNumber = "";
            var EmailID = "";
            if (OrderData.customerPhone == null || OrderData.customerPhone == "") {
                callback(null, "Invalid");
            } else {
                if (OrderData.customerName != null) {
                    Name = OrderData.customerName
                };

                if (OrderData.customerPhone != null) {
                    PhoneNumber = OrderData.customerPhone
                    PhoneNumber = PhoneNumber.replace('+91', '');
                };

                if (OrderData.customerEmail != null) {
                    EmailID = OrderData.customerEmail
                };

                var query = {
                    PhoneNumber: PhoneNumber
                };

                Promotional_Contacts.findOne(query, function (err, ContactDetails) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (ContactDetails == null) {

                            var ContactID = uuid();
                            var ContactData = new Promotional_Contacts({
                                ContactID: ContactID,
                                Name: Name,
                                PhoneNumber: PhoneNumber,
                                EmailID: EmailID
                            });
                            ContactData.save(function (err, Result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    callback(null, "Contact Stored");
                                }
                            })
                        } else if (ContactDetails != null) {
                            callback(null, "Contact Already Exist");
                        }
                    }
                })
            }
        })
    }
    function StoreSenderDetailsFunction(OrderData, callback) {
        process.nextTick(function () {
            var Name = "";
            var PhoneNumber = "";
            var EmailID = "";
            if (OrderData.SenderPhoneNumber == null || OrderData.SenderPhoneNumber == "") {
                callback(null, "Invalid");

            } else {
                if (OrderData.SenderName != null) {
                    Name = OrderData.SenderName
                };

                if (OrderData.SenderPhoneNumber != null) {
                    PhoneNumber = OrderData.SenderPhoneNumber
                    PhoneNumber = PhoneNumber.replace('+91', '');
                };
                var query = {
                    PhoneNumber: PhoneNumber
                };
                Promotional_Contacts.findOne(query, function (err, ContactDetails) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (ContactDetails == null) {

                            var ContactID = uuid();
                            var ContactData = new Promotional_Contacts({
                                ContactID: ContactID,
                                Name: Name,
                                PhoneNumber: PhoneNumber,
                                EmailID: EmailID
                            });
                            ContactData.save(function (err, Result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    callback(null, "Contact Stored");
                                }
                            })
                        } else if (ContactDetails != null) {
                            callback(null, "Contact Already Exist");
                        }
                    }
                })
            }
        })
    }
    function StoreRecieverDetailsFunction(OrderData, callback) {
        process.nextTick(function () {
            var Name = "";
            var PhoneNumber = "";
            var EmailID = "";
            if (OrderData.receiverPhone == null || OrderData.receiverPhone == "") {
                callback(null, "Invalid");
            } else {
                if (OrderData.receiverName != null) {
                    Name = OrderData.receiverName
                };

                if (OrderData.receiverPhone != null) {
                    PhoneNumber = OrderData.receiverPhone
                    PhoneNumber = PhoneNumber.replace('+91', '');
                };
                var query = {
                    PhoneNumber: PhoneNumber
                };
                Promotional_Contacts.findOne(query, function (err, ContactDetails) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (ContactDetails == null) {

                            var ContactID = uuid();
                            var ContactData = new Promotional_Contacts({
                                ContactID: ContactID,
                                Name: Name,
                                PhoneNumber: PhoneNumber,
                                EmailID: EmailID
                            });
                            ContactData.save(function (err, Result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    callback(null, "Contact Stored");
                                }
                            })
                        } else if (ContactDetails != null) {
                            callback(null, "Contact Already Exist");
                        }
                    }
                })
            }
        })
    }
    function UpdateOrderFunction(OrderData, callback) {
        process.nextTick(function () {
            var query = {
                _id: OrderData._id
            }
            var changes = {
                $set: {
                    Whether_PRomotional_Stored: true
                }
            }
            Orders.update(query, changes).exec(function (err, Result) {
                callback(null, "Order updated Successfully");
            })
        })
    }
    sync(function () {
        console.log("Entering here")
        var Result = OrderDataFunction.sync(null);
        console.log(Result);
        async.each(Result, function (item, resp) {
            var StoreCustomerDetails = StoreCustomerDetailsFunction.sync(null, item);
            var StoreSenderDetails = StoreSenderDetailsFunction.sync(null, item);
            var StoreRecieverDetails = StoreRecieverDetailsFunction.sync(null, item);
            var UpdateOrder = UpdateOrderFunction.sync(null, item);
            resp();
        }, function (err) {
            callback("Script Runned Successfully");
        })
    })
}
// Search  All Store Orders
exports.Search_All_Store_Branch_Orders = function (values, callback) {
    var sync = require('sync');
    function OrderDataFunction(values, callback) {
        process.nextTick(function () {
            var query = {
                WhetherStoreOrder: true,
                BranchID: values.BranchID,
                Whether_Deleted: false,
                $or: [{
                    orderseqId: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    customerName: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    customerPhone: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    customerEmail: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    order_datetime: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    due_datetime: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    pickAddress: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    dropAddress: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    address1: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    address2: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    receiverName: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    receiverPhone: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    paymentId: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    itemName: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    itemDescription: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    deliverycharge: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    comments: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    pickupdeponame: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    deliverydeponame: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    reviewMsg: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    StoreName: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    StorePhoneNumber: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    StoreEmailID: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                },
                {
                    StoreAddress: {
                        '$regex': values.SearchValue,
                        $options: 'i'
                    }
                }
                ]
            };
            Orders.find(query).sort({
                Date: -1
            }).limit(10).exec(function (err, Result) {
                callback(null, Result);
            })
        })
    }
    function CustomerDataFunction(values, callback) {
        process.nextTick(function () {
            var query = {
                _id: values.userId
            };
            Customers.findOne(query).exec(function (err, Result) {
                callback(null, Result);
            });
        });
    }
    function DriverDataFunction(DriverID, callback) {
        process.nextTick(function () {
            var query = {
                _id: DriverID
            };
            Drivers.findOne(query).exec(function (err, Result) {
                callback(null, Result);
            });
        });
    }
    function OfferDataFunction(OfferID, callback) {
        process.nextTick(function () {
            var query = {
                OfferID: OfferID
            };
            Offers.findOne(query).exec(function (err, Result) {
                callback(null, Result);
            });
        });
    }
    sync(function () {
        var Result = OrderDataFunction.sync(null, values);
        var OrderData = [];
        var t = 0;
        var First_name, Email, Phone, countryCode;

        for (var i = 0; i < Result.length; i++) {
            var Result2 = CustomerDataFunction.sync(null, Result[t]);
            if (Result2 == null) {
                First_name = "";
                Email = "";
                Phone = "";
                countryCode = "";
            } else {
                First_name = Result2.First_name;
                Email = Result2.Email;
                Phone = Result2.Phone;
                countryCode = Result2.countryCode;
            }
            var EventArray = Result[t].eventLog;
            var EventArrayLength = Result[t].eventLog.length;
            var Driver_Name, Driver_PhoneNumber, Driver_Email, Driver_Assigned;
            if (EventArrayLength == 0 || EventArrayLength == 1) {
                Driver_Assigned = false;
                Driver_Name = '';
                Driver_PhoneNumber = '';
                Driver_Email = '';
            } else {
                var DriverID = EventArray[(EventArrayLength) - 1].driverid;
                var Result3 = DriverDataFunction.sync(null, DriverID);
                if (Result3 == null) {
                    Driver_Assigned = false;
                    Driver_Name = '';
                    Driver_PhoneNumber = '';
                    Driver_Email = '';
                } else {
                    Driver_Assigned = true;
                    Driver_Name = Result3.name;
                    Driver_PhoneNumber = Result3.phone;
                    Driver_Email = Result3.email;
                }
            }
            var OfferApplied;
            var OfferName;
            var OfferDescription;
            var OfferCode;
            var DiscountPercentage;

            if (Result[t].OfferApplied == true) {
                var OfferID = Result[t].OfferID;
                var Result4 = OfferDataFunction.sync(null, OfferID);
                if (Result4 == null) {
                    OfferApplied = false;
                    OfferName = '';
                    OfferDescription = '';
                    OfferCode = '';
                    DiscountPercentage = '';
                } else {
                    OfferApplied = true;
                    OfferName = Result4.OfferName;
                    OfferDescription = Result4.OfferDescription;
                    OfferCode = Result4.OfferCode;
                    DiscountPercentage = Result4.DiscountPercentage;
                }
            } else {
                OfferApplied = false;
                OfferName = '';
                OfferDescription = '';
                OfferCode = '';
                DiscountPercentage = '';
            }
            var moment = require('moment');
            var Order_Accepted_Time;
            var Order_Completed_Time;
            var Order_Journey_Time;
            var Shipping_Distance;
            if (Result[t].Order_Accepted_Time == null) {
                Order_Accepted_Time = '';
            } else {
                Order_Accepted_Time = moment(Result[t].Order_Accepted_Time).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
            }
            if (Result[t].Order_Completed_Time == null) {
                Order_Completed_Time = '';
                Order_Journey_Time = '';
            } else {
                Order_Completed_Time = moment(Result[t].Order_Completed_Time).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                Order_Journey_Time = Result[t].Order_Journey_Time;
            }
            Shipping_Distance = parseFloat(Result[t].Shipping_Distance);
            OrderData.push({
                First_name: First_name,
                Email: Email,
                Phone: Phone,
                Order_Accepted_Time: Order_Accepted_Time,
                Order_Completed_Time: Order_Completed_Time,
                Order_Journey_Time: Order_Journey_Time,
                Shipping_Distance: Shipping_Distance,
                Driver_Assigned: Driver_Assigned,
                DriverID: DriverID,
                Driver_Name: Driver_Name,
                Driver_PhoneNumber: Driver_PhoneNumber,
                Driver_Email: Driver_Email,
                OfferApplied: OfferApplied,
                OfferName: OfferName,
                OfferDescription: OfferDescription,
                OfferCode: OfferCode,
                DiscountPercentage: DiscountPercentage,
                countryCode: countryCode,
                order_datetime: Result[t].order_datetime,
                status: Result[t].status,
                DeviceType: Result[t].Devices.DeviceType,
                orderId: Result[t]._id,
                orderseqId: Result[t].orderseqId,
                orderType: Result[t].orderType,
                due_datetime: Result[t].due_datetime,
                CustomerID: Result[t].userId,
                pickAddress: Result[t].pickAddress,
                dropAddress: Result[t].dropAddress,
                pickLatitude: Result[t].pickLocation.Latitude,
                pickLongitude: Result[t].pickLocation.Longitude,
                dropLatitude: Result[t].dropLocation.Latitude,
                dropLongitude: Result[t].dropLocation.Longitude,
                paymentType: Result[t].paymentType,
                itemDescription: Result[t].itemDescription,
                receiverName: Result[t].receiverName,
                receiverPhone: Result[t].receiverPhone,
                itemName: Result[t].itemName,
                deliverycharge: Result[t].deliverycharge,
                item_actual_cost: Result[t].item_actual_cost,
                itemImage: Result[t].itemImage,
                PickZone: Result[t].pickupdeponame,
                DropZone: Result[t].deliverydeponame,
                bookingType: Result[t].bookingType,
                WhetherStoreOrder: Result[t].WhetherStoreOrder,
                BranchID: Result[t].BranchID,
                CartID: Result[t].CartID,
                StoreName: Result[t].StoreName,
                StorePhoneNumber: Result[t].StorePhoneNumber,
                StoreEmailID: Result[t].StoreEmailID,
                StoreAddress: Result[t].StoreAddress,
                Cart_Amount: Result[t].Cart_Amount,
                Cart_Parcel_Wieght: Result[t].Cart_Parcel_Wieght,
                StoreCartData: Result[t].StoreCartData
            });
            t++;
        }
        return callback(new ApiResponce({
            success: true,
            extras: {
                OrderData: OrderData
            }
        }));
    });
};

// Find  All Store Orders
exports.Find_All_Store_Branch_Orders = function (values, callback) {
    var sync = require('sync');
    function OrderCountFunction(values, callback) {
        process.nextTick(function () {
            var query = {
                WhetherStoreOrder: true,
                BranchID: values.BranchID,
                Whether_Deleted: false
            };
            Orders.count(query).sort({
                Date: -1
            }).exec(function (err, Result) {
                callback(null, Result);
            })
        })
    }
    function OrderDataFunction(values, callback) {
        process.nextTick(function () {
            var query = {
                WhetherStoreOrder: true,
                BranchID: values.BranchID,
                Whether_Deleted: false,
            };
            var toSkip = parseInt(values.skip);
            Orders.find(query).sort({
                Date: -1
            }).skip(toSkip).limit(10).exec(function (err, Result) {
                callback(null, Result);
            })
        })
    }
    function CustomerDataFunction(values, callback) {
        process.nextTick(function () {
            var query = {
                _id: values.userId
            };
            Customers.findOne(query).exec(function (err, Result) {
                callback(null, Result);
            });
        });
    }

    function DriverDataFunction(DriverID, callback) {
        process.nextTick(function () {
            var query = {
                _id: DriverID
            };
            Drivers.findOne(query).exec(function (err, Result) {
                callback(null, Result);
            });
        });
    }

    function OfferDataFunction(OfferID, callback) {
        process.nextTick(function () {
            var query = {
                OfferID: OfferID
            };
            Offers.findOne(query).exec(function (err, Result) {
                callback(null, Result);
            });
        });
    }
    sync(function () {
        var Count = OrderCountFunction.sync(null, values);
        var Result = OrderDataFunction.sync(null, values);
        var OrderData = [];
        var t = 0;
        var First_name, Email, Phone, countryCode;
        for (var i = 0; i < Result.length; i++) {
            var Result2 = CustomerDataFunction.sync(null, Result[t]);
            if (Result2 == null) {
                First_name = "";
                Email = "";
                Phone = "";
                countryCode = "";
            } else {
                First_name = Result2.First_name;
                Email = Result2.Email;
                Phone = Result2.Phone;
                countryCode = Result2.countryCode;
            }
            var EventArray = Result[t].eventLog;
            var EventArrayLength = Result[t].eventLog.length;
            var Driver_Name, Driver_PhoneNumber, Driver_Email, Driver_Assigned;
            if (EventArrayLength == 0 || EventArrayLength == 1) {
                Driver_Assigned = false;
                Driver_Name = '';
                Driver_PhoneNumber = '';
                Driver_Email = '';
            } else {
                var DriverID = EventArray[(EventArrayLength) - 1].driverid;
                var Result3 = DriverDataFunction.sync(null, DriverID);
                if (Result3 == null) {
                    Driver_Assigned = false;
                    Driver_Name = '';
                    Driver_PhoneNumber = '';
                    Driver_Email = '';
                } else {
                    Driver_Assigned = true;
                    Driver_Name = Result3.name;
                    Driver_PhoneNumber = Result3.phone;
                    Driver_Email = Result3.email;
                }
            }
            var OfferApplied;
            var OfferName;
            var OfferDescription;
            var OfferCode;
            var DiscountPercentage;

            if (Result[t].OfferApplied == true) {
                var OfferID = Result[t].OfferID;
                var Result4 = OfferDataFunction.sync(null, OfferID);
                if (Result4 == null) {
                    OfferApplied = false;
                    OfferName = '';
                    OfferDescription = '';
                    OfferCode = '';
                    DiscountPercentage = '';
                } else {
                    OfferApplied = true;
                    OfferName = Result4.OfferName;
                    OfferDescription = Result4.OfferDescription;
                    OfferCode = Result4.OfferCode;
                    DiscountPercentage = Result4.DiscountPercentage;
                }
            } else {
                OfferApplied = false;
                OfferName = '';
                OfferDescription = '';
                OfferCode = '';
                DiscountPercentage = '';
            }
            var moment = require('moment');
            var Order_Accepted_Time;
            var Order_Completed_Time;
            var Order_Journey_Time;
            var Shipping_Distance;
            if (Result[t].Order_Accepted_Time == null) {
                Order_Accepted_Time = '';
            } else {
                Order_Accepted_Time = moment(Result[t].Order_Accepted_Time).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
            }
            if (Result[t].Order_Completed_Time == null) {
                Order_Completed_Time = '';
                Order_Journey_Time = '';
            } else {
                Order_Completed_Time = moment(Result[t].Order_Completed_Time).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                Order_Journey_Time = Result[t].Order_Journey_Time;
            }
            Shipping_Distance = parseFloat(Result[t].Shipping_Distance);
            OrderData.push({
                First_name: First_name,
                Email: Email,
                Phone: Phone,
                Order_Accepted_Time: Order_Accepted_Time,
                Order_Completed_Time: Order_Completed_Time,
                Order_Journey_Time: Order_Journey_Time,
                Shipping_Distance: Shipping_Distance,
                Driver_Assigned: Driver_Assigned,
                DriverID: DriverID,
                Driver_Name: Driver_Name,
                Driver_PhoneNumber: Driver_PhoneNumber,
                Driver_Email: Driver_Email,
                OfferApplied: OfferApplied,
                OfferName: OfferName,
                OfferDescription: OfferDescription,
                OfferCode: OfferCode,
                DiscountPercentage: DiscountPercentage,
                countryCode: countryCode,
                order_datetime: Result[t].order_datetime,
                status: Result[t].status,
                DeviceType: Result[t].Devices.DeviceType,
                orderId: Result[t]._id,
                orderseqId: Result[t].orderseqId,
                orderType: Result[t].orderType,
                due_datetime: Result[t].due_datetime,
                CustomerID: Result[t].userId,
                pickAddress: Result[t].pickAddress,
                dropAddress: Result[t].dropAddress,
                pickLatitude: Result[t].pickLocation.Latitude,
                pickLongitude: Result[t].pickLocation.Longitude,
                dropLatitude: Result[t].dropLocation.Latitude,
                dropLongitude: Result[t].dropLocation.Longitude,
                paymentType: Result[t].paymentType,
                itemDescription: Result[t].itemDescription,
                receiverName: Result[t].receiverName,
                receiverPhone: Result[t].receiverPhone,
                itemName: Result[t].itemName,
                deliverycharge: Result[t].deliverycharge,
                item_actual_cost: Result[t].item_actual_cost,
                itemImage: Result[t].itemImage,
                PickZone: Result[t].pickupdeponame,
                DropZone: Result[t].deliverydeponame,
                bookingType: Result[t].bookingType,
                BranchID: Result[t].BranchID,
                CartID: Result[t].CartID,
                StoreName: Result[t].StoreName,
                StorePhoneNumber: Result[t].StorePhoneNumber,
                StoreEmailID: Result[t].StoreEmailID,
                StoreAddress: Result[t].StoreAddress,
                Cart_Amount: Result[t].Cart_Amount,
                Cart_Parcel_Wieght: Result[t].Cart_Parcel_Wieght,
                StoreCartData: Result[t].StoreCartData
            });
            t++;
        }
        return callback(new ApiResponce({
            success: true,
            extras: {
                OrderData: OrderData,
                Count: Count
            }
        }));
    });
};



//Activate Product Image
exports.Activate_Product = function (values, callback) {
    var query = {
        ProductID: values.ProductID
    };
    var changes = {
        Status: true
    };
    var multiplicity = {
        multi: true
    };
    //new query for cart items
    var newquery = {
        ProductID: values.ProductID
    };
    var newchanges = {
        Status: true
    };

    Store_Products.update(query, changes, multiplicity).exec(function (err, Result) {
        if (!err) {
            Customer_Store_Cart_Items.update(newquery, newchanges, multiplicity).exec(function (err, Result) {
                if (!err) {
                    return callback(false, new ApiResponce({
                        success: true,
                        extras: {
                            Status: 'Product Activated Successfully'
                        }
                    }));
                }
            })
        }
    })
};

//Remove or inactivate PRoduct
exports.Remove_Inactive_Product = function (values, callback) {
    var query = {
        ProductID: values.ProductID
    };
    var changes = {
        Status: false
    };
    var multiplicity = {
        multi: true
    };
    //new query for cart items
    var newquery = {
        ProductID: values.ProductID,
        Order_Placed: false
    };
    var newchanges = {
        Status: false
    };

    Store_Products.update(query, changes, multiplicity).exec(function (err, Result) {
        if (!err) {
            Customer_Store_Cart_Items.update(newquery, newchanges, multiplicity).exec(function (err, Result) {
                if (!err) {
                    return callback(false, new ApiResponce({
                        success: true,
                        extras: {
                            Status: 'Product Removed or Inactivated Successfully'
                        }
                    }));
                }
            })
        }
    })
};

//Update Product Image
exports.Update_Product_Image = function (values, ProductData, callback) {
    var nfile, fname;
    function generateFilename() {
        var date = new Date().getTime();
        var charBank = "abcdefghijklmnopqrstuvwxyz";
        var fstring = '';
        for (var i = 0; i < 15; i++) {
            fstring += charBank[parseInt(Math.random() * 26)];
        }
        return (fstring += date);
    }
    var path = require('path');
    var os = require('os');
    fname = generateFilename();
    //Converting Base64 dataUrl to Jpeg Image
    base64ImageToFile(values.Picture, os.tmpDir() + '', fname, function (err, imgPath) {
        nfile = os.tmpDir() + '/' + fname + '.jpeg';
        fname = fname + '.jpeg';
        // Upload to the S3 Bucket
        StoreMod.UploadImageAWS(nfile, fname, function (err, responcer) {
            var query = {
                ProductID: ProductData.ProductID
            }
            var changes = {
                ImageURL: fname
            }
            var multiplicity = {
                multi: true
            }
            //new changes for cart items
            var newquery = {
                ProductID: values.ProductID,
                Order_Placed: false
            }
            var newchanges = {
                ImageURL: fname
            }
            var multiplicity = {
                multi: true
            }
            //image query for product images
            var Imagequery = {
                ImageID: ProductData.ImageID
            }
            var Imagechanges = {
                ImageURL: fname,
            }

            Store_Products.update(query, changes, { multi: false }, function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    Store_Products_Images.update(Imagequery, Imagechanges, multiplicity).exec(function (err, Result) {
                        if (!err) {
                            Customer_Store_Cart_Items.update(newquery, newchanges, multiplicity).exec(function (err, Result) {
                                if (!err) {
                                    return callback(false, new ApiResponce({
                                        success: true,
                                        extras: {
                                            Status: 'Product Image Updated Successfully'
                                        }
                                    }));
                                }
                            })
                        }
                    })
                }
            });
        })
    })
};
//Check for level2Category Name in Branch and Category
exports.Check_Whether_Level3_CategoryName_Exist_Or_Not_Updated = function (Level3CategoryName, Level2CategoryData, callback) {
    Store_SubCategory_level3.findOne({ Level3CategoryName: Level3CategoryName, Level2CategoryID: Level2CategoryData.Level2CategoryID }).exec(function (err, SubCategoryData) {
        if (err) {
            console.log(err);
        } else {
            if (SubCategoryData == null) {
                callback(false, {});
            } else if (SubCategoryData != null) {
                callback(true, SubCategoryData);
            }
        }
    })
};

exports.Update_Do_Level3_Functionality = function (values, ProductData, Level2CategoryData, callback) {
    function Level3Subcategory1(values, ProductData, Level2CategoryData, callback) {
        process.nextTick(function () {
            var Level3CategoryName = StoreMod.Format_Beautify_String(values.Level3CategoryName);
            var Level3CategoryData;
            StoreMod.Check_Whether_Level3_CategoryName_Exist_Or_Not_Updated(Level3CategoryName, Level2CategoryData, function (err, Level3Data) {
                if (err) {
                    console.log("Level 3 exist");
                    Level3CategoryData = Level3Data;
                    callback(null, Level3CategoryData);
                } else {
                    //CREATE NEW LEVEL 2 CATEGORY
                    var Level3CategoryID = uuid();
                    var date = new Date();
                    var Level3CatData = new Store_SubCategory_level3({
                        CategoryID: ProductData.CategoryID,
                        CategoryName: ProductData.CategoryName,
                        Level2CategoryID: Level2CategoryData.Level2CategoryID,
                        Level2CategoryName: Level2CategoryData.Level2CategoryName,
                        Level3CategoryID: Level3CategoryID,
                        Level3CategoryName: Level3CategoryName,
                        created_at: date,
                        updated_at: date
                    });
                    Level3CatData.save(function (err, Result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Level3 created");
                            Level3CategoryData = Result;
                            callback(null, Level3CategoryData);
                        }
                    })
                }
            })
        })
    }
    function Update_Level3_Product(Level3CategoryData, ProductData, callback) {
        process.nextTick(function () {
            var query = {
                ProductID: ProductData.ProductID
            };
            var changes = {
                Level3CategoryAvailable: true,
                Level3CategoryID: Level3CategoryData.Level3CategoryID,
                Level3CategoryName: Level3CategoryData.Level3CategoryName
            };
            var multiplicity = {
                multi: false
            }
            Store_Products.update(query, changes, multiplicity).exec(function (err, Result) {
                console.log("Level 3 Product updated");
                callback(null, 'Level 3 date updated Successfully');
            })
        });
    };
    sync(function () {
        var Level3CategoryData = Level3Subcategory1.sync(null, values, ProductData, Level2CategoryData);
        var ProductStatus = Update_Level3_Product.sync(null, Level3CategoryData, ProductData);
        callback('All level 3 functionalities completed successfully', Level3CategoryData);
    })
}

//Check for level2Category Name in Branch and Category for update
exports.Check_Whether_Level2_CategoryName_Exist_Or_Not_Update = function (Level2CategoryName, ProductData, callback) {
    Store_SubCategory_level2.findOne({ Level2CategoryName: Level2CategoryName, CategoryID: ProductData.CategoryID, BranchID: ProductData.BranchID }).exec(function (err, SubCategoryData) {
        if (err) {
            console.log(err);
        } else {
            if (SubCategoryData == null) {
                callback(false, {});
            } else if (SubCategoryData != null) {
                callback(true, SubCategoryData);
            }
        }
    })
};
//for Editing Product Category
exports.Update_Do_Level2_Functionality = function (values, ProductData, callback) {
    function Level2Subcategory1(values, ProductData, callback) {
        process.nextTick(function () {
            var Level2CategoryName = StoreMod.Format_Beautify_String(values.Level2CategoryName);
            var Level2CategoryData;
            StoreMod.Check_Whether_Level2_CategoryName_Exist_Or_Not_Update(Level2CategoryName, ProductData, function (err, Level2Data) {
                if (err) {
                    console.log("Level 2 exist");
                    Level2CategoryData = Level2Data;
                    callback(null, Level2CategoryData);
                } else {
                    //CREATE NEW LEVEL 2 CATEGORY
                    var Level2CategoryID = uuid();
                    var date = new Date();
                    var Level2CatData = new Store_SubCategory_level2({
                        CategoryID: ProductData.CategoryID,
                        CategoryName: ProductData.CategoryName,
                        BranchID: ProductData.BranchID,
                        Branch_Name: ProductData.Branch_Name,
                        Level2CategoryID: Level2CategoryID,
                        Level2CategoryName: Level2CategoryName,
                        created_at: date,
                        updated_at: date
                    });
                    Level2CatData.save(function (err, Result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Level 2 created");
                            Level2CategoryData = Result;
                            callback(null, Level2CategoryData);
                        }
                    })
                }
            })
        })
    }
    function Update_Level2_Product(Level2CategoryData, ProductData, callback) {
        process.nextTick(function () {
            var query = {
                ProductID: ProductData.ProductID
            };
            var changes = {
                Level2CategoryAvailable: true,
                Level2CategoryID: Level2CategoryData.Level2CategoryID,
                Level2CategoryName: Level2CategoryData.Level2CategoryName,
                Level3CategoryAvailable: false,
                Level3CategoryID: '',
                Level3CategoryName: ''
            };
            var multiplicity = {
                multi: false
            }
            Store_Products.update(query, changes, multiplicity).exec(function (err, Result) {
                console.log("Level 2 Product updated");
                callback(null, 'Level 2 date updated Successfully');
            })
        });
    };
    sync(function () {
        var Level2CategoryData = Level2Subcategory1.sync(null, values, ProductData);
        var ProductStatus = Update_Level2_Product.sync(null, Level2CategoryData, ProductData);
        callback(false, 'All level 2 functionalities completed successfully', Level2CategoryData);
    })
}

//Check for Product
exports.Check_for_Product = function (values, callback) {
    var query = {
        ProductID: values.ProductID
    }
    Store_Products.findOne(query, function (err, Result) {
        if (err) {
            console.log(err)
        } else {
            if (Result != null) {
                callback(false, Result);
            } else {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Product_Not_Found
                    }
                }))
            }
        }
    })
}
//Update Image Used
exports.Update_Image_Used = function (ImageData, callback) {
    var query = {
        ImageID: ImageData.ImageID
    };
    var changes = {
        $set: {
            Whether_Image_Used: true
        }
    };
    var multiplicity = {
        multi: false
    }
    Store_Products_Images.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            return callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: 'Product Image Updated Successfully'
                }
            }));
        }
    })
}

//Remove Product Image
exports.Remove_Product_Image = function (values, callback) {
    var query = {
        ImageID: values.ImageID
    }
    Store_Products_Images.remove(query).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            return callback(new ApiResponce({
                success: true,
                extras: {
                    Status: 'Product Image Removed Successfully'
                }
            }));
        }
    })
};

//Check for  Product Image
exports.Check_for_Product_Image = function (values, callback) {
    var query = {
        ImageID: values.ImageID
    }
    Store_Products_Images.findOne(query).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                callback(false, Result)
            } else if (Result == null) {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Product_Image_Not_Found
                    }
                }));
            }
        }
    })
}

//Create Product Image
exports.Create_Product_Image = function (values, callback) {
    var nfile, fname;
    function generateFilename() {
        var date = new Date().getTime();
        var charBank = "abcdefghijklmnopqrstuvwxyz";
        var fstring = '';
        for (var i = 0; i < 15; i++) {
            fstring += charBank[parseInt(Math.random() * 26)];
        }
        return (fstring += date);
    }
    var path = require('path');
    var os = require('os');
    fname = generateFilename();
    //Converting Base64 dataUrl to Jpeg Image
    base64ImageToFile(values.Picture, os.tmpDir() + '', fname, function (err, imgPath) {
        nfile = os.tmpDir() + '/' + fname + '.jpeg';
        fname = fname + '.jpeg';
        // Upload to the S3 Bucket
        StoreMod.UploadImageAWS(nfile, fname, function (err, responcer) {
            var ImageID = uuid();
            var date = new Date();
            var ImageData = new Store_Products_Images({
                BranchID: values.BranchID,
                ImageID: ImageID,
                ImageURL: fname
            })
            ImageData.save(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    return callback(new ApiResponce({
                        success: true,
                        extras: {
                            Status: 'Product Image Added Successfully',
                            ImageID: ImageID,
                            ImageURL: config.S3URL + fname
                        }
                    }));
                }
            });
        })
    });
};

//Activate the Active Branch
exports.Activate_Store_Branch = function (values, callback) {
    var query = {
        BranchID: values.BranchID
    }
    var changes = {
        $set: {
            Status: true
        }
    }
    var multiplicity = {
        multi: true
    }
    Store_Branch.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            var newquery = {
                BranchID: values.BranchID
            }
            Customer_Store_Cart_Details.update(newquery, changes, multiplicity).exec(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    return callback(new ApiResponce({
                        success: true,
                        extras: {
                            Status: "Branch Activated Successfully"
                        }
                    }));
                }
            })

        }
    })
}
//Inactivate the Active Branch
exports.Inactivate_Store_Branch = function (values, callback) {
    var query = {
        BranchID: values.BranchID
    }
    var changes = {
        $set: {
            Status: false
        }
    }
    var multiplicity = {
        multi: true
    }
    Store_Branch.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            var newquery = {
                BranchID: values.BranchID,
                Order_Placed: false
            }
            Customer_Store_Cart_Details.update(newquery, changes, multiplicity).exec(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    return callback(new ApiResponce({
                        success: true,
                        extras: {
                            Status: "Branch Inactivated Successfully"
                        }
                    }));
                }
            })

        }
    })
}

//Find and Update Make Branch Active
exports.Find_Update_Active_Branch = function (values, callback) {
    console.log(6);
    var query = {
        _id: values.StoreAdminID
    }
    Customers.findOne(query).exec(function (err, Result) {
        console.log(Result);
        console.log(7);
        if (Result == null || Result.BranchData == null || Result.BranchData.length == 0) {
            console.log("Entering This Stage");
        } else {
            async.eachSeries(Result.BranchData, function (item, resp) {
                var changes = {
                    $set: {
                        Active_BranchID_Exist: true,
                        Active_BranchID: item.BranchID
                    }
                }
                var multiplicity = {
                    multi: false
                }
                Customers.update(query, changes, multiplicity).exec(function (err, Result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(8);
                        resp();
                    }
                })
            }, function (err) {
                console.log(9);
                return callback(new ApiResponce({
                    success: true,
                    extras: {
                        Status: "All Functionalities Completed"
                    }
                }));
            })
        }
    })
}

//Remove Branch from Admin Ezshipp
exports.Remove_Branch_from_Admin = function (values, callback) {
    console.log(1);
    var query = {
        _id: values.StoreAdminID
    };
    var changes = {
        $pull: {
            BranchData: {
                BranchID: values.BranchID
            }
        }
    }
    var multiplicity = {
        multi: false
    }
    console.log(2);
    Customers.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(3);
            console.log(err);
        } else {
            console.log(4);
            console.log(Result)
            return callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Branch Removed from Customer"
                }
            }));
        }
    })
};
//Remove Branch from Admin Ezshipp
exports.Remove_Branch_from_Admin_and_Disable_Store_Admin = function (values, callback) {
    var query = {
        _id: values.StoreAdminID
    };
    var changes = {
        $set: {
            Whether_Store_Admin: false,
            Active_BranchID_Exist: false,
            Active_BranchID: "",
            StoreAdminStatus: false
        },
        $pull: {
            BranchData: {
                BranchID: values.BranchID
            }
        }
    }
    var multiplicity = {
        multi: false
    }
    Customers.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            console.log(Result)
            return callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Branch Removed from Customer"
                }
            }));
        }
    })
}

//Remove StoreAdmin from Branch
exports.Remove_StoreAdmin_Branch = function (values, callback) {
    var query = {
        BranchID: values.BranchID
    }
    var changes = {
        $pull: {
            AdminData: {
                StoreAdminID: values.StoreAdminID
            }
        }
    }
    var multiplicity = {
        multi: false
    }
    Store_Branch.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            return callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Store Admin Removed Successfully"
                }
            }));
        }
    })
}

//Check Whether Store Admin Available to Branch
exports.Check_Whether_Store_Admin_Available_Branch = function (values, callback) {
    var query = {
        "BranchID": values.BranchID,
        "AdminData.StoreAdminID": values.StoreAdminID
    }
    Store_Branch.findOne(query).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                callback(false, Result);
            } else if (Result == null) {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Store_Admin_Not_Found
                    }
                }));
            }
        }
    })
}

//Search All Store Products
exports.Search_All_Store_Products = function (values, callback) {
    var query = {
        BranchID: values.BranchID,
        Status: true,
        $or: [
            {
                ProductName: {
                    $regex: values.SearchValue, $options: "i"
                }
            },
            {
                ProductDescription: {
                    $regex: values.SearchValue, $options: "i"
                }
            },
            {
                Branch_Name: {
                    $regex: values.SearchValue, $options: "i"
                }
            },
            {
                CategoryName: {
                    $regex: values.SearchValue, $options: "i"
                }
            },
            {
                Level2CategoryName: {
                    $regex: values.SearchValue, $options: "i"
                }
            },
            {
                Level3CategoryName: {
                    $regex: values.SearchValue, $options: "i"
                }
            },
            {
                Actual_Price: {
                    $regex: values.SearchValue, $options: "i"
                }
            },
            {
                Selling_Price: {
                    $regex: values.SearchValue, $options: "i"
                }
            }
        ]
    }
    Store_Products.find(query).sort({ created_at: -1 }).limit(10).exec(function (err, Result) {
        if (!err) {
            var ProductData = [];
            async.eachSeries(Result, function (item, resp) {
                item.ImageURL = config.S3URL + item.ImageURL;
                Customer_Store_Cart_Items.count({ ProductID: item.ProductID, Order_Delivered: true }).exec(function (err, OrderCount) {
                    if (OrderCount >= 0) {
                        ProductData.push({
                            ProductID: item.ProductID,
                            ProductName: item.ProductName,
                            ProductDescription: item.ProductDescription,
                            Avaiable_Quantity: item.Avaiable_Quantity,
                            BranchID: item.BranchID,
                            Branch_Name: item.Branch_Name,
                            CategoryID: item.CategoryID,
                            CategoryName: item.CategoryName,
                            Level2CategoryAvailable: item.Level2CategoryAvailable,
                            Level2CategoryID: item.Level2CategoryID,
                            Level2CategoryName: item.Level2CategoryName,
                            Level3CategoryAvailable: item.Level3CategoryAvailable,
                            Level3CategoryID: item.Level3CategoryID,
                            Level3CategoryName: item.Level3CategoryName,
                            Actual_Price: item.Actual_Price,
                            Selling_Price: item.Selling_Price,
                            OfferAvailable: item.OfferAvailable,
                            OfferPercent: item.OfferPercent,
                            ImageID: item.ImageID,
                            ImageURL: item.ImageURL,
                            ProductWeight: item.ProductWeight,
                            Status: item.Status,
                            OrderCount: OrderCount
                        })
                        resp();
                    }
                })
            }, function (err) {
                if (!err) {
                    return callback(new ApiResponce({
                        success: true,
                        extras: {
                            ProductData: ProductData
                        }
                    }));
                }
            })
        }
    })
}

//Find All Store Products
exports.Find_All_Store_Products = function (values, callback) {


    var query = {
        BranchID: values.BranchID,
        Status: true
    }
    var toSkip = parseInt(values.skip);
    Store_Products.count(query).exec(function (err, Count) {
        if (Count >= 0) {
            Store_Products.find(query).sort({ created_at: -1 }).skip(toSkip).limit(8).exec(function (err, Result) {
                if (!err) {
                    var ProductData = [];
                    async.eachSeries(Result, function (item, resp) {
                        item.ImageURL = config.S3URL + item.ImageURL;
                        Customer_Store_Cart_Items.count({ ProductID: item.ProductID, Order_Delivered: true }).exec(function (err, OrderCount) {
                            if (OrderCount >= 0) {
                                ProductData.push({
                                    ProductID: item.ProductID,
                                    ProductName: item.ProductName,
                                    ProductDescription: item.ProductDescription,
                                    Avaiable_Quantity: item.Avaiable_Quantity,
                                    BranchID: item.BranchID,
                                    Branch_Name: item.Branch_Name,
                                    CategoryID: item.CategoryID,
                                    CategoryName: item.CategoryName,
                                    Level2CategoryAvailable: item.Level2CategoryAvailable,
                                    Level2CategoryID: item.Level2CategoryID,
                                    Level2CategoryName: item.Level2CategoryName,
                                    Level3CategoryAvailable: item.Level3CategoryAvailable,
                                    Level3CategoryID: item.Level3CategoryID,
                                    Level3CategoryName: item.Level3CategoryName,
                                    Actual_Price: item.Actual_Price,
                                    Selling_Price: item.Selling_Price,
                                    OfferAvailable: item.OfferAvailable,
                                    OfferPercent: item.OfferPercent,
                                    ImageID: item.ImageID,
                                    ImageURL: item.ImageURL,
                                    ProductWeight: item.ProductWeight,
                                    Status: item.Status,
                                    OrderCount: OrderCount
                                })
                                resp();
                            }
                        })
                    }, function (err) {
                        if (!err) {
                            return callback(new ApiResponce({
                                success: true,
                                extras: {
                                    ProductData: ProductData,
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

//CHECK FOR Level2 Category EXIST OR NOT
exports.Check_for_Level2_CategoryID = function (values, callback) {
    Store_SubCategory_level2.findOne({ Level2CategoryID: values.Level2CategoryID }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                callback(false, Result);
            } else if (Result == null) {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Level2_Category_Not_Found
                    }
                }));
            }
        }
    })
}

exports.Check_for_Product_AddonsID = function (values, callback) {
    Store_Products_Addons.findOne({ Product_AddonId: values.Product_AddonId }).exec(function (err, AddonData) {
        if (err) {
            console.log(err);
        } else {
            if (AddonData == null) {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Product_Addon_Not_Found
                    }
                }));
            } else if (AddonData != null) {
                callback(false, AddonData);
            }
        }
    })
};
//Update Product Addon to Product
exports.Update_Product_Addon_to_Product = function (AddonData, ProductData, callback) {
    var query = {
        ProductID: ProductData.ProductID
    };
    var changes = {
        Product_Addon_Available: true,
        Product_AddonId: AddonData.Product_AddonId,
        Product_Addons: AddonData.Product_Addons
    };
    var multiplicity = {
        multi: false
    }
    Store_Products.update(query, changes, multiplicity).exec(function (err, Result) {
        console.log("Product Addon updated to Product");
        callback('Product Addon updated to Product');
    })
}
//Create Product Addon
exports.Create_Product_Addon = function (values, BranchData, callback) {
    var Product_AddonId = uuid.v4();
    var date = new Date();
    var AddonData = new Store_Products_Addons({
        BranchID: BranchData.BranchID,
        Product_AddonId: Product_AddonId,
        Product_Addons: values.Product_Addons,
        Status: true,
        created_at: date,
        updated_at: date
    })
    AddonData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            return callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: 'Product Addon Added Successfully'
                }
            }), Result);
        }
    })
};

//Check for Addon Validity
exports.Check_for_Product_Addons = function (values, callback) {
    if (values.Product_Addon_Available == true || values.Product_Addon_Available == "true") {
        if (values.Whether_Existing_Product_Addon == true || values.Whether_Existing_Product_Addon == "true") {
            if (values.Product_Addons != null && values.Product_AddonId != null) {
                Store_Products_Addons.findOne({ Product_AddonId: values.Product_AddonId }).exec(function (err, AddonStatus) {
                    if (!err) {
                        if (AddonStatus == null) {
                            callback(true, new ApiResponce({
                                success: false,
                                extras: {
                                    msg: ApiMessages.Product_Addon_Not_Found
                                }
                            }));
                        } else if (AddonStatus != null) {
                            callback(false);
                        }
                    } else {
                        console.log(err);
                    }
                })
            } else {
                //Product Addons is null
                console.log("Product Addon Missing");
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.ENTER_ALL_TAGS
                    }
                }));
            }
        } else {
            if (values.Product_Addons != null) {
                callback(false);
            } else {
                //Product Addons is null
                console.log("Product Addon Missing");
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.ENTER_ALL_TAGS
                    }
                }));
            }
        }
    } else {
        callback(false);
    }
}

//Check for level2Category Name in Branch and Category
exports.Check_Whether_Level2_CategoryName_Exist_Or_Not = function (Level2CategoryName, BranchData, CategoryData, callback) {
    Store_SubCategory_level2.findOne({ Level2CategoryName: Level2CategoryName, CategoryID: CategoryData.CategoryID, BranchID: BranchData.BranchID }).exec(function (err, SubCategoryData) {
        if (err) {
            console.log(err);
        } else {
            if (SubCategoryData == null) {
                callback(false, {});
            } else if (SubCategoryData != null) {
                callback(true, SubCategoryData);
            }
        }
    })
};

//Check for level2Category Name in Branch and Category
exports.Check_Whether_Level3_CategoryName_Exist_Or_Not = function (Level3CategoryName, Level2CategoryData, callback) {
    Store_SubCategory_level3.findOne({ Level3CategoryName: Level3CategoryName, Level2CategoryID: Level2CategoryData.Level2CategoryID }).exec(function (err, SubCategoryData) {
        if (err) {
            console.log(err);
        } else {
            if (SubCategoryData == null) {
                callback(false, {});
            } else if (SubCategoryData != null) {
                callback(true, SubCategoryData);
            }
        }
    })
};
exports.Do_Level3_Functionality = function (values, CategoryData, ProductData, Level2CategoryData, callback) {
    function Level3Subcategory1(values, CategoryData, Level2CategoryData, callback) {
        process.nextTick(function () {
            var Level3CategoryName = StoreMod.Format_Beautify_String(values.Level3CategoryName);
            var Level3CategoryData;
            StoreMod.Check_Whether_Level3_CategoryName_Exist_Or_Not(Level3CategoryName, Level2CategoryData, function (err, Level3Data) {
                if (err) {
                    console.log("Level 3 exist");
                    Level3CategoryData = Level3Data;
                    callback(null, Level3CategoryData);
                } else {
                    //CREATE NEW LEVEL 2 CATEGORY
                    var Level3CategoryID = uuid();
                    var date = new Date();
                    var Level3CatData = new Store_SubCategory_level3({
                        CategoryID: CategoryData.CategoryID,
                        CategoryName: CategoryData.CategoryName,
                        Level2CategoryID: Level2CategoryData.Level2CategoryID,
                        Level2CategoryName: Level2CategoryData.Level2CategoryName,
                        Level3CategoryID: Level3CategoryID,
                        Level3CategoryName: Level3CategoryName,
                        created_at: date,
                        updated_at: date
                    });
                    Level3CatData.save(function (err, Result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Level3 created");
                            Level3CategoryData = Result;
                            callback(null, Level3CategoryData);
                        }
                    })
                }
            })
        })
    }
    function Update_Level3_Product(Level3CategoryData, ProductData, callback) {
        process.nextTick(function () {
            var query = {
                ProductID: ProductData.ProductID
            };
            var changes = {
                Level3CategoryAvailable: true,
                Level3CategoryID: Level3CategoryData.Level3CategoryID,
                Level3CategoryName: Level3CategoryData.Level3CategoryName
            };
            var multiplicity = {
                multi: false
            }
            Store_Products.update(query, changes, multiplicity).exec(function (err, Result) {
                console.log("Level 3 Product updated");
                callback(null, 'Level 3 date updated Successfully');
            })
        });
    };
    sync(function () {
        var Level3CategoryData = Level3Subcategory1.sync(null, values, CategoryData, Level2CategoryData);
        var ProductStatus = Update_Level3_Product.sync(null, Level3CategoryData, ProductData);
        callback('All level 3 functionalities completed successfully', Level3CategoryData);
    })
}

exports.Do_Level2_Functionality = function (values, BranchData, CategoryData, ProductData, callback) {
    function Level2Subcategory1(values, BranchData, CategoryData, callback) {
        process.nextTick(function () {
            var Level2CategoryName = StoreMod.Format_Beautify_String(values.Level2CategoryName);
            var Level2CategoryData;
            StoreMod.Check_Whether_Level2_CategoryName_Exist_Or_Not(Level2CategoryName, BranchData, CategoryData, function (err, Level2Data) {
                if (err) {
                    console.log("Level 2 exist");
                    Level2CategoryData = Level2Data;
                    callback(null, Level2CategoryData);
                } else {
                    //CREATE NEW LEVEL 2 CATEGORY
                    var Level2CategoryID = uuid();
                    var date = new Date();
                    var Level2CatData = new Store_SubCategory_level2({
                        CategoryID: CategoryData.CategoryID,
                        CategoryName: CategoryData.CategoryName,
                        BranchID: BranchData.BranchID,
                        Branch_Name: BranchData.Branch_Name,
                        Level2CategoryID: Level2CategoryID,
                        Level2CategoryName: Level2CategoryName,
                        created_at: date,
                        updated_at: date
                    });
                    Level2CatData.save(function (err, Result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Level 2 created");
                            Level2CategoryData = Result;
                            callback(null, Level2CategoryData);
                        }
                    })
                }
            })
        })
    }
    function Update_Level2_Product(Level2CategoryData, ProductData, callback) {
        process.nextTick(function () {
            var query = {
                ProductID: ProductData.ProductID
            };
            var changes = {
                Level2CategoryAvailable: true,
                Level2CategoryID: Level2CategoryData.Level2CategoryID,
                Level2CategoryName: Level2CategoryData.Level2CategoryName
            };
            var multiplicity = {
                multi: false
            }
            Store_Products.update(query, changes, multiplicity).exec(function (err, Result) {
                console.log("Level 2 Product updated");
                callback(null, 'Level 2 date updated Successfully');
            })
        });
    };
    sync(function () {
        var Level2CategoryData = Level2Subcategory1.sync(null, values, BranchData, CategoryData);
        var ProductStatus = Update_Level2_Product.sync(null, Level2CategoryData, ProductData);
        callback(false, 'All level 2 functionalities completed successfully', Level2CategoryData);
    })
}

//validate level2 subcategory
exports.Validate_Level2_Level3_Category = function (values, callback) {
    if (values.Level2CategoryAvailable == true || values.Level2CategoryAvailable == "true") {
        if (values.Level2CategoryName == null || values.Level2CategoryName == "") {
            callback(true)
        } else {
            if (values.Level3CategoryAvailable == true || values.Level3CategoryAvailable == "true") {
                if (values.Level3CategoryName == null || values.Level3CategoryName == "") {
                    callback(true)
                } else {
                    callback(false);
                }
            } else {
                callback(false);
            }
        }
    } else {
        callback(false);
    }
};


//Edit Product Details
exports.Edit_Product_Information = function (values, callback) {
    var query = {
        ProductID: values.ProductID
    }
    var date = new Date();
    var ProductName = StoreMod.Format_Beautify_String(values.ProductName);
    var OfferAvailable;
    var OfferPercent;
    if (values.OfferAvailable == true || values.OfferAvailable == "true") {
        OfferAvailable = true;
        OfferPercent = parseFloat(values.OfferPercent);
    } else {
        OfferAvailable = false;
        OfferPercent = 0;
    }
    var changes = {
        $set: {
            ProductName: ProductName,
            ProductDescription: values.ProductDescription,
            Avaiable_Quantity: values.Avaiable_Quantity,
            Actual_Price: values.Actual_Price,
            Selling_Price: values.Selling_Price,
            OfferAvailable: OfferAvailable,
            OfferPercent: OfferPercent,
            ProductWeight: values.ProductWeight,
            Who_Created: values.StoreAdminID,
            updated_at: date
        }
    }
    //new changes for cart items
    var newquery = {
        ProductID: values.ProductID,
        Order_Placed: false
    }
    var newchanges = {
        ProductName: ProductName,
        ProductDescription: values.ProductDescription,
        Price: values.Selling_Price,
        ProductWeight: values.ProductWeight,
    }
    var multiplicity = {
        multi: true
    }
    Store_Products.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            Customer_Store_Cart_Items.update(newquery, newchanges, multiplicity).exec(function (err, Result) {
                if (!err) {
                    return callback(false, new ApiResponce({
                        success: true,
                        extras: {
                            Status: 'Product Information Updated Successfully'
                        }
                    }));
                }
            })
        }
    });
};
exports.Store_Product_Information_Excel = function (values, BranchData, CategoryData, callback) {
    var ProductID = uuid();
    var date = new Date();
    var ProductName = StoreMod.Format_Beautify_String(values.ProductName);
    var OfferAvailable;
    var OfferPercent;
    if (values.OfferAvailable == true || values.OfferAvailable == "true") {
        OfferAvailable = true;
        OfferPercent = parseFloat(values.OfferPercent);
    } else {
        OfferAvailable = false;
        OfferPercent = 0;
    }
    var ProductData = new Store_Products({
        ProductID: ProductID,
        ProductName: ProductName,
        ProductDescription: values.ProductDescription,
        BranchID: BranchData.BranchID,
        Branch_Name: BranchData.Branch_Name,
        Avaiable_Quantity: values.Avaiable_Quantity,
        CategoryID: CategoryData.CategoryID,
        CategoryName: CategoryData.CategoryName,
        Actual_Price: values.Actual_Price,
        Selling_Price: values.Selling_Price,
        OfferAvailable: OfferAvailable,
        OfferPercent: OfferPercent,
        ProductWeight: values.ProductWeight,
        Status: true,
        Who_Created: values.StoreAdminID,
        created_at: date,
        updated_at: date
    });
    ProductData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            return callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: 'Product Added Successfully'
                }
            }), Result);
        }
    });
};
//Product_Image_Temporary
exports.Product_Image_Temporary = function (values, ImageData, callback) {
    var query = {
        ProductID: values.ProductID
    }
    var changes = {
        $set: {
            ImageID: ImageData.ImageID,
            ImageURL: ImageData.ImageURL
        }
    }
    var multiplicity = {
        multi: true
    }
    Store_Products.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            return callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: 'Product Image Updated Successfully'
                }
            }));
        }
    });
};
exports.Store_Product_Information = function (values, BranchData, CategoryData, ImageData, callback) {
    var ProductID = uuid();
    var date = new Date();
    var ProductName = StoreMod.Format_Beautify_String(values.ProductName);
    var OfferAvailable;
    var OfferPercent;
    if (values.OfferAvailable == true || values.OfferAvailable == "true") {
        OfferAvailable = true;
        OfferPercent = parseFloat(values.OfferPercent);
    } else {
        OfferAvailable = false;
        OfferPercent = 0;
    }
    var ProductData = new Store_Products({
        ProductID: ProductID,
        ProductName: ProductName,
        ProductDescription: values.ProductDescription,
        BranchID: BranchData.BranchID,
        Branch_Name: BranchData.Branch_Name,
        Avaiable_Quantity: values.Avaiable_Quantity,
        CategoryID: CategoryData.CategoryID,
        CategoryName: CategoryData.CategoryName,
        Actual_Price: values.Actual_Price,
        Selling_Price: values.Selling_Price,
        OfferAvailable: OfferAvailable,
        OfferPercent: OfferPercent,
        ImageID: ImageData.ImageID,
        ImageURL: ImageData.ImageURL,
        ProductWeight: values.ProductWeight,
        Status: true,
        Who_Created: values.StoreAdminID,
        created_at: date,
        updated_at: date
    });
    ProductData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            return callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: 'Product Added Successfully'
                }
            }), Result);
        }
    });

};

//Check for Store Branch
exports.Check_For_Store_BranchID = function (values, callback) {
    Store_Branch.findOne({ BranchID: values.BranchID }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result == null) {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Store_Branch_Not_Found
                    }
                }))
            } else if (Result != null) {
                return callback(false, Result);
            }
        }
    })
};
exports.Business_Branch_Details = function (BranchDetails, callback) {
    var AdminDataInfo = [];
    async.eachSeries(BranchDetails.AdminData, function (item, callback1) {
        var Admin_Name;
        var Admin_PhoneNumber;
        var Admin_Email;
        Customers.findOne({ _id: item.StoreAdminID }).exec(function (err, StoreAdminData) {
            if (err) {
                console.log(err);
            } else {
                if (StoreAdminData == null) {
                    StoreAdminID = item.StoreAdminID;
                    Admin_Name = "";
                    Admin_PhoneNumber = "";
                    Admin_Email = "";
                } else if (StoreAdminData != null) {
                    StoreAdminID = item.StoreAdminID;
                    Admin_Name = StoreAdminData.First_name;
                    Admin_PhoneNumber = StoreAdminData.Phone;
                    Admin_Email = StoreAdminData.Email;
                }
                var admininfo = {
                    StoreAdminID: StoreAdminID,
                    Admin_Name: Admin_Name,
                    Admin_PhoneNumber: Admin_PhoneNumber,
                    Admin_Email: Admin_Email
                }
                console.log("Admindate");
                console.log(admininfo);
                AdminDataInfo.push(admininfo);
            }
            callback1();
        })
    }, function (err) {
        var date = moment(BranchDetails.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
        var BranchData = {
            EntityID: BranchDetails.EntityID,
            Store_Entity_Name: BranchDetails.Store_Entity_Name,
            BranchID: BranchDetails.BranchID,
            Branch_Name: BranchDetails.Branch_Name,
            Branch_PhoneNumber: BranchDetails.Branch_PhoneNumber,
            Website: BranchDetails.Website,
            Description: BranchDetails.Description,
            CategoryID: BranchDetails.CategoryID,
            CategoryName: BranchDetails.CategoryName,
            Branch_Image_URL: config.S3URL + BranchDetails.Branch_Image_URL,
            CountryID: BranchDetails.CountryID,
            CountryName: BranchDetails.CountryName,
            CityID: BranchDetails.CityID,
            CityName: BranchDetails.CityName,
            Address: BranchDetails.Address,
            Latitude: BranchDetails.Latitude,
            Longitude: BranchDetails.Longitude,
            Monday_Available: BranchDetails.Monday_Available,
            Monday_Timings: BranchDetails.Monday_Timings,
            Tuesday_Available: BranchDetails.Tuesday_Available,
            Tuesday_Timings: BranchDetails.Tuesday_Timings,
            Wednesday_Available: BranchDetails.Wednesday_Available,
            Wednesday_Timings: BranchDetails.Wednesday_Timings,
            Thursday_Available: BranchDetails.Thursday_Available,
            Thursday_Timings: BranchDetails.Thursday_Timings,
            Friday_Available: BranchDetails.Friday_Available,
            Friday_Timings: BranchDetails.Friday_Timings,
            Saturday_Available: BranchDetails.Saturday_Available,
            Saturday_Timings: BranchDetails.Saturday_Timings,
            Sunday_Available: BranchDetails.Sunday_Available,
            Sunday_Timings: BranchDetails.Sunday_Timings,
            Today_Working: BranchDetails.Today_Working,
            Status: BranchDetails.Status,
            Branch_Approval_Accepted: BranchDetails.Branch_Approval_Accepted,
            Status: BranchDetails.Status,
            date: date,
            AdminData: AdminDataInfo
        };
        return callback(new ApiResponce({
            success: true,
            extras: {
                BranchData: BranchData
            }
        }));
    })
}

//Search All Business Branches
exports.Search_All_Ezshipp_Business_Branches = function (values, callback) {
    var query = {
        Status: true,
        $or: [
            {
                Store_Entity_Name: {
                    '$regex': values.SearchValue,
                    $options: 'i'
                }
            },
            {
                Branch_Name: {
                    '$regex': values.SearchValue,
                    $options: 'i'
                }
            },
            {
                CategoryName: {
                    '$regex': values.SearchValue,
                    $options: 'i'
                }
            },
            {
                Address: {
                    '$regex': values.SearchValue,
                    $options: 'i'
                }
            }, {
                Website: {
                    '$regex': values.SearchValue,
                    $options: 'i'
                }
            }, {
                Description: {
                    '$regex': values.SearchValue,
                    $options: 'i'
                }
            }
        ]
    };
    var sort_type = parseInt(values.sort_type);
    var toSort;
    if (sort_type == 1) {
        toSort = '-created_at';
    } else if (sort_type == 2) {
        toSort = 'created_at';
    } else if (sort_type == 3) {
        toSort = '-Store_Entity_Name';
    } else if (sort_type == 4) {
        toSort = 'Store_Entity_Name';
    } else if (sort_type == 5) {
        toSort = '-Branch_Name';
    } else if (sort_type == 6) {
        toSort = 'Branch_Name';
    } else if (sort_type == 7) {
        toSort = '-CategoryName';
    } else if (sort_type == 8) {
        toSort = 'CategoryName';
    }
    var fetch = Store_Branch.find(query);
    fetch.sort(toSort);
    fetch.select('-_id EntityID BranchID Store_Entity_Name Branch_Name CategoryID CategoryName CityName Address');
    fetch.limit(10);
    fetch.exec(function (err, Result) {
        console.log(err);
        if (!err) {
            return callback(new ApiResponce({
                success: true,
                extras: {
                    BranchData: Result
                }
            }));
        }
    })
};

//Get Branch in Details
exports.Branch_In_Detail = function (BranchData, callback) {
    var AdminData = [];
    var StoreAdminID;
    var Name;
    var EmailID;
    var PhoneNumber;
    var date = moment(BranchData.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss A')
    async.eachSeries(BranchData.AdminData, function (item, resp) {
        Customers.findOne({ _id: item.StoreAdminID }).exec(function (err, Result) {
            if (err) {
                console.log(err);
            } else {
                if (Result == null) {
                    StoreAdminID = item.StoreAdminID;
                    Name = '';
                    EmailID = '';
                    PhoneNumber = '';
                } else if (Result != null) {
                    StoreAdminID = item.StoreAdminID;
                    Name = Result.First_name;
                    EmailID = Result.Email;
                    PhoneNumber = Result.Phone;
                }
                AdminData.push({
                    StoreAdminID: StoreAdminID,
                    Name: Name,
                    EmailID: EmailID,
                    PhoneNumber: PhoneNumber
                })
                resp();
            }
        })
    }, function (err) {
        if (!err) {
            var BranchDetails = {
                EntityID: BranchData.EntityID,
                BranchID: BranchData.BranchID,
                Store_Entity_Name: BranchData.Store_Entity_Name,
                Branch_Name: BranchData.Branch_Name,
                Branch_PhoneNumber: BranchData.Branch_PhoneNumber,
                Website: BranchData.Website,
                Description: BranchData.Description,
                CategoryID: BranchData.CategoryID,
                CategoryName: BranchData.CategoryName,
                Branch_Image_URL: config.S3URL + BranchData.Branch_Image_URL,
                AdminData: AdminData,
                CountryID: BranchData.CountryID,
                CountryName: BranchData.CountryName,
                CityID: BranchData.CityID,
                CityName: BranchData.CityName,
                Address: BranchData.Address,
                Latitude: BranchData.Latitude,
                Longitude: BranchData.Longitude,
                Monday_Available: BranchData.Monday_Available,
                Monday_Timings: BranchData.Monday_Timings,
                Tuesday_Available: BranchData.Tuesday_Available,
                Tuesday_Timings: BranchData.Tuesday_Timings,
                Wednesday_Available: BranchData.Wednesday_Available,
                Wednesday_Timings: BranchData.Wednesday_Timings,
                Thursday_Available: BranchData.Thursday_Available,
                Thursday_Timings: BranchData.Thursday_Timings,
                Friday_Available: BranchData.Friday_Available,
                Friday_Timings: BranchData.Friday_Timings,
                Saturday_Available: BranchData.Saturday_Available,
                Saturday_Timings: BranchData.Saturday_Timings,
                Sunday_Available: BranchData.Sunday_Available,
                Sunday_Timings: BranchData.Sunday_Timings,
                Today_Working: BranchData.Today_Working,
                Status: BranchData.Status,
                Branch_Approval_Accepted: BranchData.Branch_Approval_Accepted,
                date: date
            }
            return callback(new ApiResponce({
                success: true,
                extras: {
                    BranchData: BranchDetails
                }
            }));
        }
    })
}

//Find All Business Branches
exports.Find_All_Ezshipp_Business_Branches = function (values, callback) {
    var query = {
        Status: true
    };
    var sort_type = parseInt(values.sort_type);
    var toSort;
    if (sort_type == 1) {
        toSort = '-created_at';
    } else if (sort_type == 2) {
        toSort = 'created_at';
    } else if (sort_type == 3) {
        toSort = '-Store_Entity_Name';
    } else if (sort_type == 4) {
        toSort = 'Store_Entity_Name';
    } else if (sort_type == 5) {
        toSort = '-Branch_Name';
    } else if (sort_type == 6) {
        toSort = 'Branch_Name';
    } else if (sort_type == 7) {
        toSort = '-CategoryName';
    } else if (sort_type == 8) {
        toSort = 'CategoryName';
    }
    Store_Branch.count(query).exec(function (err, Count) {
        if (Count >= 0) {
            var fetch = Store_Branch.find(query);
            var toSkip = parseInt(values.skip);
            fetch.sort(toSort);
            fetch.select('-_id EntityID BranchID Store_Entity_Name Branch_Name CategoryID CategoryName CityName Address');
            fetch.skip(toSkip);
            fetch.limit(10);
            fetch.exec(function (err, Result) {
                console.log(err);
                if (!err) {
                    return callback(new ApiResponce({
                        success: true,
                        extras: {
                            BranchData: Result,
                            Count: Count
                        }
                    }));
                }
            })
        }
    })
};

//Check for Store Admin Session ID
exports.CheckSessionID = function (values, callback) {
    Store_Admin_Sessions.findOne({
        SessionID: values.SessionID
    }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            if (users == null) {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.SESSION_EXPIRED
                    }
                }));
            } else if (users != null) {
                return callback(false);
            }
        }
    });
};
//Check for Store_Admin
exports.Check_for_Store_Admin = function (values, callback) {
    Customers.findOne({
        _id: values.StoreAdminID
    }).exec(function (err, StoreAdminData) {
        if (err) {
            console.log(err);
        } else {
            if (StoreAdminData == null) {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Store_Admin_Not_Found
                    }
                }));
            } else if (StoreAdminData != null) {
                callback(false, StoreAdminData);
            }
        }
    })
};
//Update Customer Password
exports.Update_Customer_Password = function (values, callback) {
    var Password = values.Password;
    var salt = rand(160, 36);
    var pass = Password + salt;
    var query = {
        _id: values.StoreAdminID
    };
    var changes = {
        PasswordHash: crypto.createHash('sha512').update(pass).digest("hex"),
        PasswordSalt: salt,
        First_Time_Login: false
    };
    var multiplicity = {
        multi: false
    };
    Customers.update(query, changes, multiplicity).exec(function (err, Result) {
        if (Result) {
            return callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: 'Password Updated Successfully'
                }
            }));
        } else {
            console.log(JSON.stringify(err));
        }
    })
};

//Generating the Random Number for Security
exports.RandomNumber = function () {
    var charBank = "123456789";
    var fstring = '';
    for (var i = 0; i < 6; i++) {
        fstring += charBank[parseInt(Math.random() * charBank.length)];
    }
    console.log("Random")
    console.log(fstring);
    return parseInt(fstring);
};
//Current Date Time;
exports.DateTime = function () {
    var fulldate = new Date();
    var moment = require('moment');
    var date = moment().utcOffset(330).format('YYYY-MM-DD');
    var time = moment().utcOffset(330).format('H:mm:ss');

    var datetime = date + ' ' + time;
    return datetime;
};
//Check Whether User Already Exist 
exports.Check_For_Admin_Phone_Branch = function (Name, PhoneNumber, EmailID, BranchData, callback) {
    var BranchDetails = {
        BranchID: BranchData.BranchID,
        Branch_Name: BranchData.Branch_Name
    };
    console.log("PhoneNumber");
    console.log(PhoneNumber);
    Customers.findOne({ Phone: PhoneNumber }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result == null) {
                console.log("USer Not Found");
                callback(false);
            } else if (Result != null) {
                Customers.findOne({ Phone: PhoneNumber, Whether_Store_Admin: true }).exec(function (err, NewResult) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (NewResult == null) {
                            console.log("USer is not Admin");
                            var squery = {
                                _id: Result._id
                            };
                            var branchArray = [];
                            branchArray.push(BranchDetails);
                            var schanges = {
                                Whether_Store_Admin: true,
                                StoreAdminStatus: true,
                                BranchData: branchArray,
                                Active_BranchID_Exist: true,
                                Active_BranchID: BranchData.BranchID
                            }
                            var smultiplicity = {
                                multi: false
                            }
                            Customers.update(squery, schanges, smultiplicity).exec(function (err, AdminUpdatedStatus) {
                                if (!err) {
                                    var newquery = {
                                        BranchID: BranchData.BranchID
                                    };
                                    var newchanges = {
                                        $push: {
                                            AdminData: {
                                                StoreAdminID: Result._id
                                            }
                                        }
                                    };
                                    var newmultiplicity = {
                                        multi: false
                                    };
                                    Store_Branch.update(newquery, newchanges, newmultiplicity).exec(function (err, Result) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log("Admin Updated in Branch");
                                            callback(true, false);
                                        }
                                    })
                                }
                            })
                        } else if (NewResult != null) {
                            console.log("User and Admin")
                            Customers.findOne({
                                _id: Result._id,
                                BranchData: {
                                    $elemMatch: {
                                        "BranchID": String(BranchData.BranchID)
                                    }
                                }
                            }).exec(function (err, BranchStaus) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    if (BranchStaus == null) {
                                        var query = {
                                            _id: Result._id
                                        };

                                        var changes = {
                                            $push: {
                                                BranchData: BranchDetails
                                            }
                                        }
                                        var multiplicity = {
                                            multi: false
                                        }
                                        console.log("Branch Changes");
                                        console.log(changes);
                                        Customers.update(query, changes, multiplicity).exec(function (err, UpdatedStatus) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                console.log("Branch Updated in Admin");
                                                var newquery = {
                                                    BranchID: BranchData.BranchID
                                                };
                                                var newchanges = {
                                                    $push: {
                                                        AdminData: {
                                                            StoreAdminID: Result._id
                                                        }
                                                    }
                                                };
                                                var newmultiplicity = {
                                                    multi: false
                                                };
                                                Store_Branch.update(newquery, newchanges, newmultiplicity).exec(function (err, Result) {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {
                                                        console.log("Admin Updated in Branch");
                                                        callback(true, false);
                                                    }
                                                })
                                            }
                                        })
                                    } else if (BranchStaus != null) {
                                        console.log("Admin Branch Already Exist");
                                        callback(true, true);
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}

//Create Store Branch Admin User
exports.Create_Admin_Users = function (Name, PhoneNumber, EmailID, BranchData, SequenceNumber, referral_code, callback) {
    var salt = rand(160, 36);
    var Password = StoreMod.RandomNumber();
    console.log("Password " + Password);
    var pass = Password + salt;
    var date = StoreMod.DateTime();
    var BranchDetails = {
        BranchID: BranchData.BranchID,
        Branch_Name: BranchData.Branch_Name
    }
    var signup_date = new Date();
    var moment = require('moment');
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
    }
    var AdminData = new Customers({
        acc_status: 1,
        customerseqId: SequenceNumber,
        First_name: Name,
        Phone: PhoneNumber,
        countryCode: "+91",
        Email: EmailID,
        Verify: 0,
        Code: 0,
        PasswordHash: crypto.createHash('sha512').update(pass).digest("hex"),
        PasswordSalt: salt,
        sessionToken: '',
        First_Time_Login: true,
        CurrentStatus: 1,
        terms_cond: 1,
        referral_code: referral_code,
        Created_dt: date,
        Agreement_Time: date,
        Whether_Store_Admin: true,
        BranchData: BranchDetails,
        Active_BranchID_Exist: true,
        Active_BranchID: BranchData.BranchID,
        StoreAdminStatus: true,
        Signup_Date: signup_date,
        Signup_Interval: interval
    });
    AdminData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            var URL = 'https://goo.gl/Cf8KBc';
            var Message = 'Hi ' + BranchData.Branch_Name + ', Your UserName:' + PhoneNumber + ' ,Password: ' + Password + ' ,use this Credential and login at ' + URL;
            MSG91MOD.sendsmstocustomer(PhoneNumber, Message, function (err, msgStatus) {
                console.log("Admin Creadted Branch Stored and Message Sent Successfully");
                callback(false, 'Admin Created Successfully and Message Sent Successfully');
                var newquery = {
                    BranchID: BranchData.BranchID
                };
                var newchanges = {
                    $push: {
                        AdminData: {
                            StoreAdminID: Result._id
                        }
                    }
                };
                console.log("New Query ");
                console.log(newchanges);
                var newmultiplicity = {
                    multi: false
                };
                Store_Branch.update(newquery, newchanges, newmultiplicity).exec(function (err, Result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Admin Updated in Branch");
                    }
                })
            })
        }
    })
}

//Find All Entities Name
exports.Find_All_Entities_Name = function (callback) {
    var query = {
        Status: true
    }
    var fetch = Store_Entity.find(query);
    fetch.select('Store_Entity_Name -_id');
    fetch.sort('Store_Entity_Name');
    fetch.exec(function (err, EntityData) {
        callback(new ApiResponce({
            success: true,
            extras: {
                EntityData: EntityData
            }
        }));
    });
}

//CHECK WHETHER CATEGORY NAME EXIST OR NOT
exports.Check_Whether_Store_Branch_Name_Already_Exists_Update = function (values, Branch_Name, CategoryData, callback) {
    Store_Branch.findOne({ BranchID: { $ne: values.BranchID }, Branch_Name: Branch_Name, CategoryID: CategoryData.CategoryID }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result == null) {
                callback(false);
            } else if (Result != null) {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.STORE_BRANCH_NAME_ALREADY_EXIST
                    }
                }));
            }
        }
    })
}


//CHECK WHETHER CATEGORY NAME EXIST OR NOT
exports.Check_Whether_Store_Branch_Name_Already_Exists = function (Branch_Name, CategoryData, callback) {
    Store_Branch.findOne({ Branch_Name: Branch_Name, CategoryID: CategoryData.CategoryID }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result == null) {
                callback(false);
            } else if (Result != null) {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.STORE_BRANCH_NAME_ALREADY_EXIST
                    }
                }));
            }
        }
    })
}
exports.UploadImageAWS = function (nfile, fname, callback) {
    // Upload to the S3 Bucket
    fs.readFile(nfile, function (err, buf) {
        var req = knoxClient.put(fname, {
            'Content-Length': buf.length,
            'Content-Type': 'image/jpeg'
        });
        req.on('response', function (rest) {
            if (rest.statusCode == 200) {
                // Delete the Local File
                fs.unlink(nfile, function () {
                    var errh = false;
                    callback(errh, new ApiResponce({
                        success: true,
                        extras: {
                            Status: "Uploaded Successfully"
                        }
                    }));
                })
            } else {
                console.log("AWS Upload Fails")
            }
        });
        req.end(buf);
    })
};
exports.Edit_Branch_Timings = function (values, callback) {
    var Monday_Available;
    var Tuesday_Available;
    var Wednesday_Available;
    var Thursday_Available;
    var Friday_Available;
    var Saturday_Available;
    var Sunday_Available;
    var Monday_Timings = {};
    var Tuesday_Timings = {};
    var Wednesday_Timings = {};
    var Thursday_Timings = {};
    var Friday_Timings = {};
    var Saturday_Timings = {};
    var Sunday_Timings = {};
    if (values.Monday_Available == true || values.Monday_Available == "true") {
        Monday_Available = true;
        Monday_Timings = values.Monday_Timings;
    } else {
        Monday_Available = false;
    }
    if (values.Tuesday_Available == true || values.Tuesday_Available == "true") {
        Tuesday_Available = true;
        Tuesday_Timings = values.Tuesday_Timings;
    } else {
        Tuesday_Available = false;
    }
    if (values.Wednesday_Available == true || values.Wednesday_Available == "true") {
        Wednesday_Available = true;
        Wednesday_Timings = values.Wednesday_Timings;
    } else {
        Wednesday_Available = false;
    }
    if (values.Thursday_Available == true || values.Thursday_Available == "true") {
        Thursday_Timings = values.Thursday_Timings;
        Thursday_Available = true;
    } else {
        Thursday_Available = false;
    }
    if (values.Friday_Available == true || values.Friday_Available == "true") {
        Friday_Timings = values.Friday_Timings;
        Friday_Available = true;
    } else {
        Friday_Available = false;
    }
    if (values.Saturday_Available == true || values.Saturday_Available == "true") {
        Saturday_Timings = values.Saturday_Timings;
        Saturday_Available = true;
    } else {
        Saturday_Available = false;
    }
    if (values.Sunday_Available == true || values.Sunday_Available == "true") {
        Sunday_Timings = values.Sunday_Timings;
        Sunday_Available = true;
    } else {
        Sunday_Available = false;
    }
    var query = {
        BranchID: values.BranchID
    };
    var changes = {
        $set: {
            Monday_Available: Monday_Available,
            Monday_Timings: Monday_Timings,
            Tuesday_Available: Tuesday_Available,
            Tuesday_Timings: Tuesday_Timings,
            Wednesday_Available: Wednesday_Available,
            Wednesday_Timings: Wednesday_Timings,
            Thursday_Available: Thursday_Available,
            Thursday_Timings: Thursday_Timings,
            Friday_Available: Friday_Available,
            Friday_Timings: Friday_Timings,
            Saturday_Available: Saturday_Available,
            Saturday_Timings: Saturday_Timings,
            Sunday_Available: Sunday_Available,
            Sunday_Timings: Sunday_Timings
        }
    }
    var multiplicity = {
        multi: false
    }
    Store_Branch.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            return callback(new ApiResponce({
                success: true,
                extras: {
                    Status: 'Store Branch Timing Updated Successfully'
                }
            }));
        }
    })
}
exports.Edit_Branch_Timings_Store_Admin = function (values, callback) {
    var Monday_Available;
    var Tuesday_Available;
    var Wednesday_Available;
    var Thursday_Available;
    var Friday_Available;
    var Saturday_Available;
    var Sunday_Available;
    var Monday_Timings = {};
    var Tuesday_Timings = {};
    var Wednesday_Timings = {};
    var Thursday_Timings = {};
    var Friday_Timings = {};
    var Saturday_Timings = {};
    var Sunday_Timings = {};
    if (values.Monday_Available == true || values.Monday_Available == "true") {
        Monday_Available = true;
        Monday_Timings = values.Monday_Timings;
    } else {
        Monday_Available = false;
    }
    if (values.Tuesday_Available == true || values.Tuesday_Available == "true") {
        Tuesday_Available = true;
        Tuesday_Timings = values.Tuesday_Timings;
    } else {
        Tuesday_Available = false;
    }
    if (values.Wednesday_Available == true || values.Wednesday_Available == "true") {
        Wednesday_Available = true;
        Wednesday_Timings = values.Wednesday_Timings;
    } else {
        Wednesday_Available = false;
    }
    if (values.Thursday_Available == true || values.Thursday_Available == "true") {
        Thursday_Timings = values.Thursday_Timings;
        Thursday_Available = true;
    } else {
        Thursday_Available = false;
    }
    if (values.Friday_Available == true || values.Friday_Available == "true") {
        Friday_Timings = values.Friday_Timings;
        Friday_Available = true;
    } else {
        Friday_Available = false;
    }
    if (values.Saturday_Available == true || values.Saturday_Available == "true") {
        Saturday_Timings = values.Saturday_Timings;
        Saturday_Available = true;
    } else {
        Saturday_Available = false;
    }
    if (values.Sunday_Available == true || values.Sunday_Available == "true") {
        Sunday_Timings = values.Sunday_Timings;
        Sunday_Available = true;
    } else {
        Sunday_Available = false;
    }
    var query = {
        BranchID: values.BranchID
    };
    var changes = {
        $set: {
            Monday_Available: Monday_Available,
            Monday_Timings: Monday_Timings,
            Tuesday_Available: Tuesday_Available,
            Tuesday_Timings: Tuesday_Timings,
            Wednesday_Available: Wednesday_Available,
            Wednesday_Timings: Wednesday_Timings,
            Thursday_Available: Thursday_Available,
            Thursday_Timings: Thursday_Timings,
            Friday_Available: Friday_Available,
            Friday_Timings: Friday_Timings,
            Saturday_Available: Saturday_Available,
            Saturday_Timings: Saturday_Timings,
            Sunday_Available: Sunday_Available,
            Sunday_Timings: Sunday_Timings,
            Branch_Approval_Accepted: false,
            Status: false
        }
    }
    var multiplicity = {
        multi: false
    }
    Store_Branch.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            return callback(new ApiResponce({
                success: true,
                extras: {
                    Status: 'Store Branch Timing Updated Successfully'
                }
            }));
        }
    })
}

exports.Edit_Branch_Information = function (values, CategoryData, Branch_Name, CountryData, CityData, callback) {
    var query = {
        BranchID: values.BranchID
    };
    var changes = {
        $set: {
            Branch_Name: Branch_Name,
            Branch_PhoneNumber: values.Branch_PhoneNumber,
            Website: values.Website,
            Description: values.Description,
            CategoryID: CategoryData.CategoryID,
            CategoryName: CategoryData.CategoryName,
            CountryID: CountryData._id,
            CountryName: CountryData.name,
            CityID: CityData._id,
            CityName: CityData.name,
            Address: values.Address,
            Latitude: parseFloat(values.Latitude),
            Longitude: parseFloat(values.Longitude),
            Point: [parseFloat(values.Longitude), parseFloat(values.Latitude)]
        }
    }
    var multiplicity = {
        multi: false
    }
    Store_Branch.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            return callback(new ApiResponce({
                success: true,
                extras: {
                    Status: 'Store Branch Updated Successfully'
                }
            }));
        }
    })
}
exports.Update_Branch_Image = function (values, callback) {
    var nfile, fname;
    function generateFilename() {
        var date = new Date().getTime();
        var charBank = "abcdefghijklmnopqrstuvwxyz";
        var fstring = '';
        for (var i = 0; i < 15; i++) {
            fstring += charBank[parseInt(Math.random() * 26)];
        }
        return (fstring += date);
    }
    var path = require('path');
    var os = require('os');
    fname = generateFilename();
    //Converting Base64 dataUrl to Jpeg Image
    base64ImageToFile(values.Picture, os.tmpDir() + '', fname, function (err, imgPath) {
        nfile = os.tmpDir() + '/' + fname + '.jpeg';
        fname = fname + '.jpeg';
        // Upload to the S3 Bucket
        StoreMod.UploadImageAWS(nfile, fname, function (err, responcer) {
            var query = {
                BranchID: values.BranchID
            }
            var changes = {
                Branch_Image_URL: fname,
            }
            Store_Branch.update(query, changes, { multi: false }, function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    return callback(false, new ApiResponce({
                        success: true,
                        extras: {
                            Status: 'Store Branch Image Update Successfully'
                        }
                    }));
                }
            });
        })
    })
};
exports.Update_Branch_Image_Store_Admin = function (values, callback) {
    var nfile, fname;
    function generateFilename() {
        var date = new Date().getTime();
        var charBank = "abcdefghijklmnopqrstuvwxyz";
        var fstring = '';
        for (var i = 0; i < 15; i++) {
            fstring += charBank[parseInt(Math.random() * 26)];
        }
        return (fstring += date);
    }
    var path = require('path');
    var os = require('os');
    fname = generateFilename();
    //Converting Base64 dataUrl to Jpeg Image
    base64ImageToFile(values.Picture, os.tmpDir() + '', fname, function (err, imgPath) {
        nfile = os.tmpDir() + '/' + fname + '.jpeg';
        fname = fname + '.jpeg';
        // Upload to the S3 Bucket
        StoreMod.UploadImageAWS(nfile, fname, function (err, responcer) {
            var query = {
                BranchID: values.BranchID
            }
            var changes = {
                Branch_Image_URL: fname,
                Branch_Approval_Accepted: false,
                Status: false
            }
            Store_Branch.update(query, changes, { multi: false }, function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    return callback(false, new ApiResponce({
                        success: true,
                        extras: {
                            Status: 'Store Branch Image Update Successfully'
                        }
                    }));
                }
            });
        })
    })
};


//This Api is use for Removing the AWS Image based on key
exports.DeleteAWSImage = function (fname, callback) {
    var me = this;
    var date = new Date();
    var aws = require('aws-sdk');
    var S3AccessKey = config.S3AccessKey;
    var S3Secret = config.S3Secret;
    var S3Bucket = config.S3Bucket;
    aws.config.update({
        accessKeyId: S3AccessKey,
        secretAccessKey: S3Secret
    });
    var s3 = new aws.S3();
    var params = {
        Bucket: S3Bucket,
        Delete: { // required
            Objects: [ // required
                {
                    Key: fname // required
                }
            ]
        }
    };
    s3.deleteObjects(params, function (err, data) {
        return callback(false, 'Deleted Successfully');
    });
};
exports.Add_Entity_Branch = function (values, CategoryData, Branch_Name, EntityData, CountryData, CityData, callback) {
    var nfile, fname;
    function generateFilename() {
        var date = new Date().getTime();
        var charBank = "abcdefghijklmnopqrstuvwxyz";
        var fstring = '';
        for (var i = 0; i < 15; i++) {
            fstring += charBank[parseInt(Math.random() * 26)];
        }
        return (fstring += date);
    }
    var path = require('path');
    var os = require('os');
    fname = generateFilename();
    //Converting Base64 dataUrl to Jpeg Image
    base64ImageToFile(values.Picture, os.tmpDir() + '', fname, function (err, imgPath) {
        nfile = os.tmpDir() + '/' + fname + '.jpeg';
        fname = fname + '.jpeg';
        // Upload to the S3 Bucket
        StoreMod.UploadImageAWS(nfile, fname, function (err, responcer) {
            var Monday_Available;
            var Tuesday_Available;
            var Wednesday_Available;
            var Thursday_Available;
            var Friday_Available;
            var Saturday_Available;
            var Sunday_Available;
            var Monday_Timings = {};
            var Tuesday_Timings = {};
            var Wednesday_Timings = {};
            var Thursday_Timings = {};
            var Friday_Timings = {};
            var Saturday_Timings = {};
            var Sunday_Timings = {};

            if (values.Monday_Available == true || values.Monday_Available == "true") {
                Monday_Available = true;
                Monday_Timings = values.Monday_Timings;
            } else {
                Monday_Available = false;
            }
            if (values.Tuesday_Available == true || values.Tuesday_Available == "true") {
                Tuesday_Available = true;
                Tuesday_Timings = values.Tuesday_Timings;
            } else {
                Tuesday_Available = false;
            }
            if (values.Wednesday_Available == true || values.Wednesday_Available == "true") {
                Wednesday_Available = true;
                Wednesday_Timings = values.Wednesday_Timings;
            } else {
                Wednesday_Available = false;
            }
            if (values.Thursday_Available == true || values.Thursday_Available == "true") {
                Thursday_Timings = values.Thursday_Timings;
                Thursday_Available = true;
            } else {
                Thursday_Available = false;
            }
            if (values.Friday_Available == true || values.Friday_Available == "true") {
                Friday_Timings = values.Friday_Timings;
                Friday_Available = true;
            } else {
                Friday_Available = false;
            }
            if (values.Saturday_Available == true || values.Saturday_Available == "true") {
                Saturday_Timings = values.Saturday_Timings;
                Saturday_Available = true;
            } else {
                Saturday_Available = false;
            }
            if (values.Sunday_Available == true || values.Sunday_Available == "true") {
                Sunday_Timings = values.Sunday_Timings;
                Sunday_Available = true;
            } else {
                Sunday_Available = false;
            }

            var BranchID = uuid();
            var date = new Date();
            var BranchData = new Store_Branch({
                EntityID: EntityData.EntityID,
                BranchID: BranchID,
                Store_Entity_Name: EntityData.Store_Entity_Name,
                Branch_Name: Branch_Name,
                Branch_PhoneNumber: values.Branch_PhoneNumber,
                Website: EntityData.Website,
                Description: EntityData.Description,
                CategoryID: CategoryData.CategoryID,
                CategoryName: CategoryData.CategoryName,
                Branch_Image_URL: fname,
                CountryID: CountryData._id,
                CountryName: CountryData.name,
                CityID: CityData._id,
                CityName: CityData.name,
                Address: values.Address,
                Latitude: parseFloat(values.Latitude),
                Longitude: parseFloat(values.Longitude),
                Point: [parseFloat(values.Longitude), parseFloat(values.Latitude)],
                Monday_Available: Monday_Available,
                Monday_Timings: Monday_Timings,
                Tuesday_Available: Tuesday_Available,
                Tuesday_Timings: Tuesday_Timings,
                Wednesday_Available: Wednesday_Available,
                Wednesday_Timings: Wednesday_Timings,
                Thursday_Available: Thursday_Available,
                Thursday_Timings: Thursday_Timings,
                Friday_Available: Friday_Available,
                Friday_Timings: Friday_Timings,
                Saturday_Available: Saturday_Available,
                Saturday_Timings: Saturday_Timings,
                Sunday_Available: Sunday_Available,
                Sunday_Timings: Sunday_Timings,
                AdminData: [],
                created_at: date,
                updated_at: date
            })
            BranchData.save(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    return callback(new ApiResponce({
                        success: true,
                        extras: {
                            Status: 'Store Branch Added Successfully'
                        }
                    }), Result);
                }
            });
        })
    })
};

//Check for City
exports.Check_for_CityID = function (values, callback) {
    City.findOne({ "_id": values.CityID }, function (err, CityData) {
        if (err) {
            console.log(err)
        } else {
            if (CityData == null) {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.City_Not_Found
                    }
                }));
            } else {
                return callback(false, CityData);
            }
        }
    })
};
//Generating the Random Number for Security
exports.Check_for_CountryID = function (values, callback) {
    var me = this;
    Country.findOne({ "_id": values.CountryID }, function (err, CountryData) {
        if (err) {
            console.log(err);
        } else {
            if (CountryData == null) {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Country_Not_Found
                    }
                }));
            } else {
                return callback(false, CountryData);
            }
        }
    })
};

//Find All Categories
exports.Find_All_Categories = function (callback) {
    var query = {
        Status: true
    };
    var fetch = Store_Categories.find(query);
    fetch.select('CategoryID CategoryName -_id');
    fetch.sort('CategoryName');
    fetch.exec(function (err, CategoryData) {
        if (!err) {
            return callback(new ApiResponce({
                success: true,
                extras: {
                    CategoryData: CategoryData
                }
            }));
        }
    })
}

//CHECK WHETHER CATEGORY NAME EXIST OR NOT
exports.Check_Whether_Category_Name_Already_Exists = function (CategoryName, callback) {
    Store_Categories.findOne({ CategoryName: CategoryName }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result == null) {
                callback(false);
            } else if (Result != null) {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.CATEGORY_NAME_ALREADY_EXIST
                    }
                }));
            }
        }
    })
}
//CHECK FOR CATEGORYID EXIST OR NOT
exports.Check_for_CategoryID = function (values, callback) {
    Store_Categories.findOne({ CategoryID: values.CategoryID }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                callback(false, Result);
            } else if (Result == null) {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Category_Not_Found
                    }
                }));
            }
        }
    })
}
//EDIT CATEGORY
exports.Edit_Category = function (values, CategoryName, callback) {
    var date = new Date();
    var query = {
        CategoryID: values.CategoryID
    }
    var changes = {
        CategoryName: CategoryName,
        updated_at: date
    }
    var multiplicity = {
        multi: false
    }
    Store_Categories.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            return callback(new ApiResponce({
                success: true,
                extras: {
                    Status: 'Category Updated Successfully'
                }
            }));
        }
    })
}

//Store Category Details
exports.Add_Category = function (CategoryName, callback) {
    var CategoryID = uuid();
    var date = new Date();
    var CategoryData = new Store_Categories({
        CategoryID: CategoryID,
        CategoryName: CategoryName,
        created_at: date,
        updated_at: date
    });
    CategoryData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            return callback(new ApiResponce({
                success: true,
                extras: {
                    Status: 'Category Stored Successfully'
                }
            }), Result);
        }
    })
}

//Check for StoreName
exports.Check_Whether_StoreName_Exist_Or_Not = function (Store_Entity_Name, callback) {
    Store_Entity.findOne({ Store_Entity_Name: Store_Entity_Name }).exec(function (err, EntityData) {
        if (err) {
            console.log(err);
        } else {
            if (EntityData == null) {
                callback(true, {});
            } else if (EntityData != null) {
                callback(false, EntityData);
            }
        }
    })
}
//Check for StoreName
exports.Check_Whether_CategoryName_Exist_Or_Not = function (CategoryName, callback) {
    Store_Categories.findOne({ CategoryName: CategoryName }).exec(function (err, CategoryData) {
        if (err) {
            console.log(err);
        } else {
            if (CategoryData == null) {
                callback(false, {});
            } else if (CategoryData != null) {
                callback(true, CategoryData);
            }
        }
    })
}

//Creating Entity
exports.Create_Store_Entity = function (values, callback) {
    var EntityID = uuid();
    var date = new Date();
    var Store_Entity_Name = String(values.Store_Entity_Name);
    Store_Entity_Name = Store_Entity_Name.replace(/\s\s+/g, ' ');
    Store_Entity_Name = Store_Entity_Name.replace(/  +/g, ' ');
    Store_Entity_Name = Store_Entity_Name.replace(/^ /, '');
    Store_Entity_Name = Store_Entity_Name.replace(/\s\s*$/, '');
    Store_Entity_Name = format_str(Store_Entity_Name);
    var EntityData = new Store_Entity({
        EntityID: EntityID,
        Store_Entity_Name: Store_Entity_Name,
        Website: values.Website,
        Description: values.Description,
        Status: true,
        created_at: date,
        updated_at: date
    })
    EntityData.save(function (err, Result) {
        if (err) {
            console.log(err);
        }
        callback(false, 'Entity Added Successfully', Result, EntityID);
    })
};
function format_str(str) {
    var myArr = str.toLowerCase().split(" ");
    for (var a = 0; a < myArr.length; a++) {
        myArr[a] = myArr[a].charAt(0).toUpperCase() + myArr[a].substr(1);
    }
    return myArr.join(" ");
}