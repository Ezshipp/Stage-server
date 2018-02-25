//Dependencies
var async = require('async');
var sync = require('sync');
var htmlToPdf = require('html-to-pdf');
var crypto = require('crypto');
var uuid = require('uuid');
var rand = require('csprng');
var moment = require('moment');
var mongoose = require('mongoose');
const querystring = require('querystring');
var request = require('request');
var cron = require('cron');
//Models
var ApiResponce = require("../Models/Apiresponce.js");
var ApiMessages = require("../Models/Apimessages.js");
var razorpay = require('../CoreModules/razorpay');
var Config = require("../Config/config.js");
var config = require("../Config/config.js");
var Counters = require('../Models/Counters.js');
var Razorpay_Service_Charge = require('../Models/Razorpay_Service_Charge.js');
var Orders = require('../Models/Orders.js');
var Customers = require('../Models/Customers.js');
var AdminMod = require('../CoreModules/adminmod.js');
var First_Time_Order_Settings = require('../Models/First_Time_Order_Settings.js');
var API_CATEGORY = require('../Models/API_CATEGORY.js');
var API_DOCUMENT = require('../Models/API_DOCUMENT.js');
var API_REQUESTS = require('../Models/API_REQUESTS.js');
var SMS_Promotional_Campaign = require('../Models/SMS_Promotional_Campaign.js');
var SMS_Promotional_Campaign_Recipient_Reports = require('../Models/SMS_Promotional_Campaign_Recipient_Reports.js');
var Customer_Order_Records = require('../Models/Customer_Order_Records.js');
var ObjectId = require('mongoose').Types.ObjectId;
var Exceeded_Wieght_Price = require('../Models/Exceeded_Wieght_Price.js');


exports.Update_Exceeded_Weight_Price = function (values, callback) {
    var query = {

    };
    var changes = {
        $set: {
            Price: parseInt(values.Price)
        }
    };
    Exceeded_Wieght_Price.update(query, changes, { multi: true }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Exceeded Weight Price Updated Successfully"                    
                }
            }));
        }
    })
}

exports.Enable_or_Disable_Exceeded_Weight = function (values, callback) {
    var Enable_Exceeding_Weight = false;
    if (values.Enable_Exceeding_Weight == true || values.Enable_Exceeding_Weight == "true") {
        Enable_Exceeding_Weight = true;
    } else if (values.Enable_Exceeding_Weight == null || values.Enable_Exceeding_Weight == false || values.Enable_Exceeding_Weight == 'false') {
        Enable_Exceeding_Weight = false;
    }
    var query = {

    };
    var changes = {
        $set: {
            Enable_Exceeding_Weight: Enable_Exceeding_Weight
        }
    };
    Exceeded_Wieght_Price.update(query, changes, { multi: true }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Exceeded Weight Setting Updated Successfully"
                }
            }));
        }
    })
}

exports.Find_Exceeded_Weight_Price = function (callback) {
    Exceeded_Wieght_Price.findOne().select('Enable_Exceeding_Weight Price').exec(function (err, Result) {

        var Enable_Exceeding_Weight = Result.Enable_Exceeding_Weight;
        var Price = 0;
        if (Enable_Exceeding_Weight == true) {
            Price = parseInt(Result.Price);
        }
        callback(new ApiResponce({
            success: true,
            extras: {
                Enable_Exceeding_Weight: Enable_Exceeding_Weight,
                Price: Price
            }
        }));
    })
}

exports.Create_Exceeded_Weight_Price = function (callback) {
    PriceData = new Exceeded_Wieght_Price({
        Price: 25
    });
    PriceData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback('Price Added Successfully');
        }
    })
}

exports.Remove_Error_Message = function (values, callback) {
    var query = {
        API_ID: values.API_ID,
        "Error_Response.Error_Message_Status_Body._id": values.ListID
    }
    API_DOCUMENT.findOne(query).exec(function (err, ApiExist) {
        if (err) {
            console.log(err);
        } else {
            if (ApiExist != null) {
                var changes = {
                    $pull: {
                        "Error_Response.Error_Message_Status_Body": {
                            "_id": values.ListID
                        }
                    }
                }
                API_DOCUMENT.update(query, changes, function (err, Result) {
                    if (err) {
                        console.log(err);
                    } else {
                        callback(new ApiResponce({
                            success: true,
                            extras: {
                                Status: "Api Error Message Removed Successfully"
                            }
                        }));
                    }
                });
            } else if (ApiExist == null) {
                callback(new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.LIST_NOT_FOUND
                    }
                }));
            }
        }
    })
}

exports.Edit_Error_Message = function (values, callback) {
    var query = {
        API_ID: values.API_ID,
        "Error_Response.Error_Message_Status_Body._id": values.ListID
    }
    API_DOCUMENT.findOne(query).exec(function (err, ApiExist) {
        if (err) {
            console.log(err);
        } else {
            if (ApiExist != null) {
                var changes = {
                    $set: {
                        "Error_Response.Error_Message_Status_Body.$.msg": values.msg,
                        "Error_Response.Error_Message_Status_Body.$.Status": values.Status
                    }
                }
                API_DOCUMENT.update(query, changes, function (err, Result) {
                    if (err) {
                        console.log(err);
                    } else {
                        callback(new ApiResponce({
                            success: true,
                            extras: {
                                Status: "Api Error Message Edited Successfully"
                            }
                        }));
                    }
                })
            } else if (ApiExist == null) {
                callback(new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.LIST_NOT_FOUND
                    }
                }));
            }
        }
    })
}

exports.Add_Error_Message = function (values, callback) {
    var query = {
        API_ID: values.API_ID
    }
    var changes = {
        $push: {
            "Error_Response.Error_Message_Status_Body": {
                "msg": values.msg,
                "Status": values.Status
            }
        }
    }
    API_DOCUMENT.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            console.log(Result);
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Error Message Added Successfully"
                }
            }));
        }
    });
}
exports.Remove_Api_Parameter = function (values, callback) {
    var query = {
        API_ID: values.API_ID,
        "Api_Parameters._id": values.ListID
    }
    API_DOCUMENT.findOne(query).exec(function (err, ApiExist) {
        if (err) {
            console.log(err);
        } else {
            if (ApiExist != null) {
                var changes = {
                    $pull: {
                        "Api_Parameters": {
                            "_id": values.ListID
                        }
                    }
                }
                API_DOCUMENT.update(query, changes, function (err, Result) {
                    if (err) {
                        console.log(err);
                    } else {
                        callback(new ApiResponce({
                            success: true,
                            extras: {
                                Status: "Api Parameter Removed Successfully"
                            }
                        }));
                    }
                })
            } else if (ApiExist == null) {
                callback(new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.LIST_NOT_FOUND
                    }
                }));
            }
        }
    })
}

exports.Edit_Api_Parameter = function (values, callback) {
    var query = {
        API_ID: values.API_ID,
        "Api_Parameters._id": values.ListID
    }
    API_DOCUMENT.findOne(query).exec(function (err, ApiExist) {
        if (err) {
            console.log(err);
        } else {
            if (ApiExist != null) {
                var changes = {
                    $set: {
                        "Api_Parameters.$.Param": values.Param,
                        "Api_Parameters.$.Datatype": values.Datatype,
                        "Api_Parameters.$.Description": values.Description
                    }
                }
                API_DOCUMENT.update(query, changes, function (err, Result) {
                    if (err) {
                        console.log(err);
                    } else {
                        callback(new ApiResponce({
                            success: true,
                            extras: {
                                Status: "Api Parameter Edited Successfully"
                            }
                        }));
                    }
                })
            } else if (ApiExist == null) {
                callback(new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.LIST_NOT_FOUND
                    }
                }));
            }
        }
    })
}
exports.Add_Api_Parameter = function (values, callback) {
    var query = {
        API_ID: values.API_ID
    }
    var changes = {
        $push: {
            "Api_Parameters": {
                "Param": values.Param,
                "Datatype": values.Datatype,
                "Description": values.Description
            }
        }
    }
    API_DOCUMENT.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            console.log(Result);
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Api Parameter Added Successfully"
                }
            }));
        }
    })
}

exports.Edit_Api_Error_Response_Documentation = function (values, callback) {
    var query = {
        API_ID: values.API_ID
    };
    var changes = {
        $set: {
            "Error_Response.Response": values.Error_Response
        }
    };
    API_DOCUMENT.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Api Error Response Edited Successfully"
                }
            }));
        }
    })
}
exports.Edit_Api_Error_Description_Documentation = function (values, callback) {
    var query = {
        API_ID: values.API_ID
    };
    var changes = {
        $set: {
            "Error_Response.Description": values.Error_Description
        }
    };
    API_DOCUMENT.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Api Error Description Edited Successfully"
                }
            }));
        }
    })
}
exports.Edit_Api_Success_Description_Documentation = function (values, callback) {
    var query = {
        API_ID: values.API_ID
    };
    var changes = {
        $set: {
            "Success_Response.Description": values.Success_Description
        }
    };
    API_DOCUMENT.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Api Success Description Edited Successfully"
                }
            }));
        }
    })
}
exports.Edit_Api_Success_Response_Documentation = function (values, callback) {
    var query = {
        API_ID: values.API_ID
    };
    var changes = {
        $set: {
            "Success_Response.Response": values.Success_Response
        }
    };
    API_DOCUMENT.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Api Success Response Edited Successfully"
                }
            }));
        }
    })
}
exports.Edit_Api_Sample_Request_JSON_Documentation = function (values, callback) {
    var query = {
        API_ID: values.API_ID
    };
    var changes = {
        $set: {
            "Api_Request_Body.Request_JSON": values.Request_JSON
        }
    };
    API_DOCUMENT.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Api Sample Request JSON Edited Successfully"
                }
            }));
        }
    })
}
exports.Edit_Api_Sample_Request_Description_Documentation = function (values, callback) {
    var query = {
        API_ID: values.API_ID
    };
    var changes = {
        $set: {
            "Api_Request_Body.Request_Description": values.Request_Description
        }
    };
    API_DOCUMENT.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Api Sample Request Description Edited Successfully"
                }
            }));
        }
    })
}
exports.Edit_Api_Sample_Request_Content_Type_Documentation = function (values, callback) {
    var query = {
        API_ID: values.API_ID
    };
    var changes = {
        $set: {
            "Api_Request_Body.Content_Type": values.Content_Type
        }
    };
    API_DOCUMENT.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Api Sample Request Content Type Edited Successfully"
                }
            }));
        }
    })
}
exports.Edit_Api_Description_Documentation = function (values, callback) {
    var query = {
        API_ID: values.API_ID
    };
    var changes = {
        $set: {
            API_Description: values.API_Description
        }
    };
    API_DOCUMENT.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Api Description Edited Successfully"
                }
            }));
        }
    })
}
exports.Edit_Api_URL_Documentation = function (values, callback) {
    var query = {
        API_ID: values.API_ID
    };
    var changes = {
        $set: {
            Api_URL: values.Api_URL
        }
    };
    API_DOCUMENT.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Api URL Edited Successfully"
                }
            }));
        }
    })
}
exports.Edit_Api_Path_Documentation = function (values, callback) {
    var query = {
        API_ID: values.API_ID
    };
    var changes = {
        $set: {
            Api_Path: values.Api_Path
        }
    };
    API_DOCUMENT.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Api Path Edited Successfully"
                }
            }));
        }
    })
}
exports.Edit_Api_Method_Documentation = function (values, callback) {
    var Api_Method = AdminMod.Format_Beautify_String(values.Api_Method);
    var query = {
        API_ID: values.API_ID
    };
    var changes = {
        $set: {
            Api_Method: Api_Method
        }
    };
    API_DOCUMENT.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Api Method Edited Successfully"
                }
            }));
        }
    })
}

exports.Edit_Api_Name_Documentation = function (values, callback) {
    var query = {
        API_ID: values.API_ID
    };
    var changes = {
        $set: {
            API_Name: values.API_Name
        }
    };
    API_DOCUMENT.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Api Name Edited Successfully"
                }
            }));
        }
    })
}

