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
var Campaign_Mail_Logs = require("../Models/Campaign_Mail_Logs.js");
var Mail_Message_Campaign = require("../Models/Mail_Message_Campaign.js");
var MSG91DATA = require("../Models/MSG91DATA.js");
var MAILGUNDATA = require("../Models/MAILGUNDATA.js");
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
var MailMessageMod = require('../CoreModules/mailmessagemod.js'); // Setting the Path for Customer Modulesvar StoreMod = require('../CoreModules/storemod.js'); // Setting the Path for Customer Modules
var mailgun = require('mailgun-js')({ apiKey: config.mailgun.api_key, domain: config.mailgun.domain });

//Sent Mail
exports.Send_Mail_Customer = function (CustomerData, CampaignData, MailData, callback) {
    if (CustomerData.Email == null || CustomerData.Email == '') {
        callback(false);
    } else {
        var htmlbody = ''
        var data = {
            from: config.mailgun.frommail,
            to: CustomerData.Email,
            subject: CampaignData.MailSubject,
            html: MailData
        };
        mailgun.messages().send(data, function (error, body) {
            if (error) {
                callback(false);    
                console.log(error);
            } else {
                var date = new Date();
                var MessageID = body.id;
                var CustomerLogData = new Campaign_Mail_Logs({
                    CampaignID: CampaignData.CampaignID,
                    CampaignType: CampaignData.CampaignType,
                    CustomerID: CustomerData._id,
                    CustomerName: CustomerData.First_name,
                    Email: CustomerData.Email,
                    MessageID: MessageID,
                    event: "queued",
                    status: 0,
                    created_at: date,
                    updated_at: date
                })
                CustomerLogData.save(function (err, Result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Message Sent and Log Stored");
                        callback(false);
                    }
                })
            }
        });
    }
}

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
exports.Create_Campaign = function (values, callback) {
    var CampaignID = uuid();
    var CampaignTitle = MailMessageMod.Format_Beautify_String(values.CampaignTitle);
    var date = new Date();    
    var CampaignData = new Mail_Message_Campaign({
        CampaignID: CampaignID,
        CampaignType: parseInt(values.CampaignType),
        CampaignTitle: CampaignTitle,
        CampaignDescription: values.CampaignDescription,
        MessageData: values.MessageData,
        MailSubject: values.MailSubject,
        MailData: values.MailData,
        created_at: date,
        updated_at: date
    });
    CampaignData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            return callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: 'Campaign Created Successfully and Will Send Mail and Messages'
                }
            }), Result);
        }
    })
};

exports.Check_Whether_Mail_Delivery_Report_Exists_Do_Functionality = function (values, callback) {

    console.log("message id = " + values['Message-Id']);
    MAILGUNDATA.findOne({ MessageID: values['Message-Id'] }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                //Message Report Already Exist
                if (values.event == Result.event) {
                    //Do nothing
                    return callback(new ApiResponce({
                        success: true,
                        extras: {
                            Status: 'Mail Report with Status Already Exist'
                        }
                    }));
                } else {
                    //Update Delivery Status
                    MAILGUNDATA.update({ MessageID: values['Message-Id'] }, { event: values.event, Description: values.event }).exec(function (err, Result) {
                        if (err) {
                            console.log(err);
                        } else {
                            return callback(new ApiResponce({
                                success: true,
                                extras: {
                                    Status: 'Mail Report Status Updated Successfully'
                                }
                            }));
                        }
                    })
                }
            } else if (Result == null) {
                //Store Delivery Status
                var data = new MAILGUNDATA({
                    MessageID: values['Message-Id'],
                    event: values.event,
                    Email: values.recipient,
                    event: values.event,
                    Description: values.event
                });
                data.save(function (err, Result) {
                    if (err) {
                        console.log(err);
                    } else {
                        return callback(new ApiResponce({
                            success: true,
                            extras: {
                                Status: 'Mail Report Stored Successfully'
                            }
                        }));
                    }
                })
            }
        }
    })
}
exports.Check_Whether_Message_Delivery_Report_Exists_Do_Functionality = function (values, callback) {
    MSG91DATA.findOne({ requestId: values.requestId }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                //Message Report Already Exist
                if (values.report[0].status == Result.status) {
                    //Do nothing
                    return callback(new ApiResponce({
                        success: true,
                        extras: {
                            Status: 'Message Report with Status Already Exist'
                        }
                    }));
                } else {
                    //Update Delivery Status
                    MSG91DATA.update({ requestId: values.requestId }, { Description: values.report[0].desc, status: values.report[0].status }).exec(function (err, Result) {
                        if (err) {
                            console.log(err);
                        } else {
                            return callback(new ApiResponce({
                                success: true,
                                extras: {
                                    Status: 'Message Report Status Updated Successfully'
                                }
                            }));
                        }
                    })

                }
            } else if (Result == null) {
                //Store Delivery Status
                var data = new MSG91DATA({
                    requestId: values.requestId,
                    senderId: values.senderId,
                    PhoneNumber: values.report[0].number,
                    Description: values.report[0].desc,
                    status: values.report[0].status,
                    date: values.report[0].date
                });
                data.save(function (err, Result) {
                    if (err) {
                        console.log(err);
                    } else {
                        return callback(new ApiResponce({
                            success: true,
                            extras: {
                                Status: 'Message Report Stored Successfully'
                            }
                        }));
                    }
                })
            }
        }
    })
}