exports.List_Available_Campaign_Type_with_Count = function (callback) {
    function CustomerListFunction(CampaignType, callback) {
        process.nextTick(function () {
            var query = {

            }
            if (CampaignType == 1) {
                //Non Ordered Customers
                query = {
                    OrdersCount: {
                        $eq: 0
                    }
                }
            } else if (CampaignType == 2) {
                //Ordered Customers
                query = {
                    OrdersCount: {
                        $gte: 1
                    }
                }
            } else if (CampaignType == 3) {
                //All Customer 
                query = {
                    OrdersCount: {
                        $gte: 0
                    }
                }
            }
            var CountAggregate = [
                { "$match": { "acc_status": 1, Verify: 0 } },
                {
                    "$lookup": {
                        from: "Orders",
                        localField: "CustomerID",
                        foreignField: "userId",
                        as: "OrderData"
                    }
                },
                {
                    "$project": {
                        "CustomerID": "$_id",
                        "customerName": String("$First_name"),
                        "customerPhone": String("$Phone"),
                        "OrderData": {
                            "$filter": {
                                "input": "$OrderData",
                                "as": "item",
                                "cond": {
                                    "$and": [
                                        {
                                            "$eq": ["$$item.Whether_Deleted", false]
                                        },
                                        {
                                            "$in": ["$$item.status", [1, 7, 16, 10, 11, 12, 15, 18, 14]]
                                        }
                                    ]
                                }
                            }
                        }
                    }
                },
                {
                    "$addFields": {
                        "OrdersCount": { $size: "$OrderData" }
                    }
                },
                {
                    "$project": {
                        "OrderData": 0,
                        "_id": 0
                    }
                },
                {
                    "$match": query
                },
                {
                    "$count": "Count"
                }
            ]
            Customers.aggregate(CountAggregate).exec(function (err, CountResult) {
                if (err) {
                    callback(err);
                } else {
                    var Count = CountResult[0].Count;
                    callback(null, Count);
                }
            })
        })
    }
    sync(function () {
        var Non_Ordered_Customers = CustomerListFunction.sync(null, 1);
        var Ordered_Customers = CustomerListFunction.sync(null, 2);
        var All_Customers = CustomerListFunction.sync(null, 3);
        callback(new ApiResponce({
            success: true,
            extras: {
                CampaignInformation: [
                    {
                        Name: "Non Ordered Customers (" + Non_Ordered_Customers + ")",
                        CampaignType: 1
                    }, {
                        Name: "Ordered Customers (" + Ordered_Customers + ")",
                        CampaignType: 2
                    }, {
                        Name: "All Customers (" + All_Customers + ")",
                        CampaignType: 3
                    }
                ]
            }
        }));
    });
}

exports.Check_For_SMS_Campaign_Receipients = function (values, callback) {
    var query = {
        ReferenceID: values.ReferenceID
    };
    SMS_Promotional_Campaign_Recipient_Reports.findOne(query).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                callback(false, Result);
            } else {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.CAMPAIGN_RECEIPIENT_NOT_FOUND
                    }
                }));
            }
        }
    })
}
exports.Get_SMS_Recipent_Status = function (ReceipientData, callback) {
    if (ReceipientData.SMS_Status == 3 || ReceipientData.SMS_Status == 4) {
        callback(new ApiResponce({
            success: true,
            extras: {
                ReceipientData: {
                    ReferenceID: ReceipientData.ReferenceID,
                    CampaignID: ReceipientData.CampaignID,
                    CampaignName: ReceipientData.CampaignName,
                    customerName: ReceipientData.customerName,
                    customerPhone: ReceipientData.customerPhone,
                    SMS_Status: ReceipientData.SMS_Status,
                    SMS_Message: ReceipientData.SMS_Message,
                    created_at: moment(ReceipientData.created_at).utcOffset(330).format("MMM DD YYYY, h:mm A")
                }
            }
        }));
    } else {
        request({
            method: 'POST',
            url: 'https://alerts.solutionsinfini.com/api/v4/?api_key=A8ecd35d466a2e278ca5d53a8fda8c2d7&sender=EZSHIP&method=sms.status&id=' + ReceipientData.ReferenceID
        }, function (error, response, body) {
            var Response = JSON.parse(body);
            var SMS_Status;
            var SMS_Message;
            if (Response.status == "OK") {
                if (Response.data[0].status == "AWAITED-DLR") {
                    SMS_Status = 2;
                    SMS_Message = String(Response.data[0].status);
                } else if (Response.data[0].status == "DELIVRD") {
                    SMS_Status = 3;
                    SMS_Message = String(Response.data[0].status);
                }
            } else {
                SMS_Status = 4;
                SMS_Message = String(Response.message);
            }
            var query = {
                ReferenceID: ReceipientData.ReferenceID
            }
            var changes = {
                $set: {
                    SMS_Status: SMS_Status,
                    SMS_Message: SMS_Message
                }
            };
            SMS_Promotional_Campaign_Recipient_Reports.update(query, changes, function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(new ApiResponce({
                        success: true,
                        extras: {
                            ReceipientData: {
                                ReferenceID: ReceipientData.ReferenceID,
                                CampaignID: ReceipientData.CampaignID,
                                CampaignName: ReceipientData.CampaignName,
                                customerName: ReceipientData.customerName,
                                customerPhone: ReceipientData.customerPhone,
                                SMS_Status: SMS_Status,
                                SMS_Message: SMS_Message,
                                created_at: moment(ReceipientData.created_at).utcOffset(330).format("MMM DD YYYY, h:mm A")
                            }
                        }
                    }));
                }
            })
        })
    }
}

exports.Check_For_SMS_Campaign = function (values, callback) {
    var query = {
        CampaignID: values.CampaignID
    };
    SMS_Promotional_Campaign.findOne(query).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                callback(false, Result);
            } else {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.CAMPAIGN_NOT_FOUND
                    }
                }));
            }
        }
    })
}
exports.Search_All_Campaign_Receipients = function (values, CampaignData, callback) {
    var SearchValue = values.SearchValue;
    var query = {
        CampaignID: CampaignData.CampaignID,
        $or: [
            {
                CampaignName: {
                    $regex: SearchValue,
                    $options: "i"
                }
            }, {
                customerName: {
                    $regex: SearchValue,
                    $options: "i"
                }
            }, {
                customerPhone: {
                    $regex: SearchValue,
                    $options: "i"
                }
            }, {
                SMS_Message: {
                    $regex: SearchValue,
                    $options: "i"
                }
            }
        ]
    };
    var sortOptions = {
        created_at: -1
    }
    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    };

    SMS_Promotional_Campaign_Recipient_Reports.find(query).sort(sortOptions).exec(function (err, Result) {
        var ReceipientData = [];
        async.eachSeries(Result, function (item, resp) {
            ReceipientData.push({
                ReferenceID: item.ReferenceID,
                CampaignID: CampaignData.CampaignID,
                CampaignName: CampaignData.CampaignName,
                customerName: item.customerName,
                customerPhone: item.customerPhone,
                SMS_Status: item.SMS_Status,
                SMS_Message: item.SMS_Message,
                created_at: moment(item.created_at).utcOffset(330).format("MMM DD YYYY, h:mm A")
            })
            resp();
        }, function (err) {
            callback(new ApiResponce({
                success: true,
                extras: {
                    ReceipientData: ReceipientData
                }
            }));
        })
    })
}
exports.List_All_Campaign_Receipients = function (values, CampaignData, callback) {
    var query = {
        CampaignID: CampaignData.CampaignID
    };
    var toSkip = parseInt(values.skip);
    var toLimit = parseInt(values.limit);
    var sortOptions = {
        created_at: -1
    }
    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    }
    SMS_Promotional_Campaign_Recipient_Reports.count(query).exec(function (err, Count) {
        if (Count >= 0) {
            SMS_Promotional_Campaign_Recipient_Reports.find(query).sort(sortOptions).skip(toSkip).limit(toLimit).exec(function (err, Result) {
                var ReceipientData = [];
                async.eachSeries(Result, function (item, resp) {
                    ReceipientData.push({
                        ReferenceID: item.ReferenceID,
                        CampaignID: CampaignData.CampaignID,
                        CampaignName: CampaignData.CampaignName,
                        customerName: item.customerName,
                        customerPhone: item.customerPhone,
                        SMS_Status: item.SMS_Status,
                        SMS_Message: item.SMS_Message,
                        created_at: moment(item.created_at).utcOffset(330).format("MMM DD YYYY, h:mm A")
                    })
                    resp();
                }, function (err) {
                    callback(new ApiResponce({
                        success: true,
                        extras: {
                            Count: Count,
                            ReceipientData: ReceipientData
                        }
                    }));
                })
            })
        }
    })
}
exports.Search_All_SMS_Campaigns = function (values, callback) {
    var SearchValue = values.SearchValue;
    var query = {
        Status: true,
        $or: [
            {
                CampaignName: {
                    $regex: SearchValue,
                    $options: "i"
                }
            }, {
                CampaignMessage: {
                    $regex: SearchValue,
                    $options: "i"
                }
            }
        ]
    };
    var sortOptions = {
        created_at: -1
    }
    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    }

    SMS_Promotional_Campaign.find(query).sort(sortOptions).exec(function (err, Result) {
        var CampaignData = [];
        async.eachSeries(Result, function (item, resp) {
            CampaignData.push({
                CampaignID: item.CampaignID,
                CampaignName: item.CampaignName,
                CampaignType: item.CampaignType,
                CampaignMessage: item.CampaignMessage,
                Message_Length: item.Message_Length,
                Total_SMS: item.Total_SMS,
                Total_Delivered: item.Total_Delivered,
                Total_Awaited_Delivery: item.Total_Awaited_Delivery,
                Total_Failed: item.Total_Failed,
                created_at: moment(item.created_at).utcOffset(330).format("MMM DD YYYY, h:mm A")
            })
            resp();
        }, function (err) {
            callback(new ApiResponce({
                success: true,
                extras: {
                    CampaignData: CampaignData
                }
            }));
        })
    })
}

exports.List_All_SMS_Campaigns = function (values, callback) {
    var query = {
        Status: true
    };
    var toSkip = parseInt(values.skip);
    var toLimit = parseInt(values.limit);
    var sortOptions = {
        created_at: -1
    }
    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    }
    SMS_Promotional_Campaign.count(query).exec(function (err, Count) {
        if (Count >= 0) {
            SMS_Promotional_Campaign.find(query).sort(sortOptions).skip(toSkip).limit(toLimit).exec(function (err, Result) {
                var CampaignData = [];
                async.eachSeries(Result, function (item, resp) {
                    CampaignData.push({
                        CampaignID: item.CampaignID,
                        CampaignName: item.CampaignName,
                        CampaignType: item.CampaignType,
                        CampaignMessage: item.CampaignMessage,
                        Message_Length: item.Message_Length,
                        Total_SMS: item.Total_SMS,
                        Total_Delivered: item.Total_Delivered,
                        Total_Awaited_Delivery: item.Total_Awaited_Delivery,
                        Total_Failed: item.Total_Failed,
                        created_at: moment(item.created_at).utcOffset(330).format("MMM DD YYYY, h:mm A")
                    })
                    resp();
                }, function (err) {
                    callback(new ApiResponce({
                        success: true,
                        extras: {
                            Count: Count,
                            CampaignData: CampaignData
                        }
                    }));
                })
            })
        }
    })
}


exports.Create_Campaign_and_Send_SMS = function (values, callback) {
    var CampaignID = uuid();
    function Create_Campaign_Function(values, callback) {
        process.nextTick(function () {
            var date = new Date();
            var CampaignData = new SMS_Promotional_Campaign({
                CampaignID: CampaignID,
                CampaignName: values.CampaignName,
                CampaignType: parseInt(values.CampaignType),
                CampaignMessage: values.CampaignMessage,
                Message_Length: values.CampaignMessage.length,
                created_at: date,
                updated_at: date
            });
            CampaignData.save(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, Result);
                }
            })
        })
    }
    function CustomerListFunction(values, callback) {
        process.nextTick(function () {
            var CampaignType = parseInt(values.CampaignType);
            var query = {

            }
            if (CampaignType == 1) {
                query = {
                    OrdersCount: {
                        $eq: 0
                    }
                }
            } else if (CampaignType == 2) {
                query = {
                    OrdersCount: {
                        $gte: 1
                    }
                }
            } else if (CampaignType == 3) {
                query = {
                    OrdersCount: {
                        $gte: 0
                    }
                }
            }
            var listingAggregate = [
                { "$match": { "acc_status": 1, Verify: 0 } },
                {
                    "$lookup": {
                        from: "Orders",
                        localField: "CustomerID",
                        foreignField: "userId",
                        as: "OrderData"
                    }
                },
                {
                    "$project": {
                        "CustomerID": "$_id",
                        "customerName": String("$First_name"),
                        "customerPhone": String("$Phone"),
                        "OrderData": {
                            "$filter": {
                                "input": "$OrderData",
                                "as": "item",
                                "cond": {
                                    "$and": [
                                        {
                                            "$eq": ["$$item.Whether_Deleted", false]
                                        },
                                        {
                                            "$in": ["$$item.status", [1, 7, 16, 10, 11, 12, 15, 18, 14]]
                                        }
                                    ]
                                }
                            }
                        }
                    }
                },
                {
                    "$addFields": {
                        "OrdersCount": { $size: "$OrderData" }
                    }
                },
                {
                    "$project": {
                        "OrderData": 0,
                        "_id": 0
                    }
                },
                {
                    "$match": query
                }
            ]
            Customers.aggregate(listingAggregate).exec(function (err, ListResult) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, ListResult);
                }
            })
        })
    }
    function CustomerSentSMS(CampaignData, CustomerData, callback) {
        process.nextTick(function () {
            console.log(CustomerData);
            var PhoneNumber = CustomerData.customerPhone;
            console.log(PhoneNumber);
            var newmessage = querystring.escape(CampaignData.CampaignMessage);
            var date = new Date();
            request({
                method: 'POST',
                url: 'https://alerts.solutionsinfini.com/api/v4/?api_key=A8ecd35d466a2e278ca5d53a8fda8c2d7&sender=EZSHIP&method=sms&to=' + PhoneNumber + '&message=' + newmessage
            }, function (error, response, body) {
                var Response = JSON.parse(body);
                var ReferenceID;
                var SMS_Status;
                var SMS_Message;
                if (Response.status == "OK") {
                    ReferenceID = Response.data[0].id;
                    if (Response.data[0].status == "AWAITED-DLR") {
                        SMS_Status = 2;
                        SMS_Message = String(Response.data[0].status);
                    } else if (Response.data[0].status == "INVALID-NUM") {
                        SMS_Status = 4;
                        SMS_Message = String(Response.data[0].status);
                    }
                } else {
                    console.log("message fail due to " + Response.message);
                    ReferenceID = uuid();
                    SMS_Status = 4;
                    SMS_Message = String(Response.message);
                }
                var Data = new SMS_Promotional_Campaign_Recipient_Reports({
                    ReferenceID: ReferenceID,
                    CampaignID: CampaignData.CampaignID,
                    CampaignName: CampaignData.CampaignName,
                    customerName: CustomerData.customerName,
                    customerPhone: CustomerData.customerPhone,
                    SMS_Status: SMS_Status,
                    SMS_Message: SMS_Message,
                    created_at: date,
                    updated_at: date
                })
                Data.save(function (err, Result) {
                    if (err) {
                        console.log(err);
                    } else {
                        callback(null, "Customer SMS SENT SUCCESSFULLY")
                    }
                })
            })
        })
    }
    function GetCOUNTRECIPIENTS_TYPE(type, CampaignData, callback) {
        process.nextTick(function () {
            var query = {

            }
            if (type == 1) {
                //Total Count
                var query = {
                    CampaignID: CampaignData.CampaignID,
                }
            } else if (type == 2) {
                //Delivered Count
                var query = {
                    CampaignID: CampaignData.CampaignID,
                    SMS_Status: 3
                }
            } else if (type == 3) {
                //Awaited Delivery Count
                var query = {
                    CampaignID: CampaignData.CampaignID,
                    SMS_Status: 2
                }
            } else if (type == 4) {
                //Failed Count
                var query = {
                    CampaignID: CampaignData.CampaignID,
                    SMS_Status: 4
                }
            }
            SMS_Promotional_Campaign_Recipient_Reports.count(query).exec(function (err, Count) {
                callback(null, Count);
            })

        })
    }
    function UpdateCampaign(query, changes, callback) {
        process.nextTick(function () {
            SMS_Promotional_Campaign.update(query, changes, function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, 'Campaign updated successfully')
                }
            })
        })
    }
    sync(function () {
        var CampaignData = Create_Campaign_Function.sync(null, values);
        callback(false, new ApiResponce({
            success: true,
            extras: {
                Status: "Campaign SMS are Processing and will be sent within few minutes..."
            }
        }));
        var CustomerData = CustomerListFunction.sync(null, values);
        async.each(CustomerData, function (item, resp) {
            var SentSMS = CustomerSentSMS.sync(null, CampaignData, item);
            resp();
        }, function (err) {
            var Total_SMS = GetCOUNTRECIPIENTS_TYPE.sync(null, 1, CampaignData);
            var Total_Delivered = GetCOUNTRECIPIENTS_TYPE.sync(null, 2, CampaignData);
            var Total_Awaited_Delivery = GetCOUNTRECIPIENTS_TYPE.sync(null, 3, CampaignData);
            var Total_Failed = GetCOUNTRECIPIENTS_TYPE.sync(null, 4, CampaignData);
            var query = {
                CampaignID: CampaignData.CampaignID
            };
            var changes = {
                $set: {
                    Total_SMS: Total_SMS,
                    Total_Delivered: Total_Delivered,
                    Total_Awaited_Delivery: Total_Awaited_Delivery,
                    Total_Failed: Total_Failed
                }
            };
            var UpdateChanges = UpdateCampaign.sync(null, query, changes);
        })
    })
}
exports.Refresh_SMS_Campaign = function (CampaignData, callback) {
    function ReceipientDataFunction(CampaignData, callback) {
        process.nextTick(function () {
            var query = {
                CampaignID: CampaignData.CampaignID,
                SMS_Status: 2
            };
            SMS_Promotional_Campaign_Recipient_Reports.find(query).exec(function (err, Result) {
                callback(null, Result);
            })
        })
    };
    function CheckStatusFunction(ReceipientData, callback) {
        process.nextTick(function () {
            request({
                method: 'POST',
                url: 'https://alerts.solutionsinfini.com/api/v4/?api_key=A8ecd35d466a2e278ca5d53a8fda8c2d7&sender=EZSHIP&method=sms.status&id=' + ReceipientData.ReferenceID
            }, function (error, response, body) {
                var Response = JSON.parse(body);
                console.log(Response);
                var SMS_Status;
                var SMS_Message;
                if (Response.status == "OK") {
                    if (Response.data[0].status == "AWAITED-DLR") {
                        SMS_Status = 2;
                        SMS_Message = String(Response.data[0].status);
                    } else if (Response.data[0].status == "DELIVRD") {
                        SMS_Status = 3;
                        SMS_Message = String(Response.data[0].status);
                    } else {
                        SMS_Status = 4;
                        SMS_Message = String(Response.data[0].status);
                    }
                } else {
                    SMS_Status = 4;
                    SMS_Message = String(Response.message);
                }
                var query = {
                    ReferenceID: ReceipientData.ReferenceID
                }
                var changes = {
                    $set: {
                        SMS_Status: SMS_Status,
                        SMS_Message: SMS_Message
                    }
                };
                SMS_Promotional_Campaign_Recipient_Reports.update(query, changes, function (err, Result) {
                    if (err) {
                        console.log(err);
                    } else {
                        callback(null, "Updated Successfully");
                    }
                })
            })
        })
    }
    function GetCOUNTRECIPIENTS_TYPE(type, CampaignData, callback) {
        process.nextTick(function () {
            var query = {

            }
            if (type == 1) {
                //Total Count
                var query = {
                    CampaignID: CampaignData.CampaignID,
                }
            } else if (type == 2) {
                //Delivered Count
                var query = {
                    CampaignID: CampaignData.CampaignID,
                    SMS_Status: 3
                }
            } else if (type == 3) {
                //Awaited Delivery Count
                var query = {
                    CampaignID: CampaignData.CampaignID,
                    SMS_Status: 2
                }
            } else if (type == 4) {
                //Failed Count
                var query = {
                    CampaignID: CampaignData.CampaignID,
                    SMS_Status: 4
                }
            }
            SMS_Promotional_Campaign_Recipient_Reports.count(query).exec(function (err, Count) {
                callback(null, Count);
            })

        })
    }
    function UpdateCampaign(query, changes, callback) {
        process.nextTick(function () {
            SMS_Promotional_Campaign.update(query, changes, function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, 'Campaign updated successfully')
                }
            })
        })
    }
    sync(function () {
        console.log("Updating Successfully");
        var Total_SMS = GetCOUNTRECIPIENTS_TYPE.sync(null, 1, CampaignData);
        console.log("Total_SMS");
        console.log(Total_SMS);
        var Total_Delivered = GetCOUNTRECIPIENTS_TYPE.sync(null, 2, CampaignData);
        console.log("Total_Delivered");
        console.log(Total_Delivered);
        var Total_Awaited_Delivery = GetCOUNTRECIPIENTS_TYPE.sync(null, 3, CampaignData);
        console.log("Total_Awaited_Delivery");
        console.log(Total_Awaited_Delivery);
        var Total_Failed = GetCOUNTRECIPIENTS_TYPE.sync(null, 4, CampaignData);
        console.log("Total_Failed");
        console.log(Total_Failed);
        var query = {
            CampaignID: CampaignData.CampaignID
        };
        console.log(query);
        var changes = {
            $set: {
                Total_SMS: Total_SMS,
                Total_Delivered: Total_Delivered,
                Total_Awaited_Delivery: Total_Awaited_Delivery,
                Total_Failed: Total_Failed
            }
        };
        console.log(changes);
        var UpdateChanges = UpdateCampaign.sync(null, query, changes);
        var Result = ReceipientDataFunction.sync(null, CampaignData);
        console.log("Fetched Result Successfully");
        callback(new ApiResponce({
            success: true,
            extras: {
                CampaignData: {
                    CampaignID: CampaignData.CampaignID,
                    CampaignName: CampaignData.CampaignName,
                    CampaignType: CampaignData.CampaignType,
                    CampaignMessage: CampaignData.CampaignMessage,
                    Message_Length: CampaignData.Message_Length,
                    Total_SMS: Total_SMS,
                    Total_Delivered: Total_Delivered,
                    Total_Awaited_Delivery: Total_Awaited_Delivery,
                    Total_Failed: Total_Failed,
                    created_at: moment(CampaignData.created_at).utcOffset(330).format("MMM DD YYYY, h:mm A")
                }
            }
        }));
        async.each(Result, function (item, resp) {
            var CheckStatus = CheckStatusFunction.sync(null, item);
            resp();
        }, function (err) {
            console.log("Updating Successfully");
            var Total_SMS = GetCOUNTRECIPIENTS_TYPE.sync(null, 1, CampaignData);
            console.log("Total_SMS");
            console.log(Total_SMS);
            var Total_Delivered = GetCOUNTRECIPIENTS_TYPE.sync(null, 2, CampaignData);
            console.log("Total_Delivered");
            console.log(Total_Delivered);
            var Total_Awaited_Delivery = GetCOUNTRECIPIENTS_TYPE.sync(null, 3, CampaignData);
            console.log("Total_Awaited_Delivery");
            console.log(Total_Awaited_Delivery);
            var Total_Failed = GetCOUNTRECIPIENTS_TYPE.sync(null, 4, CampaignData);
            console.log("Total_Failed");
            console.log(Total_Failed);
            var query = {
                CampaignID: CampaignData.CampaignID
            };
            console.log(query);
            var changes = {
                $set: {
                    Total_SMS: Total_SMS,
                    Total_Delivered: Total_Delivered,
                    Total_Awaited_Delivery: Total_Awaited_Delivery,
                    Total_Failed: Total_Failed
                }
            };
            console.log(changes);
            var UpdateChanges = UpdateCampaign.sync(null, query, changes);
        })
    })
};

var Script_for_Updating_CustomerID = new cron.CronJob('*/2 * * * *', function () {
    var date = new Date();
    console.log("Script_for_Updating_CustomerID");
    var querystring = require('querystring');
    var https = require('https');
    var fs = require('fs');
    var config = require("../Config/config.js");
    var post_data = querystring.stringify({
        'Uday': 'Uday'
    });
    var options = {
        host: 'superadmin.ezshipp.com',
        port: 443,
        method: 'POST',
        path: '/Script_For_Storing_CustomerID',
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
            console.log("Job Runned Successfully");
        });
    });
    req.write(post_data);
    req.end();
}, null, true, 'Asia/Kolkata');

exports.Check_for_Premium_Customer_Order_Record = function (values, callback) {
    var query = {
        RecordID: values.RecordID
    }
    Customer_Order_Records.findOne(query).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                callback(false, Result);
            } else if (Result == null) {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Customer_Record_Not_Found
                    }
                }));
            }
        }
    })
}

exports.Search_All_Customer_Order_Records = function (values, callback) {

    var sortOptions = {
        created_at: -1
    };
    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    };
    var SearchValue = String(values.SearchValue);
    var query = {
        $or: [
            {
                CustomerName: {
                    $regex: SearchValue, $options: "i"
                }
            }, {
                CustomerPhone: {
                    $regex: SearchValue, $options: "i"
                }
            }, {
                RecordNumber: {
                    $regex: SearchValue, $options: "i"
                }
            }
        ]
    };

    var RecordData = [];
    Customer_Order_Records.find(query).sort(sortOptions).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            async.eachSeries(Result, function (item, resp) {
                var PDFLink = ""
                if (item.PDFLink != "") {
                    PDFLink = config.S3URL + item.PDFLink;
                }
                var created_at = moment(item.created_at).utcOffset(330).format('MMM DD YYYY, h:mm A');
                var from_date = moment(item.from_date).utcOffset(330).format('MMM DD YYYY, h:mm A');
                var to_date = moment(item.to_date).utcOffset(330).format('MMM DD YYYY, h:mm A');
                RecordData.push({
                    RecordID: item.RecordID,
                    CustomerID: item.CustomerID,
                    CustomerName: item.CustomerName,
                    CustomerPhone: item.CustomerPhone,
                    RecordNumber: item.RecordNumber,
                    ProcessStage: item.ProcessStage,
                    PDFLink: PDFLink,
                    created_at: created_at,
                    from_date: from_date,
                    to_date: to_date
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

exports.Find_All_Customer_Order_Records = function (values, callback) {
    var toSkip = parseInt(values.skip);
    var toLimit = parseInt(values.limit);
    var sortOptions = {
        created_at: -1
    };
    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    }
    var query = {

    };
    Customer_Order_Records.count(query).exec(function (err, Count) {
        if (Count >= 0) {
            var RecordData = [];
            Customer_Order_Records.find(query).sort(sortOptions).skip(toSkip).limit(toLimit).exec(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    async.eachSeries(Result, function (item, resp) {
                        var PDFLink = ""
                        if (item.PDFLink != "") {
                            PDFLink = config.S3URL + item.PDFLink;
                        }
                        var created_at = moment(item.created_at).utcOffset(330).format('MMM DD YYYY, h:mm A');
                        var from_date = moment(item.from_date).utcOffset(330).format('MMM DD YYYY, h:mm A');
                        var to_date = moment(item.to_date).utcOffset(330).format('MMM DD YYYY, h:mm A');
                        RecordData.push({
                            RecordID: item.RecordID,
                            CustomerID: item.CustomerID,
                            CustomerName: item.CustomerName,
                            CustomerPhone: item.CustomerPhone,
                            RecordNumber: item.RecordNumber,
                            ProcessStage: item.ProcessStage,
                            PDFLink: PDFLink,
                            created_at: created_at,
                            from_date: from_date,
                            to_date: to_date
                        })
                        resp();
                    }, function (err) {
                        if (!err) {
                            callback(new ApiResponce({
                                success: true,
                                extras: {
                                    Count: Count,
                                    RecordData: RecordData
                                }
                            }));
                        }
                    })
                }
            })
        }
    })
}
exports.Refresh_Premium_Customer_Record = function (RecordData, callback) {
    var PDFLink = ""
    if (RecordData.PDFLink != "") {
        PDFLink = config.S3URL + RecordData.PDFLink;
    }
    var created_at = moment(RecordData.created_at).utcOffset(330).format('MMM DD YYYY, h:mm A');
    var from_date = moment(RecordData.from_date).utcOffset(330).format('MMM DD YYYY, h:mm A');
    var to_date = moment(RecordData.to_date).utcOffset(330).format('MMM DD YYYY, h:mm A');
    callback(false, new ApiResponce({
        success: true,
        extras: {
            RecordData: {
                RecordID: RecordData.RecordID,
                CustomerID: RecordData.CustomerID,
                CustomerName: RecordData.CustomerName,
                CustomerPhone: RecordData.CustomerPhone,
                RecordNumber: RecordData.RecordNumber,
                ProcessStage: RecordData.ProcessStage,
                PDFLink: PDFLink,
                created_at: created_at,
                from_date: from_date,
                to_date: to_date
            }
        }
    }));
}
exports.Script_For_Storing_CustomerID = function (callback) {
    function CustomerDataFunction(callback) {
        process.nextTick(function () {
            var query = {
                acc_status: 1,
                Verify: 0,
                CustomerID_Set: {
                    $nin: [true]
                }
            };
            Customers.find(query).exec(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, Result);
                }
            })
        })
    }
    function UpdateFunction(CustomerData, callback) {
        process.nextTick(function () {
            var query = {
                _id: CustomerData._id
            };
            var changes = {
                $set: {
                    CustomerID_Set: true,
                    CustomerID: String(CustomerData._id)
                }
            };
            var multiplicity = {
                multi: true
            };
            Customers.update(query, changes, multiplicity, function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, "Customer ID Set");
                }
            });
        })
    }
    sync(function () {
        var Result = CustomerDataFunction.sync(null);
        var count = Result.length;
        callback("Script Runned Successfully");
        console.log("Customer Count " + count);
        async.eachSeries(Result, function (item, resp) {
            var toUpdate = UpdateFunction.sync(null, item);
            console.log("Updated->" + count + " Phone" + item.Phone);
            count--;
            resp();
        }, function (err) {
            if (!err) {
                console.log("Script Runned Successfully")
            }
        })
    })
}

exports.Search_All_Business_Apis_Customer_Request = function (values, callback) {
    var query = {
        $or: [
            {
                ApiKey: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                customerName: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                customerPhone: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                customerEmail: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }, {
                IP_Address: {
                    $regex: values.SearchValue,
                    $options: "i"
                }
            }
        ]
    };
    var sortOptions = {
        created_at: -1
    };
    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    };
    API_REQUESTS.find(query).sort(sortOptions).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            var API_Request_Data = [];
            async.eachSeries(Result, function (item, resp) {
                API_Request_Data.push({
                    RequestID: String(item._id),
                    ApiKey: item.ApiKey,
                    Api_Type: item.Api_Type,
                    CustomerID: item.CustomerID,
                    customerName: item.customerName,
                    customerPhone: item.customerPhone,
                    customerEmail: item.customerEmail,
                    Body: item.Body,
                    IP_Address: item.IP_Address,
                    created_at: moment(item.created_at).utcOffset(330).format('MMM DD YYYY, h:mm A')
                })
                resp();
            }, function (err) {
                if (!err) {
                    callback(new ApiResponce({
                        success: true,
                        extras: {
                            API_Request_Data: API_Request_Data
                        }
                    }));
                }
            })
        }
    })
}


exports.Find_All_Business_Apis_Customer_Request = function (values, callback) {
    var query = {

    };
    var sortOptions = {
        created_at: -1
    };
    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    };
    var toSkip = parseInt(values.skip);
    var toLimit = parseInt(values.limit);
    API_REQUESTS.find(query).sort(sortOptions).skip(toSkip).limit(toLimit).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            var API_Request_Data = [];
            async.eachSeries(Result, function (item, resp) {
                API_Request_Data.push({
                    RequestID: String(item._id),
                    ApiKey: item.ApiKey,
                    Api_Type: item.Api_Type,
                    CustomerID: item.CustomerID,
                    customerName: item.customerName,
                    customerPhone: item.customerPhone,
                    customerEmail: item.customerEmail,
                    Body: item.Body,
                    IP_Address: item.IP_Address,
                    created_at: moment(item.created_at).utcOffset(330).format('MMM DD YYYY, h:mm A')
                })
                resp();
            }, function (err) {
                if (!err) {
                    API_REQUESTS.count(query).exec(function (err, Count) {
                        if (Count >= 0) {
                            callback(new ApiResponce({
                                success: true,
                                extras: {
                                    API_Request_Data: API_Request_Data,
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
exports.Search_Active_Premium_Customers = function (values, callback) {
    var sortOptions = {
        Signup_Date: -1
    };
    var query = {
        $or: [
            {
                "customerName": {
                    $regex: String(values.SearchValue),
                    $options: "i"
                }
            },
            {
                "customerPhone": {
                    $regex: String(values.SearchValue),
                    $options: "i"
                }
            },
            {
                "customerEmail": {
                    $regex: String(values.SearchValue),
                    $options: "i"
                }
            }
        ]
    }

    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    }


    var SearchingAggregate = [
        {
            "$match": {
                "acc_status": 1, "Verify": 0, "Premium_User": true, "Premium_Status": true
            }
        },
        {
            "$lookup": {
                from: "Orders",
                localField: "CustomerID",
                foreignField: "userId",
                as: "OrderData"
            }
        },
        {
            "$project": {
                "CustomerID": "$_id",
                "customerName": "$First_name",
                "customerPhone": String("$Phone"),
                "customerEmail": "$Email",
                "acc_status": "$acc_status",
                "customerseqId": "$customerseqId",
                "CurrentStatus": "$CurrentStatus",
                "terms_cond": "$terms_cond",
                "referral_code": "$referral_code",
                "CustomerImage": "$CustomerImage",
                "Whether_Guest": "$Whether_Guest",
                "Signup_Date": "$Created_dt",
                "Date": "$Signup_Date",
                "Devices": "$Devices",
                "AddressLog": "$AddressLog",
                "Premium_User": "$Premium_User",
                "Premium_User_Time": "$Premium_User_Time",
                "Premium_Status": "$Premium_Status",
                "CustomerKey": "$CustomerKey",
                "Premium_Pricing_Set": "$Premium_Pricing_Set",
                "Premium_Instant_Pricing": "$Premium_Instant_Pricing",
                "Premium_4hours_Pricing": "$Premium_4hours_Pricing",
                "Premium_Same_Day_Pricing": "$Premium_Same_Day_Pricing",
                "Monthly_Invoice": "$Monthly_Invoice",
                "Flat_Monthly_Price_Available": "$Flat_Monthly_Price_Available",
                "Flat_Monthly_Price": "$Flat_Monthly_Price",
                "Default_Pickup_Location_Exist": "$Default_Pickup_Location_Exist",
                "Default_Pickup_Address": "$Default_Pickup_Address",
                "Default_Pickup_Latitude": "$Default_Pickup_Latitude",
                "Default_Pickup_Longitude": "$Default_Pickup_Longitude",
                "OrderData": {
                    "$filter": {
                        "input": "$OrderData",
                        "as": "item",
                        "cond": {
                            "$and": [
                                {
                                    "$eq": ["$$item.Whether_Deleted", false]
                                },
                                {
                                    "$in": ["$$item.status", [1, 7, 16, 10, 11, 12, 15, 18, 14]]
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            "$addFields": {
                "OrdersCount": { $size: "$OrderData" },
            }
        },
        {
            "$project": {
                "OrderData": 0,
                "_id": 0
            }
        },
        {
            "$match": query
        },
        {
            "$sort": sortOptions
        }
    ]

    Customers.aggregate(SearchingAggregate).exec(function (err, SearchResult) {
        if (err) {
            callback(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    CustomerData: SearchResult
                }
            }));
        }
    })
}
exports.Search_Active_Customers = function (values, callback) {
    var sortOptions = {
        Signup_Date: -1
    };
    var query = {
        $or: [
            {
                "customerName": {
                    $regex: String(values.SearchValue),
                    $options: "i"
                }
            },
            {
                "customerPhone": {
                    $regex: String(values.SearchValue),
                    $options: "i"
                }
            },
            {
                "customerEmail": {
                    $regex: String(values.SearchValue),
                    $options: "i"
                }
            }
        ]
    }

    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    }


    var SearchingAggregate = [
        { "$match": { "acc_status": 1, Verify: 0 } },
        {
            "$lookup": {
                from: "Orders",
                localField: "CustomerID",
                foreignField: "userId",
                as: "OrderData"
            }
        },
        {
            "$project": {
                "CustomerID": "$_id",
                "customerName": "$First_name",
                "customerPhone": String("$Phone"),
                "customerEmail": "$Email",
                "acc_status": "$acc_status",
                "customerseqId": "$customerseqId",
                "CurrentStatus": "$CurrentStatus",
                "terms_cond": "$terms_cond",
                "referral_code": "$referral_code",
                "CustomerImage": "$CustomerImage",
                "Whether_Guest": "$Whether_Guest",
                "Signup_Date": "$Created_dt",
                "Date": "$Signup_Date",
                "Devices": "$Devices",
                "AddressLog": "$AddressLog",
                "OrderData": {
                    "$filter": {
                        "input": "$OrderData",
                        "as": "item",
                        "cond": {
                            "$and": [
                                {
                                    "$eq": ["$$item.Whether_Deleted", false]
                                },
                                {
                                    "$in": ["$$item.status", [1, 7, 16, 10, 11, 12, 15, 18, 14]]
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            "$addFields": {
                "OrdersCount": { $size: "$OrderData" },
            }
        },
        {
            "$project": {
                "OrderData": 0,
                "_id": 0
            }
        },
        {
            "$match": query
        },
        {
            "$sort": sortOptions
        }
    ]

    Customers.aggregate(SearchingAggregate).exec(function (err, SearchResult) {
        if (err) {
            callback(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    CustomerData: SearchResult
                }
            }));
        }
    })
}
exports.Check_Customers_Date_Validation = function (values, callback) {
    if (values.Whether_Date_Filter != null) {
        if (values.Whether_Date_Filter == true || values.Whether_Date_Filter == "true") {
            if (values.from_date != null && values.to_date != null) {
                callback(false);
            } else {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.ENTER_ALL_TAGS
                    }
                }));
            }
        } else {
            callback(false);
        }
    } else {
        callback(true, new ApiResponce({
            success: false,
            extras: {
                msg: ApiMessages.ENTER_ALL_TAGS
            }
        }));
    }
};
exports.Check_for_Premium_Options_Validation = function (values, callback) {
    if (values.Premium_Pricing_Set != null && values.Monthly_Invoice != null && values.Flat_Monthly_Price_Available != null && values.Default_Pickup_Location_Exist != null) {
        callback(false)
    } else {
        callback(true, new ApiResponce({
            success: false,
            extras: {
                msg: ApiMessages.ENTER_ALL_TAGS
            }
        }));
    }
}
exports.Check_Ordered_Non_Ordered_Validation = function (values, callback) {
    if (values.Whether_Ordered_Customers != null && values.Whether_Non_Ordered_Customers != null) {
        if (values.Whether_Ordered_Customers == true || values.Whether_Ordered_Customers == "true") {
            if (values.Whether_Ordered_Customers_Type != null) {
                var Whether_Ordered_Customers_Type = parseInt(values.Whether_Ordered_Customers_Type);
                if (Whether_Ordered_Customers_Type == 1) {
                    //All Ordered Customers
                    callback(false);
                } else if (Whether_Ordered_Customers_Type == 2) {
                    if (values.From_Ordered_Count != null && values.To_Ordered_Count != null) {
                        callback(false);
                    } else {
                        callback(true, new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.ENTER_ALL_TAGS
                            }
                        }));
                    }
                }
            } else {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.ENTER_ALL_TAGS
                    }
                }));
            }
        } else {
            callback(false);
        }
    } else {
        callback(true, new ApiResponce({
            success: false,
            extras: {
                msg: ApiMessages.ENTER_ALL_TAGS
            }
        }));
    }
}
exports.Check_Email_Filter_Validation = function (values, callback) {
    if (values.Whether_Email_Filter != null) {
        if (values.Whether_Email_Filter == true || values.Whether_Email_Filter == "true") {
            if (values.Email != null && values.Email != "") {
                callback(false)
            } else {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.ENTER_ALL_TAGS
                    }
                }));
            }
        } else {
            callback(false)
        }
    } else {
        callback(true, new ApiResponce({
            success: false,
            extras: {
                msg: ApiMessages.ENTER_ALL_TAGS
            }
        }));
    }
};
exports.Check_PhoneNumber_Filter_Validation = function (values, callback) {
    if (values.Whether_PhoneNumber_Filter != null) {
        if (values.Whether_PhoneNumber_Filter == true || values.Whether_PhoneNumber_Filter == "true") {
            if (values.PhoneNumber != null && values.PhoneNumber != "") {
                callback(false)
            } else {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.ENTER_ALL_TAGS
                    }
                }));
            }
        } else {
            callback(false)
        }
    } else {
        callback(true, new ApiResponce({
            success: false,
            extras: {
                msg: ApiMessages.ENTER_ALL_TAGS
            }
        }));
    }
};
//Check Whether Name Filter Available
exports.Check_Name_Filter_Validation = function (values, callback) {
    if (values.Whether_Name_Filter != null) {
        if (values.Whether_Name_Filter == true || values.Whether_Name_Filter == "true") {
            if (values.Name != null && values.Name != "" && values.Name_Query_Type != null && values.Name_Query_Type != "") {
                callback(false)
            } else {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.ENTER_ALL_TAGS
                    }
                }));
            }
        } else {
            callback(false)
        }
    } else {
        callback(true, new ApiResponce({
            success: false,
            extras: {
                msg: ApiMessages.ENTER_ALL_TAGS
            }
        }));
    }
};
exports.Find_All_Active_Premium_Customers_with_Filters = function (values, callback) {
    var toSkip = parseInt(values.skip);
    var toLimit = parseInt(values.limit);
    var sortOptions = {
        Signup_Date: -1
    };
    var NameMatch = {
        $regex: "", $options: "i"
    };
    var PhoneMatch = {
        $regex: "", $options: "i"
    };
    var EmailMatch = {
        $regex: "", $options: "i"
    };
    var DateMatch = {
        $ne: null
    };
    var OrderCountMatch = {
        $gte: 0
    };
    var Premium_Pricing_Set = {
        $in: [false, true, null]
    };
    var Monthly_Invoice = {
        $in: [false, true, null]
    };
    var Flat_Monthly_Price_Available = {
        $in: [false, true, null]
    };
    var Default_Pickup_Location_Exist = {
        $in: [false, true, null]
    };
    if (values.Premium_Pricing_Set == true || values.Premium_Pricing_Set == "true") {
        Premium_Pricing_Set = {
            $in: [true]
        }
    }
    if (values.Monthly_Invoice == true || values.Monthly_Invoice == "true") {
        Monthly_Invoice = {
            $in: [true]
        }
    }
    if (values.Flat_Monthly_Price_Available == true || values.Flat_Monthly_Price_Available == "true") {
        Flat_Monthly_Price_Available = {
            $in: [true]
        }
    }
    if (values.Default_Pickup_Location_Exist == true || values.Default_Pickup_Location_Exist == "true") {
        Default_Pickup_Location_Exist = {
            $in: [true]
        }
    }
    if (values.Whether_Non_Ordered_Customers == true || values.Whether_Non_Ordered_Customers == "true") {
        OrderCountMatch = {
            $eq: 0
        };
    }
    var from_moment;
    var to_moment;
    if (values.Whether_Date_Filter == true || values.Whether_Date_Filter == "true") {
        from_moment = moment(values.from_date, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
        to_moment = moment(values.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days').toDate();
        DateMatch = {
            $gte: from_moment,
            $lte: to_moment
        }
    }
    if (values.Whether_Email_Filter == true || values.Whether_Email_Filter == "true") {
        var Email = values.Email;
        EmailMatch = {
            $regex: Email, $options: "i"
        }
    };
    if (values.Whether_PhoneNumber_Filter == true || values.Whether_PhoneNumber_Filter == "true") {
        var PhoneNumber = values.PhoneNumber;
        PhoneMatch = {
            $regex: PhoneNumber, $options: "i"
        }
    };
    if (values.Whether_Name_Filter == true || values.Whether_Name_Filter == "true") {
        var Name = values.Name;
        NameMatch = {
            $regex: Name, $options: "i"
        };
        if (values.Name_Query_Type != null) {
            if (parseInt(values.Name_Query_Type) == 1) {
                //Equal too 
                NameMatch = {
                    $regex: '^' + Name + '$',
                    $options: "i"
                }
            } else if (parseInt(values.Name_Query_Type) == 2) {
                //not equal too
                NameMatch = {
                    $regex: '^((?!' + Name + ').)*$',
                    $options: "i"
                }
            } else if (parseInt(values.Name_Query_Type) == 3) {
                //Start with
                NameMatch = {
                    $regex: '^' + Name,
                    $options: "i"
                }
            } else if (parseInt(values.Name_Query_Type) == 4) {
                //contain
                NameMatch = {
                    $regex: Name,
                    $options: "i"
                }
            }
            else if (parseInt(values.Name_Query_Type) == 5) {
                //does not contain
                NameMatch = {
                    $regex: '^((?!' + Name + ').)*$',
                    $options: "i"
                }
            } else if (parseInt(values.Name_Query_Type) == 6) {
                //end with
                NameMatch = {
                    $regex: Name + '$',
                    $options: "i"
                }
            }
        }
    }
    if (values.Whether_Ordered_Customers == true || values.Whether_Ordered_Customers == "true") {
        OrderCountMatch = {
            $gte: 1
        };
        if (parseInt(values.Whether_Ordered_Customers_Type) == 1) {
            OrderCountMatch = {
                $gte: 1
            };
        } else if (parseInt(values.Whether_Ordered_Customers_Type) == 2) {
            if (values.From_Ordered_Count != null && values.To_Ordered_Count != null) {
                OrderCountMatch = {
                    $gte: parseInt(values.From_Ordered_Count),
                    $lte: parseInt(values.To_Ordered_Count)
                };
            }
        }
    }
    var query = {
        customerName: NameMatch,
        customerPhone: PhoneMatch,
        customerEmail: EmailMatch,
        Date: DateMatch,
        OrdersCount: OrderCountMatch,
        Premium_Pricing_Set: Premium_Pricing_Set,
        Monthly_Invoice: Monthly_Invoice,
        Flat_Monthly_Price_Available: Flat_Monthly_Price_Available,
        Default_Pickup_Location_Exist: Default_Pickup_Location_Exist
    }
    console.log(query);
    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    }
    var countAggregate = [
        {
            "$match": {
                "acc_status": 1, "Verify": 0, "Premium_User": true, "Premium_Status": true
            }
        },
        {
            "$lookup": {
                from: "Orders",
                localField: "CustomerID",
                foreignField: "userId",
                as: "OrderData"
            }
        },
        {
            "$project": {
                "CustomerID": "$_id",
                "customerName": String("$First_name"),
                "customerPhone": String("$Phone"),
                "customerEmail": String("$Email"),
                "acc_status": "$acc_status",
                "customerseqId": "$customerseqId",
                "CurrentStatus": "$CurrentStatus",
                "terms_cond": "$terms_cond",
                "referral_code": String("$referral_code"),
                "CustomerImage": "$CustomerImage",
                "Whether_Guest": "$Whether_Guest",
                "Signup_Date": "$Created_dt",
                "Date": "$Signup_Date",
                "Devices": "$Devices",
                "AddressLog": "$AddressLog",
                "Premium_User": "$Premium_User",
                "Premium_User_Time": "$Premium_User_Time",
                "Premium_Status": "$Premium_Status",
                "CustomerKey": "$CustomerKey",
                "Premium_Pricing_Set": "$Premium_Pricing_Set",
                "Premium_Instant_Pricing": "$Premium_Instant_Pricing",
                "Premium_4hours_Pricing": "$Premium_4hours_Pricing",
                "Premium_Same_Day_Pricing": "$Premium_Same_Day_Pricing",
                "Monthly_Invoice": "$Monthly_Invoice",
                "Flat_Monthly_Price_Available": "$Flat_Monthly_Price_Available",
                "Flat_Monthly_Price": "$Flat_Monthly_Price",
                "Default_Pickup_Location_Exist": "$Default_Pickup_Location_Exist",
                "Default_Pickup_Address": "$Default_Pickup_Address",
                "Default_Pickup_Latitude": "$Default_Pickup_Latitude",
                "Default_Pickup_Longitude": "$Default_Pickup_Longitude",
                "OrderData": {
                    "$filter": {
                        "input": "$OrderData",
                        "as": "item",
                        "cond": {
                            "$and": [
                                {
                                    "$eq": ["$$item.Whether_Deleted", false]
                                },
                                {
                                    "$in": ["$$item.status", [1, 7, 16, 10, 11, 12, 15, 18, 14]]
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            "$addFields": {
                "OrdersCount": { $size: "$OrderData" }
            }
        },
        {
            "$match": query
        },
        {
            "$project": {
                "OrderData": 0,
                "Date": 0,
                "_id": 0
            }
        },
        {
            "$count": "Count"
        }
    ]

    var listingAggregate = [
        {
            "$match": {
                "acc_status": 1, "Verify": 0, "Premium_User": true, "Premium_Status": true
            }
        },
        {
            "$lookup": {
                from: "Orders",
                localField: "CustomerID",
                foreignField: "userId",
                as: "OrderData"
            }
        },
        {
            "$project": {
                "CustomerID": "$_id",
                "customerName": String("$First_name"),
                "customerPhone": String("$Phone"),
                "customerEmail": String("$Email"),
                "acc_status": "$acc_status",
                "customerseqId": "$customerseqId",
                "CurrentStatus": "$CurrentStatus",
                "terms_cond": "$terms_cond",
                "referral_code": String("$referral_code"),
                "CustomerImage": "$CustomerImage",
                "Whether_Guest": "$Whether_Guest",
                "Signup_Date": "$Created_dt",
                "Date": "$Signup_Date",
                "Devices": "$Devices",
                "AddressLog": "$AddressLog",
                "Premium_User": "$Premium_User",
                "Premium_User_Time": "$Premium_User_Time",
                "Premium_Status": "$Premium_Status",
                "CustomerKey": "$CustomerKey",
                "Premium_Pricing_Set": "$Premium_Pricing_Set",
                "Premium_Instant_Pricing": "$Premium_Instant_Pricing",
                "Premium_4hours_Pricing": "$Premium_4hours_Pricing",
                "Premium_Same_Day_Pricing": "$Premium_Same_Day_Pricing",
                "Monthly_Invoice": "$Monthly_Invoice",
                "Flat_Monthly_Price_Available": "$Flat_Monthly_Price_Available",
                "Flat_Monthly_Price": "$Flat_Monthly_Price",
                "Default_Pickup_Location_Exist": "$Default_Pickup_Location_Exist",
                "Default_Pickup_Address": "$Default_Pickup_Address",
                "Default_Pickup_Latitude": "$Default_Pickup_Latitude",
                "Default_Pickup_Longitude": "$Default_Pickup_Longitude",
                "OrderData": {
                    "$filter": {
                        "input": "$OrderData",
                        "as": "item",
                        "cond": {
                            "$and": [
                                {
                                    "$eq": ["$$item.Whether_Deleted", false]
                                },
                                {
                                    "$in": ["$$item.status", [1, 7, 16, 10, 11, 12, 15, 18, 14]]
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            "$addFields": {
                "OrdersCount": { $size: "$OrderData" }
            }
        },
        {
            "$match": query
        },
        {
            "$sort": sortOptions
        },
        {
            "$project": {
                "OrderData": 0,
                "Date": 0,
                "_id": 0
            }
        },
        {
            "$skip": toSkip
        },
        {
            "$limit": toLimit
        }
    ]
    console.log(JSON.stringify(listingAggregate));

    Customers.aggregate(countAggregate).exec(function (err, CountResult) {
        if (err) {
            callback(err);
        } else {
            var Count = 0;
            if (CountResult.length > 0) {
                Count = CountResult[0].Count
            }
            Customers.aggregate(listingAggregate).exec(function (err, ListResult) {
                if (err) {
                    callback(err);
                } else {
                    callback(new ApiResponce({
                        success: true,
                        extras: {
                            Count: Count,
                            CustomerData: ListResult
                        }
                    }));
                }
            })
        }
    })

}
exports.Find_All_Active_Customers_with_Filters = function (values, callback) {
    var toSkip = parseInt(values.skip);
    var toLimit = parseInt(values.limit);
    var sortOptions = {
        Signup_Date: -1
    };
    var NameMatch = {
        $regex: "", $options: "i"
    };
    var PhoneMatch = {
        $regex: "", $options: "i"
    };
    var EmailMatch = {
        $regex: "", $options: "i"
    };
    var DateMatch = {
        $ne: null
    };
    var OrderCountMatch = {
        $gte: 0
    };
    if (values.Whether_Non_Ordered_Customers == true || values.Whether_Non_Ordered_Customers == "true") {
        OrderCountMatch = {
            $eq: 0
        };
    }
    var from_moment;
    var to_moment;
    if (values.Whether_Date_Filter == true || values.Whether_Date_Filter == "true") {
        from_moment = moment(values.from_date, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
        to_moment = moment(values.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days').toDate();
        DateMatch = {
            $gte: from_moment,
            $lte: to_moment
        }
    }
    if (values.Whether_Email_Filter == true || values.Whether_Email_Filter == "true") {
        var Email = values.Email;
        EmailMatch = {
            $regex: Email, $options: "i"
        }
    };
    if (values.Whether_PhoneNumber_Filter == true || values.Whether_PhoneNumber_Filter == "true") {
        var PhoneNumber = values.PhoneNumber;
        PhoneMatch = {
            $regex: PhoneNumber, $options: "i"
        }
    };
    if (values.Whether_Name_Filter == true || values.Whether_Name_Filter == "true") {
        var Name = values.Name;
        NameMatch = {
            $regex: Name, $options: "i"
        };
        if (values.Name_Query_Type != null) {
            if (parseInt(values.Name_Query_Type) == 1) {
                //Equal too 
                NameMatch = {
                    $regex: '^' + Name + '$',
                    $options: "i"
                }
            } else if (parseInt(values.Name_Query_Type) == 2) {
                //not equal too
                NameMatch = {
                    $regex: '^((?!' + Name + ').)*$',
                    $options: "i"
                }
            } else if (parseInt(values.Name_Query_Type) == 3) {
                //Start with
                NameMatch = {
                    $regex: '^' + Name,
                    $options: "i"
                }
            } else if (parseInt(values.Name_Query_Type) == 4) {
                //contain
                NameMatch = {
                    $regex: Name,
                    $options: "i"
                }
            }
            else if (parseInt(values.Name_Query_Type) == 5) {
                //does not contain
                NameMatch = {
                    $regex: '^((?!' + Name + ').)*$',
                    $options: "i"
                }
            } else if (parseInt(values.Name_Query_Type) == 6) {
                //end with
                NameMatch = {
                    $regex: Name + '$',
                    $options: "i"
                }
            }
        }
    }
    if (values.Whether_Ordered_Customers == true || values.Whether_Ordered_Customers == "true") {
        OrderCountMatch = {
            $gte: 1
        };
        if (parseInt(values.Whether_Ordered_Customers_Type) == 1) {
            OrderCountMatch = {
                $gte: 1
            };
        } else if (parseInt(values.Whether_Ordered_Customers_Type) == 2) {
            if (values.From_Ordered_Count != null && values.To_Ordered_Count != null) {
                OrderCountMatch = {
                    $gte: parseInt(values.From_Ordered_Count),
                    $lte: parseInt(values.To_Ordered_Count)
                };
            }
        }
    }
    var query = {
        customerName: NameMatch,
        customerPhone: PhoneMatch,
        customerEmail: EmailMatch,
        Date: DateMatch,
        OrdersCount: OrderCountMatch
    }
    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    }
    var countAggregate = [
        { "$match": { "acc_status": 1, Verify: 0 } },
        {
            "$lookup": {
                from: "Orders",
                localField: "CustomerID",
                foreignField: "userId",
                as: "OrderData"
            }
        },
        {
            "$project": {
                "CustomerID": "$_id",
                "customerName": String("$First_name"),
                "customerPhone": String("$Phone"),
                "customerEmail": String("$Email"),
                "acc_status": "$acc_status",
                "customerseqId": "$customerseqId",
                "CurrentStatus": "$CurrentStatus",
                "terms_cond": "$terms_cond",
                "referral_code": String("$referral_code"),
                "CustomerImage": "$CustomerImage",
                "Whether_Guest": "$Whether_Guest",
                "Signup_Date": "$Created_dt",
                "Date": "$Signup_Date",
                "Devices": "$Devices",
                "AddressLog": "$AddressLog",
                "OrderData": {
                    "$filter": {
                        "input": "$OrderData",
                        "as": "item",
                        "cond": {
                            "$and": [
                                {
                                    "$eq": ["$$item.Whether_Deleted", false]
                                },
                                {
                                    "$in": ["$$item.status", [1, 7, 16, 10, 11, 12, 15, 18, 14]]
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            "$addFields": {
                "OrdersCount": { $size: "$OrderData" }
            }
        },
        {
            "$match": query
        },
        {
            "$project": {
                "OrderData": 0,
                "Date": 0,
                "_id": 0
            }
        },
        {
            "$count": "Count"
        }
    ]

    var listingAggregate = [
        { "$match": { "acc_status": 1, Verify: 0 } },
        {
            "$lookup": {
                from: "Orders",
                localField: "CustomerID",
                foreignField: "userId",
                as: "OrderData"
            }
        },
        {
            "$project": {
                "CustomerID": "$_id",
                "customerName": String("$First_name"),
                "customerPhone": String("$Phone"),
                "customerEmail": String("$Email"),
                "acc_status": "$acc_status",
                "customerseqId": "$customerseqId",
                "CurrentStatus": "$CurrentStatus",
                "terms_cond": "$terms_cond",
                "referral_code": String("$referral_code"),
                "CustomerImage": "$CustomerImage",
                "Whether_Guest": "$Whether_Guest",
                "Signup_Date": "$Created_dt",
                "Date": "$Signup_Date",
                "Devices": "$Devices",
                "AddressLog": "$AddressLog",
                "OrderData": {
                    "$filter": {
                        "input": "$OrderData",
                        "as": "item",
                        "cond": {
                            "$and": [
                                {
                                    "$eq": ["$$item.Whether_Deleted", false]
                                },
                                {
                                    "$in": ["$$item.status", [1, 7, 16, 10, 11, 12, 15, 18, 14]]
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            "$addFields": {
                "OrdersCount": { $size: "$OrderData" }
            }
        },
        {
            "$match": query
        },
        {
            "$sort": sortOptions
        },
        {
            "$project": {
                "OrderData": 0,
                "Date": 0,
                "_id": 0
            }
        },
        {
            "$skip": toSkip
        },
        {
            "$limit": toLimit
        }
    ]
    console.log(JSON.stringify(listingAggregate));

    Customers.aggregate(countAggregate).exec(function (err, CountResult) {
        if (err) {
            callback(err);
        } else {
            var Count = 0;
            if (CountResult.length > 0) {
                Count = CountResult[0].Count
            }
            Customers.aggregate(listingAggregate).exec(function (err, ListResult) {
                if (err) {
                    callback(err);
                } else {
                    callback(new ApiResponce({
                        success: true,
                        extras: {
                            Count: Count,
                            CustomerData: ListResult
                        }
                    }));
                }
            })
        }
    })

}
exports.Find_All_Active_Customers_Without_Filter = function (values, callback) {
    var toSkip = parseInt(values.skip);
    var toLimit = parseInt(values.limit);
    var sortOptions = {
        Signup_Date: -1
    };
    var query = {

    }
    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    }
    var countAggregate = [
        { "$match": { "acc_status": 1, Verify: 0 } },
        {
            "$lookup": {
                from: "Orders",
                localField: "CustomerID",
                foreignField: "userId",
                as: "OrderData"
            }
        },
        {
            "$project": {
                "CustomerID": "$_id",
                "customerName": String("$First_name"),
                "customerPhone": String("$Phone"),
                "customerEmail": String("$Email"),
                "acc_status": "$acc_status",
                "customerseqId": "$customerseqId",
                "CurrentStatus": "$CurrentStatus",
                "terms_cond": "$terms_cond",
                "referral_code": String("$referral_code"),
                "CustomerImage": "$CustomerImage",
                "Whether_Guest": "$Whether_Guest",
                "Signup_Date": "$Created_dt",
                "Date": "$Signup_Date",
                "Devices": "$Devices",
                "AddressLog": "$AddressLog",
                "OrderData": {
                    "$filter": {
                        "input": "$OrderData",
                        "as": "item",
                        "cond": {
                            "$and": [
                                {
                                    "$eq": ["$$item.Whether_Deleted", false]
                                },
                                {
                                    "$in": ["$$item.status", [1, 7, 16, 10, 11, 12, 15, 18, 14]]
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            "$addFields": {
                "OrdersCount": { $size: "$OrderData" }
            }
        },
        {
            "$project": {
                "OrderData": 0,
                "_id": 0
            }
        },
        {
            "$match": query
        },
        {
            "$count": "Count"
        }
    ]

    var listingAggregate = [
        { "$match": { "acc_status": 1, Verify: 0 } },
        {
            "$lookup": {
                from: "Orders",
                localField: "CustomerID",
                foreignField: "userId",
                as: "OrderData"
            }
        },
        {
            "$project": {
                "CustomerID": "$_id",
                "customerName": String("$First_name"),
                "customerPhone": String("$Phone"),
                "customerEmail": String("$Email"),
                "acc_status": "$acc_status",
                "customerseqId": "$customerseqId",
                "CurrentStatus": "$CurrentStatus",
                "terms_cond": "$terms_cond",
                "referral_code": String("$referral_code"),
                "CustomerImage": "$CustomerImage",
                "Whether_Guest": "$Whether_Guest",
                "Signup_Date": "$Created_dt",
                "Date": "$Signup_Date",
                "Devices": "$Devices",
                "AddressLog": "$AddressLog",
                "OrderData": {
                    "$filter": {
                        "input": "$OrderData",
                        "as": "item",
                        "cond": {
                            "$and": [
                                {
                                    "$eq": ["$$item.Whether_Deleted", false]
                                },
                                {
                                    "$in": ["$$item.status", [1, 7, 16, 10, 11, 12, 15, 18, 14]]
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            "$addFields": {
                "OrdersCount": { $size: "$OrderData" }
            }
        },
        {
            "$project": {
                "OrderData": 0,
                "_id": 0
            }
        },
        {
            "$match": query
        },
        {
            "$sort": sortOptions
        },
        {
            "$skip": toSkip
        },
        {
            "$limit": toLimit
        }
    ]
    console.log(JSON.stringify(listingAggregate));
    Customers.aggregate(countAggregate).exec(function (err, CountResult) {
        if (err) {
            callback(err);
        } else {
            var Count = 0;
            if (CountResult.length > 0) {
                Count = CountResult[0].Count
            }
            Customers.aggregate(listingAggregate).exec(function (err, ListResult) {
                if (err) {
                    callback(err);
                } else {
                    callback(new ApiResponce({
                        success: true,
                        extras: {
                            Count: Count,
                            CustomerData: ListResult
                        }
                    }));
                }
            })
        }
    })
}
exports.Find_All_Active_Premium_Customers_Without_Filter = function (values, callback) {
    var toSkip = parseInt(values.skip);
    var toLimit = parseInt(values.limit);
    var sortOptions = {
        Signup_Date: -1
    };
    var query = {

    }
    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    }
    var countAggregate = [
        {
            "$match": {
                "acc_status": 1, "Verify": 0, "Premium_User": true, "Premium_Status": true
            }
        },
        {
            "$lookup": {
                from: "Orders",
                localField: "CustomerID",
                foreignField: "userId",
                as: "OrderData"
            }
        },
        {
            "$project": {
                "CustomerID": "$_id",
                "customerName": String("$First_name"),
                "customerPhone": String("$Phone"),
                "customerEmail": String("$Email"),
                "acc_status": "$acc_status",
                "customerseqId": "$customerseqId",
                "CurrentStatus": "$CurrentStatus",
                "terms_cond": "$terms_cond",
                "referral_code": String("$referral_code"),
                "CustomerImage": "$CustomerImage",
                "Whether_Guest": "$Whether_Guest",
                "Signup_Date": "$Created_dt",
                "Date": "$Signup_Date",
                "Devices": "$Devices",
                "AddressLog": "$AddressLog",
                "Premium_User": "$Premium_User",
                "Premium_User_Time": "$Premium_User_Time",
                "Premium_Status": "$Premium_Status",
                "CustomerKey": "$CustomerKey",
                "Premium_Pricing_Set": "$Premium_Pricing_Set",
                "Premium_Instant_Pricing": "$Premium_Instant_Pricing",
                "Premium_4hours_Pricing": "$Premium_4hours_Pricing",
                "Premium_Same_Day_Pricing": "$Premium_Same_Day_Pricing",
                "Monthly_Invoice": "$Monthly_Invoice",
                "Flat_Monthly_Price_Available": "$Flat_Monthly_Price_Available",
                "Flat_Monthly_Price": "$Flat_Monthly_Price",
                "Default_Pickup_Location_Exist": "$Default_Pickup_Location_Exist",
                "Default_Pickup_Address": "$Default_Pickup_Address",
                "Default_Pickup_Latitude": "$Default_Pickup_Latitude",
                "Default_Pickup_Longitude": "$Default_Pickup_Longitude",
                "OrderData": {
                    "$filter": {
                        "input": "$OrderData",
                        "as": "item",
                        "cond": {
                            "$and": [
                                {
                                    "$eq": ["$$item.Whether_Deleted", false]
                                },
                                {
                                    "$in": ["$$item.status", [1, 7, 16, 10, 11, 12, 15, 18, 14]]
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            "$addFields": {
                "OrdersCount": { $size: "$OrderData" }
            }
        },
        {
            "$project": {
                "OrderData": 0,
                "_id": 0
            }
        },
        {
            "$match": query
        },
        {
            "$count": "Count"
        }
    ]

    var listingAggregate = [
        {
            "$match": {
                "acc_status": 1, "Verify": 0, "Premium_User": true, "Premium_Status": true
            }
        },
        {
            "$lookup": {
                from: "Orders",
                localField: "CustomerID",
                foreignField: "userId",
                as: "OrderData"
            }
        },
        {
            "$project": {
                "CustomerID": "$_id",
                "customerName": String("$First_name"),
                "customerPhone": String("$Phone"),
                "customerEmail": String("$Email"),
                "acc_status": "$acc_status",
                "customerseqId": "$customerseqId",
                "CurrentStatus": "$CurrentStatus",
                "terms_cond": "$terms_cond",
                "referral_code": String("$referral_code"),
                "CustomerImage": "$CustomerImage",
                "Whether_Guest": "$Whether_Guest",
                "Signup_Date": "$Created_dt",
                "Date": "$Signup_Date",
                "Devices": "$Devices",
                "AddressLog": "$AddressLog",
                "Premium_User": "$Premium_User",
                "Premium_User_Time": "$Premium_User_Time",
                "Premium_Status": "$Premium_Status",
                "CustomerKey": "$CustomerKey",
                "Premium_Pricing_Set": "$Premium_Pricing_Set",
                "Premium_Instant_Pricing": "$Premium_Instant_Pricing",
                "Premium_4hours_Pricing": "$Premium_4hours_Pricing",
                "Premium_Same_Day_Pricing": "$Premium_Same_Day_Pricing",
                "Monthly_Invoice": "$Monthly_Invoice",
                "Flat_Monthly_Price_Available": "$Flat_Monthly_Price_Available",
                "Flat_Monthly_Price": "$Flat_Monthly_Price",
                "Default_Pickup_Location_Exist": "$Default_Pickup_Location_Exist",
                "Default_Pickup_Address": "$Default_Pickup_Address",
                "Default_Pickup_Latitude": "$Default_Pickup_Latitude",
                "Default_Pickup_Longitude": "$Default_Pickup_Longitude",
                "OrderData": {
                    "$filter": {
                        "input": "$OrderData",
                        "as": "item",
                        "cond": {
                            "$and": [
                                {
                                    "$eq": ["$$item.Whether_Deleted", false]
                                },
                                {
                                    "$in": ["$$item.status", [1, 7, 16, 10, 11, 12, 15, 18, 14]]
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            "$addFields": {
                "OrdersCount": { $size: "$OrderData" }
            }
        },
        {
            "$project": {
                "OrderData": 0,
                "_id": 0
            }
        },
        {
            "$match": query
        },
        {
            "$sort": sortOptions
        },
        {
            "$skip": toSkip
        },
        {
            "$limit": toLimit
        }
    ]
    console.log(JSON.stringify(listingAggregate));
    Customers.aggregate(countAggregate).exec(function (err, CountResult) {
        if (err) {
            callback(err);
        } else {
            var Count = 0;
            if (CountResult.length > 0) {
                Count = CountResult[0].Count
            }
            Customers.aggregate(listingAggregate).exec(function (err, ListResult) {
                if (err) {
                    callback(err);
                } else {
                    callback(new ApiResponce({
                        success: true,
                        extras: {
                            Count: Count,
                            CustomerData: ListResult
                        }
                    }));
                }
            })
        }
    })
}
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
exports.Search_All_Api_of_Documentation = function (values, CategoryData, callback) {
    var SearchValue = String(values.SearchValue);
    var query = {
        CategoryID: CategoryData.CategoryID,
        Status: true,
        $or: [
            {
                "API_Name": {
                    $regex: SearchValue,
                    $options: "i"
                }
            },
            {
                "API_Description": {
                    $regex: SearchValue,
                    $options: "i"
                }
            },
            {
                "CategoryName": {
                    $regex: SearchValue,
                    $options: "i"
                }
            },
            {
                "Api_Method": {
                    $regex: SearchValue,
                    $options: "i"
                }
            },
            {
                "Api_URL": {
                    $regex: SearchValue,
                    $options: "i"
                }
            },
            {
                "Api_Path": {
                    $regex: SearchValue,
                    $options: "i"
                }
            },
            {
                "Api_Parameters.Param": {
                    $regex: SearchValue,
                    $options: "i"
                }
            },
            {
                "Api_Parameters.Description": {
                    $regex: SearchValue,
                    $options: "i"
                }
            },
            {
                "Api_Request_Body.Content_Type": {
                    $regex: SearchValue,
                    $options: "i"
                }
            },
            {
                "Api_Request_Body.Request_Description": {
                    $regex: SearchValue,
                    $options: "i"
                }
            },
            {
                "Success_Response.Description": {
                    $regex: SearchValue,
                    $options: "i"
                }
            },
            {
                "Error_Response.Description": {
                    $regex: SearchValue,
                    $options: "i"
                }
            }
        ]
    }

    var sortOptions = {
        created_at: -1
    }
    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    }
    function Api_List_Function(callback) {
        process.nextTick(function () {
            API_DOCUMENT.find(query).sort(sortOptions).select('-_id API_ID API_Name API_Description CategoryID CategoryName Api_Method Api_URL Api_Path').exec(function (err, Result) {
                callback(null, Result);
            })
        })
    }
    sync(function () {
        var Result = Api_List_Function.sync(null);
        callback(false, new ApiResponce({
            success: true,
            extras: {
                DocumentationBody: Result
            }
        }));
    })
}
exports.List_Api_Error_Response_Page = function (ApiData, callback) {
    var Error_Message_Status_Body = [];
    async.eachSeries(ApiData.Error_Response.Error_Message_Status_Body, function (item, resp) {
        Error_Message_Status_Body.push({
            ListID: item._id,
            msg: item.msg,
            Status: item.Status
        });
        resp();
    }, function (err) {
        callback(false, new ApiResponce({
            success: true,
            extras: {
                Error_Response: ApiData.Error_Response.Response,
                Error_Description: ApiData.Error_Response.Description,
                Error_Message_Status_Body: Error_Message_Status_Body
            }
        }));
    })
};
exports.List_Api_Success_Response_Page = function (ApiData, callback) {
    callback(false, new ApiResponce({
        success: true,
        extras: {
            Success_Response: ApiData.Success_Response.Response,
            Success_Description: ApiData.Success_Response.Description
        }
    }));
};
exports.List_Api_Sample_Request_Page = function (ApiData, callback) {
    callback(false, new ApiResponce({
        success: true,
        extras: {
            Request_JSON: ApiData.Api_Request_Body.Request_JSON,
            Content_Type: ApiData.Api_Request_Body.Content_Type,
            Request_Description: ApiData.Api_Request_Body.Request_Description
        }
    }));
};
exports.List_Api_Parameters_Page = function (ApiData, callback) {
    var Api_Parameters = [];
    async.eachSeries(ApiData.Api_Parameters, function (item, resp) {
        Api_Parameters.push({
            ListID: item._id,
            Param: item.Param,
            Datatype: item.Datatype,
            Description: item.Description
        });
        resp();
    }, function (err) {
        callback(false, new ApiResponce({
            success: true,
            extras: {
                Api_Parameters: Api_Parameters
            }
        }));
    })
};
exports.List_All_Api_of_Documentation = function (values, CategoryData, callback) {
    var query = {
        CategoryID: CategoryData.CategoryID,
        Status: true
    }
    var toSkip = parseInt(values.skip);
    var toLimit = parseInt(values.limit);
    var sortOptions = {
        created_at: -1
    }
    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    }
    function Api_List_Count(callback) {
        process.nextTick(function () {
            API_DOCUMENT.count(query).exec(function (err, Count) {
                callback(null, Count);
            })
        })
    }
    function Api_List_Function(callback) {
        process.nextTick(function () {
            API_DOCUMENT.find(query).sort(sortOptions).select('-_id API_ID API_Name API_Description CategoryID CategoryName Api_Method Api_URL Api_Path').skip(toSkip).limit(toLimit).exec(function (err, Result) {
                callback(null, Result);
            })
        })
    }
    sync(function () {
        var Count = Api_List_Count.sync(null);
        var Result = Api_List_Function.sync(null);
        callback(false, new ApiResponce({
            success: true,
            extras: {
                Count: Count,
                DocumentationBody: Result
            }
        }));
    })
}

exports.Store_Api_in_Documentation = function (values, CategoryData, callback) {
    var date = new Date();
    var API_ID = uuid();
    var API_Name = values.API_Name;
    var API_Description = values.API_Description;
    var CategoryID = CategoryData.CategoryID;
    var CategoryName = CategoryData.CategoryName;
    var Api_Method = AdminMod.Format_Beautify_String(values.Api_Method);
    var Api_URL = values.Api_URL;
    var Api_Path = values.Api_Path;
    var Api_Parameters = values.Api_Parameters;
    var Api_Request_Body = {
        Request_JSON: values.Request_JSON,
        Content_Type: values.Content_Type,
        Request_Description: values.Request_Description
    };
    var Success_Response = {
        Response: values.Success_Response,
        Description: values.Success_Description
    };
    var Error_Response = {
        Response: values.Error_Response,
        Description: values.Error_Description,
        Error_Message_Status_Body: values.Error_Message_Status_Body
    };
    var DocumentBody = new API_DOCUMENT({
        API_ID: API_ID,
        API_Name: API_Name,
        API_Description: API_Description,
        CategoryID: CategoryID,
        CategoryName: CategoryName,
        Api_Method: Api_Method,
        Api_URL: Api_URL,
        Api_Path: Api_Path,
        Api_Parameters: Api_Parameters,
        Api_Request_Body: Api_Request_Body,
        Success_Response: Success_Response,
        Error_Response: Error_Response,
        created_at: date,
        updated_at: date
    });
    DocumentBody.save(function (err, Result) {
        if (err) {
            console.log(err);
            return callback(true, new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.DATABASE_ERROR
                }
            }));
        } else {
            callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: "Api Created in Documentation"
                }
            }));
        }
    });
}

exports.List_All_Api_Category = function (callback) {
    var query = {
        Status: true
    }
    API_CATEGORY.find(query).select({ _id: 0, CategoryID: 1, CategoryName: 1 }).sort({ CategoryName: 1 }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    CategoryData: Result
                }
            }));
        }
    })
}
exports.Store_Api_Category = function (CategoryName, callback) {
    var CategoryID = uuid();
    var date = new Date();
    console.log(CategoryName);
    var CategoryData = new API_CATEGORY({
        CategoryID: CategoryID,
        CategoryName: CategoryName,
        created_at: date,
        updated_at: date
    });
    CategoryData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(false, Result);
        }
    })
}
exports.Create_Api_Category = function (CategoryName, callback) {
    var CategoryID = uuid();
    var date = new Date();
    console.log(CategoryName);
    var CategoryData = new API_CATEGORY({
        CategoryID: CategoryID,
        CategoryName: CategoryName,
        created_at: date,
        updated_at: date
    });
    CategoryData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Category Created Successfully"
                }
            }));
        }
    })
}
exports.Activate_Api_Category = function (values, callback) {
    var query = {
        CategoryID: values.CategoryID
    };
    var date = new Date();
    var changes = {
        Status: true,
        updated_at: date
    }
    API_CATEGORY.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Category Activated Successfully"
                }
            }));
        }
    })
}
exports.Inactivate_Api_Category = function (values, callback) {
    var query = {
        CategoryID: values.CategoryID
    };
    var date = new Date();
    var changes = {
        Status: false,
        updated_at: date
    }
    API_CATEGORY.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Category Inactivated Successfully"
                }
            }));
        }
    })
}

exports.Edit_Api_Category_Name = function (values, CategoryName, callback) {
    var query = {
        CategoryID: values.CategoryID
    };
    var date = new Date();
    var changes = {
        CategoryName: CategoryName,
        updated_at: date
    }
    API_CATEGORY.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Category Name updated Successfully"
                }
            }));
        }
    })
}
exports.Check_for_Api = function (values, callback) {
    var query = {
        API_ID: values.API_ID
    };
    API_DOCUMENT.findOne(query).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                callback(false, Result);
            } else if (Result == null) {
                return callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.API_NOT_FOUND
                    }
                }));
            }
        }
    })
}

exports.Check_for_Api_Category = function (values, callback) {
    var query = {
        CategoryID: values.CategoryID
    };
    API_CATEGORY.findOne(query).exec(function (err, Result) {
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
exports.Check_Whether_Api_Category_Name_Already_Exist2 = function (values, CategoryName, callback) {
    var query = {
        CategoryID: { $ne: values.CategoryID },
        CategoryName: CategoryName
    };
    API_CATEGORY.findOne(query).exec(function (err, Result) {
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
exports.Category_Name_Status = function (CategoryName, callback) {
    var query = {
        CategoryName: CategoryName
    };
    API_CATEGORY.findOne(query).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result == null) {
                callback(true);
            } else if (Result != null) {
                callback(false, Result);
            }
        }
    })
}
exports.Check_Whether_Api_Category_Name_Already_Exist = function (CategoryName, callback) {
    var query = {
        CategoryName: CategoryName
    };
    API_CATEGORY.findOne(query).exec(function (err, Result) {
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

exports.Update_First_Time_Offer_Expiry = function (values, callback) {
    var query = {

    };
    var ExpiryDate = moment(values.ExpiryDate, 'DD/MM/YYYY').subtract(330, "minutes").add(1439, "minutes");
    var changes = {
        ExpiryDate: ExpiryDate
    };
    var multiplicity = {
        multi: true
    };
    First_Time_Order_Settings.update(query, changes, multiplicity, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "First Time Offer Expiry Date Edited Successfully"
                }
            }));
        }
    })
}

exports.Update_First_Time_Offer_Discount = function (values, callback) {
    var query = {

    };
    var changes = {
        DiscountPercentage: parseInt(values.DiscountPercentage)
    }
    var multiplicity = {
        multi: true
    };
    First_Time_Order_Settings.update(query, changes, multiplicity, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "First Time Offer Discount Percentage Edited Successfully"
                }
            }));
        }
    })
};
exports.Find_First_Time_Offer_Settings = function (callback) {
    First_Time_Order_Settings.findOne({}, { _id: 0, DiscountPercentage: 1, ExpiryDate: 1 }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            var date = moment(Result["ExpiryDate"]).utcOffset(330).format('MMM DD,YYYY H:mm:ss');
            callback(new ApiResponce({
                success: true,
                extras: {
                    OfferData: {
                        DiscountPercentage: Result.DiscountPercentage,
                        ExpiryDate: date
                    }
                }
            }));
        }
    })
};

exports.Active_Customer_Analytics = function (callback) {
    function CustomerDataFunction(callback) {
        process.nextTick(function () {
            Customers.find({ acc_status: 1, Verify: 0 }).exec(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(null, Result);
                }
            })
        })
    }
    function CustomersOrderedCount(CustomerData, callback) {
        process.nextTick(function () {
            Orders.count({ userId: CustomerData._id, Whether_Deleted: false, status: { $in: [1, 7, 16, 10, 11, 12, 15, 18, 14] } }).exec(function (err, Count) {
                callback(null, Count);
            })
        })
    }
    sync(function () {
        var Result = CustomerDataFunction.sync(null);
        var Total_Customers = Result.length;
        console.log(Total_Customers);
        var Ordered_Customers = 0;
        var Non_Ordered_Customers = 0;
        async.each(Result, function (item, resp) {
            var Count = CustomersOrderedCount.sync(null, item);
            console.log(Count);
            if (Count >= 1) {
                Ordered_Customers++;
                resp();
            } else {
                Non_Ordered_Customers++;
                resp();
            }
        }, function (err) {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Total_Customers: Total_Customers,
                    Ordered_Customers: Ordered_Customers,
                    Non_Ordered_Customers: Non_Ordered_Customers
                }
            }));
        })
    })
}

exports.Edit_Service_Charge = function (values, callback) {
    var query = {

    };
    var changes = {
        Service_Charge: parseFloat(values.Service_Charge)
    };
    var multiplicity = {
        multi: true
    };
    Razorpay_Service_Charge.update(query, changes, multiplicity, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Razorpay Service Charge Edited Successfully"
                }
            }));
        }
    });
}
exports.Find_Service_Charge = function (callback) {
    Razorpay_Service_Charge.findOne({}, { _id: 0, Service_Charge: 1 }, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                callback(new ApiResponce({
                    success: true,
                    extras: {
                        ServiceChargeData: Result
                    }
                }));
            } else if (Result == null) {
                callback(new ApiResponce({
                    success: true,
                    extras: {
                        ServiceChargeData: {
                            Service_Charge: 0
                        }
                    }
                }));
            }
        }
    })
}
exports.Create_Service_Charge = function (callback) {
    var ServiceChargeData = new Razorpay_Service_Charge({

    })
    ServiceChargeData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback("Created Successfully");
        }
    })
}





