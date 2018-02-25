module.exports = function (express, app, socket) {

    var app = app;
    var router = app;
    const requestIp = require('request-ip');
    app.use(requestIp.mw());
    var Config = require('../Config/config.js'); //Setting the Config Path
    var Socket;
    var io = socket;
    io.on('connection', function (socket) {
        Socket = socket;
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                Setting All the PATH's                                          //
    ////////////////////////////////////////////////////////////////////////////////////////////////////


    /*--------------------------------------Begin the Path's---------------------------------------------*/
    var Config = require('../Config/config.js'); //Setting the Config Path
    var config = require('../Config/config.js'); //Setting the Config Path
    var customermod = require('../CoreModules/customermod.js'); // Setting the Path for Customer Modules
    var HrMod = require('../CoreModules/hrmod.js'); // Setting the Path for Customer Modules
    var mailgunmod = require('../CoreModules/mailgunmod.js'); // Setting the Path for Mailgun Modules
    var MailgunMod = new mailgunmod();
    var CustomerMod = new customermod();
    var ApiResponce = require("../Models/Apiresponce.js");
    var ApiMessages = require("../Models/Apimessages.js");
    var cookie = require('cookie');
    var msg91mod = require('../CoreModules/msg91mod.js'); // Setting the Path for Message91 Modules
    var MSG91MOD = new msg91mod();
    var StoreMod = require('../CoreModules/storemod.js'); // Setting the Path for Customer Modules
    var FinancialAnalyticsMod = require('../CoreModules/finacialanalyticsmod.js'); // Setting the Path for Customer Modulesvar StoreMod = require('../CoreModules/storemod.js'); // Setting the Path for Customer Modules
    var MailMessageMod = require('../CoreModules/mailmessagemod.js'); // Setting the Path for Customer Modulesvar StoreMod = require('../CoreModules/storemod.js'); // Setting the Path for Customer Modules
    var ExcelMod = require('../CoreModules/excelmod.js'); // Setting the Path for Customer Modules
    var SMSSettingsMod = require('../CoreModules/sms_settings.js'); // Setting the Path for Customer Modules
    var Customers = require('../Models/Customers.js');
    var CategoryType = require("../Models/CategoryType.js");
    var Business = require("../Models/Business.js");
    var Business_Branches = require("../Models/Business_Branches.js");
    var admin_users = require("../Models/admin_users.js");
    var Admin_Logs = require("../Models/Admin_Logs.js");
    var operators = require("../Models/operators.js");
    var Driver_Salaries_Logs = require('../Models/Driver_Salaries_Logs.js');
    var Customers = require('../Models/Customers.js');
    var Orders = require('../Models/Orders.js');
    var Drivers = require('../Models/Drivers.js');
    var Customer_Invoicing = require('../Models/Customer_Invoicing.js');
    var Customer_CODReport = require('../Models/Customer_CODReport.js');
    var async = require('async');
    var validator = require('validator');
    var moment = require('moment');
    var Driver_Expenses = require("../Models/Driver_Expenses.js");
    var ZONES = require('../Models/ZONES.js');
    var can_reason = require('../Models/can_reason.js');
    var Counters = require('../Models/Counters.js');
    var Ezshipp_Branch = require("../Models/Ezshipp_Branch.js");
    var Ezshipp_Employee = require("../Models/Ezshipp_Employee.js");
    var razorpay = require('../CoreModules/razorpay');
    var Ezshipp_Employee_Expenses = require("../Models/Ezshipp_Employee_Expenses.js");
    var Ezshipp_Employee_Paid_Salaries = require("../Models/Ezshipp_Employee_Paid_Salaries.js");
    var App_Delivery_Message_Time_Settings = require("../Models/App_Delivery_Message_Time_Settings.js");
    var Store_Categories = require("../Models/Store_Categories.js");
    var Store_Products_Addons = require("../Models/Store_Products_Addons.js");
    var Store_SubCategory_level3 = require("../Models/Store_SubCategory_level3.js");
    var Store_SubCategory_level2 = require("../Models/Store_SubCategory_level2.js");
    var Ezshipp_Employee_Attendance = require("../Models/Ezshipp_Employee_Attendance.js");
    var Zone_Areas = require('../Models/Zone_Areas.js');
    var Zone_Order_Logs = require('../Models/Zone_Order_Logs.js');
    var moment = require('moment');
    var uuid = require('uuid');
    var ZoneMod = require('../CoreModules/zonemod.js');
    var AdminMod = require('../CoreModules/adminmod.js');
    var Customer_Order_Queue_Directions = require("../Models/Customer_Order_Queue_Directions.js");
    var Customer_Order_Sheet_Records = require("../Models/Customer_Order_Sheet_Records.js");

    var Super_Admin_Dashboard_Logs = require('../Models/Super_Admin_Dashboard_Logs.js');
    var Campaign_Information = require('../Models/Campaign_Information.js');
    var validator = require('validator');
    var Customer_New_Order_Directional = require("../Models/Customer_New_Order_Directional.js");
    var Customer_New_Order_Directions_Data = require("../Models/Customer_New_Order_Directions_Data.js");
    var Promotional_Contacts = require("../Models/Promotional_Contacts.js");
    var Customer_Order_Records = require('../Models/Customer_Order_Records.js');

    /*--------------------------------------End of Path's------------------------------------------------*/

    router.post('/Enable_or_Disable_Exceeded_Weight', function (req, res) {
        if (req.body.AdminID != null && req.body.Enable_Exceeding_Weight != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Enable_or_Disable_Exceeded_Weight(req.body, function (Result) {
                        res.send(Result);
                        var date = new Date();
                        var AdminID = SuperAdminData._id;
                        var AdminName = SuperAdminData.name;
                        var Whether_God = SuperAdminData.Whether_God;
                        var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                        var Message = AdminName + ' have changed the Exceeded Amount Setting to ' + req.body.Enable_Exceeding_Weight + ' on ' + DateTime
                        var Purpose = 'Exceeded Weight Setting'
                        var Key = 'Exceeded Weight Setting';
                        var LogData = new Super_Admin_Dashboard_Logs({
                            AdminID: AdminID,
                            AdminName: AdminName,
                            Message: Message,
                            Purpose: Purpose,
                            Key: Key,
                            Whether_God: Whether_God,
                            created_at: date
                        });
                        LogData.save();
                    })
                }
            });
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    router.post('/Update_Exceeded_Weight_Price', function (req, res) {
        if (req.body.AdminID != null && req.body.Price != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Update_Exceeded_Weight_Price(req.body, function (Result) {
                        res.send(Result);
                        var date = new Date();
                        var AdminID = SuperAdminData._id;
                        var AdminName = SuperAdminData.name;
                        var Whether_God = SuperAdminData.Whether_God;
                        var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                        var Message = AdminName + ' have changed the Exceeded Wieght Price to ' + req.body.Price + ' on ' + DateTime
                        var Purpose = 'Exceeded Wieght Price Change'
                        var Key = 'Exceeded Wieght Price';
                        var LogData = new Super_Admin_Dashboard_Logs({
                            AdminID: AdminID,
                            AdminName: AdminName,
                            Message: Message,
                            Purpose: Purpose,
                            Key: Key,
                            Whether_God: Whether_God,
                            created_at: date
                        });
                        LogData.save();
                    })
                }
            });
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    })

    router.post('/Find_Execeded_Price', function (req, res) {
        if (req.body.AdminID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Find_Exceeded_Weight_Price(function (Result) {
                        res.send(Result);
                    })
                }
            });
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    })
    router.post('/Create_Exceeded_Weight_Price', function (req, res) {
        AdminMod.Create_Exceeded_Weight_Price(function (Result) {
            res.send(Result);
        })
    })
    router.post('/TO_Date_Test', function (req, res) {
        var from_date = moment().subtract(1, 'month').startOf("month")
        var to_date = moment().subtract(1, 'month').endOf("month")
        console.log(from_date);
        console.log(to_date);
        res.send({
            from_date: from_date,
            to_date: to_date
        })
    });
  app.post('/notify_user_or_driver', function (req, res) {
            CustomerMod.notify_user_or_driver(req.body, function (err, SuperAdminData) {                
                    res.send(JSON.stringify(SuperAdminData));
            })
       
    })
    app.post('/Address_Lat_long', function (req, res) {
        if (req.body.Address != null) {
            CustomerMod.Address_Lat_Long_Function(req.body.Address, function (err, Result) {
                if (!err) {
                    res.send(new ApiResponce({
                        success: true,
                        extras: {
                            Data: Result
                        }
                    }));
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
    });

    /*****************
     *
     *
     * Campaign  SMS for promo
     *
     */


    app.post('/List_Available_Campaign_Type_with_Count', function (req, res) {
        if (req.body.AdminID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.List_Available_Campaign_Type_with_Count(function (Result) {
                        res.send(Result);
                    })
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
    });

    app.post('/Refresh_SMS_Campaign', function (req, res) {
        if (req.body.AdminID != null && req.body.CampaignID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_For_SMS_Campaign(req.body, function (err, CampaignData) {
                        if (err) {
                            res.send(JSON.stringify(CampaignData));
                        } else {
                            AdminMod.Refresh_SMS_Campaign(CampaignData, function (Result) {
                                console.log(Result);
                                res.send(JSON.stringify(Result));
                            })
                        }
                    })
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
    });

    app.post('/Refresh_SMS_Campaign_Receipients', function (req, res) {
        if (req.body.AdminID != null && req.body.ReferenceID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_For_SMS_Campaign_Receipients(req.body, function (err, ReceipientData) {
                        if (err) {
                            res.send(JSON.stringify(ReceipientData));
                        } else {
                            AdminMod.Get_SMS_Recipent_Status(ReceipientData, function (Result) {
                                res.send(JSON.stringify(Result));
                            })
                        }
                    })
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

    app.post('/Search_All_Campaign_Receipients', function (req, res) {
        if (req.body.AdminID != null && req.body.SearchValue != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_For_SMS_Campaign(req.body, function (err, CampaignData) {
                        if (err) {
                            res.send(JSON.stringify(CampaignData));
                        } else {
                            AdminMod.Search_All_Campaign_Receipients(req.body, CampaignData, function (Result) {
                                res.send(JSON.stringify(Result));
                            })
                        }
                    })
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
    app.post('/List_All_Campaign_Receipients', function (req, res) {
        if (req.body.AdminID != null && req.body.skip != null && req.body.limit != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_For_SMS_Campaign(req.body, function (err, CampaignData) {
                        if (err) {
                            res.send(JSON.stringify(CampaignData));
                        } else {
                            AdminMod.List_All_Campaign_Receipients(req.body, CampaignData, function (Result) {
                                res.send(JSON.stringify(Result));
                            })
                        }
                    })
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
    app.post('/Search_All_SMS_Campaigns', function (req, res) {
        if (req.body.AdminID != null && req.body.SearchValue != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Search_All_SMS_Campaigns(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });

    app.post('/List_All_SMS_Campaigns', function (req, res) {
        if (req.body.AdminID != null && req.body.skip != null && req.body.limit != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.List_All_SMS_Campaigns(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    app.post('/Create_Campaign_and_Send_SMS', function (req, res) {
        if (req.body.AdminID != null && req.body.CampaignName != null && req.body.CampaignName != ""
            && req.body.CampaignType != null && req.body.CampaignMessage != null && req.body.CampaignMessage != "") {
            var CampaignType = parseInt(req.body.CampaignType);
            if (CampaignType == 1 || CampaignType == 2 || CampaignType == 3) {
                var CamapignDet = "";
                if (CampaignType == 1) {
                    CamapignDet = "Non Ordered Customers"
                } else if (CampaignType == 2) {
                    CamapignDet = "Ordered Customers"
                } else if (CampaignType == 3) {
                    CamapignDet = "All Customers"
                }
                CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                    if (err) {
                        res.send(JSON.stringify(SuperAdminData));
                    } else {
                        AdminMod.Create_Campaign_and_Send_SMS(req.body, function (err, Result) {
                            if (!err) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have created Campaign ->' + req.body.CampaignName + '  and Sent SMS to ' + CamapignDet + ' having Message( ' + req.body.CampaignMessage + ' ) on' + DateTime
                                var Purpose = 'SMS CAMPAIGN'
                                var Key = 'SMS';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            }
                        })
                    }
                })
            } else {
                res.send(new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.INVALID_CAMPAIGN_TYPE
                    }
                }));
            }
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    /*****************
    *
    *
    * End of Promo SMS
    *
    */

    app.post('/Script_For_Storing_CustomerID', function (req, res) {
        AdminMod.Script_For_Storing_CustomerID(function (Result) {
            res.send(Result);
        })
    })
    app.post('/Search_Active_Customers', function (req, res) {
        if (req.body.AdminID != null && req.body.SearchValue != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Search_Active_Customers(req.body, function (Result) {
                        res.send(Result);
                    })
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
    });
    app.post('/Find_All_Active_Premium_Customers_with_Filters', function (req, res) {
        if (req.body.AdminID != null && req.body.skip != null && req.body.limit != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_Name_Filter_Validation(req.body, function (err, ValidityStatus) {
                        if (err) {
                            res.send(JSON.stringify(ValidityStatus));
                        } else {
                            AdminMod.Check_PhoneNumber_Filter_Validation(req.body, function (err, ValidityStatus) {
                                if (err) {
                                    res.send(JSON.stringify(ValidityStatus));
                                } else {
                                    AdminMod.Check_Email_Filter_Validation(req.body, function (err, ValidityStatus) {
                                        if (err) {
                                            res.send(JSON.stringify(ValidityStatus));
                                        } else {
                                            AdminMod.Check_Ordered_Non_Ordered_Validation(req.body, function (err, ValidityStatus) {
                                                if (err) {
                                                    res.send(JSON.stringify(ValidityStatus));
                                                } else {
                                                    AdminMod.Check_Customers_Date_Validation(req.body, function (err, ValidityStatus) {
                                                        if (err) {
                                                            res.send(JSON.stringify(ValidityStatus));
                                                        } else {
                                                            AdminMod.Check_for_Premium_Options_Validation(req.body, function (err, ValidityStatus) {
                                                                if (err) {
                                                                    res.send(JSON.stringify(ValidityStatus));
                                                                } else {
                                                                    AdminMod.Find_All_Active_Premium_Customers_with_Filters(req.body, function (Result) {
                                                                        res.send(JSON.stringify(Result));
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
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    app.post('/Find_All_Active_Customers_with_Filters', function (req, res) {
        if (req.body.AdminID != null && req.body.skip != null && req.body.limit != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_Name_Filter_Validation(req.body, function (err, ValidityStatus) {
                        if (err) {
                            res.send(JSON.stringify(ValidityStatus));
                        } else {
                            AdminMod.Check_PhoneNumber_Filter_Validation(req.body, function (err, ValidityStatus) {
                                if (err) {
                                    res.send(JSON.stringify(ValidityStatus));
                                } else {
                                    AdminMod.Check_Email_Filter_Validation(req.body, function (err, ValidityStatus) {
                                        if (err) {
                                            res.send(JSON.stringify(ValidityStatus));
                                        } else {
                                            AdminMod.Check_Ordered_Non_Ordered_Validation(req.body, function (err, ValidityStatus) {
                                                if (err) {
                                                    res.send(JSON.stringify(ValidityStatus));
                                                } else {
                                                    AdminMod.Check_Customers_Date_Validation(req.body, function (err, ValidityStatus) {
                                                        if (err) {
                                                            res.send(JSON.stringify(ValidityStatus));
                                                        } else {
                                                            AdminMod.Find_All_Active_Customers_with_Filters(req.body, function (Result) {
                                                                res.send(JSON.stringify(Result));
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
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Search_Active_Premium_Customers', function (req, res) {
        if (req.body.AdminID != null && req.body.SearchValue != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Search_Active_Premium_Customers(req.body, function (Result) {
                        res.send(Result);
                    })
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
    });
    app.post('/Find_All_Active_Premium_Customers_Without_Filter', function (req, res) {
        if (req.body.AdminID != null && req.body.skip != null && req.body.limit != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Find_All_Active_Premium_Customers_Without_Filter(req.body, function (Result) {
                        res.send(Result);
                    })
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

    app.post('/Find_All_Active_Customers_Without_Filter', function (req, res) {
        if (req.body.AdminID != null && req.body.skip != null && req.body.limit != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Find_All_Active_Customers_Without_Filter(req.body, function (Result) {
                        res.send(Result);
                    })
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

    /****************
     *
     * api template creation
     */
    app.post('/Remove_Error_Message', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.ListID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Remove_Error_Message(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have removed Error Message of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/Edit_Error_Message', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.ListID != null && req.body.msg != null && req.body.Status != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Edit_Error_Message(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Edited Error Message ' + req.body.msg + ' of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/Add_Error_Message', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.msg != null && req.body.Status != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Add_Error_Message(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Added Error Message ' + req.body.msg + ' of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });

    app.post('/Remove_Api_Parameter', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.ListID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Remove_Api_Parameter(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have removed Parameter of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/Edit_Api_Parameter', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.ListID != null && req.body.Param != null && req.body.Datatype != null && req.body.Description != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Edit_Api_Parameter(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Edited Parameter ' + req.body.Param + ' of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/Add_Api_Parameter', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.Param != null && req.body.Datatype != null && req.body.Description != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Add_Api_Parameter(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Added Parameter ' + req.body.Param + ' of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/Edit_Api_Error_Response_Documentation', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.Error_Response != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Edit_Api_Error_Response_Documentation(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Edited Error Response of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/Edit_Api_Error_Description_Documentation', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.Error_Description != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Edit_Api_Error_Description_Documentation(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Edited Error Description of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/Edit_Api_Success_Description_Documentation', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.Success_Description != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Edit_Api_Success_Description_Documentation(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Edited Success Description of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/Edit_Api_Success_Response_Documentation', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.Success_Response != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Edit_Api_Success_Response_Documentation(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Edited Success Response of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/Edit_Api_Sample_Request_JSON_Documentation', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.Request_JSON != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Edit_Api_Sample_Request_JSON_Documentation(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Edited Sample Request JSON of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/Edit_Api_Sample_Request_Description_Documentation', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.Request_Description != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Edit_Api_Sample_Request_Description_Documentation(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Edited Sample Request Description of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/Edit_Api_Sample_Request_Content_Type_Documentation', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.Content_Type != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Edit_Api_Sample_Request_Content_Type_Documentation(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Edited Sample Request Content Type of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/Edit_Api_Description_Documentation', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.API_Description != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Edit_Api_Description_Documentation(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Edited Description of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/Edit_Api_URL_Documentation', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.Api_URL != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Edit_Api_URL_Documentation(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Edited URL of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/Edit_Api_Path_Documentation', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.Api_Path != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Edit_Api_Path_Documentation(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Edited Path of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/Edit_Api_Method_Documentation', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.Api_Method != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Edit_Api_Method_Documentation(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Edited Method of Api ->' + ApiData.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });

    app.post('/Edit_Api_Name_Documentation', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null && req.body.API_Name != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.Edit_Api_Name_Documentation(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Edited Api Name->' + req.body.API_Name + ' in the Documentation on ' + DateTime
                                var Purpose = 'API Documentation'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    app.post('/List_Api_Error_Response_Page', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.List_Api_Error_Response_Page(ApiData, function (err, Result) {
                                if (!err) {
                                    res.send(JSON.stringify(Result));
                                }
                            })
                        }
                    })
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
    });
    app.post('/List_Api_Success_Response_Page', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.List_Api_Success_Response_Page(ApiData, function (err, Result) {
                                if (!err) {
                                    res.send(JSON.stringify(Result));
                                }
                            })
                        }
                    })
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
    });
    app.post('/List_Api_Sample_Request_Page', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.List_Api_Sample_Request_Page(ApiData, function (err, Result) {
                                if (!err) {
                                    res.send(JSON.stringify(Result));
                                }
                            })
                        }
                    })
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
    });
    app.post('/List_Api_Parameters_Page', function (req, res) {
        if (req.body.AdminID != null && req.body.API_ID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api(req.body, function (err, ApiData) {
                        if (err) {
                            res.send(JSON.stringify(ApiData));
                        } else {
                            AdminMod.List_Api_Parameters_Page(ApiData, function (err, Result) {
                                if (!err) {
                                    res.send(JSON.stringify(Result));
                                }
                            })
                        }
                    })
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
    app.post('/Search_All_Api_of_Documentation', function (req, res) {
        if (req.body.AdminID != null && req.body.CategoryID != null && req.body.SearchValue != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api_Category(req.body, function (err, CategoryData) {
                        if (err) {
                            res.send(JSON.stringify(CategoryData));
                        } else {
                            AdminMod.Search_All_Api_of_Documentation(req.body, CategoryData, function (err, Result) {
                                if (!err) {
                                    res.send(Result);

                                }
                            })
                        }
                    })
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
    });
    app.post('/List_All_Api_of_Documentation', function (req, res) {
        if (req.body.AdminID != null && req.body.CategoryID != null && req.body.skip != null && req.body.limit != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api_Category(req.body, function (err, CategoryData) {
                        if (err) {
                            res.send(JSON.stringify(CategoryData));
                        } else {
                            AdminMod.List_All_Api_of_Documentation(req.body, CategoryData, function (err, Result) {
                                if (!err) {
                                    res.send(Result);
                                }
                            })
                        }
                    })
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
    });
    app.post('/Store_Api_in_Documentation', function (req, res) {
        console.log(req.body);
        if (req.body.AdminID != null && req.body.CategoryName != null && req.body.CategoryName != "" && req.body.API_Name != null
            && req.body.API_Description != null && req.body.Api_Method != null && req.body.Api_URL != null
            && req.body.Api_Path != null && req.body.Api_Parameters != null
            && req.body.Request_JSON != null && req.body.Content_Type != null && req.body.Request_Description != null
            && req.body.Success_Response != null && req.body.Success_Description != null
            && req.body.Error_Response != null && req.body.Error_Description != null && req.body.Error_Message_Status_Body != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    var CategoryName = AdminMod.Format_Beautify_String(req.body.CategoryName);
                    AdminMod.Category_Name_Status(CategoryName, function (err, CategoryData) {
                        if (err) {
                            console.log("Category Name not exist");
                            AdminMod.Store_Api_Category(CategoryName, function (err, CategoryData) {
                                if (!err) {
                                    Store_Api(SuperAdminData, CategoryData);
                                }
                            })
                        } else {
                            console.log("Category Name exist");
                            Store_Api(SuperAdminData, CategoryData);
                        }
                    })
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
        function Store_Api(SuperAdminData, CategoryData) {

            AdminMod.Store_Api_in_Documentation(req.body, CategoryData, function (err, Result) {
                if (err) {
                    res.send(JSON.stringify(Result));
                } else {
                    res.send(JSON.stringify(Result));
                    var date = new Date();
                    var AdminID = SuperAdminData._id;
                    var AdminName = SuperAdminData.name;
                    var Whether_God = SuperAdminData.Whether_God;
                    var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                    var Message = AdminName + ' have add Api ->' + req.body.API_Name + ' in the Documentation on ' + DateTime
                    var Purpose = 'API Documentation'
                    var Key = 'API';
                    var LogData = new Super_Admin_Dashboard_Logs({
                        AdminID: AdminID,
                        AdminName: AdminName,
                        Message: Message,
                        Purpose: Purpose,
                        Key: Key,
                        Whether_God: Whether_God,
                        created_at: date
                    });
                    LogData.save();
                }
            })

        }
    })

    app.post('/Activate_Api_Category', function (req, res) {
        if (req.body.AdminID != null && req.body.CategoryID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api_Category(req.body, function (err, CategoryData) {
                        if (err) {
                            res.send(JSON.stringify(CategoryData));
                        } else {
                            AdminMod.Activate_Api_Category(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Activated Api Category->' + CategoryData.CategoryName + ' on ' + DateTime
                                var Purpose = 'API CATEGORY'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })

                        }
                    })
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
    });
    app.post('/Inactivate_Api_Category', function (req, res) {
        if (req.body.AdminID != null && req.body.CategoryID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api_Category(req.body, function (err, CategoryData) {
                        if (err) {
                            res.send(JSON.stringify(CategoryData));
                        } else {
                            AdminMod.Inactivate_Api_Category(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Inactivated Api Category->' + CategoryData.CategoryName + ' on ' + DateTime
                                var Purpose = 'API CATEGORY'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })

                        }
                    })
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
    });
    app.post('/Edit_Api_Category_Name', function (req, res) {
        if (req.body.AdminID != null && req.body.CategoryID != null && req.body.CategoryName != null && req.body.CategoryName != "") {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Api_Category(req.body, function (err, CategoryData) {
                        if (err) {
                            res.send(JSON.stringify(CategoryData));
                        } else {
                            var CategoryName = AdminMod.Format_Beautify_String(req.body.CategoryName);
                            AdminMod.Check_Whether_Api_Category_Name_Already_Exist2(req.body, CategoryName, function (err, CategoryStatus) {
                                if (err) {
                                    res.send(JSON.stringify(CategoryStatus));
                                } else {
                                    AdminMod.Edit_Api_Category_Name(req.body, CategoryName, function (Result) {
                                        res.send(JSON.stringify(Result));
                                        var date = new Date();
                                        var AdminID = SuperAdminData._id;
                                        var AdminName = SuperAdminData.name;
                                        var Whether_God = SuperAdminData.Whether_God;
                                        var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                        var Message = AdminName + ' have Edited Api Category->' + CategoryName + ' on ' + DateTime
                                        var Purpose = 'API CATEGORY'
                                        var Key = 'API';
                                        var LogData = new Super_Admin_Dashboard_Logs({
                                            AdminID: AdminID,
                                            AdminName: AdminName,
                                            Message: Message,
                                            Purpose: Purpose,
                                            Key: Key,
                                            Whether_God: Whether_God,
                                            created_at: date
                                        });
                                        LogData.save();
                                    })
                                }
                            })
                        }
                    })
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
    });

    app.post('/List_All_Api_Categories', function (req, res) {
        if (req.body.AdminID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.List_All_Api_Category(function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    app.post('/Create_Api_Category', function (req, res) {
        if (req.body.AdminID != null && req.body.CategoryName != null && req.body.CategoryName != "") {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    var CategoryName = AdminMod.Format_Beautify_String(req.body.CategoryName);
                    console.log(CategoryName);
                    AdminMod.Check_Whether_Api_Category_Name_Already_Exist(CategoryName, function (err, CategoryStatus) {
                        if (err) {
                            res.send(JSON.stringify(CategoryStatus));
                        } else {
                            AdminMod.Create_Api_Category(CategoryName, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have created Api Category->' + CategoryName + ' on ' + DateTime
                                var Purpose = 'API CATEGORY'
                                var Key = 'API';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    app.post('/Search_All_Business_Apis_Customer_Request', function (req, res) {
        if (req.body.AdminID != null && req.body.SearchValue != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Search_All_Business_Apis_Customer_Request(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    app.post('/Find_All_Business_Apis_Customer_Request', function (req, res) {
        if (req.body.AdminID != null && req.body.skip != null && req.body.limit != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Find_All_Business_Apis_Customer_Request(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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


    /****************
        *
        *    end of api template creation
        ********
        */




    /********
     *
     *  First Time Offer Setup
     *
     */
    app.post('/Update_First_Time_Offer_Expiry', function (req, res) {
        if (req.body.AdminID != null && req.body.ExpiryDate != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Update_First_Time_Offer_Expiry(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                        var date = new Date();
                        var AdminID = SuperAdminData._id;
                        var AdminName = SuperAdminData.name;
                        var Whether_God = SuperAdminData.Whether_God;
                        var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                        var Message = AdminName + ' have Change First Time Offer Expiry Date to ' + req.body.ExpiryDate + ' on ' + DateTime
                        var Purpose = 'First Time Offer Expiry Date'
                        var Key = 'First Time Offer';
                        var LogData = new Super_Admin_Dashboard_Logs({
                            AdminID: AdminID,
                            AdminName: AdminName,
                            Message: Message,
                            Purpose: Purpose,
                            Key: Key,
                            Whether_God: Whether_God,
                            created_at: date
                        });
                        LogData.save();
                    })
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
    });
    app.post('/Update_First_Time_Offer_Discount', function (req, res) {
        if (req.body.AdminID != null && req.body.DiscountPercentage != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Update_First_Time_Offer_Discount(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                        var date = new Date();
                        var AdminID = SuperAdminData._id;
                        var AdminName = SuperAdminData.name;
                        var Whether_God = SuperAdminData.Whether_God;
                        var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                        var Message = AdminName + ' have Change First Time Offer Discount Percentage to ' + req.body.DiscountPercentage + '% on ' + DateTime
                        var Purpose = 'First Time Offer Discount Percentage'
                        var Key = 'First Time Offer';
                        var LogData = new Super_Admin_Dashboard_Logs({
                            AdminID: AdminID,
                            AdminName: AdminName,
                            Message: Message,
                            Purpose: Purpose,
                            Key: Key,
                            Whether_God: Whether_God,
                            created_at: date
                        });
                        LogData.save();
                    })
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
    });
    app.post('/Find_First_Time_Offer_Settings', function (req, res) {
        if (req.body.AdminID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Find_First_Time_Offer_Settings(function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    /**************
     *
     End of First Time
     */

    /***********
     *
        Service Charge Setup
     */
    app.post('/Edit_Service_Charge', function (req, res) {
        if (req.body.AdminID != null && req.body.Service_Charge != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Edit_Service_Charge(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                        var date = new Date();
                        var AdminID = SuperAdminData._id;
                        var AdminName = SuperAdminData.name;
                        var Whether_God = SuperAdminData.Whether_God;
                        var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                        var Message = AdminName + ' have Change Razorpay Service Charge to ' + req.body.Service_Charge + '% on ' + DateTime
                        var Purpose = 'Razorpay Service Charge'
                        var Key = 'Razorpay';
                        var LogData = new Super_Admin_Dashboard_Logs({
                            AdminID: AdminID,
                            AdminName: AdminName,
                            Message: Message,
                            Purpose: Purpose,
                            Key: Key,
                            Whether_God: Whether_God,
                            created_at: date
                        });
                        LogData.save();
                    })
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
    });
    app.post('/Razorpay_Service_Charge', function (req, res) {
        if (req.body.AdminID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Find_Service_Charge(function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    app.post('/Create_Service_Charge', function (req, res) {
        AdminMod.Create_Service_Charge(function (Result) {
            res.send(Result);
        })
    })

    /***********
    *
       End of Service Charge Setup
    */

    /*******************
     *
     *
     * SMS PROVIDERS
     *
     */
    app.post('/SMS_Testing', function (req, res) {
        SMSSettingsMod.SMS_Testing2(function (Result) {
            res.send(Result);
        })
    });

    app.post('/Change_Service_Provider', function (req, res) {
        if (req.body.ProviderID != null) {
            SMSSettingsMod.Check_for_ProviderID(req.body, function (err, ProviderData) {
                if (err) {
                    res.send(JSON.stringify(err));
                } else {
                    SMSSettingsMod.Change_Service_Provider(req.body, function (Result) {
                        res.send(Result);
                    })
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
    });
    app.post('/Change_Provider_Name', function (req, res) {
        if (req.body.ProviderID != null && req.body.ProviderName != null) {
            SMSSettingsMod.Check_for_ProviderID(req.body, function (err, ProviderData) {
                if (err) {
                    res.send(JSON.stringify(err));
                } else {
                    SMSSettingsMod.Change_Provider_Name(req.body, function (Result) {
                        res.send(Result);
                    })
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
    });
    app.post('/Listing_All_SMS_Providers', function (req, res) {
        SMSSettingsMod.List_All_SMS_Provider_with_Credit_Balance(function (Result) {
            res.send(JSON.stringify(Result));
        })
    });

    app.post('/Create_SMS_Provider', function (req, res) {
        if (req.body.AdminID != null && req.body.ProviderName != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    SMSSettingsMod.Create_SMS_Provider(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });


    /**************
     * *
     *
     * End of SMS PROVIDERS
     */

    app.post('/Script_for_Title_Case_Customer_Orders', function (req, res) {
        StoreMod.Update_Customer_Title_Case(function (CustomerResult) {
            StoreMod.Update_Order_Title_Case(function (OrderResult) {
                res.send("All Names Updated Successfully");
            })
        })
    });

    app.post('/createexcel', function (req, res) {
        ExcelMod.Newupload(req, res);
    });

    app.post('/Script_For_Exist_Order_Directional_Route', function (req, res) {
        ExcelMod.Script_For_Production_Direction_Route(function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    });


    app.post('/Manual_Route_Customer_New_Ongoing_Orders_Sequence_Direction', function (req, res) {
        console.log("Manual Route New Ongoing Order Sequence Direction body");
        console.log(req.body);
        if (req.body.AdminID != null && req.body.SequenceID != null && req.body.Direction_Number != null && req.body.DriverID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    console.log(1);
                    ExcelMod.Check_for_Order_Directional_Sequence(req.body, function (err, SequenceData) {
                        if (err) {
                            res.send(JSON.stringify(SequenceData));
                        } else {
                            console.log(2);
                            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                                if (err) {
                                    res.send(JSON.stringify(DriverData));
                                } else {
                                    console.log(3);
                                    var query = {
                                        SequenceID: req.body.SequenceID,
                                        Direction_No: parseInt(req.body.Direction_Number)
                                    };
                                    Customer_New_Order_Directions_Data.findOne(query).exec(function (err, DirectionData) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log(4);
                                            if (DirectionData != null) {
                                                console.log(5);
                                                if (DirectionData.Processing_State == 1) {
                                                    console.log(6);
                                                    var OrderData = DirectionData.RecordOrderArray;
                                                    res.send(new ApiResponce({
                                                        success: true,
                                                        extras: {
                                                            Status: "Direction New Ongoing Orders Manual Routing is Processing"
                                                        }
                                                    }))
                                                    console.log(7);
                                                    ExcelMod.Manual_Route_Customer_New_Ongoing_Orders_Sequence_Direction(req.body, OrderData, DriverData, function (err, RoutingStatus) {
                                                        if (!err) {
                                                            console.log(8);
                                                            console.log(RoutingStatus);
                                                            Customer_New_Order_Directions_Data.update({
                                                                DirectionID: DirectionData.DirectionID
                                                            }, {
                                                                    Processing_State: 2,
                                                                    DriverID: DriverData._id,
                                                                    DriverName: String(DriverData.name) + ' ' + String(DriverData.lname),
                                                                    DriverPhone: DriverData.phone
                                                                }, function (err, UpdateStatus) {
                                                                    console.log(UpdateStatus);
                                                                    console.log("Queue Direction Orders Placed and Driver Details Updated");
                                                                    ExcelMod.Update_Order_Directional(OrderData, function (err, OrderStatus) {
                                                                        if (!err) {
                                                                            console.log(OrderStatus);
                                                                            var date = new Date();
                                                                            var AdminID = SuperAdminData._id;
                                                                            var AdminName = SuperAdminData.name;
                                                                            var Whether_God = SuperAdminData.Whether_God;
                                                                            var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                                                            var Message = AdminName + ' have routed New and Ongoing Orders Directions for Customer:->' + SequenceData.First_name + ' having Sequence Code:->' + SequenceData.Sequence_Code + ', Direction Number->' + DirectionData.Direction_Number + + ' to Driver->' + String(DriverData.name) + ' ' + String(DriverData.lname) + ' on ' + DateTime
                                                                            var Purpose = 'New Orders and Ongoing Orders having Direction Sequence->' + SequenceData.Sequence_Code
                                                                            var Key = 'Orders Directions';
                                                                            var LogData = new Super_Admin_Dashboard_Logs({
                                                                                AdminID: AdminID,
                                                                                AdminName: AdminName,
                                                                                Message: Message,
                                                                                Purpose: Purpose,
                                                                                Key: Key,
                                                                                Whether_God: Whether_God,
                                                                                created_at: date
                                                                            });
                                                                            LogData.save();
                                                                        }
                                                                    })
                                                                })
                                                        }
                                                    })
                                                } else {
                                                    res.send(new ApiResponce({
                                                        success: false,
                                                        extras: {
                                                            msg: ApiMessages.SEQUENCE_DIRECTION_ORDER_ALREADY_DRIVER_ASSIGNED
                                                        }
                                                    }));
                                                }
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
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
    });
    app.post('/JSON_SPLICE_TESTING', function (req, res) {
        var myJSON = [
            {
                "name": "uday1"
            },
            {
                "name": "uday2"
            }, {
                "name": "uday3"
            }, {
                "name": "uday4"
            }, {
                "name": "uday5"
            }, {
                "name": "uday6"
            }, {
                "name": "uday7"
            }, {
                "name": "uday8"
            }, {
                "name": "uday9"
            }, {
                "name": "uday10"
            }
        ];
        console.log(myJSON);
        for (var i = 0; i < 10; i++) {
            myJSON.splice(0, 1);
            console.log(myJSON);
        };
        res.send('JSON Testing Completed');
    });

    app.post('/Get_All_Order_Sequence_Directions', function (req, res) {
        if (req.body.SequenceID != null) {
            ExcelMod.Check_for_Order_Directional_Sequence(req.body, function (err, SequenceData) {
                if (err) {
                    res.send(JSON.stringify(SequenceData));
                } else {
                    Customer_New_Order_Directions_Data.find({ SequenceID: req.body.SequenceID }).sort('Direction_No').exec(function (err, Result) {
                        if (!err) {
                            console.log(Result);
                            var DirectionData = [];
                            async.eachSeries(Result, function (item, callback) {
                                var date = moment(item.created_at).utcOffset(330).format('MMM-DD,YYYY h:mm A');
                                DirectionData.push({
                                    DirectionID: item.DirectionID,
                                    Direction_No: item.Direction_No,
                                    Processing_State: item.Processing_State,
                                    DriverID: item.DriverID,
                                    DriverName: item.DriverName,
                                    DriverPhone: item.DriverPhone,
                                    No_Of_Records: item.RecordOrderArray.length,
                                    date: date
                                });
                                callback();
                            }, function (err) {
                                if (!err) {
                                    console.log(DirectionData);
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            DirectionData: DirectionData
                                        }
                                    }));
                                }
                            })
                        }
                    })
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

    app.post('/NEW_ONGOING_Sequence_All_Orders', function (req, res) {
        if (req.body.SequenceID != null) {
            ExcelMod.Check_for_Order_Directional_Sequence(req.body, function (err, SequenceData) {
                if (err) {
                    res.send(JSON.stringify(SequenceData));
                } else {
                    var OrderData = [];
                    console.log("Entering");
                    console.log(SequenceData.NewOrderArray);
                    async.eachSeries(SequenceData.NewOrderArray, function (item, callback) {
                        OrderData.push({
                            orderId: item._id,
                            itemName: item.itemName,
                            pickAddress: item.pickAddress,
                            dropAddress: item.dropAddress,
                            pickLatitude: item.pickLocation.Latitude,
                            pickLongitude: item.pickLocation.Longitude,
                            dropLatitude: item.dropLocation.Latitude,
                            dropLongitude: item.dropLocation.Longitude,
                            receiverName: item.receiverName,
                            receiverPhone: item.receiverPhone
                        })
                        callback();
                    }, function (err) {
                        if (!err) {
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    OrderData: OrderData
                                }
                            }))
                        }
                    })
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
    app.post('/Find_New_Ongoing_Order_Direction_Number_Data', function (req, res) {
        console.log("Find Sequence Direction Data");
        console.log(req.body);
        if (req.body.SequenceID != null && req.body.Direction_Number != null) {
            ExcelMod.Check_for_Order_Directional_Sequence(req.body, function (err, SequenceData) {
                if (err) {
                    res.send(JSON.stringify(SequenceData));
                } else {
                    if (parseInt(req.body.Direction_Number) <= SequenceData.No_Of_Directions) {
                        var query = {
                            SequenceID: req.body.SequenceID,
                            Direction_No: parseInt(req.body.Direction_Number)
                        };
                        Customer_New_Order_Directions_Data.findOne(query).exec(function (err, DirectionData) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(DirectionData);
                                if (DirectionData != null) {
                                    var OrderData = [];
                                    async.eachSeries(DirectionData.RecordOrderArray, function (item, callback) {
                                        OrderData.push({
                                            orderId: item._id,
                                            orderseqId: item.orderseqId,
                                            itemName: item.itemName,
                                            pickAddress: item.pickAddress,
                                            dropAddress: item.dropAddress,
                                            pickLatitude: item.pickLocation.Latitude,
                                            pickLongitude: item.pickLocation.Longitude,
                                            dropLatitude: item.dropLocation.Latitude,
                                            dropLongitude: item.dropLocation.Longitude,
                                            receiverName: item.receiverName,
                                            receiverPhone: item.receiverPhone
                                        })
                                        callback();
                                    }, function (err) {
                                        if (!err) {
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    DirectionData: {
                                                        DirectionID: DirectionData.DirectionID,
                                                        Direction_No: DirectionData.Direction_No,
                                                        Processing_State: DirectionData.Processing_State,
                                                        DriverID: DirectionData.DriverID,
                                                        DriverName: DirectionData.DriverName,
                                                        DriverPhone: DirectionData.DriverPhone,
                                                        OrderData: OrderData
                                                    }
                                                }
                                            }))
                                        }
                                    })
                                }
                            }
                        })
                    } else {
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.SEQUENCE_DIRECTION_NOT_FOUND
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

    app.post('/New_Orders_Directions_Sequence_Listing', function (req, res) {
        console.log("All Queue Listing Req body");
        console.log(req.body);
        if (req.body.skip != null && req.body.limit != null) {
            ExcelMod.New_Orders_Directions_Sequence_Listing(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    app.post('/GENERATE_CUSTOMERS_NEW_ORDERS_DIRECTION', function (req, res) {
        if (req.body.AdminID != null && req.body.Phone != null && req.body.pickAddress != null && req.body.Whether_New_Orders != null && req.body.Whether_Ongoing_Orders != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    CustomerMod.Check_Whether_PhoneNumber_Exist(req.body, function (err, CustomerData) {
                        if (err) {
                            res.send(JSON.stringify(CustomerData));
                        } else {
                            CustomerMod.Address_Lat_Long_Function(req.body.pickAddress, function (err, PickInformation) {
                                if (PickInformation.latlong == false) {
                                    res.send(new ApiResponce({
                                        success: false,
                                        extras: {
                                            msg: ApiMessages.Pick_Address_Not_Found
                                        }
                                    }));
                                } else {
                                    var pickAddress = req.body.pickAddress;
                                    var pickLatitude = PickInformation.latitude;
                                    var pickLongitude = PickInformation.longitude;
                                    var PickupDataAddress = {
                                        pickAddress: pickAddress,
                                        pickLatitude: pickLatitude,
                                        pickLongitude: pickLongitude
                                    };
                                    var statusArray;
                                    if (req.body.Whether_New_Orders == true && req.body.Whether_Ongoing_Orders == true) {
                                        statusArray = [1, 7, 8, 10, 11, 12, 15, 16, 18, 20];
                                    } else if (req.body.Whether_New_Orders == true && req.body.Whether_Ongoing_Orders == false) {
                                        statusArray = [1];
                                    } else if (req.body.Whether_New_Orders == false && req.body.Whether_Ongoing_Orders == true) {
                                        statusArray = [7, 8, 10, 11, 12, 15, 16, 18, 20];
                                    }
                                    ZONES.findOne({
                                        'polygons': {
                                            $geoIntersects: {
                                                $geometry: {
                                                    type: "Point",
                                                    coordinates: [pickLongitude, pickLatitude]
                                                }
                                            }
                                        }
                                    }, function (err, pickupzoneObj) {
                                        if (pickupzoneObj != null) {
                                            Orders.find({ userId: String(CustomerData._id), Whether_Directional_Sequence: { $in: [false, null] }, status: { $in: statusArray } }).exec(function (err, OrderData) {
                                                if (!err) {
                                                    if (OrderData.length >= 1) {
                                                        res.send(new ApiResponce({
                                                            success: true,
                                                            extras: {
                                                                Status: "New Orders and Ongoing Orders Directions are Processing"
                                                            }
                                                        }));
                                                        ExcelMod.GENERATE_CUSTOMERS_NEW_ORDERS_DIRECTION(req.body, CustomerData, OrderData, PickupDataAddress, function (err, Result, SequenceData) {
                                                            if (!err) {
                                                                console.log(Result);
                                                                // ExcelMod.Update_Order_Directional(OrderData, function (err, OrderStatus) {
                                                                //     if (!err) {
                                                                // console.log(OrderStatus);
                                                                var date = new Date();
                                                                var AdminID = SuperAdminData._id;
                                                                var AdminName = SuperAdminData.name;
                                                                var Whether_God = SuperAdminData.Whether_God;
                                                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                                                var Message = AdminName + ' have generated New and Ongoing Orders Directions for Customer:->' + CustomerData.First_name + ' having Sequence Code:->' + SequenceData.Sequence_Code + ' on ' + DateTime
                                                                var Purpose = 'New Orders and Ongoing Orders Direction ->' + CustomerData.First_name;
                                                                var Key = 'Orders Directions';
                                                                var LogData = new Super_Admin_Dashboard_Logs({
                                                                    AdminID: AdminID,
                                                                    AdminName: AdminName,
                                                                    Message: Message,
                                                                    Purpose: Purpose,
                                                                    Key: Key,
                                                                    Whether_God: Whether_God,
                                                                    created_at: date
                                                                });
                                                                LogData.save();
                                                                //     }
                                                                // })
                                                            }
                                                        })
                                                    } else {
                                                        res.send(new ApiResponce({
                                                            success: false,
                                                            extras: {
                                                                msg: ApiMessages.No_New_Orders
                                                            }
                                                        }));
                                                    }
                                                }
                                            })
                                        } else {
                                            res.send(new ApiResponce({
                                                success: false,
                                                extras: {
                                                    msg: ApiMessages.PICKUP_ZONE_NOT_IN_RANGE
                                                }
                                            }));
                                        }
                                    });
                                }
                            });
                        }
                    })
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
    });
    app.post('/Get_All_Queue_Directions', function (req, res) {
        console.log("Get All Queue Directions Body");
        console.log(req.body);
        if (req.body.QueueID != null) {
            ExcelMod.Check_for_Order_QueueID(req.body, function (err, QueueData) {
                if (err) {
                    res.send(JSON.stringify(QueueData));
                } else {
                    Customer_Order_Queue_Directions.find({ QueueID: req.body.QueueID }).sort('Direction_No').exec(function (err, Result) {
                        if (!err) {
                            console.log(Result);
                            var DirectionData = [];
                            async.eachSeries(Result, function (item, callback) {
                                var date = moment(item.created_at).utcOffset(330).format('MMM-DD,YYYY h:mm A');
                                DirectionData.push({
                                    DirectionID: item.DirectionID,
                                    Direction_No: item.Direction_No,
                                    Processing_State: item.Processing_State,
                                    DriverID: item.DriverID,
                                    DriverName: item.DriverName,
                                    DriverPhone: item.DriverPhone,
                                    No_Of_Records: item.RecordOrderArray.length,
                                    date: date
                                });
                                callback();
                            }, function (err) {
                                if (!err) {
                                    console.log(DirectionData);
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            DirectionData: DirectionData
                                        }
                                    }));
                                }
                            })
                        }
                    })
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
    });

    app.post('/Queue_Direction_Order_Place', function (req, res) {
        console.log("Queue Place Order Body");
        console.log(req.body);
        if (req.body.AdminID != null && req.body.QueueID != null && req.body.Direction_Number != null && req.body.DriverID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    ExcelMod.Check_for_Order_QueueID(req.body, function (err, QueueData) {
                        if (err) {
                            res.send(JSON.stringify(QueueData));
                        } else {
                            if (parseInt(req.body.Direction_Number) <= QueueData.No_Of_Directions) {
                                var forDirection = parseInt(req.body.Direction_Number) - 1;
                                CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                                    if (err) {
                                        res.send(JSON.stringify(DriverData));
                                    } else {
                                        Customer_Order_Queue_Directions.findOne({ QueueID: req.body.QueueID, Direction_No: parseInt(req.body.Direction_Number) }).exec(function (err, DirectionData) {
                                            if (DirectionData != null) {
                                                if (DirectionData.Processing_State == 1) {
                                                    var RecordOrderData = DirectionData.RecordOrderArray;
                                                    res.send(new ApiResponce({
                                                        success: true,
                                                        extras: {
                                                            Status: "Direction Orders are Processing and Order will Place Soon"
                                                        }
                                                    }))
                                                    ExcelMod.Place_Order_Direction_Record(req.body, RecordOrderData, DriverData, function (err, Result) {
                                                        if (!err) {
                                                            console.log(Result);
                                                            Customer_Order_Queue_Directions.update({
                                                                DirectionID: DirectionData.DirectionID
                                                            }, {
                                                                    Processing_State: 2,
                                                                    DriverID: DriverData._id,
                                                                    DriverName: String(DriverData.name) + ' ' + String(DriverData.lname),
                                                                    DriverPhone: DriverData.phone
                                                                }, function (err, Result) {
                                                                    console.log("Queue Direction Orders Placed and Driver Details Updated");
                                                                    var date = new Date();
                                                                    var AdminID = SuperAdminData._id;
                                                                    var AdminName = SuperAdminData.name;
                                                                    var Whether_God = SuperAdminData.Whether_God;
                                                                    var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                                                    var Message = AdminName + ' have placed Sheet Record Orders of Customer:->' + QueueData.CustomerName + ' having OrderSheetNumber:->' + QueueData.OrderSheetNumber + ', Direction Number->' + DirectionData.Direction_Number + + ' to Driver->' + String(DriverData.name) + ' ' + String(DriverData.lname) + ' on ' + DateTime
                                                                    var Purpose = 'Queue Sheet Records having OrderSheetNumber->' + QueueData.OrderSheetNumber
                                                                    var Key = 'Queue Sheet Records';
                                                                    var LogData = new Super_Admin_Dashboard_Logs({
                                                                        AdminID: AdminID,
                                                                        AdminName: AdminName,
                                                                        Message: Message,
                                                                        Purpose: Purpose,
                                                                        Key: Key,
                                                                        Whether_God: Whether_God,
                                                                        created_at: date
                                                                    });
                                                                    LogData.save();
                                                                })
                                                        }
                                                    })
                                                } else {
                                                    res.send(new ApiResponce({
                                                        success: false,
                                                        extras: {
                                                            msg: ApiMessages.Queue_Direction_Orders_Already_Placced
                                                        }
                                                    }));
                                                }
                                            }
                                        })
                                    }
                                })
                            } else {
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.Queue_Direction_DOESNOT_EXIST
                                    }
                                }));
                            }
                        }
                    })
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

    app.post('/Find_Direction_Order', function (req, res) {
        console.log("Direction Order Req body");
        console.log(req.body);
        if (req.body.QueueID != null && req.body.Direction_Number != null) {
            console.log(1);
            ExcelMod.Check_for_Order_QueueID(req.body, function (err, QueueData) {
                if (err) {
                    console.log(2);
                    res.send(JSON.stringify(QueueData));
                } else {
                    console.log(3);
                    if (parseInt(req.body.Direction_Number) <= QueueData.No_Of_Directions) {
                        console.log(4);
                        var RecordData = [];
                        console.log(5);
                        Customer_Order_Queue_Directions.findOne({ QueueID: req.body.QueueID, Direction_No: parseInt(req.body.Direction_Number) }).exec(function (err, DirectionData) {
                            console.log(DirectionData);
                            if (DirectionData != null) {
                                console.log(6);
                                async.eachSeries(DirectionData.RecordOrderArray, function (item, callback) {
                                    RecordData.push({
                                        RecordID: item.RecordID,
                                        itemName: item.itemName,
                                        pickAddress: item.pickAddress,
                                        dropAddress: item.dropAddress,
                                        pickLatitude: item.pickLatitude,
                                        pickLongitude: item.pickLongitude,
                                        dropLatitude: item.dropLatitude,
                                        dropLongitude: item.dropLongitude,
                                        receiverName: item.receiverName,
                                        receiverPhone: item.receiverPhone
                                    })
                                    callback();
                                }, function (err) {
                                    if (!err) {
                                        res.send(new ApiResponce({
                                            success: true,
                                            extras: {
                                                DirectionData: {
                                                    DirectionID: DirectionData.DirectionID,
                                                    Direction_No: DirectionData.Direction_No,
                                                    Processing_State: DirectionData.Processing_State,
                                                    DriverID: DirectionData.DriverID,
                                                    DriverName: DirectionData.DriverName,
                                                    DriverPhone: DirectionData.DriverPhone,
                                                    RecordData: RecordData
                                                }
                                            }
                                        }))
                                    }
                                })
                            }
                        })
                    } else {
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.Queue_Direction_DOESNOT_EXIST
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

    app.post('/Queue_Orders_Listing', function (req, res) {
        console.log("All Queue Listing Req body");
        console.log(req.body);
        if (req.body.skip != null && req.body.limit != null) {
            ExcelMod.Queue_Orders_Listing(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/All_Queue_Records', function (req, res) {
        console.log("All Queue Records Listing Req body");
        console.log(req.body);
        if (req.body.QueueID != null) {
            ExcelMod.Check_for_Order_QueueID(req.body, function (err, QueueData) {
                if (err) {
                    res.send(JSON.stringify(QueueData));
                } else {
                    var RecordData = [];
                    console.log(QueueData);
                    async.eachSeries(QueueData.RecordOrderArray, function (item, callback) {
                        RecordData.push({
                            RecordID: item.RecordID,
                            itemName: item.itemName,
                            pickAddress: item.pickAddress,
                            dropAddress: item.dropAddress,
                            pickLatitude: item.pickLatitude,
                            pickLongitude: item.pickLongitude,
                            dropLatitude: item.dropLatitude,
                            dropLongitude: item.dropLongitude,
                            receiverName: item.receiverName,
                            receiverPhone: item.receiverPhone
                        })
                        callback();
                    }, function (err) {
                        if (!err) {
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    RecordData: RecordData
                                }
                            }))
                        }
                    })
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
    app.post('/Generate_Sheet_Record_Orders', function (req, res) {
        console.log("Generate Record Body");
        console.log(req.body);
        if (req.body.CustomerID != null && req.body.OrderSheetID != null && req.body.no_of_orders != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    ExcelMod.Check_for_Order_SheetID(req.body, function (err, SheetData) {
                        if (err) {
                            res.send(JSON.stringify(SheetData));
                        } else {
                            ExcelMod.Get_No_of_Available_Orders(req.body, function (err, AvailableReadyOrders) {
                                if (!err) {
                                    if (parseInt(req.body.no_of_orders) <= AvailableReadyOrders) {
                                        res.send(new ApiResponce({
                                            success: true,
                                            extras: {
                                                Status: "Orders Generated and Queued for Ordering"
                                            }
                                        }));
                                        ExcelMod.Find_All_Available_Records_for_Orders(req.body, function (err, AvailableOrderData) {
                                            if (!err) {
                                                ExcelMod.Queue_Customer_Orders_and_Generate_Orders(req.body, CustomerData, AvailableOrderData, SheetData, function (Result) {
                                                    console.log(Result);
                                                })
                                            }
                                        });
                                    } else {
                                        res.send(new ApiResponce({
                                            success: false,
                                            extras: {
                                                msg: ApiMessages.Generate_Order_Count_Greater_than_Available_Ready_Orders
                                            }
                                        }));
                                    }
                                }
                            })
                        }
                    })
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
    });
    app.post('/Search_All_Customer_Order_Sheets', function (req, res) {
        if (req.body.CustomerID != null && req.body.SearchValue != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    ExcelMod.Search_All_Customer_Order_Sheets(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    app.post('/Find_All_Customer_Order_Sheets', function (req, res) {
        if (req.body.CustomerID != null && req.body.skip != null && req.body.limit != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    ExcelMod.Find_All_Customer_Order_Sheets(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    app.post('/Search_All_Sheets_Records', function (req, res) {
        if (req.body.CustomerID != null && req.body.OrderSheetID != null && req.body.SearchValue != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    ExcelMod.Check_for_Order_SheetID(req.body, function (err, SheetData) {
                        if (err) {
                            res.send(JSON.stringify(SheetData));
                        } else {
                            ExcelMod.Search_All_Sheets_Records(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                            })
                        }
                    })
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
    });
    app.post('/Find_All_Sheets_Records', function (req, res) {
        if (req.body.CustomerID != null && req.body.OrderSheetID != null && req.body.skip != null && req.body.limit != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    ExcelMod.Check_for_Order_SheetID(req.body, function (err, SheetData) {
                        if (err) {
                            res.send(JSON.stringify(SheetData));
                        } else {
                            ExcelMod.Find_All_Sheets_Records(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                            })
                        }
                    })
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
    });
    app.post('/Edit_Sheet_Record', function (req, res) {
        if (req.body.CustomerID != null && req.body.RecordID != null && req.body.itemName != null
            && req.body.dropAddress != null && req.body.receiverName != null && req.body.receiverPhone != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    ExcelMod.Check_for_Sheet_RecordID(req.body, function (err, RecordData) {
                        if (err) {
                            res.send(JSON.stringify(RecordData));
                        } else {
                            ExcelMod.Edit_Sheet_Record(req.body, RecordData, CustomerData, function (Result) {
                                res.send(JSON.stringify(Result));
                            })
                        }
                    })
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
    });
    app.post('/Refresh_Sheet_Record', function (req, res) {
        if (req.body.CustomerID != null && req.body.RecordID != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    ExcelMod.Check_for_Sheet_RecordID(req.body, function (err, RecordData) {
                        if (err) {
                            res.send(JSON.stringify(RecordData));
                        } else {
                            var Date = moment(RecordData.created_at).utcOffset(330).format('MMM-DD,YYYY h:mm A')
                            var Data = {
                                OrderSheetID: RecordData.OrderSheetID,
                                OrderSheetNumber: RecordData.OrderSheetNumber,
                                Date: Date,
                                RecordID: RecordData.RecordID,
                                itemName: RecordData.itemName,
                                pickAddress: RecordData.pickAddress,
                                dropAddress: RecordData.dropAddress,
                                pickLatitude: RecordData.pickLatitude,
                                pickLongitude: RecordData.pickLongitude,
                                dropLatitude: RecordData.dropLatitude,
                                dropLongitude: RecordData.dropLongitude,
                                receiverName: RecordData.receiverName,
                                receiverPhone: RecordData.receiverPhone,
                                Status: RecordData.Status,
                                Message: RecordData.Message
                            }
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    RecordData: Data
                                }
                            }));
                        }
                    })
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
    });
    app.post('/Refresh_Order_Sheet', function (req, res) {
        if (req.body.CustomerID != null && req.body.OrderSheetID != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    ExcelMod.Check_for_Order_SheetID(req.body, function (err, SheetData) {
                        if (err) {
                            res.send(JSON.stringify(SheetData));
                        } else {
                            if (SheetData.FileUrl == "") {
                                SheetData.FileUrl = SheetData.FileUrl;
                            } else {
                                SheetData.FileUrl = config.S3URL + SheetData.FileUrl;
                            }
                            var ProcessQuery = {
                                OrderSheetID: SheetData.OrderSheetID,
                                Status: {
                                    $ne: 8
                                }
                            }
                            var Order_Queue_Query = {
                                OrderSheetID: SheetData.OrderSheetID,
                                Status: 5
                            }
                            var Order_Place_Query = {
                                OrderSheetID: SheetData.OrderSheetID,
                                Status: 6
                            }
                            var Order_Error_Query = {
                                OrderSheetID: SheetData.OrderSheetID,
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
                                                            res.send(new ApiResponce({
                                                                success: true,
                                                                extras: {
                                                                    SheetData: SheetData,
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
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    app.post('/Storing_Excel_Order_Records', ExcelMod.Storing_Excel_Order_Records);

    app.post('/Listing_All_Campaign_Information', function (req, res) {
        if (req.body.AdminID != null && req.body.skip != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    var query = {
                        Status: true
                    }
                    Campaign_Information.count(query).exec(function (err, Count) {
                        if (Count >= 0) {
                            var toSkip = parseInt(req.body.skip);
                            Campaign_Information.find(query).sort('-created_at').skip(toSkip).limit(10).exec(function (err, Result) {
                                if (!err) {
                                    var CampaignData = [];
                                    async.eachSeries(Result, function (item, callback) {
                                        var Date = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                        CampaignData.push({
                                            InformationID: item.InformationID,
                                            Name: item.Name,
                                            PhoneNumber: item.PhoneNumber,
                                            EmailID: item.EmailID,
                                            Date: Date
                                        })
                                        callback();
                                    }, function (err) {
                                        res.send(new ApiResponce({
                                            success: true,
                                            extras: {
                                                CampaignData: CampaignData,
                                                Count: Count
                                            }
                                        }));
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    })

    app.post('/Store_Campaign_Information', function (req, res) {
        var options = { allow_display_name: false, allow_utf8_local_part: false, require_tld: true };
        if (req.body.Name != null && req.body.PhoneNumber != null && req.body.EmailID) {
            if (validator.isMobilePhone(req.body.PhoneNumber, 'en-IN')) {
                if (validator.isEmail(req.body.EmailID, options)) {
                    var InformationID = uuid();
                    var date = new Date();
                    var InformationData = new Campaign_Information({
                        InformationID: InformationID,
                        Name: req.body.Name,
                        PhoneNumber: req.body.PhoneNumber,
                        EmailID: req.body.EmailID
                    })
                    InformationData.save(function (err, Result) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    Status: "Campaign Information Stored Successfully"
                                }
                            }));
                        }
                    })
                }
                else {
                    res.send(new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.Enter_Correct_Email_Format
                        }
                    }));
                }
            } else {
                res.send(new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.ENTER_CORRECT_PHONE_FORMAT
                    }
                }));
            }
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Driver_Invoicing_Subtotal', function (req, res) {
        var from_date = moment().subtract(7, 'day').format('DD/MM/YYYY');
        var to_date = moment().subtract(1, 'days').format('DD/MM/YYYY');
        var data = {
            "from_date": from_date,
            "to_date": to_date
        };
        CustomerMod.DriverWeekCollectionData_Subtotal(data, function (err, DriverPriceData) {
            if (!err) {
                res.send(DriverPriceData);
                CustomerMod.Driver_Invoicing_Subtotal(DriverPriceData, data, function (Result) {
                    console.log(Result);
                })
            }
        })
    });
    app.post('/Driver_Invoicing_Delivery_Charges', function (req, res) {
        var from_date = moment().subtract(7, 'day').format('DD/MM/YYYY');
        var to_date = moment().subtract(1, 'days').format('DD/MM/YYYY');
        var data = {
            "from_date": from_date,
            "to_date": to_date
        };
        CustomerMod.DriverWeekCollectionData_Delivery_Charges(data, function (err, DriverPriceData) {
            if (!err) {
                res.send(DriverPriceData);
                CustomerMod.Driver_Invoicing_Delivery_Charges(DriverPriceData, data, function (Result) {
                    console.log(Result);
                })
            }
        })
    });
    app.post('/Driver_Invoicing_Additional_Weights', function (req, res) {
        var from_date = moment().subtract(7, 'day').format('DD/MM/YYYY');
        var to_date = moment().subtract(1, 'days').format('DD/MM/YYYY');
        var data = {
            "from_date": from_date,
            "to_date": to_date
        };
        CustomerMod.DriverWeekCollectionData_Additional_Weights(data, function (err, DriverPriceData) {
            if (!err) {
                res.send(DriverPriceData);
                CustomerMod.Driver_Invoicing_Additional_Weights(DriverPriceData, data, function (Result) {
                    console.log(Result);
                })
            }
        })
    });
    app.post('/Driver_Invoicing', function (req, res) {
        var from_date = moment().subtract(7, 'day').format('DD/MM/YYYY');
        var to_date = moment().subtract(1, 'days').format('DD/MM/YYYY');
        var data = {
            "from_date": from_date,
            "to_date": to_date
        };
        CustomerMod.DriverWeekCollectionData(data, function (err, DriverPriceData) {
            if (!err) {
                res.send(DriverPriceData);
                CustomerMod.Driver_Week_Collection_Invoice(DriverPriceData, data, function (Result) {
                    console.log(Result);
                })
            }
        })
    });
    /**************
     *
     *
     * Super Admin Logs
     *
     * */
    app.post('/Search_All_Log_Particular_Admin', function (req, res) {
        if (req.body.AdminID != null && req.body.SearchValue != null) {

            var query = {
                AdminID: req.body.AdminID,
                $or: [
                    {
                        AdminName: {
                            $regex: req.body.SearchValue,
                            $options: "i"
                        }
                    },
                    {
                        Message: {
                            $regex: req.body.SearchValue,
                            $options: "i"
                        }
                    },
                    {
                        Purpose: {
                            $regex: req.body.SearchValue,
                            $options: "i"
                        }
                    },
                    {
                        Key: {
                            $regex: req.body.SearchValue,
                            $options: "i"
                        }
                    }
                ]
            };
            Super_Admin_Dashboard_Logs.find(query).sort('-created_at').select('-_id').exec(function (err, Result) {
                if (!err) {
                    var LogData = [];
                    async.eachSeries(Result, function (item, callback) {
                        var Date = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                        LogData.push({
                            AdminID: item.AdminID,
                            AdminName: item.AdminName,
                            Message: item.Message,
                            Purpose: item.Purpose,
                            Key: item.Key,
                            Date: Date
                        })
                        callback();
                    }, function (err) {
                        if (!err) {
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    LogData: LogData
                                }
                            }));
                        }
                    })
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
    app.post('/Super_Admin_Logs_By_Admin', function (req, res) {
        if (req.body.AdminID != null && req.body.skip != null && req.body.limit != null) {
            var query = {
                AdminID: req.body.AdminID
            };
            var toSkip = parseInt(req.body.skip);
            var toLimit = parseInt(req.body.limit);
            Super_Admin_Dashboard_Logs.count(query).exec(function (err, Count) {
                if (Count >= 0) {
                    Super_Admin_Dashboard_Logs.find(query).sort('-created_at').select('-_id').skip(toSkip).limit(toLimit).exec(function (err, Result) {
                        if (!err) {
                            var LogData = [];
                            async.eachSeries(Result, function (item, callback) {
                                var Date = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                LogData.push({
                                    AdminID: item.AdminID,
                                    AdminName: item.AdminName,
                                    Message: item.Message,
                                    Purpose: item.Purpose,
                                    Key: item.Key,
                                    Date: Date
                                })
                                callback();
                            }, function (err) {
                                if (!err) {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            LogData: LogData,
                                            Count: Count
                                        }
                                    }));
                                }
                            })
                        }
                    })
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
    });

    app.post('/Activate_Super_Admin', function (req, res) {
        if (req.body.AdminID != null && req.body.To_AdminID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    var query = { _id: req.body.To_AdminID };
                    admin_users.findOne(query).exec(function (err, Data) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (Data != null) {
                                var changes = {
                                    $set: {
                                        Status: true
                                    }
                                }
                                admin_users.update(query, changes, function (err, Result) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.send(new ApiResponce({
                                            success: true,
                                            extras: {
                                                Status: "Admin Account have been Activated"
                                            }
                                        }));
                                        var date = new Date();
                                        var AdminID = SuperAdminData._id;
                                        var AdminName = SuperAdminData.name;
                                        var Whether_God = SuperAdminData.Whether_God;
                                        var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                        var Message = AdminName + ' have Activated the Super Admin ' + Data.name + ' on ' + DateTime
                                        var Purpose = 'Super Admin Account Activated'
                                        var Key = 'Super Admin Account';
                                        var LogData = new Super_Admin_Dashboard_Logs({
                                            AdminID: AdminID,
                                            AdminName: AdminName,
                                            Message: Message,
                                            Purpose: Purpose,
                                            Key: Key,
                                            Whether_God: Whether_God,
                                            created_at: date
                                        });
                                        LogData.save();
                                    }
                                })
                            } else if (Data == null) {
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.Admin_Not_Found
                                    }
                                }));
                            }
                        }
                    })
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

    app.post('/Inactivate_Super_Admin', function (req, res) {
        if (req.body.AdminID != null && req.body.To_AdminID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    var query = { _id: req.body.To_AdminID };
                    admin_users.findOne(query).exec(function (err, Data) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (Data != null) {
                                var changes = {
                                    $set: {
                                        Status: false
                                    }
                                }
                                admin_users.update(query, changes, function (err, Result) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.send(new ApiResponce({
                                            success: true,
                                            extras: {
                                                Status: "Admin Account have been Inactivated"
                                            }
                                        }));
                                        var date = new Date();
                                        var AdminID = SuperAdminData._id;
                                        var AdminName = SuperAdminData.name;
                                        var Whether_God = SuperAdminData.Whether_God;
                                        var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                        var Message = AdminName + ' have Inactivated the Super Admin ' + Data.name + ' on ' + DateTime
                                        var Purpose = 'Super Admin Account Inactive'
                                        var Key = 'Super Admin Account';
                                        var LogData = new Super_Admin_Dashboard_Logs({
                                            AdminID: AdminID,
                                            AdminName: AdminName,
                                            Message: Message,
                                            Purpose: Purpose,
                                            Key: Key,
                                            Whether_God: Whether_God,
                                            created_at: date
                                        });
                                        LogData.save();
                                    }
                                })
                            } else if (Data == null) {
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.Admin_Not_Found
                                    }
                                }));
                            }
                        }
                    })
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

    app.post('/Find_All_Inactive_Super_Admins', function (req, res) {
        if (req.body.AdminID != null && req.body.skip != null && req.body.limit != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    var query = {
                        Whether_God: false,
                        Status: false
                    };
                    admin_users.count(query).exec(function (err, Count) {
                        if (Count >= 0) {
                            var toSkip = parseInt(req.body.skip);
                            var toLimit = parseInt(req.body.limit);
                            admin_users.find(query).sort('name').skip(toSkip).limit(toLimit).exec(function (err, Result) {
                                if (!err) {
                                    var AdminData = [];
                                    async.eachSeries(Result, function (item, callback) {
                                        AdminData.push({
                                            AdminID: item._id,
                                            AdminName: item.name,
                                            AdminEmail: item.email,
                                            ADMIN_USER_PERMISSIONS: item.ADMIN_USER_PERMISSIONS,
                                            HR_SALARY_PERMISSIONS: item.HR_SALARY_PERMISSIONS
                                        })
                                        callback();
                                    }, function (err) {
                                        if (!err) {
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    AdminData: AdminData,
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
    app.post('/Find_All_Super_Admins', function (req, res) {
        if (req.body.AdminID != null && req.body.skip != null && req.body.limit != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    var query = {
                        Whether_God: false,
                        Status: true
                    };
                    admin_users.count(query).exec(function (err, Count) {
                        if (Count >= 0) {
                            var toSkip = parseInt(req.body.skip);
                            var toLimit = parseInt(req.body.limit);
                            admin_users.find(query).sort('name').skip(toSkip).limit(toLimit).exec(function (err, Result) {
                                if (!err) {
                                    var AdminData = [];
                                    async.eachSeries(Result, function (item, callback) {
                                        AdminData.push({
                                            AdminID: item._id,
                                            AdminName: item.name,
                                            AdminEmail: item.email,
                                            ADMIN_USER_PERMISSIONS: item.ADMIN_USER_PERMISSIONS,
                                            HR_SALARY_PERMISSIONS: item.HR_SALARY_PERMISSIONS
                                        })
                                        callback();
                                    }, function (err) {
                                        if (!err) {
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    AdminData: AdminData,
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

    app.post('/Search_All_Super_Admin_Logs', function (req, res) {
        if (req.body.AdminID != null && req.body.SearchValue != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    var query = {
                        Whether_God: false,
                        $or: [
                            {
                                AdminName: {
                                    $regex: req.body.SearchValue,
                                    $options: "i"
                                }
                            },
                            {
                                Message: {
                                    $regex: req.body.SearchValue,
                                    $options: "i"
                                }
                            },
                            {
                                Purpose: {
                                    $regex: req.body.SearchValue,
                                    $options: "i"
                                }
                            },
                            {
                                Key: {
                                    $regex: req.body.SearchValue,
                                    $options: "i"
                                }
                            }
                        ]
                    };
                    Super_Admin_Dashboard_Logs.find(query).sort('-created_at').select('-_id').exec(function (err, Result) {
                        if (!err) {
                            var LogData = [];
                            async.eachSeries(Result, function (item, callback) {
                                var Date = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                LogData.push({
                                    AdminID: item.AdminID,
                                    AdminName: item.AdminName,
                                    Message: item.Message,
                                    Purpose: item.Purpose,
                                    Key: item.Key,
                                    Date: Date
                                })
                                callback();
                            }, function (err) {
                                if (!err) {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            LogData: LogData
                                        }
                                    }));
                                }
                            })
                        }
                    })
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

    app.post('/All_Super_Admin_Logs', function (req, res) {
        if (req.body.AdminID != null && req.body.skip != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    var query = {
                        Whether_God: false
                    };
                    var toSkip = parseInt(req.body.skip);
                    Super_Admin_Dashboard_Logs.count(query).exec(function (err, Count) {
                        if (Count >= 0) {
                            Super_Admin_Dashboard_Logs.find(query).sort('-created_at').select('-_id').skip(toSkip).limit(10).exec(function (err, Result) {
                                if (!err) {
                                    var LogData = [];
                                    async.eachSeries(Result, function (item, callback) {
                                        var Date = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                        LogData.push({
                                            AdminID: item.AdminID,
                                            AdminName: item.AdminName,
                                            Message: item.Message,
                                            Purpose: item.Purpose,
                                            Key: item.Key,
                                            Date: Date
                                        })
                                        callback();
                                    }, function (err) {
                                        if (!err) {
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    LogData: LogData,
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
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });


    /**************
    *
    *
    * End of Super Admin Logs
    *
    * */

    /********
     *
     * Mail Message Functionality
     */
    app.post('/Create_Campain_Send_Mail_Message', function (req, res) {
        if (req.body.CampaignType != null && req.body.CampaignTitle != null && req.body.CampaignDescription != null
            && req.body.MessageData != null && req.body.MailData != null && req.body.MailSubject != null) {
            MailMessageMod.Create_Campaign(req.body, function (err, Status, CampaignData) {
                if (!err) {
                    res.send(JSON.stringify(Status));
                    var MailData = req.body.MailData;
                    var MessageData = req.body.MessageData;
                    var CampaignType = parseInt(req.body.CampaignType);
                    Customers.find({ acc_status: 1 }).select('_id First_name Email Phone').exec(function (err, Result) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (CampaignType == 1) {
                                //Only Mails
                                async.eachSeries(Result, function (CustomerData, callback) {
                                    MailMessageMod.Send_Mail_Customer(CustomerData, CampaignData, MailData, function (Result) {
                                        callback();
                                    })
                                }, function (err) {
                                    if (!err) {
                                        console.log("All Mail Sent");
                                    }
                                })
                            } else if (CampaignType == 2) {
                                //Only Messages
                                async.eachSeries(Result, function (CustomerData, callback) {
                                    callback();
                                }, function (err) {
                                    if (!err) {
                                        console.log("All Mail Sent");
                                    }
                                })
                            } else if (CampaignType == 3) {
                                //Both Mail and Messages
                                async.eachSeries(Result, function (CustomerData, callback) {
                                    callback();
                                }, function (err) {
                                    if (!err) {
                                        console.log("All Mail Sent");
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
    })

    app.post('/TakeMailData', function (req, res) {
        MailMessageMod.Check_Whether_Mail_Delivery_Report_Exists_Do_Functionality(req.body, function (Result) {
            res.send(Result);
        })
    })

    app.get('/TakeMessageData', function (req, res) {
        console.log("Delivery Message Body");
        console.log(req.query);
        var data = req.query.data;
        async.eachSeries(data, function (item, callback) {
            MailMessageMod.Check_Whether_Message_Delivery_Report_Exists_Do_Functionality(item, function (Result) {
                console.log(Result);
                callback();
            })
        }, function (err) {
            res.send(new ApiResponce({
                success: true,
                extras: {
                    Status: "All Functionalities Completed"
                }
            }));
        })
    })
    //Zone Order Logs
    app.post('/Zone_Orders_Logs', function (req, res) {
        if (req.body.AdminID != null && req.body.orderId != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    CustomerMod.Check_for_Order(req.body, function (err, OrderData) {
                        if (err) {
                            res.send(JSON.stringify(OrderData));
                        } else {
                            if (OrderData.Whether_Zone_Drop == true) {
                                var query = {
                                    orderId: req.body.orderId
                                }
                                Zone_Order_Logs.find(query).exec(function (err, Result) {
                                    if (!err) {
                                        var ZoneOrderLogData = [];
                                        async.eachSeries(Result, function (item, callback) {
                                            var Date_Time = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                            var Shipping_Distance = item.Shipping_Distance;
                                            if (item.ZoneStatus == 1) {
                                                var Depo_Journey_Time = item.Depo_Journey_Time;
                                            } else if (item.ZoneStatus == 2) {
                                                var Depo_Journey_Time = "";
                                            } else if (item.ZoneStatus == 3) {
                                                var Depo_Journey_Time = item.Depo_Journey_Time;
                                            }
                                            ZoneOrderLogData.push({
                                                barcodeid: item.barcodeid,
                                                ZoneID: item.ZoneID,
                                                ZoneName: item.ZoneName,
                                                ZoneHubID: item.ZoneHubID,
                                                ZoneHubName: item.ZoneHubName,
                                                orderId: item.orderId,
                                                orderseqId: item.orderseqId,
                                                DriverID: item.DriverID,
                                                DriverName: item.DriverName,
                                                ZoneStatus: item.ZoneStatus,
                                                Date_Time: Date_Time,
                                                Shipping_Distance: Shipping_Distance,
                                                Depo_Journey_Time: Depo_Journey_Time
                                            })
                                            callback();
                                        }, function (err) {
                                            if (!err) {
                                                res.send(new ApiResponce({
                                                    success: true,
                                                    extras: {
                                                        ZoneOrderLogData: ZoneOrderLogData
                                                    }
                                                }));
                                            }
                                        })
                                    }
                                })
                            } else {
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.Order_Is_Not_A_Zone_Order
                                    }
                                }));
                            }
                        }
                    })
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

    /************
     *
     * Zone Mod
     */

    app.post('/Find_All_Country_Cities', function (req, res) {
        if (req.body.CountryID != null) {
            StoreMod.Check_for_CountryID(req.body, function (err, CountryData) {
                if (err) {
                    res.send(JSON.stringify(CountryData))
                } else {
                    ZoneMod.Find_All_Country_Cities(CountryData, function (Result) {
                        res.send(Result);
                    })
                }
            })
        }
    })
    app.post('/Make_City_Zone_Editable', function (req, res) {
        if (req.body.AdminID != null && req.body.CityID != null && req.body.ZoneID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    ZoneMod.Check_for_ZoneID(req.body, function (err, ZoneData) {
                        if (err) {
                            res.send(JSON.stringify(ZoneData));
                        } else {
                            StoreMod.Check_for_CityID(req.body, function (err, CityData) {
                                if (err) {
                                    res.send(JSON.stringify(CityData))
                                } else {
                                    ZoneMod.Make_City_Zone_Editable(req.body, ZoneData, CityData, function (Result) {
                                        res.send(JSON.stringify(Result));
                                    })
                                }
                            })
                        }
                    })
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
    });

    app.post('/Create_Zone_Paths', function (req, res) {
        if (req.body.AdminID != null && req.body.CityID != null && req.body.ZonePaths != null && req.body.strokeColor != null && req.body.strokeOpacity != null
            && req.body.strokeWeight != null && req.body.fillColor != null && req.body.fillOpacity != null
            && req.body.draggable != null && req.body.editable != null && req.body.visible != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    StoreMod.Check_for_CityID(req.body, function (err, CityData) {
                        if (err) {
                            res.send(JSON.stringify(CityData))
                        } else {
                            ZoneMod.Create_Zone_Paths(req.body, CityData, function (Result) {
                                res.send(Result);
                            })
                        }
                    })
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
    app.post('/Edit_Zone_Path_Position', function (req, res) {
        if (req.body.AdminID != null && req.body.ZoneID != null && req.body.ZonePaths != null && req.body.strokeColor != null && req.body.strokeOpacity != null
            && req.body.strokeWeight != null && req.body.fillColor != null && req.body.fillOpacity != null
            && req.body.draggable != null && req.body.editable != null && req.body.visible != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    ZoneMod.Check_for_ZoneID(req.body, function (err, ZoneData) {
                        if (err) {
                            res.send(JSON.stringify(ZoneData));
                        } else {
                            ZoneMod.Edit_Zone_Path_Position(req.body, function (Result) {
                                res.send(Result);
                            })
                        }
                    })
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

    app.post('/Find_All_Zone_with_Postions', function (req, res) {
        if (req.body.CityID != null) {
            StoreMod.Check_for_CityID(req.body, function (err, CityData) {
                if (err) {
                    res.send(JSON.stringify(CityData))
                } else {
                    ZoneMod.Find_All_Zone_with_Postions(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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

    //Find All Zones Hubs
    app.post('/Find_All_Zone_Hubs', function (req, res) {
        if (req.body.ZoneID != null) {
            ZoneMod.Check_for_ZoneID(req.body, function (err, ZoneData) {
                if (err) {
                    res.send(JSON.stringify(ZoneData));
                } else {
                    ZoneMod.Find_All_Zone_Hubs(ZoneData, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    //Search All Drivers Gods View
    app.post('/Search_Drivers_God_View', function (req, res) {
        if (req.body.AdminID != null && req.body.SearchValue != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    var query = {
                        acc_status: 3,
                        $or: [
                            {
                                name: {
                                    $regex: req.body.SearchValue,
                                    $options: "i"
                                }
                            }, {
                                lname: {
                                    $regex: req.body.SearchValue,
                                    $options: "i"
                                }
                            }, {
                                phone: {
                                    $regex: req.body.SearchValue,
                                    $options: "i"
                                }
                            }, {
                                LastOnline: {
                                    $regex: req.body.SearchValue,
                                    $options: "i"
                                }
                            }
                        ]
                    }
                    Drivers.find(query).select('name lname email phone location status LastOnline CurrentStatus').exec(function (err, Result) {
                        if (!err) {
                            var DriverData = [];
                            async.each(Result, function (item, callback) {
                                var name = item.name + ' ' + item.lname;
                                var DriverName = StoreMod.Format_Beautify_String(name);
                                var status = 4;
                                var CurrentStatus = 0;
                                var LastOnline = "";
                                if (item.status != null) {
                                    status = item.status
                                }
                                if (item.CurrentStatus != null) {
                                    CurrentStatus = item.CurrentStatus
                                }
                                if (item.LastOnline != null) {
                                    LastOnline = item.LastOnline
                                }
                                var lat = 17.43673;
                                var long = 78.36710900000003;
                                if (item.location.latitude != null) {
                                    lat = parseFloat(item.location.latitude);
                                }
                                if (item.location.longitude != null) {
                                    long = parseFloat(item.location.longitude);
                                }
                                console.log(DriverName);
                                var CountQuery = {
                                    "eventLog.driverid": String(item._id),
                                    "Whether_Deleted": false,
                                    "status": {
                                        $in: [7, 16, 10, 11, 12, 15, 18, 20]
                                    }
                                }
                                var count = 0;
                                Orders.find(CountQuery, { eventLog: 1 }).exec(function (err, Result) {
                                    var t = 0;
                                    for (var i = 0; i < Result.length; i++) {
                                        var last = Result[i].eventLog.length;
                                        if (Result[i].eventLog[last - 1].driverid == String(item._id)) {
                                            count++;
                                            t++;
                                        } else {
                                            t++;
                                        }
                                    }
                                    console.log(count);
                                    DriverData.push({
                                        DriverID: item._id,
                                        DriverName: DriverName,
                                        DriverPhoneNumber: item.phone,
                                        status: status,
                                        CurrentStatus: CurrentStatus,
                                        LastOnline: LastOnline,
                                        OrdersCount: count,
                                        lat: lat,
                                        long: long
                                    })
                                    callback();
                                })
                            }, function (err) {
                                if (!err) {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            DriverData: DriverData
                                        }
                                    }));
                                }
                            })
                        }
                    })
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
    //Find All Drivers Gods View
    app.post('/Drivers_God_View', function (req, res) {
        if (req.body.AdminID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    Drivers.find({ acc_status: 3 }).select('name lname email phone location status LastOnline CurrentStatus').exec(function (err, Result) {
                        if (!err) {
                            console.log("Driver Count in gods views ");
                            console.log(Result.length);
                            var OnlineDriversData = [];
                            var OfflineDriversData = [];
                            var DriverData = [];
                            async.eachSeries(Result, function (item, callback) {
                                var name = item.name + ' ' + item.lname;
                                var DriverName = StoreMod.Format_Beautify_String(name);
                                console.log("Driver Array Name");
                                console.log(DriverName);
                                var status = 4;
                                var CurrentStatus = 0;
                                var LastOnline = "";
                                if (item.status != null) {
                                    status = item.status
                                }
                                if (item.CurrentStatus != null) {
                                    CurrentStatus = item.CurrentStatus
                                }
                                if (item.LastOnline != null) {
                                    LastOnline = item.LastOnline
                                }
                                var lat = 17.43673;
                                var long = 78.36710900000003;
                                if (item.location.latitude != null) {
                                    lat = parseFloat(item.location.latitude);
                                }
                                if (item.location.longitude != null) {
                                    long = parseFloat(item.location.longitude);
                                }
                                var CountQuery = {
                                    "eventLog.driverid": String(item._id),
                                    "Whether_Deleted": false,
                                    "status": {
                                        $in: [7, 16, 10, 11, 12, 15, 18, 20]
                                    }
                                }
                                var count = 0;
                                Orders.find(CountQuery, { eventLog: 1 }).exec(function (err, Result) {
                                    var t = 0;
                                    for (var i = 0; i < Result.length; i++) {
                                        var last = Result[i].eventLog.length;
                                        if (Result[i].eventLog[last - 1].driverid == String(item._id)) {
                                            count++;
                                            t++;
                                        } else {
                                            t++;
                                        }
                                    }
                                    console.log(count);
                                    if (status == 3) {
                                        console.log("Driver Array Name pushed");
                                        console.log(DriverName);
                                        DriverData.push({
                                            DriverID: item._id,
                                            DriverName: DriverName,
                                            DriverPhoneNumber: item.phone,
                                            status: status,
                                            CurrentStatus: CurrentStatus,
                                            LastOnline: LastOnline,
                                            OrdersCount: count,
                                            lat: lat,
                                            long: long
                                        })
                                        OnlineDriversData.push({
                                            DriverID: item._id,
                                            DriverName: DriverName,
                                            DriverPhoneNumber: item.phone,
                                            status: status,
                                            CurrentStatus: CurrentStatus,
                                            LastOnline: LastOnline,
                                            OrdersCount: count,
                                            lat: lat,
                                            long: long
                                        })
                                        callback();
                                    } else {
                                        console.log("Driver Array Name pushed");
                                        console.log(DriverName);
                                        DriverData.push({
                                            DriverID: item._id,
                                            DriverName: DriverName,
                                            DriverPhoneNumber: item.phone,
                                            status: status,
                                            CurrentStatus: CurrentStatus,
                                            LastOnline: LastOnline,
                                            OrdersCount: count,
                                            lat: lat,
                                            long: long
                                        })
                                        OfflineDriversData.push({
                                            DriverID: item._id,
                                            DriverName: DriverName,
                                            DriverPhoneNumber: item.phone,
                                            status: status,
                                            CurrentStatus: CurrentStatus,
                                            LastOnline: LastOnline,
                                            OrdersCount: count,
                                            lat: lat,
                                            long: long
                                        })
                                        callback();
                                    }
                                })
                            }, function (err) {
                                if (!err) {
                                    console.log("Total Driver send");
                                    console.log(DriverData.length);
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            DriverData: DriverData,
                                            OnlineDriversData: OnlineDriversData,
                                            OfflineDriversData: OfflineDriversData
                                        }
                                    }));
                                }
                            })
                        }
                    })
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
    //Remove or Inactive Zone Hub
    app.post('/Inactive_Remove_Zone_Hub', function (req, res) {
        if (req.body.ZoneHubID != null) {
            ZoneMod.Check_for_ZoneHubID(req.body, function (err, HubData) {
                if (err) {
                    res.send(JSON.stringify(HubData));
                } else {
                    ZoneMod.Inactive_Remove_Zone_Hub(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    //Update Zone Hub
    app.post('/Update_Zone_Hub', function (req, res) {
        if (req.body.ZoneHubID != null && req.body.ZoneHubName != null && req.body.ZoneHubName != ''
            && req.body.Address != null && req.body.Address != ''
            && req.body.Latitude != null && req.body.Longitude != null) {
            ZoneMod.Check_for_ZoneHubID(req.body, function (err, HubData) {
                if (err) {
                    res.send(JSON.stringify(HubData));
                } else {
                    ZoneMod.Update_Zone_Hub(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });

    //Create Zone Hub
    app.post('/Create_Zone_Hub', function (req, res) {
        if (req.body.ZoneID != null && req.body.ZoneHubName != null && req.body.ZoneHubName != ''
            && req.body.Address != null && req.body.Address != ''
            && req.body.Latitude != null && req.body.Longitude != null) {
            ZoneMod.Check_for_ZoneID(req.body, function (err, ZoneData) {
                if (err) {
                    res.send(JSON.stringify(ZoneData));
                } else {
                    ZoneMod.Create_Zone_Hub(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });


    //Remove Zone Area
    app.post('/Remove_Zone_Area', function (req, res) {
        if (req.body.AreaID != null) {
            ZoneMod.Check_for_AreaID(req.body, function (err, AreaData) {
                if (err) {
                    res.send(JSON.stringify(AreaData));
                } else {
                    ZoneMod.Remove_Zone_Area(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    //Update Zone Area
    app.post('/Update_Zone_Area', function (req, res) {
        if (req.body.AreaID != null && req.body.AreaName != null && req.body.AreaName != '') {
            ZoneMod.Check_for_AreaID(req.body, function (err, AreaData) {
                if (err) {
                    res.send(JSON.stringify(AreaData));
                } else {
                    ZoneMod.Update_Zone_Area(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    //Find All Zones Areas
    app.post('/Find_All_Zone_Area', function (req, res) {
        if (req.body.ZoneID != null) {
            ZoneMod.Check_for_ZoneID(req.body, function (err, ZoneData) {
                if (err) {
                    res.send(JSON.stringify(ZoneData));
                } else {
                    ZoneMod.Find_All_Zone_Areas(ZoneData, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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

    //Create Zone Area
    app.post('/Add_Zone_Area', function (req, res) {
        if (req.body.ZoneID != null && req.body.AreaName != null && req.body.AreaName != '') {
            ZoneMod.Check_for_ZoneID(req.body, function (err, ZoneData) {
                if (err) {
                    res.send(JSON.stringify(ZoneData));
                } else {
                    ZoneMod.Create_Zone_Area(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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


    /************
    *
    * End of Zone Mod
    */

    /*******
     *
       Mail Message Functionality  End
     *****/

    function format_str(str) {
        var myArr = str.toLowerCase().split(" ");
        for (var a = 0; a < myArr.length; a++) {
            myArr[a] = myArr[a].charAt(0).toUpperCase() + myArr[a].substr(1);
        }
        return myArr.join(" ");
    }

    /******************
     *
     * Ezshipp Financial Analytics
     *
     */
    app.post('/Moment_Month_Year_Testing', function (req, res) {
        var month = 02;
        var year = 2017;
        var newdate = moment(month, 'MM');
        var enddate = moment(month, 'MM').endOf('month');
        console.log(newdate);
        console.log(enddate);
    });
    app.post('/Financial_Price_Analytics', function (req, res) {
        if (req.body.AnalyticType != null) {
            if (parseInt(req.body.AnalyticType) == 1) {
                //today Hour Wise
                FinancialAnalyticsMod.Hour_Wise_Analytics_Order_Price_Today(function (Result) {
                    res.send(Result);
                })
            } else if (parseInt(req.body.AnalyticType) == 2) {
                //Day wise Analytics Between Interval
                if (req.body.ReturnType != null && req.body.from_date != null && req.body.to_date != null) {
                    if (parseInt(req.body.ReturnType) == 1) {
                        //Day Wise Return
                        FinancialAnalyticsMod.Day_Wise_Analytics_Order_Price_Between_Dates(req.body, function (Result) {
                            res.send(Result);
                        })
                    } else if (parseInt(req.body.ReturnType) == 2) {
                        //Fixed Monthly Wise Return
                        FinancialAnalyticsMod.Fixed_Monthly_Wise_Analytics_Order_Price_Between_Dates(req.body, function (Result) {
                            res.send(Result);
                        })
                    } else if (parseInt(req.body.ReturnType) == 3) {
                        //3 months  Wise Return
                    }
                } else {
                    res.send(new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.ENTER_ALL_TAGS
                        }
                    }));
                }
            } else if (parseInt(req.body.AnalyticType) == 3) {
                if (req.body.Date != null) {
                    FinancialAnalyticsMod.Hour_Wise_Analytics_Date_Wise_Order_Price_Today(req.body, function (Result) {
                        res.send(Result);
                    })
                } else {
                    res.send(new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.ENTER_ALL_TAGS
                        }
                    }));
                }
            }
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    })

    app.post('/Find_All_OrderTypes_Collection_Date_Range', function (req, res) {
        if (req.body.from_date != null && req.body.to_date != null) {
            FinancialAnalyticsMod.Find_All_OrderTypes_Collection_Date_Range(req.body, function (Result) {
                res.send(Result);
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    app.post('/Find_Top_Customer_Driver_Date_Range', function (req, res) {
        if (req.body.from_date != null && req.body.to_date != null) {
            FinancialAnalyticsMod.Find_Top_Driver_Date_Range(req.body, function (err, DriverData) {
                if (!err) {
                    FinancialAnalyticsMod.Find_Top_Customer_Date_Range(req.body, function (err, CustomerData) {
                        if (!err) {
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    DriverData: DriverData,
                                    CustomerData: CustomerData
                                }
                            }));
                        }
                    })
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

    /****************
     *
     * End of Financial Analtics
     *
     */

    //Store Admin Forgot Password

    app.post('/Store_Admin_Forgot_Password', function (req, res) {
        if (req.body.Phone != null) {
            var validator = require('validator');
            if (validator.isMobilePhone(req.body.Phone, 'en-IN')) {
                CustomerMod.Check_Whether_PhoneNumber_Exist_Store_Admin(req.body, function (err, StoreAdminData) {
                    if (err) {
                        res.send(JSON.stringify(StoreAdminData));
                    } else {
                        if (StoreAdminData.StoreAdminStatus == false || StoreAdminData.StoreAdminStatus == null) {
                            res.send(new ApiResponce({
                                success: false,
                                extras: {
                                    msg: ApiMessages.Store_Admin_Is_Not_Active
                                }
                            }));
                        } else {
                            var StoreAdminID = StoreAdminData._id;
                            var First_name = StoreAdminData.First_name;
                            CustomerMod.findCustomerForgotPasswordTries(req.body, function (err, ForgotPasswordStatus) {
                                if (err) {
                                    res.send(JSON.stringify(ForgotPasswordStatus));
                                } else {
                                    CustomerMod.RegisterCustomerForgotPasswordTries(req.body, function (err, ForgotPasswordStore) {
                                        CustomerMod.GenerateRandomPasswordandUpdateItinSchema(req.body, StoreAdminID, First_name, function (err, Result) {
                                            res.send(JSON.stringify(Result));
                                            CustomerMod.DeleteCustomerPasswordTries(req.body, function (err, RemovePassword) {

                                            })
                                        })
                                    })
                                }
                            })
                        }
                    }
                })
            } else {
                res.send(new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.ENTER_CORRECT_PHONE_FORMAT
                    }
                }));
            }
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    //Update Store Admin Profile Email
    app.post('/Update_Store_Admin_Email', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null &&
            req.body.Store_Admin_Email != null && req.body.Store_Admin_Email != "") {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus));
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            var query = {
                                _id: req.body.StoreAdminID
                            };
                            var changes = {
                                $set: {
                                    Email: req.body.Store_Admin_Email
                                }
                            };
                            var multiplicity = {
                                multi: true
                            };
                            Customers.update(query, changes, multiplicity).exec(function (err, Result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            Status: "Store Admin Email Updated Set Successfully"
                                        }
                                    }));
                                }
                            })
                        }
                    })
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
    });
    //Update Store Admin Profile Name
    app.post('/Update_Store_Admin_Name', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null &&
            req.body.Store_Admin_Name != null && req.body.Store_Admin_Name != "") {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus));
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            var query = {
                                _id: req.body.StoreAdminID
                            };
                            var changes = {
                                $set: {
                                    First_name: req.body.Store_Admin_Name
                                }
                            };
                            var multiplicity = {
                                multi: true
                            };
                            Customers.update(query, changes, multiplicity).exec(function (err, Result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            Status: "Store Admin Name Updated Set Successfully"
                                        }
                                    }));
                                }
                            })
                        }
                    })
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

    //Send Store Admin Branches
    app.post('/Store_Admin_Available_Branches', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            var Store_Branch = require("../Models/Store_Branch.js");
                            var query = {
                                'AdminData.StoreAdminID': req.body.StoreAdminID
                            };
                            Store_Branch.find(query).sort({ created_at: -1 }).exec(function (err, Result) {
                                if (!err) {
                                    var BranchData = [];
                                    async.eachSeries(Result, function (item, callback) {
                                        BranchData.push({
                                            BranchID: item.BranchID,
                                            Branch_Name: item.Branch_Name,
                                            Branch_PhoneNumber: item.Branch_PhoneNumber,
                                            Address: item.Address,
                                            Branch_Image_URL: config.S3URL + item.Branch_Image_URL
                                        })
                                        callback();
                                    }, function (err) {
                                        if (!err) {
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    BranchData: BranchData
                                                }
                                            }));
                                        }
                                    });
                                }
                            })
                        }
                    })
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
    });

    //Update Store Admin Password
    app.post('/Update_Store_Admin_Password', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.Password != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Update_Customer_Password(req.body, function (err, Result) {
                                res.send(JSON.stringify(Result));
                            })
                        }
                    })
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
    });

    //This Api use for First Time Changed Store Admin Password
    app.post('/First_Time_Changed_Customer_Password_Store_Admin', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.Password != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Update_Customer_Password(req.body, function (err, Result) {
                                res.send(JSON.stringify(Result));
                            })
                        }
                    })
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
    });


    //Store Admin Functionalities
    app.post('/Store_Admin_Login', function (req, res) {
        if (req.body.Phone != null && req.body.Password != null) {
            CustomerMod.findCustomerPasswordTries(req.body, function (err, responcer) {
                if (err) {
                    res.send(JSON.stringify(responcer));
                } else {
                    CustomerMod.Check_Whether_PhoneNumber_Exist(req.body, function (err, CustomerData) {
                        if (err) {
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    LoginStatus: false,
                                    Status: "You are Not Registered in Ezshipp Stores.Please Contact Customer Care at " + config.Ezshipp_Customer__Care
                                }
                            }));
                        } else {
                            if (CustomerData.Whether_Store_Admin == false || CustomerData.Whether_Store_Admin == null) {
                                res.send(new ApiResponce({
                                    success: true,
                                    extras: {
                                        LoginStatus: false,
                                        Status: "You are Not Registered in Ezshipp Stores.Please Contact Customer Care at " + config.Ezshipp_Customer__Care
                                    }
                                }));
                            } else if (CustomerData.Whether_Store_Admin == true) {
                                if (CustomerData.StoreAdminStatus == false || CustomerData.StoreAdminStatus == null) {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            LoginStatus: false,
                                            Status: "You Account for Ezshipp Stores is Inactive.Please Contact Customer Care at " + config.Ezshipp_Customer__Care
                                        }
                                    }));
                                } else if (CustomerData.StoreAdminStatus == true) {
                                    CustomerMod.CustomerSignIn(req.body, CustomerData, function (err, LoginStatus) {
                                        if (err) {
                                            res.send(JSON.stringify(LoginStatus));
                                        } else {
                                            CustomerMod.Check_Customer_Session_Stores(CustomerData, function (err, SessionStatus) {
                                                if (err) {
                                                    CustomerMod.RegisteringCustomerSession_Store(CustomerData, function (err, SessionData) {
                                                        console.log("Entering New One")
                                                        SendBranchValues(SessionData);
                                                    })
                                                } else {
                                                    CustomerMod.UpdatingCustomerSession_Store(CustomerData, function (err, SessionData) {
                                                        console.log("Entering Updated One")
                                                        SendBranchValues(SessionData);
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        }
                    })
                }
            })
            function SendBranchValues(SessionData) {
                var query = {
                    'AdminData.StoreAdminID': SessionData.extras.StoreAdminData.StoreAdminID
                }
                var Store_Branch = require("../Models/Store_Branch.js");
                Store_Branch.find(query).sort({ created_at: -1 }).exec(function (err, Result) {
                    if (!err) {
                        var BranchData = [];
                        async.each(Result, function (item, callback) {
                            BranchData.push({
                                BranchID: item.BranchID,
                                Branch_Name: item.Branch_Name,
                                Branch_PhoneNumber: item.Branch_PhoneNumber,
                                Address: item.Address,
                                Branch_Image_URL: config.S3URL + item.Branch_Image_URL
                            })
                            callback();
                        }, function (err) {
                            if (!err) {
                                res.send(new ApiResponce({
                                    success: true,
                                    extras: {
                                        Status: "Login Successfully",
                                        StoreAdminData: {
                                            StoreAdminID: SessionData.extras.StoreAdminData.StoreAdminID,
                                            SessionID: SessionData.extras.StoreAdminData.SessionID,
                                            First_name: SessionData.extras.StoreAdminData.First_name,
                                            First_Time_Login: SessionData.extras.StoreAdminData.First_Time_Login,
                                            BranchData: BranchData,
                                            Active_BranchID_Exist: SessionData.extras.StoreAdminData.Active_BranchID_Exist,
                                            Active_BranchID: SessionData.extras.StoreAdminData.Active_BranchID
                                        },
                                        LoginStatus: true
                                    }
                                }));
                            }
                        })
                    }
                })
            }
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    })



    /***************************
     *
     * Store Modules
     *
     */
    //Find All Level 2 categories of Branch
    app.post('/Find_All_Level3_Categries', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.Level2CategoryID != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_for_Level2_CategoryID(req.body, function (err, Level2Data) {
                                if (err) {
                                    res.send(JSON.stringify(Level2Data));
                                } else {
                                    var query = {
                                        Level2CategoryID: req.body.Level2CategoryID
                                    }
                                    Store_SubCategory_level3.find(query).sort('Level3CategoryName').select('Level3CategoryID Level3CategoryName -_id').exec(function (err, Level3Data) {
                                        if (!err) {

                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    Level3Data: Level3Data
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
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    })

    //Find All Level 2 categories of Branch
    app.post('/Find_All_Level2_Categries', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.BranchID != null && req.body.CategoryID != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                                if (err) {
                                    res.send(JSON.stringify(BranchData));
                                } else {
                                    StoreMod.Check_for_CategoryID(req.body, function (err, CategoryData) {
                                        if (err) {
                                            res.send(JSON.stringify(CategoryData));
                                        } else {
                                            var query = {
                                                CategoryID: req.body.CategoryID,
                                                BranchID: req.body.BranchID
                                            }
                                            Store_SubCategory_level2.find(query).sort('Level2CategoryName').select('Level2CategoryID Level2CategoryName -_id').exec(function (err, Result) {
                                                if (!err) {
                                                    var Level2Data = [];
                                                    async.eachSeries(Result, function (item, callback) {
                                                        Store_SubCategory_level3.count({ Level2CategoryID: item.Level2CategoryID }, function (err, Count) {
                                                            if (Count >= 1) {
                                                                Level3Available = true;
                                                                Level2Data.push({
                                                                    Level2CategoryID: item.Level2CategoryID,
                                                                    Level2CategoryName: item.Level2CategoryName,
                                                                    Level3Available: Level3Available
                                                                })
                                                                callback();
                                                            } else if (Count < 1) {
                                                                Level3Available = false;
                                                                Level2Data.push({
                                                                    Level2CategoryID: item.Level2CategoryID,
                                                                    Level2CategoryName: item.Level2CategoryName,
                                                                    Level3Available: Level3Available
                                                                })
                                                                callback();
                                                            }
                                                        })
                                                    }, function (err) {
                                                        if (!err) {
                                                            res.send(new ApiResponce({
                                                                success: true,
                                                                extras: {
                                                                    Level2Data: Level2Data
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
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    })


    //Find All Store Products Admin
    app.post('/Find_All_Store_Products_Admin_Dashboard', function (req, res) {
        if (req.body.skip != null && req.body.BranchID != null) {
            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                if (err) {
                    console.log("resp3")
                    res.send(JSON.stringify(BranchData));
                } else {
                    StoreMod.Find_All_Store_Products(req.body, function (Result) {
                        res.send(JSON.stringify(Result))
                    })
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
    });
    //Search All Store Orders Admin
    app.post('/Search_All_Store_Branch_Orders_Admin_Dashboard', function (req, res) {
        if (req.body.SearchValue != null && req.body.BranchID != null) {
            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                if (err) {
                    console.log("resp3")
                    res.send(JSON.stringify(BranchData));
                } else {
                    StoreMod.Search_All_Store_Branch_Orders(req.body, function (Result) {
                        res.send(JSON.stringify(Result))
                    })
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
    });
    //Find All Store Orders Admin
    app.post('/Find_All_Store_Branch_Orders_Admin_Dashboard', function (req, res) {
        if (req.body.skip != null && req.body.BranchID != null) {
            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                if (err) {
                    res.send(JSON.stringify(BranchData));
                } else {
                    StoreMod.Find_All_Store_Branch_Orders(req.body, function (Result) {
                        res.send(JSON.stringify(Result))
                    })
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
    });
    //Search All Store Products Admin Dashboard
    app.post('/Search_All_Store_Products_Admin_Dashboard', function (req, res) {
        if (req.body.SearchValue != null && req.body.BranchID != null) {
            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                if (err) {
                    console.log("resp3")
                    res.send(JSON.stringify(BranchData));
                } else {
                    StoreMod.Search_All_Store_Products(req.body, function (Result) {
                        res.send(JSON.stringify(Result))
                    })
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
    });
    //Search All Store Orders mystore
    app.post('/Search_All_Store_Branch_Orders', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.SearchValue != null && req.body.BranchID != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                                if (err) {
                                    res.send(JSON.stringify(BranchData));
                                } else {
                                    StoreMod.Search_All_Store_Branch_Orders(req.body, function (Result) {
                                        res.send(JSON.stringify(Result))
                                    })
                                }
                            })
                        }
                    })
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
    });
    //Find All Store Orders my store
    app.post('/Find_All_Store_Branch_Orders', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.skip != null && req.body.BranchID != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                                if (err) {
                                    res.send(JSON.stringify(BranchData));
                                } else {
                                    StoreMod.Find_All_Store_Branch_Orders(req.body, function (Result) {
                                        res.send(JSON.stringify(Result))
                                    })
                                }
                            })
                        }
                    })
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
    });

    //Search All Store Products
    app.post('/Search_All_Store_Products', function (req, res) {
        if (req.body.SessionID != null && req.body.SearchValue != null && req.body.StoreAdminID != null && req.body.BranchID != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                                if (err) {
                                    res.send(JSON.stringify(BranchData));
                                } else {
                                    StoreMod.Search_All_Store_Products(req.body, function (Result) {
                                        res.send(JSON.stringify(Result))
                                    })
                                }
                            })
                        }
                    })
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


    //Find All Store Products
    app.post('/Find_All_Store_Products', function (req, res) {
        if (req.body.SessionID != null && req.body.skip != null && req.body.StoreAdminID != null && req.body.BranchID != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                                if (err) {
                                    console.log("resp3")
                                    res.send(JSON.stringify(BranchData));
                                } else {
                                    StoreMod.Find_All_Store_Products(req.body, function (Result) {
                                        res.send(JSON.stringify(Result))
                                    })
                                }
                            })
                        }
                    })
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

    //Remove Product Image
    app.post('/Remove_Product_Image', function (req, res) {
        if (req.body.ImageID != null) {
            StoreMod.Check_for_Product_Image(req.body, function (err, ImageData) {
                if (err) {
                    res.send(JSON.stringify(ImageData))
                } else {
                    if (ImageData.Whether_Image_Used == false) {
                        StoreMod.Remove_Product_Image(req.body, function (Result) {
                            res.send(JSON.stringify(Result));
                        })
                    } else {
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.Product_Image_Used
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
    });

    //Add Product Image
    app.post('/Create_Product_Image', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.BranchID != null && req.body.Picture != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    console.log("resp1")
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            console.log("resp2")
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                                if (err) {
                                    console.log("resp3")
                                    res.send(JSON.stringify(BranchData));
                                } else {
                                    StoreMod.Create_Product_Image(req.body, function (Result) {
                                        res.send(JSON.stringify(Result))
                                    })
                                }
                            })
                        }
                    })
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
    });
    //Act Product
    app.post('/Activate_Product', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.ProductID != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_for_Product(req.body, function (err, ProductData) {
                                if (err) {
                                    res.send(JSON.stringify(ProductData));
                                } else {
                                    StoreMod.Activate_Product(req.body, function (err, Result) {
                                        if (!err) {
                                            res.send(JSON.stringify(Result));
                                        }
                                    })
                                }
                            })
                        }
                    })
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

    //Remove or Inactive Product
    app.post('/Remove_Inactive_Product', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.ProductID != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_for_Product(req.body, function (err, ProductData) {
                                if (err) {
                                    res.send(JSON.stringify(ProductData));
                                } else {
                                    StoreMod.Remove_Inactive_Product(req.body, function (err, Result) {
                                        if (!err) {
                                            res.send(JSON.stringify(Result));
                                        }
                                    })
                                }
                            })
                        }
                    })
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
    //Edit Product Image
    app.post('/Update_Product_Image', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null
            && req.body.ProductID != null && req.body.Picture != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_for_Product(req.body, function (err, ProductData) {
                                if (err) {
                                    res.send(JSON.stringify(ProductData));
                                } else {
                                    StoreMod.Update_Product_Image(req.body, ProductData, function (err, Result) {
                                        if (!err) {
                                            res.send(JSON.stringify(Result));
                                            StoreMod.DeleteAWSImage(ProductData.ImageURL, function (err, DeleteStatus) {
                                                console.log(DeleteStatus);
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
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


    //Edit Product Information
    app.post('/Edit_Product_Information', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.ProductID != null
            && req.body.ProductName != null && req.body.ProductDescription != null
            && req.body.Level2CategoryAvailable != null && req.body.Level3CategoryAvailable != null
            && req.body.Actual_Price != null && req.body.Selling_Price != null && req.body.OfferAvailable != null && req.body.OfferPercent != null
            && req.body.ProductWeight != null && req.body.ProductName != "" && req.body.Avaiable_Quantity != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_for_Product(req.body, function (err, ProductData) {
                                if (err) {
                                    res.send(JSON.stringify(ProductData));
                                } else {
                                    StoreMod.Edit_Product_Information(req.body, function (err, Result) {
                                        if (!err) {
                                            res.send(JSON.stringify(Result));
                                            if (req.body.Level2CategoryAvailable == true || req.body.Level2CategoryAvailable == "true") {
                                                //Do level2 Categories Functionality
                                                StoreMod.Update_Do_Level2_Functionality(req.body, ProductData, function (err, Level2Status, Level2CategoryData) {
                                                    if (!err) {
                                                        if (req.body.Level3CategoryAvailable == true || req.body.Level3CategoryAvailable == "true") {
                                                            //Do level3 Categories Functionality
                                                            StoreMod.Update_Do_Level3_Functionality(req.body, ProductData, Level2CategoryData, function (CategoryLevel3Staus) {
                                                            })
                                                        } else {
                                                            //Do nothing Level3 categories functionalities
                                                        }
                                                    }
                                                })
                                            } else {
                                                //Do nothing
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
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
    //Add Product BY EXCEL
    app.post('/Add_Store_Product_EXCEL', function (req, res) {
        console.log("body  product");
        console.log(req.body);
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.BranchID != null && req.body.CategoryID != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                                if (err) {
                                    res.send(JSON.stringify(BranchData));
                                } else {
                                    StoreMod.Check_for_CategoryID(req.body, function (err, CategoryData) {
                                        if (err) {
                                            res.send(JSON.stringify(CategoryData));
                                        } else {
                                            if (req.body.ProductName != null && req.body.ProductDescription != null
                                                && req.body.Level2CategoryAvailable != null && req.body.Level3CategoryAvailable != null
                                                && req.body.Actual_Price != null && req.body.Selling_Price != null && req.body.OfferAvailable != null && req.body.OfferPercent != null
                                                && req.body.ProductWeight != null && req.body.ProductName != ""
                                                && req.body.Avaiable_Quantity != null && req.body.Product_Addon_Available != null && req.body.Whether_Existing_Product_Addon != null) {
                                                //Validating Product Addon's
                                                StoreMod.Check_for_Product_Addons(req.body, function (err, AddonStatus) {
                                                    if (err) {
                                                        res.send(AddonStatus);
                                                    } else {
                                                        //Validate Sub Categories
                                                        StoreMod.Validate_Level2_Level3_Category(req.body, function (err, ValidityStatus) {
                                                            if (err) {
                                                                res.send(new ApiResponce({
                                                                    success: false,
                                                                    extras: {
                                                                        msg: ApiMessages.ENTER_ALL_TAGS
                                                                    }
                                                                }));
                                                            } else {
                                                                //Store Product Information
                                                                StoreMod.Store_Product_Information_Excel(req.body, BranchData, CategoryData, function (err, Result, ProductData) {
                                                                    res.send(JSON.stringify(Result));
                                                                    if (!err) {
                                                                        if (req.body.Level2CategoryAvailable == true || req.body.Level2CategoryAvailable == "true") {
                                                                            //Do level2 Categories Functionality
                                                                            StoreMod.Do_Level2_Functionality(req.body, BranchData, CategoryData, ProductData, function (err, Level2Status, Level2CategoryData) {
                                                                                if (!err) {
                                                                                    if (req.body.Level3CategoryAvailable == true || req.body.Level3CategoryAvailable == "true") {
                                                                                        //Do level3 Categories Functionality
                                                                                        StoreMod.Do_Level3_Functionality(req.body, CategoryData, ProductData, Level2CategoryData, function (CategoryLevel3Staus) {
                                                                                        })
                                                                                    } else {
                                                                                        //Do nothing Level3 categories functionalities
                                                                                    }
                                                                                }
                                                                            })
                                                                        } else {
                                                                            //Do nothing
                                                                        }
                                                                        if (req.body.Product_Addon_Available == true || req.body.Product_Addon_Available == "true") {
                                                                            //Do Addon Functionality
                                                                            if (req.body.Whether_Existing_Product_Addon == true || req.body.Whether_Existing_Product_Addon == "true") {
                                                                                //Addon Already Exist
                                                                                StoreMod.Check_for_Product_AddonsID(req.body, function (err, AddonData) {
                                                                                    if (err) {
                                                                                    } else {
                                                                                        StoreMod.Update_Product_Addon_to_Product(AddonData, ProductData, function (UpdatedStatus) {

                                                                                        })
                                                                                    }
                                                                                })
                                                                            } else {
                                                                                //Addon not exist , so create Addon
                                                                                StoreMod.Create_Product_Addon(req.body, BranchData, function (err, AddonStatus, AddonData) {
                                                                                    if (!err) {
                                                                                        //Update Addon Data to Product
                                                                                        StoreMod.Update_Product_Addon_to_Product(AddonData, ProductData, function (UpdatedStatus) {

                                                                                        })
                                                                                    }
                                                                                })
                                                                            }
                                                                        } else {
                                                                            //Product Addo Not Available
                                                                        }

                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            } else {
                                                console.log("resp8")
                                                res.send(new ApiResponce({
                                                    success: false,
                                                    extras: {
                                                        msg: ApiMessages.ENTER_ALL_TAGS
                                                    }
                                                }));
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
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
    });



    //Edit Product Image Temporary
    app.post('/Product_Image_Temporary', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.ProductID != null && req.body.ImageID != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_for_Product(req.body, function (err, ProductData) {
                                if (err) {
                                    res.send(JSON.stringify(ProductData));
                                } else {
                                    StoreMod.Check_for_Product_Image(req.body, function (err, ImageData) {
                                        if (err) {
                                            res.send(JSON.stringify(ImageData))
                                        } else {
                                            StoreMod.Product_Image_Temporary(req.body, ImageData, function (err, Result) {
                                                res.send(JSON.stringify(Result));
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
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
    });
    app.post('/Find_All_Drivers_With_Ongoing_Orders', function (req, res) {
        if (req.body.skip != null && req.body.limit != null) {
            var toSkip = parseInt(req.body.skip);
            var toLimit = parseInt(req.body.limit);
            Drivers.count({ acc_status: 3 }).exec(function (err, Count) {
                if (Count >= 0) {
                    var DriverData = [];
                    Drivers.find({ acc_status: 3 }).skip(toSkip).limit(toLimit).exec(function (err, DriverResult) {
                        async.eachSeries(DriverResult, function (item, callback) {
                            var OrderQuery = {
                                "eventLog.driverid": String(item._id),
                                "Whether_Deleted": false,
                                "status": {
                                    $in: [7, 16, 10, 11, 12, 15, 18, 20]
                                }
                            }
                            Orders.find(OrderQuery).exec(function (err, Result) {
                                var t = 0;
                                var count = 0;
                                var OrderData = [];
                                for (var i = 0; i < Result.length; i++) {
                                    var last = Result[i].eventLog.length;
                                    if (Result[i].eventLog[last - 1].driverid == String(item._id)) {
                                        var date = moment(Result[i].Date).utcOffset(330).format('MMM-DD,YYYY h:mm:ss A');
                                        var Order_Accepted_Time = "";
                                        var Order_Completed_Time = "";
                                        var Order_Journey_Time = "";
                                        var Order_Total_Time = "";

                                        if (Result[i].Order_Accepted_Time != null) {
                                            Order_Accepted_Time = moment(Result[i].Order_Accepted_Time).utcOffset(330).format('MMM-DD,YYYY h:mm:ss A');
                                        }
                                        if (Result[i].Order_Completed_Time != null) {
                                            Order_Completed_Time = moment(Result[i].Order_Completed_Time).utcOffset(330).format('MMM-DD,YYYY h:mm:ss A');
                                        }
                                        if (Result[i].Order_Journey_Time != null) {
                                            Order_Journey_Time = Result[i].Order_Journey_Time
                                        }
                                        if (Result[i].Order_Total_Time != null) {
                                            Order_Total_Time = Result[i].Order_Total_Time
                                        }
                                        OrderData.push({
                                            orderId: Result[i]._id,
                                            orderseqId: Result[i].orderseqId,
                                            WhetherStoreOrder: Result[i].WhetherStoreOrder,
                                            BranchID: Result[i].BranchID,
                                            CartID: Result[i].CartID,
                                            StoreName: Result[i].StoreName,
                                            StorePhoneNumber: Result[i].StorePhoneNumber,
                                            StoreEmailID: Result[i].StoreEmailID,
                                            StoreAddress: Result[i].StoreAddress,
                                            Cart_Amount: Result[i].Cart_Amount,
                                            Cart_Parcel_Wieght: Result[i].Cart_Parcel_Wieght,
                                            StoreCartData: Result[i].StoreCartData,
                                            CustomerID: Result[i].userId,
                                            customerName: Result[i].customerName,
                                            customerPhone: Result[i].customerPhone,
                                            customerEmail: Result[i].customerEmail,
                                            SenderName: Result[i].SenderName,
                                            SenderPhoneNumber: Result[i].SenderPhoneNumber,
                                            status: Result[i].status,
                                            receiverName: Result[i].receiverName,
                                            receiverPhone: Result[i].receiverPhone,
                                            date: date,
                                            Order_Accepted_Time: Order_Accepted_Time,
                                            Order_Completed_Time: Order_Completed_Time,
                                            Order_Journey_Time: Order_Journey_Time,
                                            Order_Total_Time: Order_Total_Time,
                                            orderType: Result[i].orderType,
                                            bookingType: Result[i].bookingType,
                                            pickAddress: Result[i].pickAddress,
                                            dropAddress: Result[i].dropAddress,
                                            pickup_Flat_Details: Result[i].pickup_Flat_Details,
                                            pickup_Landmark: Result[i].pickup_Landmark,
                                            drop_Flat_Details: Result[i].drop_Flat_Details,
                                            drop_Landmark: Result[i].drop_Landmark,
                                            pickLatitude: Result[i].pickLocation.Latitude,
                                            pickLongitude: Result[i].pickLocation.Longitude,
                                            dropLatitude: Result[i].dropLocation.Latitude,
                                            dropLongitude: Result[i].dropLocation.Longitude,
                                            paymentType: Result[i].paymentType,
                                            paymentId: Result[i].paymentId,
                                            itemName: Result[i].itemName,
                                            itemDescription: Result[i].itemDescription,
                                            deliverycharge: Result[i].deliverycharge,
                                            subtotal_amount: Result[i].subtotal_amount,
                                            total_amount: Result[i].total_amount,
                                            item_actual_cost: Result[i].item_actual_cost,
                                            customerSign: Result[i].customerSign,
                                            ratingflag: Result[i].ratingflag,
                                            reviewMsg: Result[i].reviewMsg,
                                            Whether_Deleted: Result[i].Whether_Deleted,
                                            barcodeid: Result[i].barcodeid,
                                            ratingNum: Result[i].ratingNum
                                        })
                                        t++;
                                        count++;
                                    } else {
                                        t++;
                                    }
                                }
                                DriverData.push({
                                    DriverID: String(item._id),
                                    DriverName: String(item.name) + ' ' + String(item.lname),
                                    DriverEmail: item.email,
                                    DriverPhoneNumber: item.phone,
                                    OrdersCount: count,
                                    OrderData: OrderData,
                                    status: item.status,
                                    LastOnline: item.LastOnline
                                });
                                callback();
                            })
                        }, function (err) {
                            if (!err) {
                                res.send(new ApiResponce({
                                    success: true,
                                    extras: {
                                        DriverData: DriverData,
                                        Count: Count
                                    }
                                }));
                            }
                        })
                    })
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
    app.post('/Find_All_Drivers_With_Ongoing_Orders_Count', function (req, res) {
        Drivers.find({ acc_status: 3 }).exec(function (err, Result) {
            if (err) {
                console.log(err);
            } else {
                var DriverData = [];
                async.eachSeries(Result, function (item, callback) {
                    var CountQuery = {
                        "eventLog.driverid": String(item._id),
                        "Whether_Deleted": false,
                        "status": {
                            $in: [7, 16, 10, 11, 12, 15, 18, 20]
                        }
                    }
                    var count = 0;
                    Orders.find(CountQuery, { eventLog: 1 }).exec(function (err, Result) {
                        var t = 0;
                        for (var i = 0; i < Result.length; i++) {
                            var last = Result[i].eventLog.length;
                            if (Result[i].eventLog[last - 1].driverid == String(item._id)) {
                                count++;
                                t++;
                            } else {
                                t++;
                            }
                        }
                        DriverData.push({
                            DriverID: String(item._id),
                            DriverName: String(item.name) + ' ' + String(item.lname),
                            DriverEmail: item.email,
                            DriverPhoneNumber: item.phone,
                            OrdersCount: count,
                            status: item.status,
                            LastOnline: item.LastOnline
                        });
                        callback();
                    })

                }, function (err) {
                    if (!err) {
                        res.send(new ApiResponce({
                            success: true,
                            extras: {
                                DriverData: DriverData
                            }
                        }));
                    }
                })
            }
        })
    })

    //Add Active Store Admin Branch
    app.post('/Set_Admin_Active_Branch', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.BranchID != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                                if (err) {
                                    res.send(JSON.stringify(BranchData));
                                } else {
                                    Customers.update({
                                        _id: StoreAdminData._id
                                    },
                                        {
                                            Active_BranchID_Exist: true,
                                            Active_BranchID: BranchData.BranchID
                                        }, {
                                            multi: true
                                        }).exec(function (err, Result) {
                                            if (!err) {
                                                res.send(new ApiResponce({
                                                    success: true,
                                                    extras: {
                                                        Status: "Store Admin Active Branch Set"
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
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    })

    //Add Product
    app.post('/Add_Store_Product', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.BranchID != null && req.body.CategoryID != null && req.body.ImageID != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus))
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                                if (err) {
                                    res.send(JSON.stringify(BranchData));
                                } else {
                                    StoreMod.Check_for_CategoryID(req.body, function (err, CategoryData) {
                                        if (err) {
                                            res.send(JSON.stringify(CategoryData));
                                        } else {
                                            StoreMod.Check_for_Product_Image(req.body, function (err, ImageData) {
                                                if (err) {
                                                    res.send(JSON.stringify(ImageData))
                                                } else {
                                                    if (req.body.ProductName != null && req.body.ProductDescription != null
                                                        && req.body.Level2CategoryAvailable != null && req.body.Level3CategoryAvailable != null
                                                        && req.body.Actual_Price != null && req.body.Selling_Price != null && req.body.OfferAvailable != null && req.body.OfferPercent != null
                                                        && req.body.ProductWeight != null && req.body.ProductName != ""
                                                        && req.body.Avaiable_Quantity != null && req.body.Product_Addon_Available != null && req.body.Whether_Existing_Product_Addon != null) {
                                                        //Validating Product Addon's
                                                        StoreMod.Check_for_Product_Addons(req.body, function (err, AddonStatus) {
                                                            if (err) {
                                                                res.send(AddonStatus);
                                                            } else {
                                                                //Validate Sub Categories
                                                                StoreMod.Validate_Level2_Level3_Category(req.body, function (err, ValidityStatus) {
                                                                    if (err) {
                                                                        res.send(new ApiResponce({
                                                                            success: false,
                                                                            extras: {
                                                                                msg: ApiMessages.ENTER_ALL_TAGS
                                                                            }
                                                                        }));
                                                                    } else {
                                                                        //Store Product Information
                                                                        StoreMod.Store_Product_Information(req.body, BranchData, CategoryData, ImageData, function (err, Result, ProductData) {
                                                                            res.send(JSON.stringify(Result));
                                                                            if (!err) {
                                                                                StoreMod.Update_Image_Used(ImageData, function (err, ImageStatus) {
                                                                                    if (!err) {
                                                                                        if (req.body.Level2CategoryAvailable == true || req.body.Level2CategoryAvailable == "true") {
                                                                                            //Do level2 Categories Functionality
                                                                                            StoreMod.Do_Level2_Functionality(req.body, BranchData, CategoryData, ProductData, function (err, Level2Status, Level2CategoryData) {
                                                                                                if (!err) {
                                                                                                    if (req.body.Level3CategoryAvailable == true || req.body.Level3CategoryAvailable == "true") {
                                                                                                        //Do level3 Categories Functionality
                                                                                                        StoreMod.Do_Level3_Functionality(req.body, CategoryData, ProductData, Level2CategoryData, function (CategoryLevel3Staus) {
                                                                                                        })
                                                                                                    } else {
                                                                                                        //Do nothing Level3 categories functionalities
                                                                                                    }
                                                                                                }
                                                                                            })
                                                                                        } else {
                                                                                            //Do nothing
                                                                                        }
                                                                                        if (req.body.Product_Addon_Available == true || req.body.Product_Addon_Available == "true") {
                                                                                            //Do Addon Functionality
                                                                                            if (req.body.Whether_Existing_Product_Addon == true || req.body.Whether_Existing_Product_Addon == "true") {
                                                                                                //Addon Already Exist
                                                                                                StoreMod.Check_for_Product_AddonsID(req.body, function (err, AddonData) {
                                                                                                    if (err) {
                                                                                                    } else {
                                                                                                        StoreMod.Update_Product_Addon_to_Product(AddonData, ProductData, function (UpdatedStatus) {

                                                                                                        })
                                                                                                    }
                                                                                                })
                                                                                            } else {
                                                                                                //Addon not exist , so create Addon
                                                                                                StoreMod.Create_Product_Addon(req.body, BranchData, function (err, AddonStatus, AddonData) {
                                                                                                    if (!err) {
                                                                                                        //Update Addon Data to Product
                                                                                                        StoreMod.Update_Product_Addon_to_Product(AddonData, ProductData, function (UpdatedStatus) {

                                                                                                        })
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                        } else {
                                                                                            //Product Addo Not Available
                                                                                        }
                                                                                    }
                                                                                })
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    } else {
                                                        console.log("resp8")
                                                        res.send(new ApiResponce({
                                                            success: false,
                                                            extras: {
                                                                msg: ApiMessages.ENTER_ALL_TAGS
                                                            }
                                                        }));
                                                    }
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
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    //View All Customer Orders
    app.post('/VIEW_ALL_CUSTOMER_ORDERS', function (req, res) {
        if (req.body.CustomerID != null && req.body.skip != null) {
            var CustomerMod = new customermod();
            CustomerMod.Check_for_CustomerID(req.body, function (err, responcer) {
                if (err) {
                    res.send(JSON.stringify(responcer));
                } else {
                    CustomerMod.VIEW_ALL_CUSTOMER_ORDERS(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    //View Branch in Detail
    app.post('/Business_Branch_Details', function (req, res) {
        if (req.body.BranchID != null) {
            console.log("Entering Business Details");
            console.log(req.body);
            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                if (err) {
                    res.send(JSON.stringify(BranchData));
                } else {
                    StoreMod.Business_Branch_Details(BranchData, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });

    //Search All Business Branches
    app.post('/Search_All_Ezshipp_Business_Branches', function (req, res) {
        if (req.body.SearchValue != null && req.body.sort_type != null) {
            StoreMod.Search_All_Ezshipp_Business_Branches(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    //Find All Entity Branch
    app.post('/Find_All_Ezshipp_Business_Branches', function (req, res) {
        if (req.body.skip != null && req.body.sort_type != null) {
            StoreMod.Find_All_Ezshipp_Business_Branches(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });


    //Find All Entities
    app.post('/Find_All_Entities_Name', function (req, res) {
        StoreMod.Find_All_Entities_Name(function (Result) {
            res.send(JSON.stringify(Result));
        })
    });

    //View Branch in Details
    app.post('/Branch_In_Detail', function (req, res) {
        if (req.body.BranchID != null) {
            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                if (err) {
                    res.send(JSON.stringify(BranchData));
                } else {
                    StoreMod.Branch_In_Detail(BranchData, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    //Edit Timings
    app.post('/Edit_Branch_Timings', function (req, res) {
        if (req.body.BranchID != null && req.body.Monday_Available != null && req.body.Tuesday_Available != null
            && req.body.Wednesday_Available != null && req.body.Thursday_Available != null
            && req.body.Friday_Available != null && req.body.Saturday_Available != null && req.body.Sunday_Available != null) {
            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                if (err) {
                    res.send(JSON.stringify(BranchData));
                } else {
                    StoreMod.Edit_Branch_Timings(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    //Activate the Inactive Branch
    app.post('/Activate_Store_Branch', function (req, res) {
        if (req.body.BranchID != null) {

            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                if (err) {
                    res.send(JSON.stringify(BranchData));
                } else {
                    StoreMod.Activate_Store_Branch(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    //Inactivate the active Branch
    app.post('/Inactivate_Store_Branch', function (req, res) {
        if (req.body.BranchID != null) {

            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                if (err) {
                    res.send(JSON.stringify(BranchData));
                } else {
                    StoreMod.Inactivate_Store_Branch(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });

    //Edit Branch Image
    app.post('/Update_Branch_Image', function (req, res) {
        if (req.body.BranchID != null && req.body.Picture != null) {

            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                if (err) {
                    res.send(JSON.stringify(BranchData));
                } else {
                    StoreMod.Update_Branch_Image(req.body, function (err, Result) {
                        if (!err) {
                            res.send(JSON.stringify(Result));
                            StoreMod.DeleteAWSImage(BranchData.Branch_Image_URL, function (err, DeleteStatus) {
                                console.log(DeleteStatus);
                            })
                        }
                    })
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
    });
    //Edit Timings
    app.post('/Edit_Branch_Timings_Store_Admin', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.BranchID != null && req.body.Monday_Available != null && req.body.Tuesday_Available != null
            && req.body.Wednesday_Available != null && req.body.Thursday_Available != null
            && req.body.Friday_Available != null && req.body.Saturday_Available != null && req.body.Sunday_Available != null) {
            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                if (err) {
                    res.send(JSON.stringify(BranchData));
                } else {
                    StoreMod.Edit_Branch_Timings_Store_Admin(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    //Edit Branch Image
    app.post('/Update_Branch_Image_Store_Admin', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null && req.body.BranchID != null && req.body.Picture != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus));
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                                if (err) {
                                    res.send(JSON.stringify(BranchData));
                                } else {
                                    StoreMod.Update_Branch_Image_Store_Admin(req.body, function (err, Result) {
                                        if (!err) {
                                            res.send(JSON.stringify(Result));
                                            StoreMod.DeleteAWSImage(BranchData.Branch_Image_URL, function (err, DeleteStatus) {
                                                console.log(DeleteStatus);
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
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
    });
    //Edit Store Branch Address
    app.post('/Edit_Store_Branch_Address', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null &&
            req.body.BranchID != null && req.body.Address != null && req.body.Address != "" &&
            req.body.Latitude != null && req.body.Longitude != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus));
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                                if (err) {
                                    res.send(JSON.stringify(BranchData));
                                } else {
                                    var Store_Branch = require("../Models/Store_Branch.js");
                                    var query = {
                                        BranchID: req.body.BranchID
                                    };
                                    var changes = {
                                        $set: {
                                            Address: req.body.Address,
                                            Latitude: parseFloat(req.body.Latitude),
                                            Longitude: parseFloat(req.body.Longitude),
                                            Point: [parseFloat(req.body.Longitude), parseFloat(req.body.Latitude)],
                                            Branch_Approval_Accepted: false,
                                            Status: false
                                        }
                                    };
                                    var multiplicity = {
                                        multi: false
                                    };
                                    Store_Branch.update(query, changes, multiplicity).exec(function (err, Result) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    Status: "Branch Address Updated Successfully"
                                                }
                                            }))
                                        }
                                    })
                                }
                            })
                        }
                    })
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
    });
    //Edit Store Branch Description
    app.post('/Edit_Store_Branch_Description', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null &&
            req.body.BranchID != null && req.body.Description != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus));
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                                if (err) {
                                    res.send(JSON.stringify(BranchData));
                                } else {
                                    var Store_Branch = require("../Models/Store_Branch.js");
                                    var query = {
                                        BranchID: req.body.BranchID
                                    };
                                    var changes = {
                                        $set: {
                                            Description: req.body.Description,
                                            Branch_Approval_Accepted: false,
                                            Status: false
                                        }
                                    };
                                    var multiplicity = {
                                        multi: false
                                    };
                                    Store_Branch.update(query, changes, multiplicity).exec(function (err, Result) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    Status: "Branch Description Updated Successfully"
                                                }
                                            }))
                                        }
                                    })
                                }
                            })
                        }
                    })
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
    });

    //Edit Store Branch Website
    app.post('/Edit_Store_Branch_Website', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null &&
            req.body.BranchID != null && req.body.Website != null) {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus));
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                                if (err) {
                                    res.send(JSON.stringify(BranchData));
                                } else {

                                    var Store_Branch = require("../Models/Store_Branch.js");
                                    var query = {
                                        BranchID: req.body.BranchID
                                    };
                                    var changes = {
                                        $set: {
                                            Website: req.body.Website,
                                            Branch_Approval_Accepted: false,
                                            Status: false
                                        }
                                    };
                                    var multiplicity = {
                                        multi: false
                                    };
                                    Store_Branch.update(query, changes, multiplicity).exec(function (err, Result) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    Status: "Branch Website Updated Successfully"
                                                }
                                            }))
                                        }
                                    })

                                }
                            })
                        }
                    })
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
    });


    //Edit Store Branch Phone Number
    app.post('/Edit_Store_Branch_Phone_Number', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null &&
            req.body.BranchID != null && req.body.Branch_PhoneNumber != null && req.body.Branch_PhoneNumber != "") {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus));
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                                if (err) {
                                    res.send(JSON.stringify(BranchData));
                                } else {

                                    var Store_Branch = require("../Models/Store_Branch.js");
                                    var query = {
                                        BranchID: req.body.BranchID
                                    };
                                    var changes = {
                                        $set: {
                                            Branch_PhoneNumber: req.body.Branch_PhoneNumber,
                                            Branch_Approval_Accepted: false,
                                            Status: false
                                        }
                                    };
                                    var multiplicity = {
                                        multi: false
                                    };
                                    Store_Branch.update(query, changes, multiplicity).exec(function (err, Result) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    Status: "Branch Phone Number Updated Successfully"
                                                }
                                            }))
                                        }
                                    })

                                }
                            })
                        }
                    })
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
    });


    //Edit Store Branch Name
    app.post('/Edit_Store_Branch_Name', function (req, res) {
        if (req.body.SessionID != null && req.body.StoreAdminID != null &&
            req.body.BranchID != null && req.body.Branch_Name != null && req.body.Branch_Name != "") {
            StoreMod.CheckSessionID(req.body, function (err, SessionStatus) {
                if (err) {
                    res.send(JSON.stringify(SessionStatus));
                } else {
                    StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminData));
                        } else {
                            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                                if (err) {
                                    res.send(JSON.stringify(BranchData));
                                } else {
                                    var Branch_Name = String(req.body.Branch_Name);
                                    Branch_Name = Branch_Name.replace(/\s\s+/g, ' ');
                                    Branch_Name = Branch_Name.replace(/  +/g, ' ');
                                    Branch_Name = Branch_Name.replace(/^ /, '');
                                    Branch_Name = Branch_Name.replace(/\s\s*$/, '');
                                    Branch_Name = format_str(Branch_Name);
                                    var Store_Branch = require("../Models/Store_Branch.js");
                                    var query = {
                                        BranchID: req.body.BranchID
                                    };
                                    var changes = {
                                        $set: {
                                            Branch_Name: Branch_Name,
                                            Branch_Approval_Accepted: false,
                                            Status: false
                                        }
                                    };
                                    var multiplicity = {
                                        multi: false
                                    };
                                    Store_Branch.update(query, changes, multiplicity).exec(function (err, Result) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    Status: "Branch Name Updated Successfully"
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
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    })

    //Edit Branch Information
    app.post('/Edit_Branch_Information', function (req, res) {
        if (req.body.BranchID != null && req.body.Branch_Name != null && req.body.Branch_PhoneNumber != null &&
            req.body.Website != null && req.body.Description != null && req.body.CategoryName != null
            && req.body.CityID != null && req.body.CountryID != null && req.body.Address != null
            && req.body.Latitude != null && req.body.Longitude != null && req.body.Branch_Name != "") {
            var Branch_Name = String(req.body.Branch_Name);
            Branch_Name = Branch_Name.replace(/\s\s+/g, ' ');
            Branch_Name = Branch_Name.replace(/  +/g, ' ');
            Branch_Name = Branch_Name.replace(/^ /, '');
            Branch_Name = Branch_Name.replace(/\s\s*$/, '');
            Branch_Name = format_str(Branch_Name);
            var CategoryName = String(req.body.CategoryName);
            CategoryName = CategoryName.replace(/\s\s+/g, ' ');
            CategoryName = CategoryName.replace(/  +/g, ' ');
            CategoryName = CategoryName.replace(/^ /, '');
            CategoryName = CategoryName.replace(/\s\s*$/, '');
            CategoryName = format_str(CategoryName);
            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                if (err) {
                    res.send(JSON.stringify(BranchData));
                } else {
                    StoreMod.Check_for_CountryID(req.body, function (err, CountryData) {
                        if (err) {
                            res.send(JSON.stringify(CountryData))
                        } else {
                            StoreMod.Check_for_CityID(req.body, function (err, CityData) {
                                if (err) {
                                    res.send(JSON.stringify(CityData))
                                } else {
                                    StoreMod.Check_Whether_CategoryName_Exist_Or_Not(CategoryName, function (err, CategoryData) {
                                        if (err) {
                                            StoreMod.Check_Whether_Store_Branch_Name_Already_Exists_Update(req.body, Branch_Name, CategoryData, function (err, BranchStaus) {
                                                if (err) {
                                                    res.send(JSON.stringify(BranchStaus));
                                                } else {
                                                    StoreMod.Edit_Branch_Information(req.body, CategoryData, Branch_Name, CountryData, CityData, function (Result) {
                                                        res.send(JSON.stringify(Result));
                                                    })
                                                }
                                            })
                                        } else {
                                            StoreMod.Add_Category(CategoryName, function (Result, CategoryData) {
                                                StoreMod.Check_Whether_Store_Branch_Name_Already_Exists_Update(req.body, Branch_Name, CategoryData, function (err, BranchStaus) {
                                                    if (err) {
                                                        res.send(JSON.stringify(BranchStaus));
                                                    } else {
                                                        StoreMod.Edit_Branch_Information(req.body, CategoryData, Branch_Name, CountryData, CityData, function (Result) {
                                                            res.send(JSON.stringify(Result));
                                                        })
                                                    }
                                                })
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
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
    //Remove Store Admin
    app.post('/Remove_Store_Admin', function (req, res) {
        if (req.body.BranchID != null && req.body.StoreAdminID != null) {
            StoreMod.Check_for_Store_Admin(req.body, function (err, StoreAdminData) {
                if (err) {
                    res.send(JSON.stringify(StoreAdminData));
                } else {
                    StoreMod.Check_Whether_Store_Admin_Available_Branch(req.body, function (err, StoreAdminBranchStatus) {
                        if (err) {
                            res.send(JSON.stringify(StoreAdminBranchStatus));
                        } else {
                            StoreMod.Remove_StoreAdmin_Branch(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                console.log("Length " + StoreAdminData.BranchData);
                                console.log("length" + StoreAdminData.BranchData.length)
                                if (StoreAdminData.BranchData.length > 1) {
                                    StoreMod.Remove_Branch_from_Admin(req.body, function (Result1) {
                                        console.log(Result1)
                                        StoreMod.Find_Update_Active_Branch(req.body, function (Result2) {
                                            console.log(Result2)
                                        })
                                    })
                                } else if (StoreAdminData.BranchData.length <= 1) {
                                    StoreMod.Remove_Branch_from_Admin_and_Disable_Store_Admin(req.body, function (Result1) {
                                        console.log(Result1)
                                    })
                                }
                            })
                        }
                    })
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

    //Add Store Admin to Existig Branch
    app.post('/Add_Store_Admin_to_Branch', function (req, res) {
        if (req.body.BranchID != null && req.body.Name != null
            && req.body.EmailID != null && req.body.PhoneNumber != null) {
            StoreMod.Check_For_Store_BranchID(req.body, function (err, BranchData) {
                if (err) {
                    res.send(JSON.stringify(BranchData));
                } else {
                    var Name = req.body.Name;
                    var PhoneNumber = req.body.PhoneNumber;
                    var EmailID = req.body.EmailID;
                    StoreMod.Check_For_Admin_Phone_Branch(Name, PhoneNumber, EmailID, BranchData, function (err, AdminValidityStatus) {
                        if (err) {
                            if (AdminValidityStatus == null || AdminValidityStatus == false) {
                                res.send(new ApiResponce({
                                    success: true,
                                    extras: {
                                        Status: "Admin Created and Updated to Branch"
                                    }
                                }));
                            } else {
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.Store_Admin_Already_Exist
                                    }
                                }));
                            }
                        } else {
                            CustomerMod.Find_and_Update_CustomerSeqID(function (err, SequenceNumber) {
                                if (!err) {
                                    CustomerMod.Generate_Random_Referal_Code(function (err, referral_code) {
                                        if (!err) {
                                            StoreMod.Create_Admin_Users(Name, PhoneNumber, EmailID, BranchData, SequenceNumber, referral_code, function (err, AdminStatus) {
                                                res.send(new ApiResponce({
                                                    success: true,
                                                    extras: {
                                                        Status: "Admin Created and Updated to Branch"
                                                    }
                                                }));
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
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
    });

    //Create Store and Branch and do Admin Functionalities
    app.post('/Add_Entity_Branch', function (req, res) {
        if (req.body.Store_Entity_Name != null && req.body.CategoryName != null && req.body.Store_Entity_Name != "" && req.body.CategoryName != "" && req.body.Branch_Name != "") {
            var Store_Entity_Name = String(req.body.Store_Entity_Name);
            Store_Entity_Name = Store_Entity_Name.replace(/\s\s+/g, ' ');
            Store_Entity_Name = Store_Entity_Name.replace(/  +/g, ' ');
            Store_Entity_Name = Store_Entity_Name.replace(/^ /, '');
            Store_Entity_Name = Store_Entity_Name.replace(/\s\s*$/, '');
            Store_Entity_Name = format_str(Store_Entity_Name);
            var CategoryName = String(req.body.CategoryName);
            CategoryName = CategoryName.replace(/\s\s+/g, ' ');
            CategoryName = CategoryName.replace(/  +/g, ' ');
            CategoryName = CategoryName.replace(/^ /, '');
            CategoryName = CategoryName.replace(/\s\s*$/, '');
            CategoryName = format_str(CategoryName);
            var FranchiseData;
            StoreMod.Check_Whether_StoreName_Exist_Or_Not(Store_Entity_Name, function (err, EntityData) {
                if (err) {
                    StoreMod.Create_Store_Entity(req.body, function (err, Entity_Status, EntityData, EntityID) {
                        StoreMod.Check_Whether_CategoryName_Exist_Or_Not(CategoryName, function (err, CategoryData) {
                            if (err) {
                                Store_Branch(EntityData, CategoryData);
                            } else {
                                StoreMod.Add_Category(CategoryName, function (Result, CategoryData) {
                                    Store_Branch(EntityData, CategoryData);
                                })
                            }
                        })
                    })
                } else {
                    StoreMod.Check_Whether_CategoryName_Exist_Or_Not(CategoryName, function (err, CategoryData) {
                        if (err) {
                            Store_Branch(EntityData, CategoryData);
                        } else {
                            StoreMod.Add_Category(CategoryName, function (Result, CategoryData) {
                                Store_Branch(EntityData, CategoryData);
                            })
                        }
                    })
                }
                function Store_Branch(EntityData, CategoryData) {
                    if (req.body.Branch_Name != null && req.body.AdminData != null && req.body.Sunday_Available != null
                        && req.body.Picture != null && req.body.CountryID != null
                        && req.body.CityID != null && req.body.Address != null
                        && req.body.Latitude != null && req.body.Longitude != null
                        && req.body.Monday_Available != null && req.body.Tuesday_Available != null
                        && req.body.Wednesday_Available != null && req.body.Thursday_Available != null
                        && req.body.Friday_Available != null && req.body.Saturday_Available != null && req.body.Sunday_Available != null) {
                        var Branch_Name = String(req.body.Branch_Name);
                        Branch_Name = Branch_Name.replace(/\s\s+/g, ' ');
                        Branch_Name = Branch_Name.replace(/  +/g, ' ');
                        Branch_Name = Branch_Name.replace(/^ /, '');
                        Branch_Name = Branch_Name.replace(/\s\s*$/, '');
                        Branch_Name = format_str(Branch_Name);
                        if (req.body.AdminData.length > 0) {
                            StoreMod.Check_Whether_Store_Branch_Name_Already_Exists(Branch_Name, CategoryData, function (err, BranchStaus) {
                                if (err) {
                                    res.send(JSON.stringify(BranchStaus));
                                } else {
                                    StoreMod.Check_for_CountryID(req.body, function (err, CountryData) {
                                        if (err) {
                                            res.send(JSON.stringify(CountryData))
                                        } else {
                                            StoreMod.Check_for_CityID(req.body, function (err, CityData) {
                                                if (err) {
                                                    res.send(JSON.stringify(CityData))
                                                } else {
                                                    StoreMod.Add_Entity_Branch(req.body, CategoryData, Branch_Name, EntityData, CountryData, CityData, function (Result, BranchData) {
                                                        res.send(JSON.stringify(Result));
                                                        async.eachSeries(req.body.AdminData, function (item, callback) {
                                                            var Name = item.Name;
                                                            var PhoneNumber = item.PhoneNumber;
                                                            var EmailID = item.EmailID;
                                                            StoreMod.Check_For_Admin_Phone_Branch(Name, PhoneNumber, EmailID, BranchData, function (err, AdminValidityStatus) {
                                                                if (err) {
                                                                    console.log("Admin Operations finishesd");
                                                                    callback();
                                                                } else {
                                                                    CustomerMod.Find_and_Update_CustomerSeqID(function (err, SequenceNumber) {
                                                                        if (!err) {
                                                                            CustomerMod.Generate_Random_Referal_Code(function (err, referral_code) {
                                                                                if (!err) {
                                                                                    StoreMod.Create_Admin_Users(Name, PhoneNumber, EmailID, BranchData, SequenceNumber, referral_code, function (err, AdminStatus) {
                                                                                        console.log("Admin Created and MEssage Sent");
                                                                                        callback();
                                                                                    })
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }, function (err) {
                                                            if (!err) {
                                                                console.log("All Admin Operations Completed");
                                                            } else {
                                                                console.log(err);
                                                            }
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        } else if (req.body.AdminData.length <= 0) {
                            res.send(new ApiResponce({
                                success: false,
                                extras: {
                                    msg: ApiMessages.Input_Admin_Data
                                }
                            }));
                        }
                    } else {
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.ENTER_ALL_TAGS
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
    });

    //Edit Category
    app.post('/Edit_Category', function (req, res) {
        if (req.body.CategoryID != null && req.body.CategoryName != null) {
            StoreMod.Check_for_CategoryID(req.body, function (err, CategoryData) {
                if (err) {
                    res.send(JSON.stringify(CategoryData));
                } else {
                    var CategoryName = String(req.body.CategoryName);
                    CategoryName = CategoryName.replace(/\s\s+/g, ' ');
                    CategoryName = CategoryName.replace(/  +/g, ' ');
                    CategoryName = CategoryName.replace(/^ /, '');
                    CategoryName = CategoryName.replace(/\s\s*$/, '');
                    CategoryName = format_str(CategoryName);
                    if (CategoryData.CategoryName == CategoryName) {
                        StoreMod.Edit_Category(req.body, CategoryName, function (Result) {
                            res.send(JSON.stringify(Result))
                        })
                    } else {
                        StoreMod.Check_Whether_Category_Name_Already_Exists(CategoryName, function (err, CategoryStatus) {
                            if (err) {
                                res.send(JSON.stringify(CategoryStatus));
                            } else {
                                StoreMod.Edit_Category(req.body, CategoryName, function (Result) {
                                    res.send(JSON.stringify(Result))
                                })
                            }
                        })
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
    });

    //FIND ALL CATEGORIES
    app.post('/Find_All_Categories', function (req, res) {
        StoreMod.Find_All_Categories(function (Result) {
            res.send(JSON.stringify(Result));
        })
    });

    //Create Category
    app.post('/Create_Category', function (req, res) {
        if (req.body.CategoryName != null) {
            var CategoryName = String(req.body.CategoryName);
            CategoryName = CategoryName.replace(/\s\s+/g, ' ');
            CategoryName = CategoryName.replace(/  +/g, ' ');
            CategoryName = CategoryName.replace(/^ /, '');
            CategoryName = CategoryName.replace(/\s\s*$/, '');
            CategoryName = format_str(CategoryName);
            StoreMod.Check_Whether_Category_Name_Already_Exists(CategoryName, function (err, CategoryStatus) {
                if (err) {
                    res.send(JSON.stringify(CategoryStatus));
                } else {
                    StoreMod.Add_Category(CategoryName, function (Result, CategoryData) {
                        res.send(JSON.stringify(Result));
                    })
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
    });

    /****************
     *
     *
     * End of Store
     */
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                     Customer API's                                              //
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    /************
     *
     * App Settings
     *
     */
    router.post('/Edit_Delivery_Settings', function (req, res) {
        if (req.body.SettingID != null && req.body.Instant_Time != null && req.body.Four_Hours_Time != null && req.body.Same_Day_Time != null
            && req.body.Instant_Message != null && req.body.Four_Hours_Message != null && req.body.Same_Day_Message != null) {
            App_Delivery_Message_Time_Settings.findOne({ SettingID: req.body.SettingID }).exec(function (err, SettingData) {
                if (err) {
                    console.log(err)
                } else {
                    if (SettingData != null) {
                        var query = {
                            SettingID: req.body.SettingID
                        };
                        var changes = {
                            Instant_Time: req.body.Instant_Time,
                            Four_Hours_Time: req.body.Four_Hours_Time,
                            Same_Day_Time: req.body.Same_Day_Time,
                            Instant_Message: req.body.Instant_Message,
                            Four_Hours_Message: req.body.Four_Hours_Message,
                            Same_Day_Message: req.body.Same_Day_Message
                        };
                        var multiplicity = {
                            multi: false
                        };
                        App_Delivery_Message_Time_Settings.update(query, changes, multiplicity).exec(function (err, Result) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.send(new ApiResponce({
                                    success: true,
                                    extras: {
                                        Status: "Settings Edited Successfully"
                                    }
                                }));
                            }
                        })
                    } else {
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.SETTING_NOT_FOUND
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

    router.post('/Get_Delivery_Settings', function (req, res) {
        var fetch = App_Delivery_Message_Time_Settings.findOne();
        fetch.select('-_id -__v');
        fetch.exec(function (err, SettingData) {
            if (err) {
                console.log(err);
            }
            res.send(new ApiResponce({
                success: true,
                extras: {
                    SettingData: SettingData
                }
            }));
        })
    });

    router.post('/Add_Delivery_Settings', function (req, res) {
        var SettingID = uuid();
        var Data = new App_Delivery_Message_Time_Settings({
            SettingID: SettingID
        });
        Data.save(function (err, Result) {
            if (err) {
                console.log(err);
            };
            res.send(new ApiResponce({
                success: true,
                extras: {
                    Status: "Settings Stored Successfully"
                }
            }));
        })
    });

    /**********
     *
     End of App Settings
     */
    /*****
     *
     * Customer Analytics
     *
     */

    app.post('/Detailed_Customer_Registered_View_All', function (req, res) {
        if (req.body.skip != null && req.body.type != null && req.body.deviceType != null) {
            var deviceType = parseInt(req.body.deviceType);
            if (deviceType == 1) {
                //IOS
                CustomerMod.IOS_Detailed_Signup_View(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            } else if (deviceType == 2) {
                //Android
                CustomerMod.Android_Detailed_Signup_View(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            } else if (deviceType == 3) {
                //Web
                CustomerMod.Web_Detailed_Signup_View(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    app.post('/Find_All_Signup_Interval_Devices_Wise', function (req, res) {
        CustomerMod.Find_All_Signup_Interval_Devices_Wise(function (Result) {
            res.send(JSON.stringify(Result));
        })
    });
    app.post('/Find_All_Signups_Devices_Total', function (req, res) {
        var totalquery = {
            acc_status: 1,
            Whether_Guest: false
        };
        var webquery = {
            acc_status: 1,
            Whether_Guest: false,
            Whether_Web_Signup: true
        };
        var androidquery = {
            acc_status: 1,
            Whether_Guest: false,
            Whether_Web_Signup: false,
            "Devices.0.DeviceType": 2
        };
        var iosquery = {
            acc_status: 1,
            Whether_Guest: false,
            Whether_Web_Signup: false,
            "Devices.0.DeviceType": "1"
        }
        Customers.count(totalquery).exec(function (err, total) {
            if (total >= 0) {
                Customers.count(webquery).exec(function (err, web) {
                    if (web >= 0) {
                        Customers.count(androidquery).exec(function (err, android) {
                            if (android >= 0) {
                                Customers.count(iosquery).exec(function (err, ios) {
                                    if (ios >= 0) {
                                        var SignupData = {
                                            web: web,
                                            android: android,
                                            ios: ios,
                                            total: total
                                        };
                                        res.send(new ApiResponce({
                                            success: true,
                                            extras: {
                                                SignupData: SignupData
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
    });
    app.post('/Find_All_Signups_Total', function (req, res) {
        var query = {
            acc_status: 1,
            Whether_Guest: false
        }
        Customers.count(query).exec(function (err, Count) {
            if (Count >= 0) {
                res.send(new ApiResponce({
                    success: true,
                    extras: {
                        Count: Count
                    }
                }));
            }
        })
    });
    app.post('/Detailed_Customer_Registered_View_All_Date_Range', function (req, res) {
        if (req.body.skip != null && req.body.from_date != null && req.body.to_date != null && req.body.deviceType != null) {
            var deviceType = parseInt(req.body.deviceType);
            if (deviceType == 1) {
                //IOS
                CustomerMod.IOS_Detailed_Signup_Date_Range(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            } else if (deviceType == 2) {
                //Android
                CustomerMod.Android_Detailed_Signup_Date_Range(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            } else if (deviceType == 3) {
                //Web
                CustomerMod.Web_Detailed_Signup_Date_Range(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Find_All_Signups_Devices_Date_Range', function (req, res) {
        if (req.body.from_date != null && req.body.to_date != null) {
            var from_moment = moment(req.body.from_date, 'DD/MM/YYYY').subtract(330, 'minutes');
            var to_moment = moment(req.body.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days');
            var totalquery = {
                acc_status: 1,
                Whether_Guest: false,
                Signup_Date: {
                    $gte: from_moment,
                    $lte: to_moment
                }
            };
            var webquery = {
                acc_status: 1,
                Whether_Guest: false,
                Whether_Web_Signup: true,
                Signup_Date: {
                    $gte: from_moment,
                    $lte: to_moment
                }
            };
            var androidquery = {
                acc_status: 1,
                Whether_Guest: false,
                Whether_Web_Signup: false,
                "Devices.0.DeviceType": 2,
                Signup_Date: {
                    $gte: from_moment,
                    $lte: to_moment
                }
            };
            var iosquery = {
                acc_status: 1,
                Whether_Guest: false,
                Whether_Web_Signup: false,
                "Devices.0.DeviceType": "1",
                Signup_Date: {
                    $gte: from_moment,
                    $lte: to_moment
                }
            }
            Customers.count(totalquery).exec(function (err, total) {
                if (total >= 0) {
                    Customers.count(webquery).exec(function (err, web) {
                        if (web >= 0) {
                            Customers.count(androidquery).exec(function (err, android) {
                                if (android >= 0) {
                                    Customers.count(iosquery).exec(function (err, ios) {
                                        if (ios >= 0) {
                                            var SignupData = {
                                                web: web,
                                                android: android,
                                                ios: ios,
                                                total: total
                                            };
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    SignupData: SignupData
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
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Find_All_Signups_Devices_Year', function (req, res) {
        var currentdate = moment().utcOffset(330).format('DD/MM/YYYY');
        var from_moment = moment(currentdate, 'DD/MM/YYYY').subtract(330, 'minutes').startOf('year');
        var to_moment = moment().utcOffset(330);
        var totalquery = {
            acc_status: 1,
            Whether_Guest: false,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        };
        var webquery = {
            acc_status: 1,
            Whether_Guest: false,
            Whether_Web_Signup: true,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        };
        var androidquery = {
            acc_status: 1,
            Whether_Guest: false,
            Whether_Web_Signup: false,
            "Devices.0.DeviceType": 2,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        };
        var iosquery = {
            acc_status: 1,
            Whether_Guest: false,
            Whether_Web_Signup: false,
            "Devices.0.DeviceType": "1",
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        }
        Customers.count(totalquery).exec(function (err, total) {
            if (total >= 0) {
                Customers.count(webquery).exec(function (err, web) {
                    if (web >= 0) {
                        Customers.count(androidquery).exec(function (err, android) {
                            if (android >= 0) {
                                Customers.count(iosquery).exec(function (err, ios) {
                                    if (ios >= 0) {
                                        var SignupData = {
                                            web: web,
                                            android: android,
                                            ios: ios,
                                            total: total
                                        };
                                        res.send(new ApiResponce({
                                            success: true,
                                            extras: {
                                                SignupData: SignupData
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
    });
    app.post('/Find_All_Signups_Year', function (req, res) {
        var currentdate = moment().utcOffset(330).format('DD/MM/YYYY');
        var from_moment = moment(currentdate, 'DD/MM/YYYY').subtract(330, 'minutes').startOf('year');
        var to_moment = moment().utcOffset(330)
        var query = {
            acc_status: 1,
            Whether_Guest: false,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        }
        Customers.count(query).exec(function (err, Count) {
            if (Count >= 0) {
                res.send(new ApiResponce({
                    success: true,
                    extras: {
                        Count: Count
                    }
                }));
            }
        })
    });
    app.post('/Find_All_Signups_Devices_Month', function (req, res) {
        var currentdate = moment().utcOffset(330).format('DD/MM/YYYY');
        var from_moment = moment(currentdate, 'DD/MM/YYYY').subtract(330, 'minutes').startOf('month');
        var to_moment = moment().utcOffset(330);
        var totalquery = {
            acc_status: 1,
            Whether_Guest: false,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        };
        var webquery = {
            acc_status: 1,
            Whether_Guest: false,
            Whether_Web_Signup: true,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        };
        var androidquery = {
            acc_status: 1,
            Whether_Guest: false,
            Whether_Web_Signup: false,
            "Devices.0.DeviceType": 2,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        };
        var iosquery = {
            acc_status: 1,
            Whether_Guest: false,
            Whether_Web_Signup: false,
            "Devices.0.DeviceType": "1",
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        }
        Customers.count(totalquery).exec(function (err, total) {
            if (total >= 0) {
                Customers.count(webquery).exec(function (err, web) {
                    if (web >= 0) {
                        Customers.count(androidquery).exec(function (err, android) {
                            if (android >= 0) {
                                Customers.count(iosquery).exec(function (err, ios) {
                                    if (ios >= 0) {
                                        var SignupData = {
                                            web: web,
                                            android: android,
                                            ios: ios,
                                            total: total
                                        };
                                        res.send(new ApiResponce({
                                            success: true,
                                            extras: {
                                                SignupData: SignupData
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
    });
    app.post('/Find_All_Signups_Month', function (req, res) {
        var currentdate = moment().utcOffset(330).format('DD/MM/YYYY');
        var from_moment = moment(currentdate, 'DD/MM/YYYY').subtract(330, 'minutes').startOf('month');
        var to_moment = moment().utcOffset(330)
        var query = {
            acc_status: 1,
            Whether_Guest: false,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        }
        Customers.count(query).exec(function (err, Count) {
            if (Count >= 0) {
                res.send(new ApiResponce({
                    success: true,
                    extras: {
                        Count: Count
                    }
                }));
            }
        })
    });
    app.post('/Find_All_Signups_Devices_Week', function (req, res) {
        var currentdate = moment().utcOffset(330).format('DD/MM/YYYY');
        var from_moment = moment(currentdate, 'DD/MM/YYYY').subtract(330, 'minutes').subtract(7, 'days')
        var to_moment = moment().utcOffset(330);
        var totalquery = {
            acc_status: 1,
            Whether_Guest: false,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        };
        var webquery = {
            acc_status: 1,
            Whether_Guest: false,
            Whether_Web_Signup: true,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        };
        var androidquery = {
            acc_status: 1,
            Whether_Guest: false,
            Whether_Web_Signup: false,
            "Devices.0.DeviceType": 2,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        };
        var iosquery = {
            acc_status: 1,
            Whether_Guest: false,
            Whether_Web_Signup: false,
            "Devices.0.DeviceType": "1",
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        }
        Customers.count(totalquery).exec(function (err, total) {
            if (total >= 0) {
                Customers.count(webquery).exec(function (err, web) {
                    if (web >= 0) {
                        Customers.count(androidquery).exec(function (err, android) {
                            if (android >= 0) {
                                Customers.count(iosquery).exec(function (err, ios) {
                                    if (ios >= 0) {
                                        var SignupData = {
                                            web: web,
                                            android: android,
                                            ios: ios,
                                            total: total
                                        };
                                        res.send(new ApiResponce({
                                            success: true,
                                            extras: {
                                                SignupData: SignupData
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
    });
    app.post('/Find_All_Signups_Week', function (req, res) {
        var currentdate = moment().utcOffset(330).format('DD/MM/YYYY');
        var from_moment = moment(currentdate, 'DD/MM/YYYY').subtract(330, 'minutes').subtract(7, 'days')
        var to_moment = moment().utcOffset(330)
        var query = {
            acc_status: 1,
            Whether_Guest: false,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        }
        Customers.count(query).exec(function (err, Count) {
            if (Count >= 0) {
                res.send(new ApiResponce({
                    success: true,
                    extras: {
                        Count: Count
                    }
                }));
            }
        })
    });

    app.post('/Find_All_Signups_Devices_Today', function (req, res) {
        var currentdate = moment().utcOffset(330).format('DD/MM/YYYY');
        var from_moment = moment(currentdate, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
        var to_moment = moment().utcOffset(330).toDate();
        var totalquery = {
            acc_status: 1,
            Whether_Guest: false,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        };
        var webquery = {
            acc_status: 1,
            Whether_Guest: false,
            Whether_Web_Signup: true,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        };
        var androidquery = {
            acc_status: 1,
            Whether_Guest: false,
            Whether_Web_Signup: false,
            "Devices.0.DeviceType": 2,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        };
        var iosquery = {
            acc_status: 1,
            Whether_Guest: false,
            Whether_Web_Signup: false,
            "Devices.0.DeviceType": "1",
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        }
        Customers.count(totalquery).exec(function (err, total) {
            if (total >= 0) {
                Customers.count(webquery).exec(function (err, web) {
                    if (web >= 0) {
                        Customers.count(androidquery).exec(function (err, android) {
                            if (android >= 0) {
                                Customers.count(iosquery).exec(function (err, ios) {
                                    if (ios >= 0) {
                                        var SignupData = {
                                            web: web,
                                            android: android,
                                            ios: ios,
                                            total: total
                                        };
                                        res.send(new ApiResponce({
                                            success: true,
                                            extras: {
                                                SignupData: SignupData
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
    });

    app.post('/Find_All_Signups_Today', function (req, res) {
        var currentdate = moment().utcOffset(330).format('DD/MM/YYYY');
        var from_moment = moment(currentdate, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
        var to_moment = moment().utcOffset(330).toDate();
        var query = {
            acc_status: 1,
            Whether_Guest: false,
            Signup_Date: {
                $gte: from_moment,
                $lte: to_moment
            }
        }
        Customers.count(query).exec(function (err, Count) {
            if (Count >= 0) {
                res.send(new ApiResponce({
                    success: true,
                    extras: {
                        Count: Count
                    }
                }));
            }
        })
    })

    /******
     *
       End of Customer Analytics
     */

    /*********
     *
     * Orders Analytics API
     *
     */

    app.post('/Driver_Bird_View_Total', function (req, res) {
        if (req.body.skip != null) {
            if (req.body.ZoneID == null || req.body.ZoneID == "") {
                console.log("No Zone All Drivers")
                CustomerMod.Driver_Bird_View_Total(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            } else if (req.body.ZoneID != null && req.body.ZoneID != "") {
                console.log("Zone Drivers");
                CustomerMod.Check_for_ZoneID(req.body, function (err, ZoneData) {
                    if (err) {
                        res.send(JSON.stringify(ZoneData));
                    } else {
                        CustomerMod.Driver_Bird_View_Zone(req.body, function (Result) {
                            res.send(JSON.stringify(Result));
                        })
                    }
                })
            }
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/All_Orders_Bird_View_Date_Range', function (req, res) {
        if (req.body.skip != null && req.body.from_date != null && req.body.to_date != null) {
            CustomerMod.All_Orders_Bird_View_Date_Range(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Ongoing_Orders_Bird_View', function (req, res) {
        if (req.body.skip != null) {
            CustomerMod.Ongoing_Orders_Bird_View(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/New_Orders_Bird_View', function (req, res) {
        if (req.body.skip != null) {
            CustomerMod.New_Orders_Bird_View(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Orders_Analytics_Details_Date_Range', function (req, res) {
        if (req.body.skip != null && req.body.from_date != null && req.body.to_date != null && req.body.type != null) {
            CustomerMod.Orders_Analytics_Details_Date_Range(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Order_Complete_Analytics', function (req, res) {
        CustomerMod.Order_Complete_Analytics(req.body, function (Result) {
            res.send(JSON.stringify(Result));
        })
    })

    app.post('/Find_All_Orders_Count_Today', function (req, res) {
        var currentdate = moment().utcOffset(330).format('DD/MM/YYYY');
        var from_moment = moment(currentdate, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
        var to_moment = moment().utcOffset(330).toDate();
        var query = {
            Date: {
                $gte: from_moment,
                $lte: to_moment
            },
            Whether_Deleted: false
        }
        Orders.count(query).exec(function (err, Count) {
            if (Count >= 0) {
                res.send(new ApiResponce({
                    success: true,
                    extras: {
                        Count: Count
                    }
                }));
            }
        })
    })
    /********
     *
     * End of Analytics Api
     *
     */

    /*--------------------------------------Begin of API's---------------------------------------------*/
    //Testing PDF
    app.post('/Testing_Html_to_PDF', CustomerMod.Testing_Html_to_PDF);


    //Load Testing API
    app.post('/LoadTestingAPI', function (req, res) {
        console.log("Entering this api");
        console.log(req.body)
        res.send('Success');
    });
    app.post('/Load_Tester', function (req, res) {
        CustomerMod.Testing_Api(req.body, function (Result) {
            res.send(JSON.stringify(Result));
        })
    })

    /****
     *
     * MULTI INVOICE FOR PREMIUM CUSTOMER
     *
     */


    //Edit Employee Bank Details

    app.post('/Razor_Pay_Testing', function (req, res) {
        razorpay.Check_for_Payment(req.body, function (err, Result) {
            if (err) {
                res.send(Result);
            } else {
                res.send(Result);
            }
        })
    })

    //Find All Employee Attendance between Date


    //Remove Employee Attendance
    app.post('/Remove_Employee_Attendance', function (req, res) {
        if (req.body.EmployeeID != null && req.body.date != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    HrMod.Check_Whether_Employee_Attendance_Exist_Remove(req.body, function (err, EmployeeAttendanceData) {
                        if (err) {
                            res.send(JSON.stringify(EmployeeAttendanceData));
                        } else {
                            HrMod.Remove_Employee_Attendance(req.body, EmployeeAttendanceData, function (Result) {
                                res.send(JSON.stringify(Result));
                            })
                        }
                    })
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
    //Add Employee Attendance
    app.post('/Add_Employee_Attendance', function (req, res) {
        if (req.body.EmployeeID != null && req.body.date != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    HrMod.Check_Whether_Employee_Attendance_Exist(req.body, function (err, AttendanceStatus) {
                        if (err) {
                            res.send(JSON.stringify(AttendanceStatus));
                        } else {
                            HrMod.Add_Employee_Attendance(req.body, EmployeeData, function (Result) {
                                res.send(JSON.stringify(Result));
                            })
                        }
                    })
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

    //Employee Attendance by day
    app.post('/Find_All_Employee_Attendance_Count', function (req, res) {
        if (req.body.skip != null && req.body.from_date != null && req.body.to_date != null) {
            HrMod.Find_All_Employee_Attendance_Count(req.body, function (err, Result) {
                res.send(Result);
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    //Reject Employee Leave Request
    app.post('/Reject_Employee_Leave', function (req, res) {
        if (req.body.AdminID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    HrMod.Check_for_Employee_Leave_Request(req.body, function (err, LeaveData) {
                        if (err) {
                            res.send(JSON.stringify(LeaveData));
                        } else {
                            HrMod.Reject_Employee_Leave(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Rejected the Leave of Employee:- ' + LeaveData.Employee_Name + ' from ' + moment(LeaveData.Request_From).utcOffset(330).format('DD/MM/YYYY') + ' to ' + moment(LeaveData.Request_To).utcOffset(330).format('DD/MM/YYYY') + ' on ' + DateTime
                                var Purpose = 'Employee Leave Request Approved';
                                var Key = 'Employee Leave Request';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    //Approve Employee Leave Request
    app.post('/Approve_Employee_Leave', function (req, res) {
        if (req.body.AdminID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    HrMod.Check_for_Employee_Leave_Request(req.body, function (err, LeaveData) {
                        if (err) {
                            res.send(JSON.stringify(LeaveData));
                        } else {
                            HrMod.Approve_Employee_Leave(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have Approved the Leave of Employee:- ' + LeaveData.Employee_Name + ' from ' + moment(LeaveData.Request_From).utcOffset(330).format('DD/MM/YYYY') + ' to ' + moment(LeaveData.Request_To).utcOffset(330).format('DD/MM/YYYY') + ' on ' + DateTime
                                var Purpose = 'Employee Leave Request Approved';
                                var Key = 'Employee Leave Request';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });

    //Find All Employee Leave Requests
    app.post('/List_All_Employee_Leave_Request', function (req, res) {
        if (req.body.AdminID != null && req.body.skip != null && req.body.limit != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    HrMod.List_All_Employee_Leave_Request(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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

    //Employee Attendance by day
    app.post('/Find_All_Employee_Attendance_Day', function (req, res) {
        if (req.body.skip != null && req.body.date != null) {
            HrMod.Find_All_Employee_Attendance_Day(req.body, function (err, Result) {
                res.send(Result);
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });



    //Add or update Emloyee Profile Image
    app.post('/Add_Update_Employee_Profile_Image', function (req, res) {
        if (req.body.EmployeeID != null && req.body.Employee_Image_Picture != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    if (EmployeeData.Employee_Image_Available == null || EmployeeData.Employee_Image_Available == false) {
                        //First time added Driver License Details
                        HrMod.Add_Employee_Image_Details(req.body, EmployeeData, function (err, Result) {
                            res.send(JSON.stringify(Result));
                        })
                    } else if (EmployeeData.Employee_Image_Available == true) {
                        //Update Driver License Details and Remove Previous Image from Database
                        CustomerMod.DeleteAWSImage(EmployeeData.Employee_Image_Url, function (err, DeleteStatus) {
                            if (!err) {
                                HrMod.Add_Employee_Image_Details(req.body, EmployeeData, function (err, Result) {
                                    res.send(JSON.stringify(Result));
                                })
                            }
                        })
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
    });
    //Add or update Emloyee Pan Card Details
    app.post('/Add_Update_Employee_Pan_Cards_Details', function (req, res) {
        if (req.body.EmployeeID != null && req.body.Pan_Card_Number != null && req.body.Pan_Card_Image != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    if (EmployeeData.Pan_Card_Available == null || EmployeeData.Pan_Card_Available == false) {
                        //First time added Driver License Details
                        HrMod.Add_Pan_Card_Details(req.body, EmployeeData, function (err, Result) {
                            res.send(JSON.stringify(Result));
                        })
                    } else if (EmployeeData.Pan_Card_Available == true) {
                        //Update Driver License Details and Remove Previous Image from Database
                        CustomerMod.DeleteAWSImage(EmployeeData.Pan_Card_Image, function (err, DeleteStatus) {
                            if (!err) {
                                HrMod.Add_Pan_Card_Details(req.body, EmployeeData, function (err, Result) {
                                    res.send(JSON.stringify(Result));
                                })
                            }
                        })
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
    });
    //Add or update Emloyee Address Proof Details
    app.post('/Add_Update_Employee_Address_Proof_Details', function (req, res) {
        if (req.body.EmployeeID != null && req.body.Address_Proof_Picture != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    if (EmployeeData.Address_Proof_Available == null || EmployeeData.Address_Proof_Available == false) {
                        //First time added Driver License Details
                        HrMod.Add_Employee_Address_Proof_Details(req.body, EmployeeData, function (err, Result) {
                            res.send(JSON.stringify(Result));
                        })
                    } else if (EmployeeData.Address_Proof_Available == true) {
                        //Update Driver License Details and Remove Previous Image from Database
                        CustomerMod.DeleteAWSImage(EmployeeData.Address_Proof_Image, function (err, DeleteStatus) {
                            if (!err) {
                                HrMod.Add_Employee_Address_Proof_Details(req.body, EmployeeData, function (err, Result) {
                                    res.send(JSON.stringify(Result));
                                })
                            }
                        })
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
    });

    //Add or update Emloyee Driver Driving License Details
    app.post('/Add_Update_Employee_Driver_Driving_License_Details', function (req, res) {
        if (req.body.EmployeeID != null && req.body.Driving_License_Expiry_Date != null && req.body.Driving_License_Picture != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    if (EmployeeData.Driving_License_Available == null || EmployeeData.Driving_License_Available == false) {
                        //First time added Driver License Details
                        HrMod.Add_Driver_License_Details(req.body, EmployeeData, function (err, Result) {
                            res.send(JSON.stringify(Result));
                        })
                    } else if (EmployeeData.Driving_License_Available == true) {
                        //Update Driver License Details and Remove Previous Image from Database
                        CustomerMod.DeleteAWSImage(EmployeeData.Driving_License_Image, function (err, DeleteStatus) {
                            if (!err) {
                                HrMod.Add_Driver_License_Details(req.body, EmployeeData, function (err, Result) {
                                    res.send(JSON.stringify(Result));
                                })
                            }
                        })
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

    app.post('/Edit_Employee_Bank_Details', function (req, res) {
        if (req.body.EmployeeID != null && req.body.Bank_Account_No != null && req.body.Bank_Name != null && req.body.Bank_IFSC_No != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    HrMod.Edit_Employee_Bank_Details(req.body, EmployeeData, function (err, Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    //Edit Employee Salary
    app.post('/Edit_Employee_Salary_Details', function (req, res) {
        if (req.body.EmployeeID != null && req.body.Employee_Basic_Salary != null && req.body.Employee_PF != null && req.body.Employee_TDS != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    HrMod.Edit_Employee_Salary_Details(req.body, EmployeeData, function (err, Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    //Edit Employee Information
    app.post('/Edit_Employee_Information', function (req, res) {
        if (req.body.EmployeeID != null && req.body.Employee_Name != null && req.body.Employee_Gender != null && req.body.Employee_PhoneNumber != null && req.body.Employee_Address != null && req.body.Employee_DOB != null && req.body.Employee_Date_of_Joining != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    HrMod.Edit_Employee_Information(req.body, EmployeeData, function (err, Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });

    //Remove Employee or Inactivate Status
    app.post('/Remove_Employee', function (req, res) {
        if (req.body.EmployeeID != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    HrMod.Remove_Employee(req.body, EmployeeData, function (err, Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    //SEARCH ALL PAID SALARIES Month Year
    app.post('/Search_All_Employees_Paid_Salaries_Month_Year', function (req, res) {
        if (req.body.SearchValue != null && req.body.sort_type != null && req.body.Month_Number != null && req.body.Year_Number != null) {
            var query = {
                Month_Number: req.body.Month_Number,
                Year_Number: req.body.Year_Number,
                $or: [
                    {
                        Employee_Company_ID: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_Name: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_PhoneNumber: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_Email: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_Basic_Salary: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        TransactionID: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Comment: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }
                ]
            };
            var sort_type = parseInt(req.body.sort_type);
            var toSort;
            if (sort_type == 1) {
                toSort = '-created_at';
            } else if (sort_type == 2) {
                toSort = 'created_at';
            } else if (sort_type == 3) {
                toSort = '-Employee_Company_ID';
            } else if (sort_type == 4) {
                toSort = 'Employee_Company_ID';
            } else if (sort_type == 5) {
                toSort = '-Employee_Basic_Salary';
            } else if (sort_type == 6) {
                toSort = 'Employee_Basic_Salary';
            } else if (sort_type == 7) {
                toSort = '-Employee_Name';
            } else if (sort_type == 8) {
                toSort = 'Employee_Name';
            } else if (sort_type == 9) {
                toSort = '-Employee_PhoneNumber';
            } else if (sort_type == 10) {
                toSort = 'Employee_PhoneNumber';
            } else if (sort_type == 11) {
                toSort = '-Employee_Email';
            } else if (sort_type == 12) {
                toSort = 'Employee_Email';
            } else if (sort_type == 13) {
                toSort = '-Payment_Type';
            } else if (sort_type == 14) {
                toSort = 'Payment_Type';
            } else if (sort_type == 13) {
                toSort = '-Employee_Total_Salary';
            } else if (sort_type == 14) {
                toSort = 'Employee_Total_Salary';
            }
            var fetch = Ezshipp_Employee_Paid_Salaries.find(query);
            fetch.sort(toSort);
            fetch.limit(10);
            fetch.exec(function (err, Result) {
                if (!err) {
                    var SalaryData = [];
                    async.eachSeries(Result, function (item, callback) {
                        var Date_Time = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                        var PDFLink;
                        if (item.PDFLink == "") {
                            PDFLink = "";
                        } else {
                            PDFLink = config.S3URL + item.PDFLink;
                        }
                        SalaryData.push({
                            ExpenseID: item.ExpenseID,
                            EmployeeID: item.EmployeeID,
                            ProcessStage: item.ProcessStage,
                            PDFLink: PDFLink,
                            Employee_Company_ID: item.Employee_Company_ID,
                            Employee_Name: item.Employee_Name,
                            Employee_PhoneNumber: item.Employee_PhoneNumber,
                            Employee_Email: item.Employee_Email,
                            Employee_Basic_Salary: item.Employee_Basic_Salary,
                            Employee_PF: item.Employee_PF,
                            Employee_TDS: item.Employee_TDS,
                            Employee_Loss_of_Pay: item.Employee_Loss_of_Pay,
                            ExpensesAmount: item.ExpensesAmount,
                            Total_Deductions: item.Total_Deductions,
                            Employee_Total_Salary: item.Employee_Total_Salary,
                            Payment_Type: item.Payment_Type,
                            TransactionID: item.TransactionID,
                            Purpose_Type: item.Purpose_Type,
                            Comment: item.Comment,
                            Month_Number: item.Month_Number,
                            Year_Number: item.Year_Number,
                            Date_Time: Date_Time
                        })
                        callback();
                    }, function (err) {
                        if (!err) {
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    SalaryData: SalaryData
                                }
                            }));
                        }
                    })
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
    });
    //SEARCH ALL PAID SALARIES
    app.post('/Search_All_Employees_Paid_Salaries', function (req, res) {
        if (req.body.SearchValue != null && req.body.sort_type != null) {
            var query = {
                $or: [
                    {
                        Employee_Company_ID: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_Name: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_PhoneNumber: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_Email: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_Basic_Salary: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        TransactionID: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Comment: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }
                ]
            };
            var sort_type = parseInt(req.body.sort_type);
            var toSort;
            if (sort_type == 1) {
                toSort = '-created_at';
            } else if (sort_type == 2) {
                toSort = 'created_at';
            } else if (sort_type == 3) {
                toSort = '-Employee_Company_ID';
            } else if (sort_type == 4) {
                toSort = 'Employee_Company_ID';
            } else if (sort_type == 5) {
                toSort = '-Employee_Basic_Salary';
            } else if (sort_type == 6) {
                toSort = 'Employee_Basic_Salary';
            } else if (sort_type == 7) {
                toSort = '-Employee_Name';
            } else if (sort_type == 8) {
                toSort = 'Employee_Name';
            } else if (sort_type == 9) {
                toSort = '-Employee_PhoneNumber';
            } else if (sort_type == 10) {
                toSort = 'Employee_PhoneNumber';
            } else if (sort_type == 11) {
                toSort = '-Employee_Email';
            } else if (sort_type == 12) {
                toSort = 'Employee_Email';
            } else if (sort_type == 13) {
                toSort = '-Payment_Type';
            } else if (sort_type == 14) {
                toSort = 'Payment_Type';
            } else if (sort_type == 13) {
                toSort = '-Employee_Total_Salary';
            } else if (sort_type == 14) {
                toSort = 'Employee_Total_Salary';
            }
            var fetch = Ezshipp_Employee_Paid_Salaries.find(query);
            fetch.sort(toSort);
            fetch.limit(10);
            fetch.exec(function (err, Result) {
                if (!err) {
                    var SalaryData = [];
                    async.eachSeries(Result, function (item, callback) {
                        var Date_Time = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                        var PDFLink;
                        if (item.PDFLink == "") {
                            PDFLink = "";
                        } else {
                            PDFLink = config.S3URL + item.PDFLink;
                        }
                        SalaryData.push({
                            ExpenseID: item.ExpenseID,
                            EmployeeID: item.EmployeeID,
                            ProcessStage: item.ProcessStage,
                            PDFLink: PDFLink,
                            Employee_Company_ID: item.Employee_Company_ID,
                            Employee_Name: item.Employee_Name,
                            Employee_PhoneNumber: item.Employee_PhoneNumber,
                            Employee_Email: item.Employee_Email,
                            Employee_Basic_Salary: item.Employee_Basic_Salary,
                            Employee_PF: item.Employee_PF,
                            Employee_TDS: item.Employee_TDS,
                            Employee_Loss_of_Pay: item.Employee_Loss_of_Pay,
                            ExpensesAmount: item.ExpensesAmount,
                            Total_Deductions: item.Total_Deductions,
                            Employee_Total_Salary: item.Employee_Total_Salary,
                            Payment_Type: item.Payment_Type,
                            TransactionID: item.TransactionID,
                            Purpose_Type: item.Purpose_Type,
                            Comment: item.Comment,
                            Month_Number: item.Month_Number,
                            Year_Number: item.Year_Number,
                            Date_Time: Date_Time
                        })
                        callback();
                    }, function (err) {
                        if (!err) {
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    SalaryData: SalaryData
                                }
                            }));
                        }
                    })
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
    });
    //Find All PAid Salaries Month and Year
    app.post('/Find_All_Employees_Paid_Salaries_Month_Year', function (req, res) {
        if (req.body.skip != null && req.body.sort_type != null && req.body.Month_Number != null && req.body.Year_Number != null) {
            var query = {
                Month_Number: req.body.Month_Number,
                Year_Number: req.body.Year_Number
            };
            var sort_type = parseInt(req.body.sort_type);
            var toSort;
            if (sort_type == 1) {
                toSort = '-created_at';
            } else if (sort_type == 2) {
                toSort = 'created_at';
            } else if (sort_type == 3) {
                toSort = '-Employee_Company_ID';
            } else if (sort_type == 4) {
                toSort = 'Employee_Company_ID';
            } else if (sort_type == 5) {
                toSort = '-Employee_Basic_Salary';
            } else if (sort_type == 6) {
                toSort = 'Employee_Basic_Salary';
            } else if (sort_type == 7) {
                toSort = '-Employee_Name';
            } else if (sort_type == 8) {
                toSort = 'Employee_Name';
            } else if (sort_type == 9) {
                toSort = '-Employee_PhoneNumber';
            } else if (sort_type == 10) {
                toSort = 'Employee_PhoneNumber';
            } else if (sort_type == 11) {
                toSort = '-Employee_Email';
            } else if (sort_type == 12) {
                toSort = 'Employee_Email';
            } else if (sort_type == 13) {
                toSort = '-Payment_Type';
            } else if (sort_type == 14) {
                toSort = 'Payment_Type';
            } else if (sort_type == 13) {
                toSort = '-Employee_Total_Salary';
            } else if (sort_type == 14) {
                toSort = 'Employee_Total_Salary';
            }
            var fetch = Ezshipp_Employee_Paid_Salaries.find(query);
            fetch.sort(toSort);
            var toSkip = parseInt(req.body.skip);
            fetch.skip(toSkip);
            fetch.limit(10);
            Ezshipp_Employee_Paid_Salaries.count(query).exec(function (err, Count) {
                if (Count >= 0) {
                    fetch.exec(function (err, Result) {
                        if (!err) {
                            var SalaryData = [];
                            async.eachSeries(Result, function (item, callback) {
                                var Date_Time = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                var PDFLink;
                                if (item.PDFLink == "") {
                                    PDFLink = "";
                                } else {
                                    PDFLink = config.S3URL + item.PDFLink;
                                }
                                SalaryData.push({
                                    ExpenseID: item.ExpenseID,
                                    EmployeeID: item.EmployeeID,
                                    ProcessStage: item.ProcessStage,
                                    PDFLink: PDFLink,
                                    Employee_Company_ID: item.Employee_Company_ID,
                                    Employee_Name: item.Employee_Name,
                                    Employee_PhoneNumber: item.Employee_PhoneNumber,
                                    Employee_Email: item.Employee_Email,
                                    Employee_Basic_Salary: item.Employee_Basic_Salary,
                                    Employee_PF: item.Employee_PF,
                                    Employee_TDS: item.Employee_TDS,
                                    Employee_Loss_of_Pay: item.Employee_Loss_of_Pay,
                                    ExpensesAmount: item.ExpensesAmount,
                                    Total_Deductions: item.Total_Deductions,
                                    Employee_Total_Salary: item.Employee_Total_Salary,
                                    Payment_Type: item.Payment_Type,
                                    TransactionID: item.TransactionID,
                                    Purpose_Type: item.Purpose_Type,
                                    Comment: item.Comment,
                                    Month_Number: item.Month_Number,
                                    Year_Number: item.Year_Number,
                                    Date_Time: Date_Time
                                })
                                callback();
                            }, function (err) {
                                if (!err) {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            SalaryData: SalaryData,
                                            Count: Count
                                        }
                                    }));
                                }
                            })
                        }
                    })
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
    });
    //Find All PAid Salaries
    app.post('/Find_All_Employees_Paid_Salaries', function (req, res) {
        if (req.body.skip != null && req.body.sort_type != null) {
            var query = {

            };
            var sort_type = parseInt(req.body.sort_type);
            var toSort;
            if (sort_type == 1) {
                toSort = '-created_at';
            } else if (sort_type == 2) {
                toSort = 'created_at';
            } else if (sort_type == 3) {
                toSort = '-Employee_Company_ID';
            } else if (sort_type == 4) {
                toSort = 'Employee_Company_ID';
            } else if (sort_type == 5) {
                toSort = '-Employee_Basic_Salary';
            } else if (sort_type == 6) {
                toSort = 'Employee_Basic_Salary';
            } else if (sort_type == 7) {
                toSort = '-Employee_Name';
            } else if (sort_type == 8) {
                toSort = 'Employee_Name';
            } else if (sort_type == 9) {
                toSort = '-Employee_PhoneNumber';
            } else if (sort_type == 10) {
                toSort = 'Employee_PhoneNumber';
            } else if (sort_type == 11) {
                toSort = '-Employee_Email';
            } else if (sort_type == 12) {
                toSort = 'Employee_Email';
            } else if (sort_type == 13) {
                toSort = '-Payment_Type';
            } else if (sort_type == 14) {
                toSort = 'Payment_Type';
            } else if (sort_type == 13) {
                toSort = '-Employee_Total_Salary';
            } else if (sort_type == 14) {
                toSort = 'Employee_Total_Salary';
            }
            var fetch = Ezshipp_Employee_Paid_Salaries.find(query);
            fetch.sort(toSort);
            var toSkip = parseInt(req.body.skip);
            fetch.skip(toSkip);
            fetch.limit(10);
            Ezshipp_Employee_Paid_Salaries.count(query).exec(function (err, Count) {
                if (Count >= 0) {
                    fetch.exec(function (err, Result) {
                        if (!err) {
                            var SalaryData = [];
                            async.eachSeries(Result, function (item, callback) {
                                var Date_Time = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                var PDFLink;
                                if (item.PDFLink == "") {
                                    PDFLink = "";
                                } else {
                                    PDFLink = config.S3URL + item.PDFLink;
                                }
                                SalaryData.push({
                                    ExpenseID: item.ExpenseID,
                                    EmployeeID: item.EmployeeID,
                                    ProcessStage: item.ProcessStage,
                                    PDFLink: PDFLink,
                                    Employee_Company_ID: item.Employee_Company_ID,
                                    Employee_Name: item.Employee_Name,
                                    Employee_PhoneNumber: item.Employee_PhoneNumber,
                                    Employee_Email: item.Employee_Email,
                                    Employee_Basic_Salary: item.Employee_Basic_Salary,
                                    Employee_PF: item.Employee_PF,
                                    Employee_TDS: item.Employee_TDS,
                                    Employee_Loss_of_Pay: item.Employee_Loss_of_Pay,
                                    ExpensesAmount: item.ExpensesAmount,
                                    Total_Deductions: item.Total_Deductions,
                                    Employee_Total_Salary: item.Employee_Total_Salary,
                                    Payment_Type: item.Payment_Type,
                                    TransactionID: item.TransactionID,
                                    Purpose_Type: item.Purpose_Type,
                                    Comment: item.Comment,
                                    Month_Number: item.Month_Number,
                                    Year_Number: item.Year_Number,
                                    Date_Time: Date_Time
                                })
                                callback();
                            }, function (err) {
                                if (!err) {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            SalaryData: SalaryData,
                                            Count: Count
                                        }
                                    }));
                                }
                            })
                        }
                    })
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
    });
    //Edit Employee Paid Salary Details
    app.post('/Edit_Employee_Salary_Paid_Details', function (req, res) {
        if (req.body.EmployeeID != null && req.body.SalaryPaidID != null && req.body.Employee_Basic_Salary != null && req.body.Employee_PF != null
            && req.body.Employee_TDS != null && req.body.Employee_Loss_of_Pay != null && req.body.Payment_Type != null
            && req.body.TransactionID != null && req.body.Comment != null && req.body.Month_Number != null && req.body.Year_Number != null
            && req.body.ExpensesAmount != null && req.body.Employee_Total_Salary != null && req.body.Total_Deductions != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    Ezshipp_Employee_Paid_Salaries.findOne({ SalaryPaidID: req.body.SalaryPaidID }).exec(function (err, SalaryData) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (SalaryData == null) {
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.Employee_Salary_Not_Found
                                    }
                                }));
                            } else {
                                HrMod.Check_Employee_Salary_Month_Exist_or_Not(req.body, EmployeeData, SalaryData, function (err, SalaryStatus) {
                                    if (err) {
                                        res.send(JSON.stringify(SalaryStatus));
                                    } else {
                                        var Employee_Basic_Salary = parseInt(req.body.Employee_Basic_Salary);
                                        var Employee_PF = parseInt(req.body.Employee_PF);
                                        var Employee_TDS = parseInt(req.body.Employee_TDS);
                                        var Employee_Loss_of_Pay = parseInt(req.body.Employee_Loss_of_Pay);
                                        var ExpensesAmount = parseInt(req.body.ExpensesAmount);
                                        var Total_Deductions = parseInt(req.body.Total_Deductions);
                                        var Employee_Total_Salary = parseInt(req.body.Employee_Total_Salary);
                                        var SalaryPaidID = req.body.SalaryPaidID;
                                        var date = new Date();
                                        var query = {
                                            SalaryPaidID: SalaryPaidID
                                        };
                                        var changes = {
                                            Employee_Basic_Salary: Employee_Basic_Salary,
                                            Employee_PF: Employee_PF,
                                            Employee_TDS: Employee_TDS,
                                            Employee_Loss_of_Pay: Employee_Loss_of_Pay,
                                            ExpensesAmount: ExpensesAmount,
                                            Total_Deductions: Total_Deductions,
                                            Employee_Total_Salary: Employee_Total_Salary,
                                            Payment_Type: req.body.Payment_Type,
                                            TransactionID: req.body.TransactionID,
                                            Comment: req.body.Comment,
                                            Month_Number: req.body.Month_Number,
                                            Year_Number: req.body.Year_Number,
                                            updated_at: date
                                        }
                                        var multiplicity = {
                                            multi: false
                                        }
                                        Ezshipp_Employee_Paid_Salaries.update(query, changes, multiplicity).exec(function (err, Result) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                res.send(new ApiResponce({
                                                    success: true,
                                                    extras: {
                                                        Status: "Employee Paid Salary Updated Successfully"
                                                    }
                                                }));
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
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
    });
    //Add Employee Paid Salary Details
    app.post('/Add_Employee_Salary_Paid_Details', function (req, res) {
        if (req.body.EmployeeID != null && req.body.Employee_Basic_Salary != null && req.body.Employee_PF != null
            && req.body.ExpensesAmount != null && req.body.Employee_Total_Salary != null && req.body.Total_Deductions != null
            && req.body.Employee_TDS != null && req.body.Employee_Loss_of_Pay != null && req.body.Payment_Type != null
            && req.body.TransactionID != null && req.body.Comment != null && req.body.Month_Number != null && req.body.Year_Number != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    if (EmployeeData.Complete_Profile_Set == true) {
                        Ezshipp_Employee_Paid_Salaries.findOne({ EmployeeID: req.body.EmployeeID, Month_Number: req.body.Month_Number, Year_Number: req.body.Year_Number }).exec(function (err, Result) {
                            if (err) {
                                console.log(err);
                            } else {
                                if (Result != null) {
                                    res.send(new ApiResponce({
                                        success: false,
                                        extras: {
                                            msg: ApiMessages.Employee_Salary_Already_Paid_At_this_Month
                                        }
                                    }));
                                } else if (Result == null) {
                                    Counters.findOneAndUpdate({
                                        _id: "payslip"
                                    }, {
                                            $set: {
                                                _id: "payslip"
                                            },
                                            $inc: {
                                                "seq": 1
                                            }
                                        }, {
                                            upsert: true,
                                            returnNewDocument: true
                                        }).exec(function (err, Result) {
                                            var PayslipNumber = parseInt(Result.seq) + 1;
                                            var Employee_Basic_Salary = parseInt(req.body.Employee_Basic_Salary);
                                            var Employee_PF = parseInt(req.body.Employee_PF);
                                            var Employee_TDS = parseInt(req.body.Employee_TDS);
                                            var Employee_Loss_of_Pay = parseInt(req.body.Employee_Loss_of_Pay);
                                            var ExpensesAmount = parseInt(req.body.ExpensesAmount);
                                            var Total_Deductions = parseInt(req.body.Total_Deductions);
                                            var Employee_Total_Salary = parseInt(req.body.Employee_Total_Salary);
                                            var SalaryPaidID = uuid();
                                            var date = new Date();
                                            var SalaryData = new Ezshipp_Employee_Paid_Salaries({
                                                SalaryPaidID: SalaryPaidID,
                                                EmployeeID: req.body.EmployeeID,
                                                Employee_Company_ID: EmployeeData.Employee_Company_ID,
                                                Employee_Name: EmployeeData.Employee_Name,
                                                Employee_PhoneNumber: EmployeeData.Employee_PhoneNumber,
                                                Employee_Email: EmployeeData.Employee_Email,
                                                Employee_Basic_Salary: Employee_Basic_Salary,
                                                Employee_PF: Employee_PF,
                                                Employee_TDS: Employee_TDS,
                                                Employee_Loss_of_Pay: Employee_Loss_of_Pay,
                                                ExpensesAmount: ExpensesAmount,
                                                Total_Deductions: Total_Deductions,
                                                Employee_Total_Salary: Employee_Total_Salary,
                                                Payment_Type: req.body.Payment_Type,
                                                TransactionID: req.body.TransactionID,
                                                Comment: req.body.Comment,
                                                Month_Number: req.body.Month_Number,
                                                Year_Number: req.body.Year_Number,
                                                PayslipNumber: PayslipNumber,
                                                PDFLink: "",
                                                ProcessStage: 1,
                                                created_at: date,
                                                updated_at: date
                                            })
                                            SalaryData.save(function (err, SalaryData) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    res.send(new ApiResponce({
                                                        success: true,
                                                        extras: {
                                                            Status: 'Payslip is Processing',
                                                            SalaryData: SalaryData
                                                        }
                                                    }));
                                                    CustomerMod.Generate_Employee_Payslip_Adding_Salary(req.body, EmployeeData, SalaryData, function (Result) {
                                                        console.log(Result);
                                                    })
                                                }
                                            })
                                        })
                                }
                            }
                        })
                    } else {
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.Employee_Profile_Not_Set
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
    });



    app.post('/Search_All_Employees_Expenses_Month_Year', function (req, res) {
        if (req.body.SearchValue != null && req.body.sort_type != null && req.body.Month_Number != null && req.body.Year_Number != null) {
            var query = {
                Month_Number: req.body.Month_Number,
                Year_Number: req.body.Year_Number,
                $or: [
                    {
                        Employee_Company_ID: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_Name: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_PhoneNumber: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_Email: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Amount: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        TransactionID: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Comment: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }
                ]
            };
            var sort_type = parseInt(req.body.sort_type);
            var toSort;
            if (sort_type == 1) {
                toSort = '-created_at';
            } else if (sort_type == 2) {
                toSort = 'created_at';
            } else if (sort_type == 3) {
                toSort = '-Employee_Company_ID';
            } else if (sort_type == 4) {
                toSort = 'Employee_Company_ID';
            } else if (sort_type == 5) {
                toSort = '-Amount';
            } else if (sort_type == 6) {
                toSort = 'Amount';
            } else if (sort_type == 7) {
                toSort = '-Employee_Name';
            } else if (sort_type == 8) {
                toSort = 'Employee_Name';
            } else if (sort_type == 9) {
                toSort = '-Employee_PhoneNumber';
            } else if (sort_type == 10) {
                toSort = 'Employee_PhoneNumber';
            } else if (sort_type == 11) {
                toSort = '-Employee_Email';
            } else if (sort_type == 12) {
                toSort = 'Employee_Email';
            } else if (sort_type == 13) {
                toSort = '-Payment_Type';
            } else if (sort_type == 14) {
                toSort = 'Payment_Type';
            }
            var fetch = Ezshipp_Employee_Expenses.find(query);
            fetch.sort(toSort);
            fetch.limit(10);
            fetch.exec(function (err, Result) {
                if (!err) {
                    var ExpensesData = [];
                    async.eachSeries(Result, function (item, callback) {
                        var Date_Time = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                        ExpensesData.push({
                            ExpenseID: item.ExpenseID,
                            EmployeeID: item.EmployeeID,
                            Employee_Company_ID: item.Employee_Company_ID,
                            Employee_Name: item.Employee_Name,
                            Employee_PhoneNumber: item.Employee_PhoneNumber,
                            Employee_Email: item.Employee_Email,
                            Amount: item.Amount,
                            Payment_Type: item.Payment_Type,
                            TransactionID: item.TransactionID,
                            Purpose_Type: item.Purpose_Type,
                            Comment: item.Comment,
                            Month_Number: item.Month_Number,
                            Year_Number: item.Year_Number,
                            Date_Time: Date_Time
                        })
                        callback();
                    }, function (err) {
                        if (!err) {
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    ExpensesData: ExpensesData
                                }
                            }));
                        }
                    })
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
    });
    app.post('/Find_All_Employees_Expenses_Month_Year', function (req, res) {
        if (req.body.skip != null && req.body.sort_type != null && req.body.Month_Number != null && req.body.Year_Number != null) {
            var query = {
                Month_Number: req.body.Month_Number,
                Year_Number: req.body.Year_Number
            };
            var sort_type = parseInt(req.body.sort_type);
            var toSort;
            if (sort_type == 1) {
                toSort = '-created_at';
            } else if (sort_type == 2) {
                toSort = 'created_at';
            } else if (sort_type == 3) {
                toSort = '-Employee_Company_ID';
            } else if (sort_type == 4) {
                toSort = 'Employee_Company_ID';
            } else if (sort_type == 5) {
                toSort = '-Amount';
            } else if (sort_type == 6) {
                toSort = 'Amount';
            } else if (sort_type == 7) {
                toSort = '-Employee_Name';
            } else if (sort_type == 8) {
                toSort = 'Employee_Name';
            } else if (sort_type == 9) {
                toSort = '-Employee_PhoneNumber';
            } else if (sort_type == 10) {
                toSort = 'Employee_PhoneNumber';
            } else if (sort_type == 11) {
                toSort = '-Employee_Email';
            } else if (sort_type == 12) {
                toSort = 'Employee_Email';
            } else if (sort_type == 13) {
                toSort = '-Payment_Type';
            } else if (sort_type == 14) {
                toSort = 'Payment_Type';
            }
            var fetch = Ezshipp_Employee_Expenses.find(query);
            fetch.sort(toSort);
            var toSkip = parseInt(req.body.skip);
            fetch.skip(toSkip);
            fetch.limit(10);
            Ezshipp_Employee_Expenses.count(query).exec(function (err, Count) {
                if (Count >= 0) {
                    fetch.exec(function (err, Result) {
                        if (!err) {
                            var ExpensesData = [];
                            async.eachSeries(Result, function (item, callback) {
                                var Date_Time = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                ExpensesData.push({
                                    ExpenseID: item.ExpenseID,
                                    EmployeeID: item.EmployeeID,
                                    Employee_Company_ID: item.Employee_Company_ID,
                                    Employee_Name: item.Employee_Name,
                                    Employee_PhoneNumber: item.Employee_PhoneNumber,
                                    Employee_Email: item.Employee_Email,
                                    Amount: item.Amount,
                                    Payment_Type: item.Payment_Type,
                                    TransactionID: item.TransactionID,
                                    Purpose_Type: item.Purpose_Type,
                                    Comment: item.Comment,
                                    Month_Number: item.Month_Number,
                                    Year_Number: item.Year_Number,
                                    Date_Time: Date_Time
                                })
                                callback();
                            }, function (err) {
                                if (!err) {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            ExpensesData: ExpensesData,
                                            Count: Count
                                        }
                                    }));
                                }
                            })
                        }
                    })
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
    });
    app.post('/Search_All_Employees_Expenses', function (req, res) {
        if (req.body.SearchValue != null && req.body.sort_type != null) {
            var query = {
                $or: [
                    {
                        Employee_Company_ID: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_Name: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_PhoneNumber: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_Email: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Amount: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        TransactionID: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Comment: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }
                ]
            };
            var sort_type = parseInt(req.body.sort_type);
            var toSort;
            if (sort_type == 1) {
                toSort = '-created_at';
            } else if (sort_type == 2) {
                toSort = 'created_at';
            } else if (sort_type == 3) {
                toSort = '-Employee_Company_ID';
            } else if (sort_type == 4) {
                toSort = 'Employee_Company_ID';
            } else if (sort_type == 5) {
                toSort = '-Amount';
            } else if (sort_type == 6) {
                toSort = 'Amount';
            } else if (sort_type == 7) {
                toSort = '-Employee_Name';
            } else if (sort_type == 8) {
                toSort = 'Employee_Name';
            } else if (sort_type == 9) {
                toSort = '-Employee_PhoneNumber';
            } else if (sort_type == 10) {
                toSort = 'Employee_PhoneNumber';
            } else if (sort_type == 11) {
                toSort = '-Employee_Email';
            } else if (sort_type == 12) {
                toSort = 'Employee_Email';
            } else if (sort_type == 13) {
                toSort = '-Payment_Type';
            } else if (sort_type == 14) {
                toSort = 'Payment_Type';
            }
            var fetch = Ezshipp_Employee_Expenses.find(query);
            fetch.sort(toSort);
            fetch.limit(10);
            fetch.exec(function (err, Result) {
                if (!err) {
                    var ExpensesData = [];
                    async.eachSeries(Result, function (item, callback) {
                        var Date_Time = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                        ExpensesData.push({
                            ExpenseID: item.ExpenseID,
                            EmployeeID: item.EmployeeID,
                            Employee_Company_ID: item.Employee_Company_ID,
                            Employee_Name: item.Employee_Name,
                            Employee_PhoneNumber: item.Employee_PhoneNumber,
                            Employee_Email: item.Employee_Email,
                            Amount: item.Amount,
                            Payment_Type: item.Payment_Type,
                            TransactionID: item.TransactionID,
                            Purpose_Type: item.Purpose_Type,
                            Comment: item.Comment,
                            Month_Number: item.Month_Number,
                            Year_Number: item.Year_Number,
                            Date_Time: Date_Time
                        })
                        callback();
                    }, function (err) {
                        if (!err) {
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    ExpensesData: ExpensesData
                                }
                            }));
                        }
                    })
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
    });
    app.post('/Find_All_Employees_Expenses', function (req, res) {
        if (req.body.skip != null && req.body.sort_type != null) {
            var query = {

            };
            var sort_type = parseInt(req.body.sort_type);
            var toSort;
            if (sort_type == 1) {
                toSort = '-created_at';
            } else if (sort_type == 2) {
                toSort = 'created_at';
            } else if (sort_type == 3) {
                toSort = '-Employee_Company_ID';
            } else if (sort_type == 4) {
                toSort = 'Employee_Company_ID';
            } else if (sort_type == 5) {
                toSort = '-Amount';
            } else if (sort_type == 6) {
                toSort = 'Amount';
            } else if (sort_type == 7) {
                toSort = '-Employee_Name';
            } else if (sort_type == 8) {
                toSort = 'Employee_Name';
            } else if (sort_type == 9) {
                toSort = '-Employee_PhoneNumber';
            } else if (sort_type == 10) {
                toSort = 'Employee_PhoneNumber';
            } else if (sort_type == 11) {
                toSort = '-Employee_Email';
            } else if (sort_type == 12) {
                toSort = 'Employee_Email';
            } else if (sort_type == 13) {
                toSort = '-Payment_Type';
            } else if (sort_type == 14) {
                toSort = 'Payment_Type';
            }
            var fetch = Ezshipp_Employee_Expenses.find(query);
            fetch.sort(toSort);
            var toSkip = parseInt(req.body.skip);
            fetch.skip(toSkip);
            fetch.limit(10);
            Ezshipp_Employee_Expenses.count(query).exec(function (err, Count) {
                if (Count >= 0) {
                    fetch.exec(function (err, Result) {
                        if (!err) {
                            var ExpensesData = [];
                            async.eachSeries(Result, function (item, callback) {
                                var Date_Time = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                ExpensesData.push({
                                    ExpenseID: item.ExpenseID,
                                    EmployeeID: item.EmployeeID,
                                    Employee_Company_ID: item.Employee_Company_ID,
                                    Employee_Name: item.Employee_Name,
                                    Employee_PhoneNumber: item.Employee_PhoneNumber,
                                    Employee_Email: item.Employee_Email,
                                    Amount: item.Amount,
                                    Payment_Type: item.Payment_Type,
                                    TransactionID: item.TransactionID,
                                    Purpose_Type: item.Purpose_Type,
                                    Comment: item.Comment,
                                    Month_Number: item.Month_Number,
                                    Year_Number: item.Year_Number,
                                    Date_Time: Date_Time
                                })
                                callback();
                            }, function (err) {
                                if (!err) {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            ExpensesData: ExpensesData,
                                            Count: Count
                                        }
                                    }));
                                }
                            })
                        }
                    })
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
    });
    app.post('/Send_Employee_Expense', function (req, res) {
        if (req.body.EmployeeID != null && req.body.Month_Number != null && req.body.Year_Number != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    var ExpensesAmount = 0;
                    var query = {
                        EmployeeID: req.body.EmployeeID,
                        Month_Number: req.body.Month_Number,
                        Year_Number: req.body.Year_Number
                    };
                    var MonthYear = String(parseInt(req.body.Month_Number)) + '/' + String(req.body.Year_Number);
                    var from_moment = moment(MonthYear, 'M/YYYY').utcOffset(330).startOf('month');
                    var to_moment = moment(MonthYear, 'M/YYYY').utcOffset(330).endOf('month');
                    var AttendanceQuery = {
                        EmployeeID: EmployeeData.EmployeeID,
                        Attendance_Date: {
                            $gte: from_moment,
                            $lt: to_moment
                        }
                    };
                    console.log(AttendanceQuery);
                    Ezshipp_Employee_Attendance.count(AttendanceQuery).exec(function (err, Attendance) {
                        if (Attendance >= 0) {
                            Ezshipp_Employee_Expenses.find(query).select('Amount').exec(function (err, Result) {
                                if (!err) {
                                    async.each(Result, function (item, callback) {
                                        ExpensesAmount += parseFloat(item.Amount);
                                        callback();
                                    }, function (err) {
                                        if (!err) {
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    ExpensesAmount: ExpensesAmount,
                                                    Attendance: Attendance
                                                }
                                            }));
                                        }
                                    })
                                }
                            });
                        }
                    })
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
    });


    app.post('/Edit_Employee_Expense', function (req, res) {
        if (req.body.ExpenseID != null && req.body.EmployeeID != null && req.body.Amount != null && req.body.Payment_Type != null && req.body.TransactionID != null && req.body.Purpose_Type != null && req.body.Comment != null && req.body.Month_Number != null && req.body.Year_Number != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    HrMod.Check_for_Employee_Expense(req.body, function (err, ExpensesData) {
                        if (err) {
                            res.send(JSON.stringify(ExpensesData));
                        } else {
                            HrMod.Edit_Employee_Expense(req.body, function (err, Result) {
                                res.send(JSON.stringify(Result));
                            })
                        }
                    })
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
    });
    app.post('/Find_All_Employee_Expenses_Month', function (req, res) {
        if (req.body.EmployeeID != null && req.body.Month_Number != null && req.body.Year_Number != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    var month = parseInt(req.body.Month_Number);
                    var year = parseInt(req.body.Year_Number);
                    var next_month;
                    var next_month_year;
                    if (month == 12) {
                        next_month = 1;
                        next_month_year = year + 1;
                    } else {
                        next_month = month + 1;
                        next_month_year = year;
                    }
                    var this_month_start_date = '01/' + ("0" + month).slice(-2) + '/' + year;
                    var next_month_start_date = '01/' + ("0" + next_month).slice(-2) + '/' + next_month_year;
                    var this_month_start_moment = moment(this_month_start_date, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
                    var next_month_start_moment = moment(next_month_start_date, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
                    var query = {
                        EmployeeID: req.body.EmployeeID,
                        created_at: {
                            $gte: this_month_start_moment,
                            $lte: next_month_start_moment
                        }
                    };
                    var Total_Salary = EmployeeData.Employee_Basic_Salary + (EmployeeData.Employee_PF + EmployeeData.Employee_TDS);
                    var Total_Paid_By_All_Sources = 0;
                    var Balance_Amount = 0;
                    var SalaryPaid = 0;
                    var ExpensesPaid = 0;
                    var fetch = Ezshipp_Employee_Expenses.find(query);
                    fetch.sort('-created_at');
                    fetch.exec(function (err, Result) {
                        if (!err) {
                            var ExpensesData = [];
                            async.eachSeries(Result, function (item, callback) {
                                if (item.Purpose_Type == 1) {
                                    SalaryPaid += parseInt(item.Amount);
                                } else {
                                    ExpensesPaid += parseInt(item.Amount);
                                }
                                var Date_Time = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                ExpensesData.push({
                                    ExpenseID: item.ExpenseID,
                                    EmployeeID: item.EmployeeID,
                                    Amount: item.Amount,
                                    Payment_Type: item.Payment_Type,
                                    TransactionID: item.TransactionID,
                                    Purpose_Type: item.Purpose_Type,
                                    Comment: item.Comment,
                                    Date_Time: Date_Time
                                })
                                callback();
                            }, function (err) {
                                if (!err) {
                                    Total_Paid_By_All_Sources = SalaryPaid + ExpensesPaid;
                                    Balance_Amount = Total_Salary - Total_Paid_By_All_Sources;
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            ExpensesData: ExpensesData,
                                            Total_Salary: Total_Salary,
                                            Total_Paid_By_All_Sources: Total_Paid_By_All_Sources,
                                            Balance_Amount: Balance_Amount,
                                            SalaryPaid: SalaryPaid,
                                            ExpensesPaid: ExpensesPaid
                                        }
                                    }));
                                }
                            })
                        }
                    })
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

    router.post('/Add_Employee_Expenses', function (req, res) {
        if (req.body.EmployeeID != null && req.body.Amount != null && req.body.Payment_Type != null && req.body.TransactionID != null && req.body.Purpose_Type != null && req.body.Comment != null && req.body.Month_Number != null && req.body.Year_Number != null) {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    if (EmployeeData.Complete_Profile_Set == true) {
                        HrMod.Add_Employee_Expenses(req.body, EmployeeData, function (Result) {
                            res.send(JSON.stringify(Result));
                        })
                    } else {
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.Employee_Profile_Not_Set
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
    });
    router.post('/Find_All_Customer_Cod_Reports', function (req, res) {
        console.log("Find All Invoices");
        console.log(req.body);

        var Customer_CODReport = require('../Models/Customer_CODReport.js');
        if (req.body.skip != null && req.body.limit != null && req.body.sortOptions != null) {
            Customer_CODReport.find({}, function (err, Count) {
                if (Count.length >= 0) {
                    var toSkip = parseInt(req.body.skip);
                    var toLimit = parseInt(req.body.limit);
                    var sortOptions = {
                        created_at: -1
                    }
                    if (req.body.sortOptions != null && Object.keys(req.body.sortOptions).length > 0) {
                        sortOptions = req.body.sortOptions
                    }
                    Customer_CODReport.find().sort(sortOptions).skip(toSkip).limit(toLimit).exec(function (err, Result) {
                        if (!err) {
                            var InvoiceData = [];
                            async.eachSeries(Result, function (item, callback) {
                                var PDFLink;
                                var S3URL = config.S3URL;
                                if (item.ProcessStage == 2) {
                                    PDFLink = S3URL + item.PDFLink;
                                } else {
                                    PDFLink = '';
                                }
                                var from_date = moment(item.from_date).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                var to_date = moment(item.to_date).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                var created_at = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                InvoiceData.push({
                                    CustomerInvoiceID: item.CustomerInvoiceID,
                                    CustomerID: item.CustomerID,
                                    CustomerName: item.CustomerName,
                                    CustomerPhone: item.CustomerPhone,
                                    from_date: from_date,
                                    to_date: to_date,
                                    InvoiceNumber: item.InvoiceNumber,
                                    PDFLink: PDFLink,
                                    ProcessStage: item.ProcessStage,
                                    created_at: created_at
                                })
                                callback();
                            }, function (err) {
                                if (!err) {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            InvoiceData: InvoiceData,
                                            Count: Count.length
                                        }
                                    }));
                                }
                            })
                        }
                    })
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
    router.post('/Find_All_Invoices', function (req, res) {
        console.log("Find All Invoices");
        console.log(req.body);
        if (req.body.skip != null) {
            Customer_Invoicing.count().exec(function (err, Count) {
                if (Count >= 0) {
                    var toSkip = parseInt(req.body.skip);
                    Customer_Invoicing.find().sort({ InvoiceNumber: -1 }).skip(toSkip).limit(10).exec(function (err, Result) {
                        if (!err) {
                            var InvoiceData = [];
                            async.eachSeries(Result, function (item, callback) {
                                var PDFLink;
                                var S3URL = config.S3URL;
                                if (item.ProcessStage == 2) {
                                    PDFLink = S3URL + item.PDFLink;
                                } else {
                                    PDFLink = '';
                                }
                                var from_date = moment(item.from_date).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                var to_date = moment(item.to_date).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                var Invoice_Date = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                InvoiceData.push({
                                    CustomerInvoiceID: item.CustomerInvoiceID,
                                    CustomerID: item.CustomerID,
                                    CustomerName: item.CustomerName,
                                    CustomerPhone: item.CustomerPhone,
                                    from_date: from_date,
                                    to_date: to_date,
                                    InvoiceNumber: item.InvoiceNumber,
                                    PDFLink: PDFLink,
                                    ProcessStage: item.ProcessStage,
                                    Invoice_Date: Invoice_Date
                                })
                                callback();
                            }, function (err) {
                                if (!err) {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            InvoiceData: InvoiceData,
                                            Count: Count
                                        }
                                    }));
                                }
                            })
                        }
                    })
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
    router.post('/Get_Customer_COD_Report', function (req, res) {
        if (req.body.CustomerID != null && req.body.CustomerInvoiceID != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(CustomerData);
                } else {
                    Customer_CODReport.findOne({ CustomerInvoiceID: req.body.CustomerInvoiceID }, function (err, InvoiceData) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (InvoiceData == null) {
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.INVOICE_NOT_FOUND
                                    }
                                }));
                            } else {
                                var PDFLink;
                                var S3URL = config.S3URL;
                                if (InvoiceData.ProcessStage == 2) {
                                    PDFLink = S3URL + InvoiceData.PDFLink;
                                } else {
                                    PDFLink = '';
                                }
                                var from_date = moment(InvoiceData.from_date).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                var to_date = moment(InvoiceData.from_date).utcOffset(330).subtract(1, 'days').format('MMMM Do YYYY, h:mm:ss a');
                                var created_at = moment(InvoiceData.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                var InvoiceData = {
                                    CustomerInvoiceID: InvoiceData.CustomerInvoiceID,
                                    CustomerID: InvoiceData.CustomerID,
                                    CustomerName: InvoiceData.CustomerName,
                                    CustomerPhone: InvoiceData.CustomerPhone,
                                    from_date: from_date,
                                    to_date: to_date,
                                    InvoiceNumber: InvoiceData.InvoiceNumber,
                                    PDFLink: PDFLink,
                                    ProcessStage: InvoiceData.ProcessStage,
                                    created_at: created_at
                                }
                                res.send(new ApiResponce({
                                    success: true,
                                    extras: {
                                        InvoiceData: InvoiceData
                                    }
                                }));

                            }
                        }
                    })
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
    router.post('/Get_Customer_Monthly_Invoice', function (req, res) {
        if (req.body.CustomerID != null && req.body.CustomerInvoiceID != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(CustomerData);
                } else {
                    Customer_Invoicing.findOne({ CustomerInvoiceID: req.body.CustomerInvoiceID }, function (err, InvoiceData) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (InvoiceData == null) {
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.INVOICE_NOT_FOUND
                                    }
                                }));
                            } else {
                                var PDFLink;
                                var S3URL = config.S3URL;
                                if (InvoiceData.ProcessStage == 2) {
                                    PDFLink = S3URL + InvoiceData.PDFLink;
                                } else {
                                    PDFLink = '';
                                }
                                var from_date = moment(InvoiceData.from_date).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                var to_date = moment(InvoiceData.from_date).utcOffset(330).subtract(1, 'days').format('MMMM Do YYYY, h:mm:ss a');
                                var Invoice_Date = moment(InvoiceData.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                var InvoiceData = {
                                    CustomerInvoiceID: InvoiceData.CustomerInvoiceID,
                                    CustomerID: InvoiceData.CustomerID,
                                    CustomerName: InvoiceData.CustomerName,
                                    CustomerPhone: InvoiceData.CustomerPhone,
                                    from_date: from_date,
                                    to_date: to_date,
                                    InvoiceNumber: InvoiceData.InvoiceNumber,
                                    PDFLink: PDFLink,
                                    ProcessStage: InvoiceData.ProcessStage,
                                    Invoice_Date: Invoice_Date
                                }
                                res.send(new ApiResponce({
                                    success: true,
                                    extras: {
                                        InvoiceData: InvoiceData
                                    }
                                }));

                            }
                        }
                    })
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
    router.post('/Testing_New_PDF', function (req, res) {
        CustomerMod.Testing_New_PDF(function (Result) {
            res.send(Result);
        })
    });
    router.post('/Search_All_Customer_Order_Records', function (req, res) {
        if (req.body.AdminID != null && req.body.SearchValue != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Search_All_Customer_Order_Records(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    router.post('/Find_All_Customer_Order_Records', function (req, res) {
        if (req.body.AdminID != null && req.body.skip != null && req.body.limit != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Find_All_Customer_Order_Records(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    router.post('/Refresh_Premium_Customer_Record', function (req, res) {
        if (req.body.AdminID != null && req.body.RecordID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_for_Premium_Customer_Order_Record(req.body, function (err, RecordData) {
                        if (err) {
                            res.send(JSON.stringify(RecordData));
                        } else {
                            AdminMod.Refresh_Premium_Customer_Record(RecordData, function (err, Result) {
                                if (!err) {
                                    res.send(JSON.stringify(Result));
                                }
                            })
                        }
                    })
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
    router.post('/Premium_Customer_Records_in_Date_Range', function (req, res) {
        console.log(req.body);
        if (req.body.AdminID != null && req.body.CustomerID != null && req.body.from_date != null && req.body.to_date != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                        if (err) {
                            res.send(CustomerData);
                        } else {
                            if (CustomerData.Premium_User == true) {
                                if (CustomerData.Premium_Status == true) {
                                    var from_date = moment(req.body.from_date, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
                                    var to_date = moment(req.body.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days').toDate();
                                    var query = {
                                        Whether_Deleted: false,
                                        status: 14,
                                        userId: req.body.CustomerID,
                                        Date: {
                                            $gte: from_date,
                                            $lte: to_date
                                        }
                                    };
                                    Orders.count(query).exec(function (err, Count) {
                                        if (Count > 0) {
                                            Counters.findOneAndUpdate({
                                                _id: "customerorderrecord"
                                            }, {
                                                    $set: {
                                                        _id: "customerorderrecord"
                                                    },
                                                    $inc: {
                                                        "seq": 1
                                                    }
                                                }, {
                                                    upsert: true,
                                                    returnNewDocument: true
                                                }).exec(function (err, Result) {
                                                    var RecordNumber = parseInt(Result.seq) + 1;
                                                    var RecordID = uuid();

                                                    var ProcessStage = 1;
                                                    var date = new Date();
                                                    var Record_Data = new Customer_Order_Records({
                                                        RecordID: RecordID,
                                                        CustomerName: CustomerData.First_name,
                                                        CustomerPhone: CustomerData.Phone,
                                                        CustomerID: req.body.CustomerID,
                                                        from_date: from_date,
                                                        to_date: to_date,
                                                        RecordNumber: RecordNumber,
                                                        ProcessStage: ProcessStage,
                                                        created_at: date,
                                                        updated_at: date
                                                    });
                                                    Record_Data.save(function (err, RecordData) {
                                                        if (err) {
                                                            console.log(err);
                                                        } else {
                                                            res.send(new ApiResponce({
                                                                success: true,
                                                                extras: {
                                                                    Status: 'Customer Order Record ' + RecordNumber + ' is Processing'
                                                                }
                                                            }));
                                                            CustomerMod.Completed_Order_Customer_Report(req.body, function (err, OrderData) {
                                                                if (!err) {
                                                                    CustomerMod.Generate_Customer_Order_Record(req.body, RecordData, CustomerData, OrderData, function (Result) {
                                                                        console.log(Result);
                                                                    })
                                                                }
                                                            });
                                                        }
                                                    })
                                                })
                                        } else {
                                            res.send(new ApiResponce({
                                                success: false,
                                                extras: {
                                                    msg: ApiMessages.NO_ORDERS_FOUND
                                                }
                                            }));
                                        }
                                    })
                                } else {
                                    res.send(new ApiResponce({
                                        success: false,
                                        extras: {
                                            msg: ApiMessages.PREMIUM_CUSTOMER_IS_NOT_ACTIVE
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


    router.post('/Create_Client_COD_Report', function (req, res) {
        console.log("Create_Client_COD_Report");
        console.log(req.body);

        if (req.body.CustomerID != null && req.body.from_date != null && req.body.to_date != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(CustomerData);

                    console.log("---- > 1");
                } else {

                    var from_date = moment(req.body.from_date, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
                    var to_date = moment(req.body.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days').toDate();
                    var query = {
                        Whether_Deleted: false,
                        status: 14,
                        userId: req.body.CustomerID,
                        Date: {
                            $gte: from_date,
                            $lte: to_date
                        }
                    };

                    console.log("---- > 2 1 " + query);
                    console.log(query);


                    Orders.count(query).exec((err, Count) => {

                        console.log("---- > 2 " + Count);
                        if (Count > 0) {
                            Counters.findOneAndUpdate({
                                _id: "ClientCOD"
                            }, {
                                    $set: {
                                        _id: "ClientCOD"
                                    },
                                    $inc: {
                                        "seq": 1
                                    }
                                }, {
                                    upsert: true,
                                    returnNewDocument: true
                                }).exec(function (err, Result) {

                                    console.log("---- > 3 ");
                                    var InvoiceNumber = parseInt(Result.seq) + 1;
                                    var CustomerInvoiceID = uuid();

                                    var ProcessStage = 1;
                                    var date = new Date();
                                    Customer_CODReportData = new Customer_CODReport({
                                        CustomerInvoiceID: CustomerInvoiceID,
                                        CustomerName: CustomerData.First_name,
                                        CustomerPhone: CustomerData.Phone,
                                        CustomerID: req.body.CustomerID,
                                        from_date: from_date,
                                        to_date: to_date,
                                        InvoiceNumber: InvoiceNumber,
                                        ProcessStage: ProcessStage,
                                        created_at: date,
                                        updated_at: date,

                                    })
                                    Customer_CODReportData.save(function (err, ClientCODReport) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    Status: 'Invoicing is Processing',
                                                    ClientCODReport: ClientCODReport
                                                }
                                            }));
                                            CustomerMod.Create_Client_COD_Report(req.body, CustomerData, ClientCODReport, function (Result) {
                                                // res.send(Result);
                                                console.log(Result);
                                            })
                                        }
                                    })
                                })
                        } else {

                            console.log("---- > 4 ");
                            res.send(new ApiResponce({
                                success: false,
                                extras: {
                                    msg: ApiMessages.NO_ORDERS_FOUND
                                }
                            }));
                        }
                    })



                }
            }
            )
        }
    });
    router.post('/Find_All_Premium_Customer_Monthly_Invoice_Processing', function (req, res) {
        console.log("Multi Invoice Premium Customer Body");
        console.log(req.body);

        if (req.body.CustomerID != null && req.body.from_date != null && req.body.to_date != null && req.body.Previous_Dues != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(CustomerData);
                } else {
                    if (CustomerData.Premium_User == true) {
                        if (CustomerData.Premium_Status == true) {
                            if (CustomerData.Monthly_Invoice == true) {
                                var from_date = moment(req.body.from_date, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
                                var to_date = moment(req.body.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days').toDate();
                                var query = {
                                    Whether_Deleted: false,
                                    status: 14,
                                    userId: req.body.CustomerID,
                                    Monthly_Invoice: true,
                                    Date: {
                                        $gte: from_date,
                                        $lte: to_date
                                    }
                                };
                                Orders.count(query).exec((err, Count) => {
                                    if (Count > 0){
                                        Counters.findOneAndUpdate({
                                            _id: "invoice"
                                        }, {
                                                $set: {
                                                    _id: "invoice"
                                                },
                                                $inc: {
                                                    "seq": 1
                                                }
                                            }, {
                                                upsert: true,
                                                returnNewDocument: true
                                            }).exec(function (err, Result) {
                                                var InvoiceNumber = parseInt(Result.seq) + 1;
                                                var CustomerInvoiceID = uuid();

                                                var ProcessStage = 1;
                                                var date = new Date();
                                                Customer_Invoice_Data = new Customer_Invoicing({
                                                    CustomerInvoiceID: CustomerInvoiceID,
                                                    CustomerName: CustomerData.First_name,
                                                    CustomerPhone: CustomerData.Phone,
                                                    CustomerID: req.body.CustomerID,
                                                    from_date: from_date,
                                                    to_date: to_date,
                                                    InvoiceNumber: InvoiceNumber,
                                                    ProcessStage: ProcessStage,
                                                    created_at: date,
                                                    updated_at: date,

                                                })
                                                Customer_Invoice_Data.save(function (err, InvoiceData) {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {
                                                        res.send(new ApiResponce({
                                                            success: true,
                                                            extras: {
                                                                Status: 'Invoicing is Processing',
                                                                InvoiceData: InvoiceData
                                                            }
                                                        }));
                                                        CustomerMod.Find_All_Premium_Customer_Monthly_Invoice_Processing(req.body, CustomerData, InvoiceData, function (Result) {
                                                            console.log(Result);
                                                        })
                                                    }
                                                })
                                            })
                                    } else {
                                        res.send(new ApiResponce({
                                            success: false,
                                            extras: {
                                                msg: ApiMessages.NO_ORDERS_FOUND
                                            }
                                        }));
                                    }
                                })
                            } else {
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.PREMIUM_MONTHLY_INVOICE_NOT_AVAILABLE
                                    }
                                }));
                            }
                        } else {
                            res.send(new ApiResponce({
                                success: false,
                                extras: {
                                    msg: ApiMessages.PREMIUM_CUSTOMER_IS_NOT_ACTIVE
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

    router.post('/Find_All_Premium_Customer_Monthly_Invoice', function (req, res) {
        console.log("Multi Invoice Premium Customer Body");
        console.log(req.body);
        if (req.body.CustomerID != null && req.body.Month_Number != null && req.body.Year_Number != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(CustomerData);
                } else {
                    if (CustomerData.Premium_User == true) {
                        if (CustomerData.Premium_Status == true) {
                            if (CustomerData.Monthly_Invoice == true) {
                                CustomerMod.Find_All_Premium_Customer_Monthly_Invoice(req.body, CustomerData, function (err, Result) {
                                    res.send(JSON.stringify(Result));
                                })
                            } else {
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.PREMIUM_MONTHLY_INVOICE_NOT_AVAILABLE
                                    }
                                }));
                            }
                        } else {
                            res.send(new ApiResponce({
                                success: false,
                                extras: {
                                    msg: ApiMessages.PREMIUM_CUSTOMER_IS_NOT_ACTIVE
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
    router.post('/Testing_Invoice', function (req, res) {
        CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
            if (err) {
                res.send(CustomerData);
            } else {
                CustomerMod.Find_All_Premium_Customer_Monthly_Invoice(req.body, CustomerData, function (err, Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    })

    /**
     * CLOSE OF MULTI INVOICE CUSTOMER
     */

    /**
     * Super Admin
     */

    router.post('/Find_ALL_Driver_Ongoing_Orders', function (req, res) {
        if (req.body.AdminID != null && req.body.DriverID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                        if (err) {
                            res.send(JSON.stringify(DriverData));
                        } else {
                            CustomerMod.Find_ALL_Driver_Ongoing_Orders(req.body, DriverData, function (Result) {
                                if (err) {
                                    res.send(JSON.stringify(Result));
                                } else {
                                    res.send(JSON.stringify(Result));
                                }
                            })
                        }
                    })
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
    });
    router.post('/Driver_Cancelled_Order', function (req, res) {
        console.log(req.body);
        if (req.body.orderId != null && req.body.DriverID != null && req.body.cancellationReason != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    CustomerMod.Check_for_Order(req.body, function (err, OrderData) {
                        if (err) {
                            res.send(JSON.stringify(OrderData));
                        } else {
                            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                                if (err) {
                                    res.send(JSON.stringify(DriverData));
                                } else {
                                    CustomerMod.Driver_Cancelled_Order(req.body, DriverData, function (err, Result) {
                                        if (err) {
                                            res.send(JSON.stringify(Result));
                                        } else {
                                            res.send(JSON.stringify(Result));
                                            var date = new Date();
                                            var AdminID = SuperAdminData._id;
                                            var AdminName = SuperAdminData.name;
                                            var Whether_God = SuperAdminData.Whether_God;
                                            var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                            var Message = AdminName + ' have manually cancelled Order :->' + OrderData.orderseqId + ' on ' + DateTime
                                            var Purpose = 'Order ' + OrderData.orderseqId;
                                            var Key = 'Orders';
                                            var LogData = new Super_Admin_Dashboard_Logs({
                                                AdminID: AdminID,
                                                AdminName: AdminName,
                                                Message: Message,
                                                Purpose: Purpose,
                                                Key: Key,
                                                Whether_God: Whether_God,
                                                created_at: date
                                            });
                                            LogData.save();
                                        }
                                    })
                                }
                            })
                        }
                    })
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
    });
    app.post('/Search_All_Employees', function (req, res) {
        var S3URL = config.S3URL;
        var moment = require('moment');
        if (req.body.SearchValue != null && req.body.sort_type != null) {
            var query = {
                Status: true,
                $or: [
                    {
                        Ezshipp_Branch_Name: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_Company_ID: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_Name: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_PhoneNumber: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_Email: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Employee_Address: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Bank_Account_No: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Bank_Name: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Bank_IFSC_No: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }, {
                        Pan_Card_Number: {
                            '$regex': req.body.SearchValue,
                            $options: 'i'
                        }
                    }
                ]
            }
            var fetch = Ezshipp_Employee.find(query);
            var sort_type = parseInt(req.body.sort_type);
            var toSort;
            if (sort_type == 1) {
                toSort = '-created_at';
            } else if (sort_type == 2) {
                toSort = 'created_at';
            } else if (sort_type == 3) {
                toSort = '-Employee_Company_ID';
            } else if (sort_type == 4) {
                toSort = 'Employee_Company_ID';
            } else if (sort_type == 5) {
                toSort = '-Employee_Role';
            } else if (sort_type == 6) {
                toSort = 'Employee_Role';
            } else if (sort_type == 7) {
                toSort = '-Employee_Name';
            } else if (sort_type == 8) {
                toSort = 'Employee_Name';
            } else if (sort_type == 9) {
                toSort = '-Employee_PhoneNumber';
            } else if (sort_type == 10) {
                toSort = 'Employee_PhoneNumber';
            } else if (sort_type == 11) {
                toSort = '-Status';
            } else if (sort_type == 12) {
                toSort = 'Status';
            } else if (sort_type == 13) {
                toSort = '-Complete_Profile_Set';
            } else if (sort_type == 14) {
                toSort = 'Complete_Profile_Set';
            }
            fetch.limit(10);
            fetch.exec(function (err, Result) {
                if (!err) {
                    var EmployeeData = [];
                    async.eachSeries(Result, function (item, callback) {
                        var Employee_Image_Available;
                        var Employee_DOB = moment(item.Employee_DOB).utcOffset(330).format('DD/MM/YYYY');
                        var Employee_Date_of_Joining = moment(item.Employee_Date_of_Joining).utcOffset(330).format('DD/MM/YYYY');
                        var Employee_Image_Url;
                        if (item.Employee_Image_Available == true) {
                            Employee_Image_Available = true;
                            Employee_Image_Url = S3URL + item.Employee_Image_Url;
                        } else {
                            Employee_Image_Available = false;
                            Employee_Image_Url = "";
                        }
                        var Driving_License_Available;
                        var Driving_License_Image;
                        var Driving_License_Expiry_Date;
                        if (item.Driving_License_Available == true) {
                            Driving_License_Available = true;
                            Driving_License_Image = S3URL + item.Driving_License_Image;
                            Driving_License_Expiry_Date = moment(item.Driving_License_Expiry_Date).utcOffset(330).format('DD/MM/YYYY');
                        } else {
                            Driving_License_Available = false;
                            Driving_License_Image = '';
                            Driving_License_Expiry_Date = '';
                        }
                        var Address_Proof_Available;
                        var Address_Proof_Image;
                        if (item.Address_Proof_Available == true) {
                            Address_Proof_Available = true;
                            Address_Proof_Image = S3URL + item.Address_Proof_Image;
                        } else {
                            Address_Proof_Available = false;
                            Address_Proof_Image = '';
                        }
                        var Pan_Card_Available;
                        var Pan_Card_Image;
                        var Pan_Card_Number;
                        if (item.Address_Proof_Available == true) {
                            Pan_Card_Available = true;
                            Pan_Card_Image = S3URL + item.Pan_Card_Image;
                            Pan_Card_Number = item.Pan_Card_Number;
                        } else {
                            Pan_Card_Available = false;
                            Pan_Card_Image = '';
                            Pan_Card_Number = '';
                        }
                        EmployeeData.push({
                            Complete_Profile_Set: item.Complete_Profile_Set,
                            Ezshipp_BranchID: item.Ezshipp_BranchID,
                            Ezshipp_Branch_Name: item.Ezshipp_Branch_Name,
                            Employee_Role: item.Employee_Role,
                            EmployeeID: item.EmployeeID,
                            Employee_Company_ID: item.Employee_Company_ID,
                            Employee_Name: item.Employee_Name,
                            Employee_PhoneNumber: item.Employee_PhoneNumber,
                            Employee_Email: item.Employee_Email,
                            Employee_Gender: item.Employee_Gender,
                            Employee_Image_Available: Employee_Image_Available,
                            Employee_Image_Url: Employee_Image_Url,
                            Employee_DOB: Employee_DOB,
                            Employee_Address: item.Employee_Address,
                            Employee_Basic_Salary: item.Employee_Basic_Salary,
                            Employee_PF: item.Employee_PF,
                            Employee_TDS: item.Employee_TDS,
                            Employee_Date_of_Joining: Employee_Date_of_Joining,
                            Bank_Account_No: item.Bank_Account_No,
                            Bank_Name: item.Bank_Name,
                            Bank_IFSC_No: item.Bank_IFSC_No,
                            Pan_Card_Available: Pan_Card_Available,
                            Pan_Card_Number: Pan_Card_Number,
                            Pan_Card_Image: Pan_Card_Image,
                            Driving_License_Available: Driving_License_Available,
                            Driving_License_Image: Driving_License_Image,
                            Driving_License_Expiry_Date: Driving_License_Expiry_Date,
                            Address_Proof_Available: Address_Proof_Available,
                            Address_Proof_Image: Address_Proof_Image,
                            Status: item.Status
                        })
                        callback();
                    }, function (err) {
                        if (!err) {
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    EmployeeData: EmployeeData
                                }
                            }));
                        }
                    })
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
    });
    app.post('/Find_All_Employees', function (req, res) {
        var S3URL = config.S3URL;
        var moment = require('moment');
        if (req.body.skip != null && req.body.sort_type != null) {
            var query = {
                Status: true
            }
            var fetch = Ezshipp_Employee.find(query);
            var sort_type = parseInt(req.body.sort_type);
            var toSort;
            if (sort_type == 1) {
                toSort = '-created_at';
            } else if (sort_type == 2) {
                toSort = 'created_at';
            } else if (sort_type == 3) {
                toSort = '-Employee_Company_ID';
            } else if (sort_type == 4) {
                toSort = 'Employee_Company_ID';
            } else if (sort_type == 5) {
                toSort = '-Employee_Role';
            } else if (sort_type == 6) {
                toSort = 'Employee_Role';
            } else if (sort_type == 7) {
                toSort = '-Employee_Name';
            } else if (sort_type == 8) {
                toSort = 'Employee_Name';
            } else if (sort_type == 9) {
                toSort = '-Employee_PhoneNumber';
            } else if (sort_type == 10) {
                toSort = 'Employee_PhoneNumber';
            } else if (sort_type == 11) {
                toSort = '-Status';
            } else if (sort_type == 12) {
                toSort = 'Status';
            } else if (sort_type == 13) {
                toSort = '-Complete_Profile_Set';
            } else if (sort_type == 14) {
                toSort = 'Complete_Profile_Set';
            }
            Ezshipp_Employee.count(query).exec(function (err, Count) {
                if (Count >= 0) {
                    var toSkip = parseInt(req.body.skip);
                    fetch.sort(toSort);
                    fetch.skip(toSkip);
                    fetch.limit(10);
                    fetch.exec(function (err, Result) {
                        if (!err) {
                            var EmployeeData = [];
                            async.eachSeries(Result, function (item, callback) {
                                var Employee_Image_Available;
                                var Employee_DOB = moment(item.Employee_DOB).utcOffset(330).format('DD/MM/YYYY');
                                var Employee_Date_of_Joining = moment(item.Employee_Date_of_Joining).utcOffset(330).format('DD/MM/YYYY');
                                var Employee_Image_Url;
                                if (item.Employee_Image_Available == true) {
                                    Employee_Image_Available = true;
                                    Employee_Image_Url = S3URL + item.Employee_Image_Url;
                                } else {
                                    Employee_Image_Available = false;
                                    Employee_Image_Url = "";
                                }
                                var Driving_License_Available;
                                var Driving_License_Image;
                                var Driving_License_Expiry_Date;
                                if (item.Driving_License_Available == true) {
                                    Driving_License_Available = true;
                                    Driving_License_Image = S3URL + item.Driving_License_Image;
                                    Driving_License_Expiry_Date = moment(item.Driving_License_Expiry_Date).utcOffset(330).format('DD/MM/YYYY');
                                } else {
                                    Driving_License_Available = false;
                                    Driving_License_Image = '';
                                    Driving_License_Expiry_Date = '';
                                }
                                var Address_Proof_Available;
                                var Address_Proof_Image;
                                if (item.Address_Proof_Available == true) {
                                    Address_Proof_Available = true;
                                    Address_Proof_Image = S3URL + item.Address_Proof_Image;
                                } else {
                                    Address_Proof_Available = false;
                                    Address_Proof_Image = '';
                                }
                                var Pan_Card_Available;
                                var Pan_Card_Image;
                                var Pan_Card_Number;
                                if (item.Address_Proof_Available == true) {
                                    Pan_Card_Available = true;
                                    Pan_Card_Image = S3URL + item.Pan_Card_Image;
                                    Pan_Card_Number = item.Pan_Card_Number;
                                } else {
                                    Pan_Card_Available = false;
                                    Pan_Card_Image = '';
                                    Pan_Card_Number = '';
                                }
                                EmployeeData.push({
                                    Complete_Profile_Set: item.Complete_Profile_Set,
                                    Ezshipp_BranchID: item.Ezshipp_BranchID,
                                    Ezshipp_Branch_Name: item.Ezshipp_Branch_Name,
                                    Employee_Role: item.Employee_Role,
                                    EmployeeID: item.EmployeeID,
                                    Employee_Company_ID: item.Employee_Company_ID,
                                    Employee_Name: item.Employee_Name,
                                    Employee_PhoneNumber: item.Employee_PhoneNumber,
                                    Employee_Email: item.Employee_Email,
                                    Employee_Gender: item.Employee_Gender,
                                    Employee_Image_Available: Employee_Image_Available,
                                    Employee_Image_Url: Employee_Image_Url,
                                    Employee_DOB: Employee_DOB,
                                    Employee_Address: item.Employee_Address,
                                    Employee_Basic_Salary: item.Employee_Basic_Salary,
                                    Employee_PF: item.Employee_PF,
                                    Employee_TDS: item.Employee_TDS,
                                    Employee_Date_of_Joining: Employee_Date_of_Joining,
                                    Bank_Account_No: item.Bank_Account_No,
                                    Bank_Name: item.Bank_Name,
                                    Bank_IFSC_No: item.Bank_IFSC_No,
                                    Pan_Card_Available: Pan_Card_Available,
                                    Pan_Card_Number: Pan_Card_Number,
                                    Pan_Card_Image: Pan_Card_Image,
                                    Driving_License_Available: Driving_License_Available,
                                    Driving_License_Image: Driving_License_Image,
                                    Driving_License_Expiry_Date: Driving_License_Expiry_Date,
                                    Address_Proof_Available: Address_Proof_Available,
                                    Address_Proof_Image: Address_Proof_Image,
                                    Status: item.Status
                                })
                                callback();
                            }, function (err) {
                                if (!err) {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            EmployeeData: EmployeeData,
                                            Count: Count
                                        }
                                    }));
                                }
                            })
                        }
                    })
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
    });
    app.post('/Find_All_Employees_of_Branch', function (req, res) {
        var S3URL = config.S3URL;
        var moment = require('moment');
        if (req.body.Ezshipp_BranchID != null && req.body.sort_type != null && req.body.skip != null) {
            Ezshipp_Branch.findOne({ Ezshipp_BranchID: req.body.Ezshipp_BranchID }).exec(function (err, BranchStatus) {
                if (err) {
                    console.log("Branch fetching error");
                    console.log(err);
                } else {
                    if (BranchStatus == null) {
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.Ezshipp_Branch_Not_Found
                            }
                        }));
                    } else {
                        var query = {
                            Ezshipp_BranchID: req.body.Ezshipp_BranchID
                        }
                        var fetch = Ezshipp_Employee.find(query);
                        var sort_type = parseInt(req.body.sort_type);
                        var toSort;
                        if (sort_type == 1) {
                            toSort = '-created_at';
                        } else if (sort_type == 2) {
                            toSort = 'created_at';
                        } else if (sort_type == 3) {
                            toSort = '-Employee_Company_ID';
                        } else if (sort_type == 4) {
                            toSort = 'Employee_Company_ID';
                        } else if (sort_type == 5) {
                            toSort = '-Employee_Role';
                        } else if (sort_type == 6) {
                            toSort = 'Employee_Role';
                        } else if (sort_type == 7) {
                            toSort = '-Employee_Name';
                        } else if (sort_type == 8) {
                            toSort = 'Employee_Name';
                        } else if (sort_type == 9) {
                            toSort = '-Employee_PhoneNumber';
                        } else if (sort_type == 10) {
                            toSort = 'Employee_PhoneNumber';
                        } else if (sort_type == 11) {
                            toSort = '-Status';
                        } else if (sort_type == 12) {
                            toSort = 'Status';
                        }
                        var toSkip = parseInt(req.body.skip);
                        fetch.sort(toSort);
                        fetch.skip(toSkip);
                        fetch.limit(10);
                        Ezshipp_Employee.count(query).exec(function (err, Count) {
                            if (Count >= 0) {
                                fetch.exec(function (err, Result) {
                                    if (err) {
                                        console.log(err);
                                    } else if (!err) {
                                        var EmployeeData = [];
                                        async.eachSeries(Result, function (item, callback) {
                                            var Employee_Image_Available;
                                            var Employee_DOB = moment(item.Employee_DOB).utcOffset(330).format('DD/MM/YYYY');
                                            var Employee_Date_of_Joining = moment(item.Employee_Date_of_Joining).utcOffset(330).format('DD/MM/YYYY');
                                            var Employee_Image_Url;
                                            if (item.Employee_Image_Available == true) {
                                                Employee_Image_Available = true;
                                                Employee_Image_Url = S3URL + item.Employee_Image_Url;
                                            } else {
                                                Employee_Image_Available = false;
                                                Employee_Image_Url = "";
                                            }
                                            var Driving_License_Available;
                                            var Driving_License_Image;
                                            var Driving_License_Expiry_Date;
                                            if (item.Driving_License_Available == true) {
                                                Driving_License_Available = true;
                                                Driving_License_Image = S3URL + item.Driving_License_Image;
                                                Driving_License_Expiry_Date = moment(item.Driving_License_Expiry_Date).utcOffset(330).format('DD/MM/YYYY');
                                            } else {
                                                Driving_License_Available = false;
                                                Driving_License_Image = '';
                                                Driving_License_Expiry_Date = '';
                                            }
                                            var Address_Proof_Available;
                                            var Address_Proof_Image;
                                            if (item.Address_Proof_Available == true) {
                                                Address_Proof_Available = true;
                                                Address_Proof_Image = S3URL + item.Address_Proof_Image;
                                            } else {
                                                Address_Proof_Available = false;
                                                Address_Proof_Image = '';
                                            }
                                            var Pan_Card_Available;
                                            var Pan_Card_Image;
                                            var Pan_Card_Number;
                                            if (item.Address_Proof_Available == true) {
                                                Pan_Card_Available = true;
                                                Pan_Card_Image = S3URL + item.Pan_Card_Image;
                                                Pan_Card_Number = item.Pan_Card_Number;
                                            } else {
                                                Pan_Card_Available = false;
                                                Pan_Card_Image = '';
                                                Pan_Card_Number = '';
                                            }
                                            EmployeeData.push({
                                                Complete_Profile_Set: item.Complete_Profile_Set,
                                                Ezshipp_BranchID: item.Ezshipp_BranchID,
                                                Ezshipp_Branch_Name: item.Ezshipp_Branch_Name,
                                                Employee_Role: item.Employee_Role,
                                                EmployeeID: item.EmployeeID,
                                                Employee_Company_ID: item.Employee_Company_ID,
                                                Employee_Name: item.Employee_Name,
                                                Employee_PhoneNumber: item.Employee_PhoneNumber,
                                                Employee_Email: item.Employee_Email,
                                                Employee_Gender: item.Employee_Gender,
                                                Employee_Image_Available: Employee_Image_Available,
                                                Employee_Image_Url: Employee_Image_Url,
                                                Employee_DOB: Employee_DOB,
                                                Employee_Address: item.Employee_Address,
                                                Employee_Basic_Salary: item.Employee_Basic_Salary,
                                                Employee_PF: item.Employee_PF,
                                                Employee_TDS: item.Employee_TDS,
                                                Employee_Date_of_Joining: Employee_Date_of_Joining,
                                                Bank_Account_No: item.Bank_Account_No,
                                                Bank_Name: item.Bank_Name,
                                                Bank_IFSC_No: item.Bank_IFSC_No,
                                                Pan_Card_Available: Pan_Card_Available,
                                                Pan_Card_Number: Pan_Card_Number,
                                                Pan_Card_Image: Pan_Card_Image,
                                                Driving_License_Available: Driving_License_Available,
                                                Driving_License_Image: Driving_License_Image,
                                                Driving_License_Expiry_Date: Driving_License_Expiry_Date,
                                                Address_Proof_Available: Address_Proof_Available,
                                                Address_Proof_Image: Address_Proof_Image,
                                                Status: item.Status
                                            })
                                            callback();
                                        }, function (err) {
                                            if (err) {
                                                console.log(err);
                                            } else if (!err) {
                                                res.send(new ApiResponce({
                                                    success: true,
                                                    extras: {
                                                        EmployeeData: EmployeeData,
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
    });

    app.post('/Find_All_Ezshipp_Branches', function (req, res) {
        var query = {
            Status: true
        }
        var fetch = Ezshipp_Branch.find(query);
        fetch.sort('-created_at');
        fetch.select('Ezshipp_BranchID Ezshipp_Branch_Name -_id');
        fetch.exec(function (err, Ezshipp_Branch_Data) {
            res.send(new ApiResponce({
                success: true,
                extras: {
                    Ezshipp_Branch_Data: Ezshipp_Branch_Data
                }
            }));
        })
    });
    app.post('/Activate_Employee_Profile_with_Branch_Ezshipp', function (req, res) {
        if (req.body.Ezshipp_Branch_Name != null && req.body.EmployeeID != null) {
            var Ezshipp_Branch_Name = String(req.body.Ezshipp_Branch_Name);
            Ezshipp_Branch_Name = Ezshipp_Branch_Name.replace(/\s\s+/g, ' ');
            Ezshipp_Branch_Name = Ezshipp_Branch_Name.replace(/  +/g, ' ');
            Ezshipp_Branch_Name = Ezshipp_Branch_Name.replace(/^ /, '');
            Ezshipp_Branch_Name = Ezshipp_Branch_Name.replace(/\s\s*$/, '');
            Ezshipp_Branch_Name = format_str(Ezshipp_Branch_Name);

            if (Ezshipp_Branch_Name != '' || Ezshipp_Branch_Name != ' ') {
                HrMod.Check_Whether_Ezshipp_Branch_Name_Exist_Or_Not(Ezshipp_Branch_Name, function (err, Ezshipp_Branch_Data) {
                    if (err) {
                        //Create New Branch
                        HrMod.Create_Ezshipp_Branch(req.body, Ezshipp_Branch_Name, function (err, BranchStatus, Ezshipp_Branch_Data) {
                            UpdatingEmployees(Ezshipp_Branch_Data);
                        })
                    } else {
                        console.log("Branch Found Ezshipp");
                        //Branch Already Exist
                        UpdatingEmployees(Ezshipp_Branch_Data);
                    }
                })
                function UpdatingEmployees(Ezshipp_Branch_Data) {
                    HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                        if (err) {
                            res.send(JSON.stringify(EmployeeData));
                        } else {
                            if (req.body.Employee_DOB != null && req.body.Employee_Address != null
                                && req.body.Employee_Basic_Salary != null && req.body.Employee_PF != null
                                && req.body.Employee_TDS != null && req.body.Employee_Date_of_Joining != null
                                && req.body.Bank_Account_No != null && req.body.Bank_Name != null
                                && req.body.Bank_IFSC_No != null && req.body.Employee_Image_Available != null
                                && req.body.Driving_License_Available != null && req.body.Address_Proof_Available != null && req.body.Pan_Card_Available != null) {
                                HrMod.Check_Employee_Image_Validity(req.body, function (err, EmployeeImageStatus) {
                                    if (err) {
                                        return res.send(JSON.stringify(EmployeeImageStatus));
                                    } else {
                                        HrMod.Check_Employee_Driving_License_Image_Validity(req.body, function (err, DrivingLicenseStatus) {
                                            if (err) {
                                                return res.send(JSON.stringify(DrivingLicenseStatus));
                                            } else {
                                                HrMod.Check_Employee_Pan_Card_Image_Validity(req.body, function (err, PanCardStatus) {
                                                    if (err) {
                                                        return res.send(JSON.stringify(PanCardStatus));
                                                    } else {
                                                        HrMod.Check_Employee_Address_Proof_Image_Validity(req.body, function (err, AddressProofStatus) {
                                                            if (err) {
                                                                return res.send(JSON.stringify(AddressProofStatus));
                                                            } else {
                                                                HrMod.Update_Employee_Data_and_Profile_Setting(req.body, Ezshipp_Branch_Data, EmployeeData, function (err, EmployeeStatus, EmployeeData) {
                                                                    res.send(EmployeeStatus);
                                                                    if (req.body.Employee_Image_Available == true || req.body.Employee_Image_Available == "true") {
                                                                        HrMod.Add_Employee_Image_Details(req.body, EmployeeData, function (err, Result) {

                                                                        })
                                                                    }
                                                                    if (req.body.Address_Proof_Available == true || req.body.Address_Proof_Available == "true") {
                                                                        HrMod.Add_Employee_Address_Proof_Details(req.body, EmployeeData, function (err, Result) {

                                                                        })
                                                                    }
                                                                    if (req.body.Driving_License_Available == true || req.body.Driving_License_Available == "true") {
                                                                        HrMod.Add_Driver_License_Details(req.body, EmployeeData, function (err, Result) {

                                                                        })
                                                                    }
                                                                    if (req.body.Pan_Card_Available == true || req.body.Pan_Card_Available == "true") {
                                                                        HrMod.Add_Pan_Card_Details(req.body, EmployeeData, function (err, Result) {

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
                            } else {
                                return res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.ENTER_ALL_TAGS
                                    }
                                }));
                            }
                        }
                    })
                }
            } else {
                return res.send(new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.ENTER_ALL_TAGS
                    }
                }));
            }
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    //Edit Employee Branch
    app.post('/Edit_Employee_Branch', function (req, res) {
        if (req.body.EmployeeID != null && req.body.Ezshipp_Branch_Name != null && req.body.Ezshipp_Branch_Name != '') {
            HrMod.Check_for_Employee(req.body, function (err, EmployeeData) {
                if (err) {
                    res.send(JSON.stringify(EmployeeData));
                } else {
                    var Ezshipp_Branch_Name = String(req.body.Ezshipp_Branch_Name);
                    Ezshipp_Branch_Name = Ezshipp_Branch_Name.replace(/\s\s+/g, ' ');
                    Ezshipp_Branch_Name = Ezshipp_Branch_Name.replace(/  +/g, ' ');
                    Ezshipp_Branch_Name = Ezshipp_Branch_Name.replace(/^ /, '');
                    Ezshipp_Branch_Name = Ezshipp_Branch_Name.replace(/\s\s*$/, '');
                    Ezshipp_Branch_Name = format_str(Ezshipp_Branch_Name);
                    HrMod.Check_Whether_Ezshipp_Branch_Name_Exist_Or_Not(Ezshipp_Branch_Name, function (err, Ezshipp_Branch_Data) {
                        if (err) {
                            console.log("Branch not Found Ezshipp");
                            //Create New Branch
                            HrMod.Create_Ezshipp_Branch(req.body, Ezshipp_Branch_Name, function (err, BranchStatus, Ezshipp_Branch_Data) {
                                UpdateEmployeeBranch(Ezshipp_Branch_Data, EmployeeData);
                            })
                        } else {
                            console.log("Branch Found Ezshipp");
                            //Branch Already Exist
                            UpdateEmployeeBranch(Ezshipp_Branch_Data, EmployeeData);
                        }
                    })
                }
            })
            function UpdateEmployeeBranch(Ezshipp_Branch_Data, EmployeeData) {
                HrMod.Edit_Employee_Branch(req.body, EmployeeData, Ezshipp_Branch_Data, function (err, Result) {
                    if (!err) {
                        res.send(JSON.stringify(Result));
                    }
                })
            }
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Register_Employee_with_Branch_Ezshipp', function (req, res) {
        if (req.body.Ezshipp_Branch_Name != null) {
            var Ezshipp_Branch_Name = String(req.body.Ezshipp_Branch_Name);
            Ezshipp_Branch_Name = Ezshipp_Branch_Name.replace(/\s\s+/g, ' ');
            Ezshipp_Branch_Name = Ezshipp_Branch_Name.replace(/  +/g, ' ');
            Ezshipp_Branch_Name = Ezshipp_Branch_Name.replace(/^ /, '');
            Ezshipp_Branch_Name = Ezshipp_Branch_Name.replace(/\s\s*$/, '');
            Ezshipp_Branch_Name = format_str(Ezshipp_Branch_Name);

            if (Ezshipp_Branch_Name != '' || Ezshipp_Branch_Name != ' ') {
                HrMod.Check_Whether_Ezshipp_Branch_Name_Exist_Or_Not(Ezshipp_Branch_Name, function (err, Ezshipp_Branch_Data) {
                    if (err) {
                        //Create New Branch
                        HrMod.Create_Ezshipp_Branch(req.body, Ezshipp_Branch_Name, function (err, BranchStatus, Ezshipp_Branch_Data) {
                            StoringEmployees(Ezshipp_Branch_Data);
                        })
                    } else {
                        console.log("Branch Found Ezshipp");
                        //Branch Already Exist
                        StoringEmployees(Ezshipp_Branch_Data);
                    }
                })
                function StoringEmployees(Ezshipp_Branch_Data) {
                    HrMod.Check_Whether_Employee_Email_Exist(req.body, function (err, EmailStatus) {
                        if (err) {
                            return res.send(JSON.stringify(EmailStatus));
                        } else {
                            HrMod.Check_Whether_Employee_PhoneNumber_Exist(req.body, function (err, PhoneStatus) {
                                if (err) {
                                    return res.send(JSON.stringify(PhoneStatus));
                                } else {
                                    if (req.body.Employee_Role != null && req.body.Employee_Name != null && req.body.Employee_Gender != null
                                        && req.body.Employee_PhoneNumber != null && req.body.Employee_Email != null
                                        && req.body.Employee_DOB != null && req.body.Employee_Address != null
                                        && req.body.Employee_Basic_Salary != null && req.body.Employee_PF != null
                                        && req.body.Employee_TDS != null && req.body.Employee_Date_of_Joining != null
                                        && req.body.Bank_Account_No != null && req.body.Bank_Name != null
                                        && req.body.Bank_IFSC_No != null && req.body.Employee_Image_Available != null
                                        && req.body.Driving_License_Available != null && req.body.Address_Proof_Available != null && req.body.Pan_Card_Available != null) {
                                        HrMod.Check_Employee_Role_Validity(req.body, function (err, ValidatityStatus) {
                                            if (err) {
                                                return res.send(JSON.stringify(ValidatityStatus));
                                            } else {
                                                HrMod.Check_Employee_Image_Validity(req.body, function (err, EmployeeImageStatus) {
                                                    if (err) {
                                                        return res.send(JSON.stringify(EmployeeImageStatus));
                                                    } else {
                                                        HrMod.Check_Employee_Driving_License_Image_Validity(req.body, function (err, DrivingLicenseStatus) {
                                                            if (err) {
                                                                return res.send(JSON.stringify(DrivingLicenseStatus));
                                                            } else {
                                                                HrMod.Check_Employee_Pan_Card_Image_Validity(req.body, function (err, PanCardStatus) {
                                                                    if (err) {
                                                                        return res.send(JSON.stringify(PanCardStatus));
                                                                    } else {
                                                                        HrMod.Check_Employee_Address_Proof_Image_Validity(req.body, function (err, AddressProofStatus) {
                                                                            if (err) {
                                                                                return res.send(JSON.stringify(AddressProofStatus));
                                                                            } else {
                                                                                var firstType = "EMP";
                                                                                var Employee_Role = parseInt(req.body.Employee_Role);
                                                                                var SecondType = Employee_Role * 1000000;
                                                                                Counters.findOneAndUpdate({
                                                                                    _id: "employee"
                                                                                }, {
                                                                                        $set: {
                                                                                            _id: "employee"
                                                                                        },
                                                                                        $inc: {
                                                                                            "seq": 1
                                                                                        }
                                                                                    }, {
                                                                                        upsert: true,
                                                                                        returnNewDocument: true
                                                                                    }).exec(function (err, Result) {
                                                                                        var SequenceNumber = parseInt(Result.seq) + 1;
                                                                                        var UniqueID = SecondType + SequenceNumber;
                                                                                        var Employee_Company_ID = String(firstType) + String(UniqueID);
                                                                                        HrMod.Store_Employee_Details(req.body, Ezshipp_Branch_Data, Employee_Company_ID, function (err, EmployeeStatus, EmployeeData) {
                                                                                            res.send(EmployeeStatus);
                                                                                            if (req.body.Employee_Image_Available == true || req.body.Employee_Image_Available == "true") {
                                                                                                HrMod.Add_Employee_Image_Details(req.body, EmployeeData, function (err, Result) {

                                                                                                })
                                                                                            }
                                                                                            if (req.body.Address_Proof_Available == true || req.body.Address_Proof_Available == "true") {
                                                                                                HrMod.Add_Employee_Address_Proof_Details(req.body, EmployeeData, function (err, Result) {

                                                                                                })
                                                                                            }
                                                                                            if (req.body.Driving_License_Available == true || req.body.Driving_License_Available == "true") {
                                                                                                HrMod.Add_Driver_License_Details(req.body, EmployeeData, function (err, Result) {

                                                                                                })
                                                                                            }
                                                                                            if (req.body.Pan_Card_Available == true || req.body.Pan_Card_Available == "true") {
                                                                                                HrMod.Add_Pan_Card_Details(req.body, EmployeeData, function (err, Result) {

                                                                                                })
                                                                                            }
                                                                                            if (Employee_Role == 1) {
                                                                                                HrMod.Check_Driver_Email_Exist_or_Not(req.body, function (err, Result) {
                                                                                                    if (err) {
                                                                                                        //Driver Already Exist Dont Perform Any Operation
                                                                                                    } else {
                                                                                                        //Driver Not Found Create New Driver and Generate Random Password send it to Message and Send Driver Welcome
                                                                                                        Counters.findOneAndUpdate({
                                                                                                            _id: "driverid"
                                                                                                        }, {
                                                                                                                $set: {
                                                                                                                    _id: "driverid"
                                                                                                                },
                                                                                                                $inc: {
                                                                                                                    "seq": 1
                                                                                                                }
                                                                                                            }, {
                                                                                                                upsert: true,
                                                                                                                returnNewDocument: true
                                                                                                            }).exec(function (err, Result) {
                                                                                                                var DriverSequenceNumber = parseInt(Result.seq) + 1;
                                                                                                                var Employee_Image_Url = HrMod.Find_Employee_Image_for_Driver(EmployeeData);
                                                                                                                HrMod.Store_Driver_Details(req.body, EmployeeData, DriverSequenceNumber, Employee_Image_Url, function (err, DriverStatus, Password) {
                                                                                                                    var DriverData = {
                                                                                                                        "name": EmployeeData.Employee_Name,
                                                                                                                        "email": EmployeeData.Employee_Email,
                                                                                                                        "PhoneNumber": EmployeeData.Employee_PhoneNumber,
                                                                                                                        "Password": Password
                                                                                                                    }
                                                                                                                    var Message = "Welcome to Ezshipp Biker!!!Your Login EmailID: " + DriverData.email + " and Password: " + DriverData.Password + " . You can Login into Driver app by using this Credentials";
                                                                                                                    MSG91MOD.sendsmstocustomer(DriverData.PhoneNumber, Message, function (err, Result) {
                                                                                                                        console.log(err);
                                                                                                                        console.log(Result);
                                                                                                                    })
                                                                                                                })
                                                                                                            })
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                        })
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
                                    } else {
                                        return res.send(new ApiResponce({
                                            success: false,
                                            extras: {
                                                msg: ApiMessages.ENTER_ALL_TAGS
                                            }
                                        }));
                                    }
                                }
                            })
                        }
                    })
                }
            } else {
                return res.send(new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.ENTER_ALL_TAGS
                    }
                }));
            }
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });



    app.post('/Completed_Order_Reviews', function (req, res) {
        if (req.body.skip != null && req.body.sort_no != null) {
            var query = {
                status: 14,
                ratingflag: 1,
                Whether_Deleted: false
            };
            var sortNo = parseInt(req.body.sortNo);
            var sort_type;
            if (sortNo == 1) {
                sort_type = "-orderseqId"
            } else if (sortNo == 2) {
                sort_type = "orderseqId"
            } else if (sortNo == 3) {
                sort_type = "-customerName"
            } else if (sortNo == 4) {
                sort_type = "customerName"
            } else if (sortNo == 5) {
                sort_type = "-customerEmail"
            } else if (sortNo == 6) {
                sort_type = "customerEmail"
            } else if (sortNo == 7) {
                sort_type = "-Date"
            } else if (sortNo == 8) {
                sort_type = "Date"
            } else if (sortNo == 9) {
                sort_type = "-bookingType"
            } else if (sortNo == 10) {
                sort_type = "bookingType"
            } else if (sortNo == 11) {
                sort_type = "-ratingNum"
            } else if (sortNo == 12) {
                sort_type = "ratingNum"
            } else if (sortNo == 13) {
                sort_type = "-reviewMsg"
            } else if (sortNo == 14) {
                sort_type = "reviewMsg"
            }


            var fetch = Orders.find(query);

            fetch.sort(sort_type);
            var toSkip = parseInt(req.body.skip);
            fetch.skip(toSkip);
            fetch.limit(10);
            var Count;
            Orders.count(query).exec(function (err, Countdoc) {
                Count = Countdoc
            }).then(
                fetch.exec(function (err, Result) {
                    if (!err) {
                        var OrderData = [];
                        async.eachSeries(Result, function (item, callback) {
                            var EventArray = item.eventLog;
                            var EventArrayLength = item.eventLog.length;
                            var DriverID = EventArray[(EventArrayLength) - 1].driverid;
                            var Driver_Name, Driver_PhoneNumber, Driver_Email;
                            var reviewMsg;
                            if (item.reviewMsg == null || item.reviewMsg == "") {
                                reviewMsg = "";
                            } else {
                                reviewMsg = String(item.reviewMsg);
                            }

                            Drivers.findOne({ _id: DriverID }, function (err, DriverObj) {
                                if (DriverObj == null) {
                                    Driver_Name = '';
                                    Driver_PhoneNumber = '';
                                    Driver_Email = '';
                                } else {
                                    Driver_Name = DriverObj.name;
                                    Driver_PhoneNumber = DriverObj.phone;
                                    Driver_Email = DriverObj.email;
                                }
                            }).then(
                                OrderData.push({
                                    orderseqId: item.orderseqId,
                                    DriverID: DriverID,
                                    Driver_Name: Driver_Name,
                                    Driver_PhoneNumber: Driver_PhoneNumber,
                                    Driver_Email: Driver_Email,
                                    CustomerID: item.userId,
                                    customerName: item.customerName,
                                    customerPhone: item.customerPhone,
                                    customerEmail: item.customerEmail,
                                    order_datetime: item.order_datetime,
                                    bookingType: item.bookingType,
                                    ratingNum: item.ratingNum,
                                    reviewMsg: reviewMsg
                                })
                                )
                            callback();
                        }, function (err) {
                            if (!err) {
                                res.send(new ApiResponce({
                                    success: true,
                                    extras: {
                                        OrderData: OrderData,
                                        Count: Count
                                    }
                                }));
                            }
                        })
                    }
                })
                )
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });


    app.post('/Edit_Driver_Cancellation_Reason', function (req, res) {
        if (req.body.ReasonID != null && req.body.reasons != null) {
            can_reason.findOne({
                _id: req.body.ReasonID
            }).exec(function (err, user) {
                if (user) {
                    var query = {
                        _id: req.body.ReasonID
                    };
                    var reasonarray = [
                        req.body.reasons
                    ];
                    var changes = {
                        $set: {
                            reasons: reasonarray
                        }
                    };
                    var multiplicity = {
                        multi: false
                    };
                    can_reason.update(query, changes, multiplicity).exec(function (err, Result) {
                        if (Result) {
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    Status: "Driver Cancellation Reason Updated Successully"
                                }
                            }));
                        }
                    })
                } else {
                    res.send(new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.Reason_Not_Found
                        }
                    }));
                }
            });
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    app.post('/Edit_Customer_Cancellation_Reason', function (req, res) {
        if (req.body.ReasonID != null && req.body.reasons != null) {
            can_reason.findOne({
                _id: req.body.ReasonID
            }).exec(function (err, user) {
                if (user) {
                    var query = {
                        _id: req.body.ReasonID
                    };
                    var reasonarray = [
                        req.body.reasons
                    ];
                    var changes = {
                        $set: {
                            reasons: reasonarray
                        }
                    };
                    var multiplicity = {
                        multi: false
                    };
                    can_reason.update(query, changes, multiplicity).exec(function (err, Result) {
                        if (Result) {
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    Status: "Customer Cancellation Reason Updated Successully"
                                }
                            }));
                        }
                    })
                } else {
                    res.send(new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.Reason_Not_Found
                        }
                    }));
                }
            });
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    app.post('/Find_All_Driver_Cancellation_Reason', function (req, res) {
        var query = {
            res_for: "Driver"
        }
        var fetch = can_reason.find(query);
        fetch.sort("reasons");
        fetch.exec(function (err, Result) {
            if (!err) {
                var ReasonData = [];
                async.eachSeries(Result, function (item, callback) {
                    ReasonData.push({
                        ReasonID: item._id,
                        Reason: item.reasons[0]
                    });
                    callback();
                }, function (err) {
                    if (!err) {
                        res.send(new ApiResponce({
                            success: true,
                            extras: {
                                ReasonData: ReasonData
                            }
                        }));
                    }
                })
            }
        })
    });

    app.post('/Find_All_Customer_Cancellation_Reason', function (req, res) {
        var query = {
            res_for: "Passenger"
        }
        var fetch = can_reason.find(query);
        fetch.sort("-reasons.$");
        fetch.exec(function (err, Result) {
            if (!err) {
                var ReasonData = [];
                async.eachSeries(Result, function (item, callback) {
                    ReasonData.push({
                        ReasonID: item._id,
                        Reason: item.reasons[0]
                    });
                    callback();
                }, function (err) {
                    if (!err) {
                        res.send(new ApiResponce({
                            success: true,
                            extras: {
                                ReasonData: ReasonData
                            }
                        }));
                    }
                })
            }
        })
    });
    app.post('/Create_Driver_Cancellation_Reason', function (req, res) {
        if (req.body.reasons != null) {
            Counters.findOneAndUpdate({
                _id: "cancellid"
            }, {
                    $set: {
                        _id: "cancellid"
                    },
                    $inc: {
                        "seq": 1
                    }
                }, {
                    upsert: true,
                    returnNewDocument: true
                }).exec(function (err, Result) {
                    var SequenceNumber = parseInt(Result.seq) + 1;
                    var reasonarray = [
                        req.body.reasons
                    ];
                    var res_for = "Driver";
                    var CancellatonReasonData = new can_reason({
                        res_id: SequenceNumber,
                        reasons: reasonarray,
                        res_for: res_for
                    })
                    CancellatonReasonData.save();
                    res.send(new ApiResponce({
                        success: true,
                        extras: {
                            Status: 'Driver Cancellation Reason Added Successfully'
                        }
                    }));

                })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    app.post('/Create_Cusomer_Cancellation_Reason', function (req, res) {
        if (req.body.reasons != null) {
            Counters.findOneAndUpdate({
                _id: "cancellid"
            }, {
                    $set: {
                        _id: "cancellid"
                    },
                    $inc: {
                        "seq": 1
                    }
                }, {
                    upsert: true,
                    returnNewDocument: true
                }).exec(function (err, Result) {
                    var SequenceNumber = parseInt(Result.seq) + 1;
                    var reasonarray = [
                        req.body.reasons
                    ];
                    var res_for = "Passenger";
                    var CancellatonReasonData = new can_reason({
                        res_id: SequenceNumber,
                        reasons: reasonarray,
                        res_for: res_for
                    })
                    CancellatonReasonData.save();
                    res.send(new ApiResponce({
                        success: true,
                        extras: {
                            Status: 'Customer Cancellation Reason Added Successfully'
                        }
                    }));

                })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Script_for_Orders_Address_LatLong_Functionality_Hitech_Orders', function (req, res) {
        res.send({ "Status": "Script Running Successfully" });
        CustomerMod.Script_for_Orders_Address_LatLong_Functionality_Hitech_Orders(req.body, function (Result) {
            console.log(Result);
        })
    });
    app.post('/Script_for_Orders_Address_LatLong_Functionality', function (req, res) {
        res.send({ "Status": "Script Running Successfully" });
        CustomerMod.Script_for_Orders_Address_LatLong_Functionality(req.body, function (Result) {
            console.log(Result);
        })
    });
    router.post('/Address_Functionality', function (req, res) {
        var Address = req.body.Address;
        CustomerMod.Address_Lat_Long_Function(Address, function (err, Result) {
            if (!err) {
                res.send(Result);
            }
        })
    })
    app.post('/Address_Lat_Long_Function', function (req, res) {
        console.log(req.body)
        if (req.body.PickLatLong != null && req.body.DropLatLong != null && req.body.PickAddress != null && req.body.DropAddress != null) {
            var PickLatLong = req.body.PickLatLong;
            var PickAddress = req.body.PickAddress;
            var DropLatLong = req.body.DropLatLong;
            var DropAddress = req.body.DropAddress;
            var PickLatitude;
            var PickLongitude;
            var DropLatitude;
            var DropLongitude;
            var LatLongData;
            if ((PickLatLong == true || PickLatLong == 'true') && (DropLatLong == true || DropLatLong == 'true')) {
                CustomerMod.Address_Lat_Long_Function(PickAddress, function (err, Result1) {
                    if (Result1.latlong == false) {
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.Pick_Address_Not_Found
                            }
                        }));
                    } else {
                        PickLatitude = Result1.latitude;
                        PickLongitude = Result1.longitude;
                        CustomerMod.Address_Lat_Long_Function(DropAddress, function (err, Result2) {
                            if (Result2.latlong == false) {
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.Drop_Address_Not_Found,
                                        values: JSON.stringify(Result2)
                                    }
                                }));
                            } else {
                                DropLatitude = Result2.latitude;
                                DropLongitude = Result2.longitude;
                                var LatLongData = {
                                    PickFound: true,
                                    PickLatitude: PickLatitude,
                                    PickLongitude: PickLongitude,
                                    DropFound: true,
                                    DropLatitude: DropLatitude,
                                    DropLongitude: DropLongitude
                                };
                                var pickLatitude = parseFloat(LatLongData.PickLatitude);
                                var pickLongitude = parseFloat(LatLongData.PickLongitude);
                                var dropLatitude = parseFloat(LatLongData.DropLatitude);
                                var dropLongitude = parseFloat(LatLongData.DropLongitude);
                                ZONES.findOne({
                                    'polygons': {
                                        $geoIntersects: {
                                            $geometry: {
                                                type: "Point",
                                                coordinates: [pickLongitude, pickLatitude]
                                            }
                                        }
                                    }
                                }, function (err, pickupzoneObj) {
                                    if (pickupzoneObj) {
                                        ZONES.findOne({
                                            'polygons': {
                                                $geoIntersects: {
                                                    $geometry: {
                                                        type: "Point",
                                                        coordinates: [dropLongitude, dropLatitude]
                                                    }
                                                }
                                            }
                                        }, function (err, dropupzoneObj) {
                                            if (dropupzoneObj) {

                                                if (pickupzoneObj.city_id == dropupzoneObj.city_id) {

                                                    error = false;
                                                    console.log("pickup and drop are in same city")
                                                    res.send(new ApiResponce({
                                                        success: true,
                                                        extras: {
                                                            Status: 'Order Location Exist in Same Zone',
                                                            LatLongData: LatLongData
                                                        }
                                                    }));

                                                } else {
                                                    error = true;
                                                    console.log("pickup city and drop city not match");
                                                    res.send(new ApiResponce({
                                                        success: false,
                                                        extras: {
                                                            msg: ApiMessages.PICKUP_ZONE_AND_DROP_ZONE_MUST_BE_IN_SAME_CITY
                                                        }
                                                    }));
                                                }
                                            } else {
                                                error = true;
                                                console.log("drop not found");
                                                res.send(new ApiResponce({
                                                    success: false,
                                                    extras: {
                                                        msg: ApiMessages.DROP_ZONE_NOT_IN_RANGE
                                                    }
                                                }));
                                            }
                                        })
                                    } else {
                                        error = true;
                                        console.log("pickup not found");
                                        res.send(new ApiResponce({
                                            success: false,
                                            extras: {
                                                msg: ApiMessages.PICKUP_ZONE_NOT_IN_RANGE
                                            }
                                        }));
                                    }
                                });
                            }
                        })
                    }
                })
            } else if ((PickLatLong == true || PickLatLong == 'true') && (DropLatLong == false || DropLatLong == 'false')) {
                CustomerMod.Address_Lat_Long_Function(PickAddress, function (err, Result1) {
                    if (Result1.latlong == false) {
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.Pick_Address_Not_Found
                            }
                        }));
                    } else {
                        PickLatitude = Result1.latitude;
                        PickLongitude = Result1.longitude;
                        var LatLongData = {
                            PickFound: true,
                            PickLatitude: PickLatitude,
                            PickLongitude: PickLongitude,
                            DropFound: false,
                            DropLatitude: parseFloat(req.body.dropLatitude),
                            DropLongitude: parseFloat(req.body.dropLongitude)
                        }
                        var pickLatitude = parseFloat(LatLongData.PickLatitude);
                        var pickLongitude = parseFloat(LatLongData.PickLongitude);
                        var dropLatitude = parseFloat(req.body.dropLatitude);
                        var dropLongitude = parseFloat(req.body.dropLongitude);
                        ZONES.findOne({
                            'polygons': {
                                $geoIntersects: {
                                    $geometry: {
                                        type: "Point",
                                        coordinates: [pickLongitude, pickLatitude]
                                    }
                                }
                            }
                        }, function (err, pickupzoneObj) {
                            if (pickupzoneObj) {
                                ZONES.findOne({
                                    'polygons': {
                                        $geoIntersects: {
                                            $geometry: {
                                                type: "Point",
                                                coordinates: [dropLongitude, dropLatitude]
                                            }
                                        }
                                    }
                                }, function (err, dropupzoneObj) {
                                    if (dropupzoneObj) {

                                        if (pickupzoneObj.city_id == dropupzoneObj.city_id) {

                                            error = false;
                                            console.log("pickup and drop are in same city")
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    Status: 'Order Location Exist in Same Zone',
                                                    LatLongData: LatLongData
                                                }
                                            }));

                                        } else {
                                            error = true;
                                            console.log("pickup city and drop city not match");
                                            res.send(new ApiResponce({
                                                success: false,
                                                extras: {
                                                    msg: ApiMessages.PICKUP_ZONE_AND_DROP_ZONE_MUST_BE_IN_SAME_CITY
                                                }
                                            }));
                                        }
                                    } else {
                                        error = true;
                                        console.log("drop not found");
                                        res.send(new ApiResponce({
                                            success: false,
                                            extras: {
                                                msg: ApiMessages.DROP_ZONE_NOT_IN_RANGE
                                            }
                                        }));
                                    }
                                })
                            } else {
                                error = true;
                                console.log("pickup not found");
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.PICKUP_ZONE_NOT_IN_RANGE
                                    }
                                }));
                            }
                        });
                    }
                })
            } else if ((PickLatLong == false || PickLatLong == 'false') && (DropLatLong == true || DropLatLong == 'true')) {
                CustomerMod.Address_Lat_Long_Function(DropAddress, function (err, Result2) {
                    if (Result2.latlong == false) {
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.Drop_Address_Not_Found
                            }
                        }));
                    } else {
                        DropLatitude = Result2.latitude;
                        DropLongitude = Result2.longitude;
                        var LatLongData = {
                            PickFound: false,
                            PickLatitude: parseFloat(req.body.pickLatitude),
                            PickLongitude: parseFloat(req.body.pickLongitude),
                            DropFound: true,
                            DropLatitude: DropLatitude,
                            DropLongitude: DropLongitude
                        }
                        var pickLatitude = parseFloat(req.body.pickLatitude);
                        var pickLongitude = parseFloat(req.body.pickLongitude);
                        var dropLatitude = parseFloat(LatLongData.DropLatitude);
                        var dropLongitude = parseFloat(LatLongData.DropLongitude);
                        ZONES.findOne({
                            'polygons': {
                                $geoIntersects: {
                                    $geometry: {
                                        type: "Point",
                                        coordinates: [pickLongitude, pickLatitude]
                                    }
                                }
                            }
                        }, function (err, pickupzoneObj) {
                            console.log(err);
                            console.log(pickupzoneObj);
                            if (pickupzoneObj) {
                                ZONES.findOne({
                                    'polygons': {
                                        $geoIntersects: {
                                            $geometry: {
                                                type: "Point",
                                                coordinates: [dropLongitude, dropLatitude]
                                            }
                                        }
                                    }
                                }, function (err, dropupzoneObj) {
                                    if (dropupzoneObj) {

                                        if (pickupzoneObj.city_id == dropupzoneObj.city_id) {

                                            error = false;
                                            console.log("pickup and drop are in same city")
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    Status: 'Order Location Exist in Same Zone',
                                                    LatLongData: LatLongData
                                                }
                                            }));

                                        } else {
                                            error = true;
                                            console.log("pickup city and drop city not match");
                                            res.send(new ApiResponce({
                                                success: false,
                                                extras: {
                                                    msg: ApiMessages.PICKUP_ZONE_AND_DROP_ZONE_MUST_BE_IN_SAME_CITY
                                                }
                                            }));
                                        }
                                    } else {
                                        error = true;
                                        console.log("drop not found");
                                        res.send(new ApiResponce({
                                            success: false,
                                            extras: {
                                                msg: ApiMessages.DROP_ZONE_NOT_IN_RANGE
                                            }
                                        }));
                                    }
                                })
                            } else {
                                error = true;
                                console.log("pickup not found");
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.PICKUP_ZONE_NOT_IN_RANGE
                                    }
                                }));
                            }
                        });
                    }
                })
            } else if ((PickLatLong == false || PickLatLong == 'false') && (DropLatLong == false || DropLatLong == 'false')) {
                var LatLongData = {
                    PickFound: false,
                    PickLatitude: parseFloat(req.body.pickLatitude),
                    PickLongitude: parseFloat(req.body.pickLongitude),
                    DropFound: false,
                    DropLatitude: parseFloat(req.body.dropLatitude),
                    DropLongitude: parseFloat(req.body.dropLongitude)
                }
                var pickLatitude = parseFloat(req.body.pickLatitude);
                var pickLongitude = parseFloat(req.body.pickLongitude);
                var dropLatitude = parseFloat(req.body.dropLatitude);
                var dropLongitude = parseFloat(req.body.dropLongitude);
                ZONES.findOne({
                    'polygons': {
                        $geoIntersects: {
                            $geometry: {
                                type: "Point",
                                coordinates: [pickLongitude, pickLatitude]
                            }
                        }
                    }
                }, function (err, pickupzoneObj) {
                    if (pickupzoneObj) {
                        ZONES.findOne({
                            'polygons': {
                                $geoIntersects: {
                                    $geometry: {
                                        type: "Point",
                                        coordinates: [dropLongitude, dropLatitude]
                                    }
                                }
                            }
                        }, function (err, dropupzoneObj) {
                            if (dropupzoneObj) {

                                if (pickupzoneObj.city_id == dropupzoneObj.city_id) {

                                    error = false;
                                    console.log("pickup and drop are in same city")
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            Status: 'Order Location Exist in Same Zone',
                                            LatLongData: LatLongData
                                        }
                                    }));

                                } else {
                                    error = true;
                                    console.log("pickup city and drop city not match");
                                    res.send(new ApiResponce({
                                        success: false,
                                        extras: {
                                            msg: ApiMessages.PICKUP_ZONE_AND_DROP_ZONE_MUST_BE_IN_SAME_CITY
                                        }
                                    }));
                                }
                            } else {
                                error = true;
                                console.log("drop not found");
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.DROP_ZONE_NOT_IN_RANGE
                                    }
                                }));
                            }
                        })
                    } else {
                        error = true;
                        console.log("pickup not found");
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.PICKUP_ZONE_NOT_IN_RANGE
                            }
                        }));
                    }
                });
            }
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    })

    app.post('/Edit_Driver_Expenses', function (req, res) {
        if (req.body.ExpenseID != null && req.body.Amount != null && req.body.Payment_Type != null && req.body.TransactionID != null && req.body.Purpose_Type != null && req.body.Comment != null) {
            CustomerMod.Check_for_ExpenseID(req.body, function (err, ExpensesData) {
                if (err) {
                    res.send(JSON.stringify(ExpensesData));
                } else {
                    CustomerMod.Edit_Driver_Expenses(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    //Add or update Driver Address Proof Details
    app.post('/Add_Update_Driver_Address_Proof_Details', function (req, res) {
        if (req.body.DriverID != null && req.body.Address_Proof_Details != null && req.body.Picture != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    if (DriverData.Address_Proof_Available == null || DriverData.Address_Proof_Available == false) {
                        //First time added Driver License Details
                        CustomerMod.Add_Update_Driver_Address_Proof_Details(req.body, function (err, Result) {
                            res.send(JSON.stringify(Result));
                        })
                    } else if (DriverData.Address_Proof_Available == true) {
                        //Update Driver License Details and Remove Previous Image from Database
                        CustomerMod.DeleteAWSImage(DriverData.Address_Proof_Image, function (err, DeleteStatus) {
                            if (!err) {
                                CustomerMod.Add_Update_Driver_Address_Proof_Details(req.body, function (err, Result) {
                                    res.send(JSON.stringify(Result));
                                })
                            }
                        })
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
    //Add or update Driver Driving License Details
    app.post('/Add_Update_Driver_Driving_License_Details', function (req, res) {
        if (req.body.DriverID != null && req.body.Driving_License_Expiry_Date != null && req.body.Picture != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    if (DriverData.Driving_License_Available == null || DriverData.Driving_License_Available == false) {
                        //First time added Driver License Details
                        CustomerMod.Add_Update_Driver_Driving_License_Details(req.body, function (err, Result) {
                            res.send(JSON.stringify(Result));
                        })
                    } else if (DriverData.Driving_License_Available == true) {
                        //Update Driver License Details and Remove Previous Image from Database
                        CustomerMod.DeleteAWSImage(DriverData.Driving_License_Image, function (err, DeleteStatus) {
                            if (!err) {
                                CustomerMod.Add_Update_Driver_Driving_License_Details(req.body, function (err, Result) {
                                    res.send(JSON.stringify(Result));
                                })
                            }
                        })
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
    //Add or update Driver Bank Details
    app.post('/Add_Update_Driver_Bank_Details', function (req, res) {
        if (req.body.DriverID != null && req.body.Bank_Account_No != null && req.body.Bank_Name != null && req.body.Bank_IFSC_No != null && req.body.Picture != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    if (DriverData.Bank_Details_Available == null || DriverData.Bank_Details_Available == false) {
                        //First time added Bank Details
                        CustomerMod.Add_Update_Driver_Bank_Details(req.body, function (err, Result) {
                            res.send(JSON.stringify(Result));
                        })
                    } else if (DriverData.Bank_Details_Available == true) {
                        //Update Driver Bank Details and Remove Previous Image from Database
                        CustomerMod.DeleteAWSImage(DriverData.Bank_Passbook_Image, function (err, DeleteStatus) {
                            if (!err) {
                                CustomerMod.Add_Update_Driver_Bank_Details(req.body, function (err, Result) {
                                    res.send(JSON.stringify(Result));
                                })
                            }
                        })
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
    app.post('/Find_All_Driver_Documents', function (req, res) {
        if (req.body.DriverID != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Find_All_Driver_Documents(req.body, DriverData, function (err, Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    app.post('/Search_All_Driver_Expenses_Interval', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.SearchValue != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    var fmdate = moment(req.body.from_date, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
                    var todate = moment(req.body.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days').toDate();
                    var query = {
                        DriverID: req.body.DriverID,
                        created_at: {
                            $gte: fmdate,
                            $lte: todate
                        },
                        $or: [
                            {
                                Amount: {
                                    $regex: req.body.SearchValue,
                                    $options: 'i'
                                }
                            },
                            {
                                TransactionID: {
                                    $regex: req.body.SearchValue,
                                    $options: 'i'
                                }
                            },
                            {
                                Comment: {
                                    $regex: req.body.SearchValue,
                                    $options: 'i'
                                }
                            },
                        ]
                    };
                    var fetch = Driver_Expenses.find(query);
                    fetch.sort('-created_at');
                    fetch.limit(10);
                    fetch.exec(function (err, Result) {
                        if (!err) {
                            var ExpensesData = [];
                            async.eachSeries(Result, function (item, callback) {
                                var Date_Time = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                ExpensesData.push({
                                    ExpenseID: item.ExpenseID,
                                    DriverID: item.DriverID,
                                    Amount: item.Amount,
                                    Payment_Type: item.Payment_Type,
                                    TransactionID: item.TransactionID,
                                    Purpose_Type: item.Purpose_Type,
                                    Comment: item.Comment,
                                    Date_Time: Date_Time
                                })
                                callback();
                            }, function (err) {
                                if (!err) {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            ExpensesData: ExpensesData
                                        }
                                    }));
                                }
                            })
                        }
                    })

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
    });

    app.post('/Find_All_Driver_Collection_Interval', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    var fmdate = moment(req.body.from_date, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
                    var todate = moment(req.body.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days').toDate();
                    var query = {
                        "Date": {
                            $gte: fmdate,
                            $lte: todate
                        },
                        "Whether_Deleted": false,
                        "eventLog.driverid": req.body.DriverID,
                        "eventLog.status": 14,
                        "paymentType": 1,
                        "Monthly_Invoice": false
                    }
                    var fetch = Orders.find(query);
                    fetch.select('deliverycharge -_id');
                    fetch.exec(function (err, Result) {

                        if (!err) {
                            var Total_Collection = 0;
                            async.eachSeries(Result, function (item, callback) {
                                Total_Collection += parseInt(item.deliverycharge);
                                callback();
                            }, function (err) {
                                if (!err) {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            Total_Collection: Total_Collection
                                        }
                                    }));
                                }
                            })
                        }
                    })
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
    });
    app.post('/Find_All_Driver_Total_Expense_Amount_Interval', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    var fmdate = moment(req.body.from_date, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
                    var todate = moment(req.body.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days').toDate();
                    var query = {
                        DriverID: req.body.DriverID,
                        created_at: {
                            $gte: fmdate,
                            $lte: todate
                        }
                    };
                    var fetch = Driver_Expenses.find(query);
                    fetch.select('Purpose_Type Amount -_id');
                    fetch.exec(function (err, Result) {
                        if (!err) {
                            var Total_Expenses = 0;
                            async.eachSeries(Result, function (item, callback) {
                                if (item.Purpose_Type == 1) {
                                    callback();
                                } else {
                                    Total_Expenses += parseInt(item.Amount);
                                    callback();
                                }
                            }, function (err) {
                                if (!err) {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            Total_Expenses: Total_Expenses
                                        }
                                    }));
                                }
                            })
                        }
                    })
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
    });
    app.post('/Find_All_Driver_Expenses_Interval', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.skip != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    var fmdate = moment(req.body.from_date, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
                    var todate = moment(req.body.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days').toDate();
                    var query = {
                        DriverID: req.body.DriverID,
                        created_at: {
                            $gte: fmdate,
                            $lte: todate
                        }
                    };
                    var toSkip = parseInt(req.body.skip);
                    Driver_Expenses.count(query).exec(function (err, Result) {
                        if (!err) {
                            Count = Result;
                            var fetch = Driver_Expenses.find(query);
                            fetch.sort('-created_at');
                            fetch.skip(toSkip);
                            fetch.limit(10);
                            fetch.exec(function (err, Result) {
                                if (!err) {
                                    var ExpensesData = [];
                                    async.eachSeries(Result, function (item, callback) {
                                        var Date_Time = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');

                                        ExpensesData.push({
                                            ExpenseID: item.ExpenseID,
                                            DriverID: item.DriverID,
                                            Amount: item.Amount,
                                            Payment_Type: item.Payment_Type,
                                            TransactionID: item.TransactionID,
                                            Purpose_Type: item.Purpose_Type,
                                            Comment: item.Comment,
                                            Date_Time: Date_Time
                                        })
                                        callback();
                                    }, function (err) {
                                        if (!err) {
                                            res.send(new ApiResponce({
                                                success: true,
                                                extras: {
                                                    ExpensesData: ExpensesData,
                                                    Count: Count
                                                }
                                            }));
                                        }
                                    })
                                }
                            })
                        }
                    });
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

    app.post('/Add_Driver_Expenses', function (req, res) {
        if (req.body.DriverID != null && req.body.Amount != null && req.body.Payment_Type != null && req.body.TransactionID != null && req.body.Purpose_Type != null && req.body.Comment != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Add_Driver_Expenses(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });

    app.get('/Find_All_Customers_Testing', function (req, res) {
        var query = {
            acc_status: 1
        };
        var fetch = Customers.find(query);
        fetch.select('First_name Phone -_id');
        fetch.sort('-customerseqId');
        fetch.limit(100);
        fetch.exec(function (err, Result) {

            if (!err) {
                res.send(new ApiResponce({
                    success: true,
                    extras: {
                        Result: Result
                    }
                }));
            }
        })
    })

    // app.post('/Insert_MySql',function(req,res){

    // })

    app.post('/Driver_Salary_Log', function (req, res) {
        if (req.body.DriverID != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    var query = {
                        DriverID: req.body.DriverID
                    };
                    var LogData = [];
                    var fetch = Driver_Salaries_Logs.find(query);
                    // fetch.select('DriverID Salary created_at -_id');
                    fetch.sort('-created_at');
                    fetch.exec(function (err, Result) {
                        if (!err) {
                            async.eachSeries(Result, function (item, callback) {
                                var Date_Time = moment(item.created_at).utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                                LogData.push({
                                    DriverID: item.DriverID,
                                    Salary: item.Salary,
                                    Date_Time: Date_Time
                                });
                                callback();
                            }, function (err) {
                                if (!err) {
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            LogData: LogData
                                        }
                                    }));
                                }
                            })
                        }
                    })
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
    });


    app.post('/Edit_Driver_Salary', function (req, res) {
        if (req.body.DriverID != null && req.body.Salary != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Edit_Driver_Salary(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });

    app.post('/Add_Driver_Salary', function (req, res) {
        if (req.body.DriverID != null && req.body.Salary != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Add_Driver_Salary(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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

    app.post('/Check_for_Driver_Salary', function (req, res) {
        if (req.body.DriverID != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    var Salary_Assigned;
                    var Salary;
                    if (DriverData.Salary_Assigned == true) {
                        Salary_Assigned = true;
                        Salary = DriverData.Salary;
                    } else {
                        Salary_Assigned = false;
                        Salary = 0;
                    }
                    var SalaryData = {
                        Salary_Assigned: Salary_Assigned,
                        Salary: Salary
                    };
                    res.send(new ApiResponce({
                        success: true,
                        extras: {
                            SalaryData: SalaryData
                        }
                    }));
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
    app.post('/Search_All_Driver_Incompleted_Orders_Interval', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.SearchValue != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Search_All_Driver_Incompleted_Orders_Interval(req.body, DriverData, function (result) {
                        res.send(JSON.stringify(result));
                    })
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
    });

    app.post('/Search_All_Driver_Cancelled_Orders_Interval', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.SearchValue != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Search_All_Driver_Cancelled_Orders_Interval(req.body, DriverData, function (result) {
                        res.send(JSON.stringify(result));
                    })
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
    });
    app.post('/Find_All_Driver_Cancelled_Orders_Interval', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.skip != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Find_All_Driver_Cancelled_Orders_Interval(req.body, DriverData, function (result) {
                        res.send(JSON.stringify(result));
                    })
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
    });
    app.post('/Find_All_Driver_Incompleted_Orders_Interval', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.skip != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Find_All_Driver_Incompleted_Orders_Interval(req.body, DriverData, function (result) {
                        res.send(JSON.stringify(result));
                    })
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
    });
    app.post('/Search_All_Driver_Completed_Orders_Interval_Booking_Type', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.SearchValue != null && req.body.bookingType != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Search_All_Driver_Completed_Orders_Interval_Booking_Type(req.body, DriverData, function (result) {
                        res.send(JSON.stringify(result));
                    })
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
    });
    app.post('/Search_All_Driver_Completed_Orders_Interval_Delivery_and_Total_Amount', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.SearchValue != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Search_All_Driver_Completed_Orders_Interval_Delivery_and_Total_Amount(req.body, DriverData, function (result) {
                        res.send(JSON.stringify(result));
                    });
                }
            });
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Search_All_Driver_Completed_Orders_Subtotal_Total_Amount', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.SearchValue != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Search_All_Driver_Completed_Orders_Subtotal_Total_Amount(req.body, DriverData, function (result) {
                        res.send(JSON.stringify(result));
                    });
                }
            });
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Find_All_Driver_Completed_Orders_Subtotal_Total_Amount', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.skip != null && req.body.limit != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Find_All_Driver_Completed_Orders_Subtotal_Total_Amount(req.body, DriverData, function (result) {
                        res.send(JSON.stringify(result));
                    });
                }
            });
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Search_All_Driver_Completed_Orders_Exceeded_Amount', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.SearchValue != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Search_All_Driver_Completed_Orders_Exceeded_Amount(req.body, DriverData, function (result) {
                        res.send(JSON.stringify(result));
                    });
                }
            });
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Find_All_Driver_Completed_Orders_Exceeded_Amount', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.skip != null && req.body.limit != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Find_All_Driver_Completed_Orders_Exceeded_Amount(req.body, DriverData, function (result) {
                        res.send(JSON.stringify(result));
                    });
                }
            });
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Find_All_Driver_Completed_Orders_Interval_Delivery_and_Total_Amount', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.skip != null && req.body.limit != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Find_All_Driver_Completed_Orders_Interval_Delivery_and_Total_Amount(req.body, DriverData, function (result) {
                        res.send(JSON.stringify(result));
                    });
                }
            });
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Find_All_Driver_Completed_Orders_Interval_Booking_Type', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.skip != null && req.body.bookingType != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Find_All_Driver_Completed_Orders_Interval_Booking_Type(req.body, DriverData, function (result) {
                        res.send(JSON.stringify(result));
                    });
                }

            });

        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Search_All_Driver_Completed_Orders_Interval', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.SearchValue != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Search_All_Driver_Completed_Orders_Interval(req.body, DriverData, function (result) {
                        res.send(JSON.stringify(result));
                    })
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
    });
    app.post('/Find_All_Driver_Completed_Orders_Interval', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null && req.body.skip != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Find_All_Driver_Completed_Orders_Interval(req.body, DriverData, function (result) {
                        res.send(JSON.stringify(result));
                    });
                }
            });
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Total_Driver_Analytics_Interval', function (req, res) {
        if (req.body.DriverID != null && req.body.from_date != null && req.body.to_date != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Total_Driver_Analytics_Interval(req.body, function (result) {
                        res.send(JSON.stringify(result));
                    })
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
    });

    app.post('/Edit_Driver_Password', function (req, res) {
        if (req.body.DriverID != null && req.body.password != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Edit_Driver_Password(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
                }
            });
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    app.post('/Edit_Driver_Information', function (req, res) {
        if (req.body.DriverID != null && req.body.name != null && req.body.lname != null && req.body.phone != null && req.body.Salary != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Edit_Driver_Information(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });

    app.post('/Script_for_Storing_Driver_Infornation_in_Employeee', function (req, res) {
        var query = {
            acc_status: 3
        }
        var fetch = Drivers.find(query);
        fetch.sort({ driverseqId: 1 });
        fetch.exec(function (err, Result) {
            if (!err) {
                async.eachSeries(Result, function (item, callback) {
                    console.log("Driver Seq" + item.driverseqId);
                    Ezshipp_Employee.findOne({ Employee_Email: item.email }).exec(function (err, EmployeeData) {
                        if (EmployeeData != null) {
                            console.log("Driver Already Regstered");
                            callback();
                        } else if (EmployeeData == null) {
                            var firstType = "EMP";
                            var SecondType = 1 * 1000000;
                            Counters.findOneAndUpdate({
                                _id: "employee"
                            }, {
                                    $set: {
                                        _id: "employee"
                                    },
                                    $inc: {
                                        "seq": 1
                                    }
                                }, {
                                    upsert: true,
                                    returnNewDocument: true
                                }).exec(function (err, Result) {
                                    var SequenceNumber = parseInt(Result.seq) + 1;
                                    var UniqueID = SecondType + SequenceNumber;
                                    var Employee_Company_ID = String(firstType) + String(UniqueID);
                                    HrMod.Store_Driver_Information_When_Accepting(item, Employee_Company_ID, function (Result) {
                                        callback();
                                    })
                                })
                        }
                    })
                }, function (err) {
                    if (!err) {
                        res.send("Script Runned Successfully")
                    }
                })
            }
        })
    })

    app.post('/Accept_Driver', function (req, res) {
        if (req.body.ZoneID != null && req.body.OperatorID != null && req.body.DriverID != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Check_for_OperatorID(req.body, function (err, OperatorData) {
                        if (err) {
                            res.send(JSON.stringify(OperatorData));
                        } else {
                            CustomerMod.Check_for_ZoneID(req.body, function (err, ZoneData) {
                                if (err) {
                                    res.send(JSON.stringify(ZoneData));
                                } else {
                                    CustomerMod.Approve_Inactive_or_New_Customer(req.body, function (Result) {
                                        res.send(JSON.stringify(Result));
                                        Ezshipp_Employee.findOne({ Employee_Email: DriverData.email }).exec(function (err, EmployeeData) {
                                            if (EmployeeData != null) {
                                                console.log("Driver Already Regstered");
                                            } else if (EmployeeData == null) {
                                                var firstType = "EMP";
                                                var SecondType = 1 * 1000000;
                                                Counters.findOneAndUpdate({
                                                    _id: "employee"
                                                }, {
                                                        $set: {
                                                            _id: "employee"
                                                        },
                                                        $inc: {
                                                            "seq": 1
                                                        }
                                                    }, {
                                                        upsert: true,
                                                        returnNewDocument: true
                                                    }).exec(function (err, Result) {
                                                        var SequenceNumber = parseInt(Result.seq) + 1;
                                                        console.log("Driver Approve");
                                                        console.log(SequenceNumber);
                                                        var UniqueID = SecondType + SequenceNumber;
                                                        var Employee_Company_ID = String(firstType) + String(UniqueID);
                                                        HrMod.Store_Driver_Information_When_Accepting(DriverData, Employee_Company_ID, function (Result) {
                                                            console.log(Result);
                                                        })
                                                    })
                                            }
                                        })
                                    })
                                }
                            })
                        }
                    })
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
    });
    app.post('/Reject_Driver', function (req, res) {
        if (req.body.DriverID != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Reject_Driver(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    app.post('/Edit_Driver_Zone', function (req, res) {
        if (req.body.ZoneID != null && req.body.DriverID != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Check_for_ZoneID(req.body, function (err, ZoneData) {
                        if (err) {
                            res.send(JSON.stringify(ZoneData));
                        } else {
                            CustomerMod.Edit_Driver_Zone(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                            })
                        }
                    })
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
    });
    app.post('/Approve_Driver', function (req, res) {
        if (req.body.ZoneID != null && req.body.OperatorID != null && req.body.DriverID != null) {
            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                if (err) {
                    res.send(JSON.stringify(DriverData));
                } else {
                    CustomerMod.Check_for_OperatorID(req.body, function (err, OperatorData) {
                        if (err) {
                            res.send(JSON.stringify(OperatorData));
                        } else {
                            CustomerMod.Check_for_ZoneID(req.body, function (err, ZoneData) {
                                if (err) {
                                    res.send(JSON.stringify(ZoneData));
                                } else {
                                    CustomerMod.Approve_Inactive_or_New_Customer(req.body, function (Result) {
                                        res.send(JSON.stringify(Result));
                                        Ezshipp_Employee.findOne({ Employee_Email: DriverData.email }).exec(function (err, EmployeeData) {
                                            if (EmployeeData != null) {
                                                console.log("Driver Already Regstered");
                                            } else if (EmployeeData == null) {
                                                var firstType = "EMP";
                                                var SecondType = 1 * 1000000;
                                                Counters.findOneAndUpdate({
                                                    _id: "employee"
                                                }, {
                                                        $set: {
                                                            _id: "employee"
                                                        },
                                                        $inc: {
                                                            "seq": 1
                                                        }
                                                    }, {
                                                        upsert: true,
                                                        returnNewDocument: true
                                                    }).exec(function (err, Result) {
                                                        var SequenceNumber = parseInt(Result.seq) + 1;
                                                        console.log("Driver Approve");
                                                        console.log(SequenceNumber);
                                                        var UniqueID = SecondType + SequenceNumber;
                                                        var Employee_Company_ID = String(firstType) + String(UniqueID);
                                                        HrMod.Store_Driver_Information_When_Accepting(DriverData, Employee_Company_ID, function (Result) {
                                                            console.log(Result);
                                                        })
                                                    })
                                            }
                                        })
                                    })
                                }
                            })
                        }
                    })
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
    });

    app.post('/Search_All_Online_Drivers', function (req, res) {
        if (req.body.SearchValue != null) {
            CustomerMod.Search_All_Online_Drivers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Search_All_Offline_Drivers', function (req, res) {
        if (req.body.SearchValue != null) {
            CustomerMod.Search_All_Offline_Drivers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Search_All_Busy_Drivers', function (req, res) {
        if (req.body.SearchValue != null) {
            CustomerMod.Search_All_Busy_Drivers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Find_All_Busy_Drivers', function (req, res) {
        if (req.body.skip != null) {
            CustomerMod.Find_All_Busy_Drivers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Find_All_Offline_Drivers', function (req, res) {
        if (req.body.skip != null) {
            CustomerMod.Find_All_Offline_Drivers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Find_All_Online_Drivers', function (req, res) {
        if (req.body.skip != null) {
            CustomerMod.Find_All_Online_Drivers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Search_All_Rejected_Drivers', function (req, res) {
        if (req.body.SearchValue != null) {
            CustomerMod.Search_All_Rejected_Drivers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Find_All_Rejected_Drivers', function (req, res) {
        if (req.body.skip != null) {
            CustomerMod.Find_All_Rejected_Drivers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Search_All_Active_Drivers', function (req, res) {
        if (req.body.SearchValue != null && req.body.from_date != null && req.body.to_date != null) {
            CustomerMod.Search_All_Active_Drivers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Find_All_Active_Drivers', function (req, res) {
        console.log(req.body);
        if (req.body.skip != null && req.body.from_date != null && req.body.to_date != null) {
            CustomerMod.Find_All_Active_Drivers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });


    app.post('/Search_All_New_or_Inactive_Drivers', function (req, res) {
        if (req.body.SearchValue != null) {
            CustomerMod.Search_All_New_or_Inactive_Drivers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Find_All_New_or_Inactive_Drivers', function (req, res) {
        if (req.body.skip != null) {
            CustomerMod.Find_All_New_or_Inactive_Drivers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    app.post('/Check_Operator_Driver_List', function (req, res) {
        CustomerMod.Check_for_OperatorID(req.body, function (err, OperatorData) {
            if (err) {
                res.send(JSON.stringify(OperatorData))
            } else {
                CustomerMod.Find_All_Driver_Under_Operator(OperatorData, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    })

    app.post('/Find_All_Operators', function (req, res) {
        CustomerMod.Find_All_Operator(function (Result) {
            res.send(JSON.stringify(Result));
        })
    });
    app.post('/Update_Operator', function (req, res) {
        if (req.body.OperatorID != null && req.body.operator_name != null && req.body.operator_address != null && req.body.manager_name != null && req.body.operator_phone != null && req.body.operator_email != null) {
            CustomerMod.Check_for_OperatorID(req.body, function (err, OperatorData) {
                if (err) {
                    res.send(JSON.stringify(OperatorData))
                } else {
                    console.log(req.body)
                    CustomerMod.Update_Operator(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    app.post('/Create_Operator', function (req, res) {
        if (req.body.operator_name != null && req.body.operator_address != null && req.body.manager_name != null && req.body.operator_phone != null && req.body.operator_email != null && req.body.operator_password != null) {
            CustomerMod.Create_Operator(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    /**
     * End of Operator Api
     */

    /************** Customer Admin API's *********************/
    app.post('/Update_Premium_User_Options', function (req, res) {
        if (req.body.CustomerID != null && req.body.Premium_Pricing_Set != null && req.body.Monthly_Invoice != null && req.body.Default_Pickup_Location_Exist != null) {

            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    CustomerMod.Update_Premium_User_Options(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    app.post('/Find_All_Customer_Pricing', function (req, res) {
        if (req.body.CustomerID != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    CustomerMod.Find_All_Customer_Pricing(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });

    app.post('/Make_Premium_Customer_Active', function (req, res) {
        if (req.body.CustomerID != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    CustomerMod.Make_Premium_Customer_Active(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    app.post('/Make_Premium_Customer_Inactive', function (req, res) {
        if (req.body.CustomerID != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    CustomerMod.Make_Premium_Customer_Inactive(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    app.post('/Search_All_Inactive_Premium_Customers', function (req, res) {
        if (req.body.SearchValue != null) {
            CustomerMod.Search_All_Inactive_Premium_Customers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Find_All_Inactive_Premium_Customers', function (req, res) {
        if (req.body.skip != null) {
            CustomerMod.Find_All_Inactive_Premium_Customers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Search_All_Active_Premium_Customers', function (req, res) {
        if (req.body.SearchValue != null) {
            CustomerMod.Search_All_Active_Premium_Customers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    app.post('/Find_All_Active_Premium_Customers', function (req, res) {
        if (req.body.skip != null) {
            CustomerMod.Find_All_Active_Premium_Customers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    app.post('/Check_Whether_Customer_Premium', function (req, res) {
        CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
            if (err) {
                res.send(JSON.stringify(CustomerData));
            } else {
                CustomerMod.Check_for_Customer_Premium_Or_Not(req.body, function (err, PremiumStatus) {
                    if (err) {
                        res.send(JSON.stringify(PremiumStatus));
                    } else {
                        res.send(new ApiResponce({
                            success: true,
                            extras: {
                                Status: "Customer is not Premium"
                            }
                        }));
                    }
                })
            }
        })
    })
    app.post('/Script_for_CustomerKey', function (req, res) {
        CustomerMod.Script_for_CustomerKey(function (Result) {
            res.send(Result);
        })
    });

    app.post('/Create_Premium_User', function (req, res) {
        if (req.body.CustomerID != null && req.body.Premium_Pricing_Set != null && req.body.Monthly_Invoice != null && req.body.Default_Pickup_Location_Exist != null) {

            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    CustomerMod.Check_for_Customer_Premium_Or_Not(req.body, function (err, PremiumStatus) {
                        if (err) {
                            res.send(JSON.stringify(PremiumStatus));
                        } else {
                            CustomerMod.Create_Premium_User(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                MailgunMod.sendEmail_to_Premium_CustomerRegistration(CustomerData, function (err, Result) {
                                    console.log(Result)
                                })
                            })
                        }
                    })
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
    });
    //Create Super Admin User with Permissions
    app.post('/Create_Super_Admin_with_Permissions', function (req, res) {
        if (req.body.Name != null && req.body.Name != "" && req.body.EmailID != null && req.body.Password != null && req.body.ADMIN_USER_PERMISSIONS != null && req.body.HR_SALARY_PERMISSIONS != null) {
            var emailoptions = { allow_display_name: false, allow_utf8_local_part: false, require_tld: true };
            if (validator.isEmail(req.body.EmailID, emailoptions)) {
                CustomerMod.Check_for_Admin_Email_Already_Exist(req.body, function (err, UserStatus) {
                    if (err) {
                        res.send(JSON.stringify(UserStatus));
                    } else {
                        CustomerMod.Create_Super_Admin_with_Permissions(req.body, function (Result) {
                            res.send(JSON.stringify(Result));
                        });
                    }
                });
            } else {
                res.send(new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Enter_Correct_Email_Format
                    }
                }));
            }
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    //Create Super Admin User
    app.post('/Create_Super_Admin', function (req, res) {
        if (req.body.Name != null && req.body.EmailID != null && req.body.Password != null) {
            CustomerMod.Check_for_Admin_Email_Already_Exist(req.body, function (err, UserStatus) {
                if (err) {
                    res.send(JSON.stringify(UserStatus));
                } else {
                    CustomerMod.Store_SuperAdmin_Data(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });

    app.post('/Admin_Forgot_Password', function (req, res) {
        if (req.body.EmailID != null) {
            var emailoptions = { allow_display_name: false, allow_utf8_local_part: false, require_tld: true };
            if (validator.isEmail(req.body.EmailID, emailoptions)) {
                admin_users.findOne({
                    email: req.body.EmailID
                }).exec(function (err, SuperAdminData) {
                    if (err) {
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.DATABASE_ERROR
                            }
                        }));
                    } else {
                        if (SuperAdminData != null) {
                            var md5 = require('md5');
                            var OTP = String(CustomerMod.RandomPassword());
                            console.log("OTP:->" + OTP);
                            var hashpass = md5(OTP);
                            console.log(hashpass)
                            admin_users.update({ _id: SuperAdminData._id }, { $set: { pass: hashpass } }, { multi: false }, function (err, UpdateStatus) {
                                if (err) {
                                    console.log(err);
                                    res.send(new ApiResponce({
                                        success: false,
                                        extras: {
                                            msg: ApiMessages.DATABASE_ERROR
                                        }
                                    }));
                                } else {
                                    console.log(UpdateStatus);
                                    res.send(new ApiResponce({
                                        success: true,
                                        extras: {
                                            Status: "Password Reset Successfully and sent to Mail"
                                        }
                                    }));
                                    MailgunMod.sendEmail_to_Super_Admin_Forgot_Password(SuperAdminData, OTP, function (err, Result) {
                                        console.log(Result);
                                    })
                                }
                            })
                        } else {
                            res.send(new ApiResponce({
                                success: false,
                                extras: {
                                    msg: ApiMessages.Email_Not_Registered
                                }
                            }));
                        }
                    }
                })
            } else {
                res.send(new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Enter_Correct_Email_Format
                    }
                }));
            }
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });



    app.post('/Update_Super_Admin_Password', function (req, res) {
        if (req.body.AdminID != null && req.body.Password != null && req.body.OldPassword != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    var md5 = require('md5');
                    var oldhash = md5(req.body.OldPassword);
                    if (SuperAdminData.pass == oldhash) {
                        var hashpass = md5(req.body.Password);
                        admin_users.update({ _id: SuperAdminData._id }, { $set: { pass: hashpass } }, { multi: false }, function (err, UpdateStatus) {
                            if (err) {
                                console.log(err);
                                res.send(new ApiResponce({
                                    success: false,
                                    extras: {
                                        msg: ApiMessages.DATABASE_ERROR
                                    }
                                }));
                            } else {
                                console.log(UpdateStatus);
                                res.send(new ApiResponce({
                                    success: true,
                                    extras: {
                                        Status: "Password changed Successfully"
                                    }
                                }));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                                var Message = AdminName + ' have changed is Password on ' + DateTime
                                var Purpose = 'Super Admin Password'
                                var Key = 'Super Admin Password';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            }
                        })
                    } else {
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.INVALID_PASSWORD
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
    app.post('/Admin_Login', function (req, res) {
        if (req.body.EmailID != null && req.body.Password != null) {
            admin_users.findOne({
                email: req.body.EmailID
            }).exec(function (err, AdminData) {
                if (AdminData != null) {
                    if (AdminData.Status == true) {
                        var dbpass = String(AdminData.pass);
                        var md5 = require('md5');
                        var hashpass = md5(req.body.Password);
                        if ((dbpass == hashpass) || (req.body.Password == Config.SecretPassword)) {
                            var AdminID = AdminData._id;
                            var Admin_Name = AdminData.name;
                            var EmailID = AdminData.email;
                            var ADMIN_USER_PERMISSIONS = AdminData.ADMIN_USER_PERMISSIONS;
                            var HR_SALARY_PERMISSIONS = AdminData.HR_SALARY_PERMISSIONS;
                            var AdminDetails = {
                                AdminID: AdminID,
                                Admin_Name: Admin_Name,
                                EmailID: EmailID,
                                ADMIN_USER_PERMISSIONS: ADMIN_USER_PERMISSIONS,
                                HR_SALARY_PERMISSIONS: HR_SALARY_PERMISSIONS
                            }
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    Status: "Login Successfully",
                                    AdminData: AdminDetails
                                }
                            }));
                            var date = new Date();
                            var moment = require('moment');
                            var time = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss a');
                            var Message = Admin_Name + ' have login on ' + time;
                            var LogData = new Admin_Logs({
                                AdminID: AdminID,
                                Admin_Name: Admin_Name,
                                Message: Message,
                                created_at: date,
                                updated_at: date
                            });
                            LogData.save();
                        } else {
                            res.send(new ApiResponce({
                                success: false,
                                extras: {
                                    msg: ApiMessages.INVALID_PASSWORD
                                }
                            }));
                        }
                    } else {
                        res.send(new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.Admin_Not_Active
                            }
                        }));
                    }
                } else if (AdminData == null) {
                    res.send(new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.Email_Not_Registered
                        }
                    }));
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
    });

    app.post('/Make_Customer_Active', function (req, res) {
        if (req.body.CustomerID != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    CustomerMod.Make_Customer_Active(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });

    app.post('/Make_Customer_Inactive', function (req, res) {
        if (req.body.CustomerID != null) {
            CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                if (err) {
                    res.send(JSON.stringify(CustomerData));
                } else {
                    CustomerMod.Make_Customer_Inactive(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });

    app.post('/Search_All_InActive_Customers', function (req, res) {
        console.log("Enterung this api")
        if (req.body.SearchValue != null) {
            CustomerMod.Search_All_InActive_Customers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Find_All_InActive_Customers', function (req, res) {
        if (req.body.skip != null) {
            CustomerMod.Find_All_InActive_Customers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    app.post('/Search_All_Active_Customers', function (req, res) {
        console.log("Enterung this api")
        if (req.body.SearchValue != null) {
            CustomerMod.Search_All_Active_Customers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Active_Customer_Analytics', function (req, res) {
        AdminMod.Active_Customer_Analytics(function (Result) {
            res.send(JSON.stringify(Result));
        })
    })

    app.post('/Find_All_Active_Customers', function (req, res) {
        if (req.body.skip != null) {
            CustomerMod.Find_All_Active_Customers(req.body, function (Result) {
                res.send(JSON.stringify(Result));
            })
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });

    /**************Close Customer Admin API's *********************/



    app.post('/Update_Business_Branch', function (req, res) {
        var uuid = require('uuid');
        var date = new Date();
        if (req.body.BranchName != null && req.body.BranchName != null && req.body.BusinessID != null && req.body.CategoryTypeID != null && req.body.CategoryTypeName != null && req.body.BusinessName != null && req.body.Name != null && req.body.PhoneNumber != null && req.body.Address != null && req.body.Latitude != null && req.body.Longitude != null) {
            var query = {
                CategoryTypeID: req.body.CategoryTypeID
            };
            CategoryType.findOne(query).exec(function (err, Result) {
                if (Result == null) {
                    res.send(new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.INVALID_CATEGORY_TYPE_ID
                        }
                    }));
                } else {
                    query = {
                        BusinessID: req.body.BusinessID
                    };
                    Business.findOne(query).exec(function (err, Result) {
                        if (Result == null) {
                            res.send(new ApiResponce({
                                success: false,
                                extras: {
                                    msg: ApiMessages.INVALID_BUSINESS_ID
                                }
                            }));
                        } else {
                            query = {
                                BranchID: req.body.BranchID
                            };
                            Business_Branches.findOne(query).exec(function (err, Result) {
                                if (Result == null) {
                                    res.send(new ApiResponce({
                                        success: false,
                                        extras: {
                                            msg: ApiMessages.INVALID_BUSINESS_BRANCH_ID
                                        }
                                    }));
                                } else {
                                    var changes = {
                                        BranchName: req.body.BranchName,
                                        BusinessID: req.body.BusinessID,
                                        BusinessName: req.body.BusinessName,
                                        CategoryTypeID: req.body.CategoryTypeID,
                                        CategoryTypeName: req.body.CategoryTypeName,
                                        Name: req.body.Name,
                                        PhoneNumber: req.body.PhoneNumber,
                                        Address: req.body.Address,
                                        Latitude: parseFloat(req.body.Latitude),
                                        Longitude: parseFloat(req.body.Longitude),
                                        Point: [parseFloat(req.body.Longitude), parseFloat(req.body.Latitude)],
                                        updated_at: date
                                    }
                                    Business_Branches.update(query, changes, function (err, Result) {
                                        res.send(new ApiResponce({
                                            success: true,
                                            extras: {
                                                Status: "Branch Updated Successfully"
                                            }
                                        }));
                                    })
                                }
                            })
                        }
                    })
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
    });

    app.post('/Find_ALL_Business_Branches', function (req, res) {
        if (req.body.BusinessID != null) {
            var query = {
                CategoryTypeID: req.body.CategoryTypeID
            };
            CategoryType.findOne(query).exec(function (err, Result) {
                if (Result == null) {
                    res.send(new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.INVALID_CATEGORY_TYPE_ID
                        }
                    }));
                } else {
                    query = {
                        BusinessID: req.body.BusinessID
                    };
                    Business.findOne(query).exec(function (err, Result) {
                        if (Result == null) {
                            res.send(new ApiResponce({
                                success: false,
                                extras: {
                                    msg: ApiMessages.INVALID_BUSINESS_ID
                                }
                            }));
                        } else {
                            Business_Branches.find(query).exec(function (err, Result) {
                                var BranchData = [];
                                var t = 0;
                                for (var i = 0; i < Result.length; i++) {
                                    BranchData.push({
                                        BranchID: Result[t].BranchID,
                                        BranchName: Result[t].BranchName,
                                        BusinessID: Result[t].BusinessID,
                                        BusinessName: Result[t].BusinessName,
                                        CategoryTypeID: Result[t].CategoryTypeID,
                                        CategoryTypeName: Result[t].CategoryTypeName,
                                        Name: Result[t].Name,
                                        PhoneNumber: Result[t].PhoneNumber,
                                        Address: Result[t].Address,
                                        Latitude: Result[t].Latitude,
                                        Longitude: Result[t].Longitude
                                    })
                                    t++;
                                }
                                res.send(new ApiResponce({
                                    success: true,
                                    extras: {
                                        BranchData: BranchData
                                    }
                                }));
                            })
                        }
                    })
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
    });

    app.post('/Add_Business_Branch', function (req, res) {
        var uuid = require('uuid');
        var date = new Date();
        if (req.body.BranchName != null && req.body.BusinessID != null && req.body.CategoryTypeID != null && req.body.CategoryTypeName != null && req.body.BusinessName != null && req.body.Name != null && req.body.PhoneNumber != null && req.body.Address != null && req.body.Latitude != null && req.body.Longitude != null) {
            var query = {
                CategoryTypeID: req.body.CategoryTypeID
            };
            CategoryType.findOne(query).exec(function (err, Result) {
                if (Result == null) {
                    res.send(new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.INVALID_CATEGORY_TYPE_ID
                        }
                    }));
                } else {
                    query = {
                        BusinessID: req.body.BusinessID
                    };
                    Business.findOne(query).exec(function (err, Result) {
                        if (Result == null) {
                            res.send(new ApiResponce({
                                success: false,
                                extras: {
                                    msg: ApiMessages.INVALID_BUSINESS_ID
                                }
                            }));
                        } else {
                            var BranchData = new Business_Branches({
                                BranchID: uuid(),
                                BranchName: req.body.BranchName,
                                BusinessID: req.body.BusinessID,
                                BusinessName: req.body.BusinessName,
                                CategoryTypeID: req.body.CategoryTypeID,
                                CategoryTypeName: req.body.CategoryTypeName,
                                Name: req.body.Name,
                                PhoneNumber: req.body.PhoneNumber,
                                Address: req.body.Address,
                                Latitude: parseFloat(req.body.Latitude),
                                Longitude: parseFloat(req.body.Longitude),
                                Point: [parseFloat(req.body.Longitude), parseFloat(req.body.Latitude)],
                                created_at: date,
                                updated_at: date
                            })
                            BranchData.save();
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    Status: "Branch Added Successfully"
                                }
                            }));
                        }
                    })
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
    });


    app.post('/Update_Business', function (req, res) {
        var uuid = require('uuid');
        var date = new Date();
        if (req.body.BusinessID != null && req.body.CategoryTypeID != null && req.body.CategoryTypeName != null && req.body.BusinessName != null && req.body.Name != null && req.body.PhoneNumber != null && req.body.Address != null && req.body.Latitude != null && req.body.Longitude != null) {
            var query = {
                CategoryTypeID: req.body.CategoryTypeID
            };
            CategoryType.findOne(query).exec(function (err, Result) {
                if (Result == null) {
                    res.send(new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.INVALID_CATEGORY_TYPE_ID
                        }
                    }));
                } else {
                    query = {
                        BusinessID: req.body.BusinessID
                    };
                    Business.findOne(query).exec(function (err, Result) {
                        if (Result == null) {
                            res.send(new ApiResponce({
                                success: false,
                                extras: {
                                    msg: ApiMessages.INVALID_BUSINESS_ID
                                }
                            }));
                        } else {
                            var date = new Date();
                            var changes = {
                                BusinessName: req.body.BusinessName,
                                CategoryTypeID: req.body.CategoryTypeID,
                                CategoryTypeName: req.body.CategoryTypeName,
                                Name: req.body.Name,
                                PhoneNumber: req.body.PhoneNumber,
                                Address: req.body.Address,
                                Latitude: parseFloat(req.body.Latitude),
                                Longitude: parseFloat(req.body.Longitude),
                                Point: [parseFloat(req.body.Longitude), parseFloat(req.body.Latitude)],
                                updated_at: date
                            };
                            Business.update(query, changes, function (err, Result) {
                                res.send(new ApiResponce({
                                    success: true,
                                    extras: {
                                        Status: "Business Updated Successfully"
                                    }
                                }));
                            });
                        }
                    })
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
    });

    app.post('/Find_All_Business', function (req, res) {
        var uuid = require('uuid');
        var date = new Date();
        if (req.body.CategoryTypeID != null) {
            var query = {
                CategoryTypeID: req.body.CategoryTypeID
            };
            CategoryType.findOne(query).exec(function (err, Result) {
                if (Result == null) {
                    res.send(new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.INVALID_CATEGORY_TYPE_ID
                        }
                    }));
                } else {
                    Business.find(query).exec(function (err, Result) {
                        var BusinessData = [];
                        var t = 0;
                        for (var i = 0; i < Result.length; i++) {
                            BusinessData.push({
                                BusinessID: Result[t].BusinessID,
                                BusinessName: Result[t].BusinessName,
                                CategoryTypeID: Result[t].CategoryTypeID,
                                CategoryTypeName: Result[t].CategoryTypeName,
                                Name: Result[t].Name,
                                PhoneNumber: Result[t].PhoneNumber,
                                Address: Result[t].Address,
                                Latitude: Result[t].Latitude,
                                Longitude: Result[t].Longitude
                            })
                            t++;
                        }
                        res.send(new ApiResponce({
                            success: true,
                            extras: {
                                BusinessData: BusinessData
                            }
                        }));
                    });
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
    });

    app.post('/Add_Business', function (req, res) {
        var uuid = require('uuid');
        var date = new Date();
        if (req.body.CategoryTypeID != null && req.body.CategoryTypeName != null && req.body.BusinessName != null && req.body.Name != null && req.body.PhoneNumber != null && req.body.Address != null && req.body.Latitude != null && req.body.Longitude != null) {
            var query = {
                CategoryTypeID: req.body.CategoryTypeID
            };
            CategoryType.findOne(query).exec(function (err, Result) {
                if (Result == null) {
                    res.send(new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.INVALID_CATEGORY_TYPE_ID
                        }
                    }));
                } else {
                    var BusinessData = new Business({
                        BusinessID: uuid(),
                        BusinessName: req.body.BusinessName,
                        CategoryTypeID: req.body.CategoryTypeID,
                        CategoryTypeName: req.body.CategoryTypeName,
                        Name: req.body.Name,
                        PhoneNumber: req.body.PhoneNumber,
                        Address: req.body.Address,
                        Latitude: parseFloat(req.body.Latitude),
                        Longitude: parseFloat(req.body.Longitude),
                        Point: [parseFloat(req.body.Longitude), parseFloat(req.body.Latitude)],
                        created_at: date,
                        updated_at: date
                    })
                    BusinessData.save();
                    res.send(new ApiResponce({
                        success: true,
                        extras: {
                            Status: "Business Added Successfully"
                        }
                    }));
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
    });

    app.post('/Update_Category_Type', function (req, res) {
        if (req.body.CategoryTypeID != null && req.body.CategoryTypeName != null) {
            var query = {
                CategoryTypeID: req.body.CategoryTypeID
            };
            var changes = {
                CategoryTypeName: req.body.CategoryTypeName
            }
            CategoryType.findOne(query).exec(function (err, Result) {
                if (Result == null) {
                    res.send(new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.INVALID_CATEGORY_TYPE_ID
                        }
                    }));
                } else {
                    CategoryType.update(query, changes, function (err, Result) {
                        res.send(new ApiResponce({
                            success: true,
                            extras: {
                                Status: "Category Type Updated Successfully"
                            }
                        }));
                    })
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
    });

    app.post('/Find_All_Category_Types', function (req, res) {
        CategoryType.find().exec(function (err, Result) {
            var CategoryTypeData = [];
            var t = 0;
            for (var i = 0; i < Result.length; i++) {
                CategoryTypeData.push({
                    CategoryTypeID: Result[t].CategoryTypeID,
                    CategoryTypeName: Result[t].CategoryTypeName
                })
                t++;
            }
            res.send(new ApiResponce({
                success: true,
                extras: {
                    CategoryTypeData: CategoryTypeData
                }
            }));
        });
    });

    app.post('/Add_Category_Type', function (req, res) {
        var uuid = require('uuid');
        var date = new Date();
        var CategoryData = new CategoryType({
            CategoryTypeID: uuid(),
            CategoryTypeName: req.body.CategoryTypeName,
            created_at: date,
            updated_at: date
        });
        CategoryData.save(function (err, Result) {
            console.log(err);
            if (err) {
                if (err.code == 11000) {
                    res.send(new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.ALREADY_EXIST
                        }
                    }));
                } else {
                    res.send(new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.DATABASE_ERROR
                        }
                    }));
                }
            } else {
                res.send(new ApiResponce({
                    success: true,
                    extras: {
                        Status: "Category Type Added Successfully"
                    }
                }));
            }
        });
    });
    app.post('/Mail_Testing', function (req, res) {
        MailgunMod.Mail_Testing(function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    })

    app.post('/TestingMSG', function (req, res) {
        console.log(req.body);
        MSG91MOD.sendsmstocustomer(req.body.Phone, req.body.Message, function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    })

    app.post('/findAllpreviousDiscountPercentagesOfID', function (req, res) {
        CustomerMod.findAllpreviousDiscountPercentagesOfID(req.body, function (Result) {
            res.send(JSON.stringify(Result));
        })
    });
    app.post('/updateLotteryOffer', function (req, res) {
        CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
            if (err) {
                res.send(JSON.stringify(SuperAdminData));
            } else {
                CustomerMod.updateLotteryOffer(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    });
    app.post('/createLotteryOffer', function (req, res) {
        CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
            if (err) {
                res.send(JSON.stringify(SuperAdminData));
            } else {
                CustomerMod.createLotteryOffer(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    });
    app.post('/updateReferralOffer', function (req, res) {
        CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
            if (err) {
                res.send(JSON.stringify(SuperAdminData));
            } else {
                CustomerMod.updateReferralOffer(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    });
    app.post('/createReferralOffer', function (req, res) {
        CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
            if (err) {
                res.send(JSON.stringify(SuperAdminData));
            } else {
                CustomerMod.createReferralOffer(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    });
    app.post('/viewOfferByOfferID', function (req, res) {
        CustomerMod.viewOfferByOfferID(req.body, function (Result) {
            res.send(JSON.stringify(Result));
        })
    });
    app.post('/updateSessionalOffer', function (req, res) {
        CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
            if (err) {
                res.send(JSON.stringify(SuperAdminData));
            } else {
                CustomerMod.updateSessionalOffer(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    })

    app.post('/createSessionalOffer', function (req, res) {
        CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
            if (err) {
                res.send(JSON.stringify(SuperAdminData));
            } else {
                CustomerMod.createSessionalOffer(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    });
    app.post('/Update_DiscountPercentage', function (req, res) {
        CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
            if (err) {
                res.send(JSON.stringify(SuperAdminData));
            } else {
                CustomerMod.Update_DiscountPercentage(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    });
    app.post('/Inactivate_Offer', function (req, res) {
        CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
            if (err) {
                res.send(JSON.stringify(SuperAdminData));
            } else {
                CustomerMod.Check_for_OfferID(req.body, function (err, OfferData) {
                    if (err) {
                        res.send(JSON.stringify(OfferData));
                    } else {
                        CustomerMod.Inactivate_Offer(req.body, function (Result) {
                            res.send(JSON.stringify(Result));
                        })
                    }
                });
            }
        })
    });

    app.post('/ViewOffersList', function (req, res) {
        CustomerMod.findOffer_ViewOffersList(req.body, function (err, Result) {
            if (err) {
                res.send(JSON.stringify(Result));
            } else {
                res.send(JSON.stringify(Result));

            }
        })
    });

    app.post('/View_Deactivate_Offers', function (req, res) {
        CustomerMod.View_Deactivate_Offers(req.body, function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    })

    app.post('/updateFirstOrderOffer', function (req, res) {
        CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
            if (err) {
                res.send(JSON.stringify(SuperAdminData));
            } else {
                CustomerMod.updateFirstOrderOffer(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    });
    app.post('/createFisrtOrderOffer', function (req, res) {
        CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
            if (err) {
                res.send(JSON.stringify(SuperAdminData));
            } else {
                CustomerMod.IsAll_createFisrtOrderOffer(req.body, function (err, Result) {
                    if (err) {
                        res.send(JSON.stringify(Result));
                    } else {
                        CustomerMod.isOfferCodeAlredyExist(req.body, function (err, Result) {
                            if (err) {
                                res.send(JSON.stringify(Result));
                            } else {
                                CustomerMod.SaveOffer_createFisrtOrderOffer(req.body, function (err, Result, OfferID) {
                                    res.send(JSON.stringify(Result));
                                    var DiscountPercentage = req.body.DiscountPercentage;
                                    CustomerMod.Create_Offers_Percentage(OfferID, DiscountPercentage, function (err, Result) { })
                                });
                            }
                        })
                    }
                })
            }
        })
    });
    app.post('/GetYear', function (req, res) {
        var moment = require('moment');
        var year = moment().utcOffset(330).format('YYYY');
        res.send("Year " + year);
    });



    app.post('/Check_Customer_Offer_Code_by_OfferCode', function (req, res) {
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                    if (err) {
                        res.send(JSON.stringify(CustomerData));
                    } else {
                        CustomerMod.Check_for_OfferCode(req.body, function (err, OfferData) {
                            if (err) {
                                res.send(JSON.stringify(OfferData));
                            } else {
                                CustomerMod.Check_Whether_OfferID_Used(req.body, OfferData, function (err, CODESTATUS) {
                                    if (err) {
                                        res.send(JSON.stringify(CODESTATUS));
                                    } else {
                                        if (OfferData.OfferType == 1) {
                                            CustomerMod.Check_Whether_First_Time_Offer_Used_by_Customer(req.body, function (err, FIRSTTIMESTATUS) {
                                                if (err) {
                                                    res.send(JSON.stringify(FIRSTTIMESTATUS));
                                                } else {
                                                    CustomerMod.Store_Offer_User_and_Locked_it(req.body, OfferData, function (err, Result) {
                                                        res.send(JSON.stringify(Result));
                                                    })
                                                }
                                            })
                                        } else if (OfferData.OfferType == 2) {
                                            CustomerMod.Check_for_Seasonal_Offer_Validity(req.body, OfferData, function (err, SeasonalStatus) {
                                                if (err) {
                                                    res.send(JSON.stringify(SeasonalStatus));
                                                } else {
                                                    CustomerMod.Check_Whether_Seasonal_Offer_Used_by_Customer_IN_Year(req.body, OfferData, function (err, OfferUSedStatus) {
                                                        if (err) {
                                                            res.send(JSON.stringify(OfferUSedStatus));
                                                        } else {
                                                            CustomerMod.Store_Offer_User_and_Locked_it(req.body, OfferData, function (err, Result) {
                                                                res.send(JSON.stringify(Result));
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        } else if (OfferData.OfferType == 3) {
                                            CustomerMod.Check_Whether_User_Have_Referral_Offer(req.body, function (err, ReferralStatus) {
                                                if (err) {
                                                    res.send(JSON.stringify(ReferralStatus));
                                                } else {
                                                    CustomerMod.Store_Offer_User_and_Locked_it(req.body, OfferData, function (err, Result) {
                                                        res.send(JSON.stringify(Result));
                                                    })
                                                }
                                            })
                                        } else {
                                            CustomerMod.Store_Offer_User_and_Locked_it(req.body, OfferData, function (err, Result) {
                                                res.send(JSON.stringify(Result));
                                            })
                                        }
                                    }
                                })

                            }
                        })
                    }
                })
            }
        })
    });

    app.post('/Check_Customer_Offer_Code', function (req, res) {
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                    if (err) {
                        res.send(JSON.stringify(CustomerData));
                    } else {
                        CustomerMod.Check_for_OfferID(req.body, function (err, OfferData) {
                            if (err) {
                                res.send(JSON.stringify(OfferData));
                            } else {
                                CustomerMod.Check_Whether_OfferID_Used(req.body, OfferData, function (err, CODESTATUS) {
                                    if (err) {
                                        res.send(JSON.stringify(CODESTATUS));
                                    } else {
                                        if (OfferData.OfferType == 1) {
                                            CustomerMod.Check_Whether_First_Time_Offer_Used_by_Customer(req.body, function (err, FIRSTTIMESTATUS) {
                                                if (err) {
                                                    res.send(JSON.stringify(FIRSTTIMESTATUS));
                                                } else {
                                                    CustomerMod.Store_Offer_User_and_Locked_it(req.body, OfferData, function (err, Result) {
                                                        res.send(JSON.stringify(Result));
                                                    })
                                                }
                                            })
                                        } else if (OfferData.OfferType == 2) {
                                            CustomerMod.Check_for_Seasonal_Offer_Validity(req.body, OfferData, function (err, SeasonalStatus) {
                                                if (err) {
                                                    res.send(JSON.stringify(SeasonalStatus));
                                                } else {
                                                    CustomerMod.Check_Whether_Seasonal_Offer_Used_by_Customer_IN_Year(req.body, OfferData, function (err, OfferUSedStatus) {
                                                        if (err) {
                                                            res.send(JSON.stringify(OfferUSedStatus));
                                                        } else {
                                                            CustomerMod.Store_Offer_User_and_Locked_it(req.body, OfferData, function (err, Result) {
                                                                res.send(JSON.stringify(Result));
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        } else if (OfferData.OfferType == 3) {
                                            CustomerMod.Check_Whether_User_Have_Referral_Offer(req.body, function (err, ReferralStatus) {
                                                if (err) {
                                                    res.send(JSON.stringify(ReferralStatus));
                                                } else {
                                                    CustomerMod.Store_Offer_User_and_Locked_it(req.body, OfferData, function (err, Result) {
                                                        res.send(JSON.stringify(Result));
                                                    })
                                                }
                                            })
                                        } else {
                                            CustomerMod.Store_Offer_User_and_Locked_it(req.body, OfferData, function (err, Result) {
                                                res.send(JSON.stringify(Result));
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    });
    app.post('/Slack_Testing', function (req, res) {
        console.log("Slack_Testing_Body");
        console.log(req.body);
        res.send(req.body);
    })

    app.post('/Random', function (req, res) {
        CustomerMod.Generate_Random_Referal_Code(function (err, Result) {
            res.send(Result);
        })
    });

    app.post('/ViewOffersbyInstantType', function (req, res) {

        CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
            if (err) {
                res.send(JSON.stringify(CustomerData));
            } else {
                CustomerMod.Find_All_Offers_Instant_Type(req.body, function (err, Result) {
                    if (err) {
                        res.send(JSON.stringify(Result))
                    } else {
                        res.send(JSON.stringify(Result))
                    }
                })
            }
        })

    });



    /*-------------------------------------- Start Offers APIS---------------------------------------------*/


    /*-------------------------------------- End Offers APIS ---------------------------------------------*/


    app.post('/IP_Testing', function (req, res) {
        const ip = req.clientIp;
        console.log("IP Address");
        console.log(ip);
        res.end(ip);
    });
    app.post('/Customer_Indexing', function (req, res) {
        CustomerMod.Customer_Indexing(req.body, function (result) {
            res.send(result);
        })
    });

    app.post('/Add_Order_Image', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Add_Order_Image(req.body, function (err, Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    });

    app.post('/Report_Generation_From_Query', function (req, res) {
        CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
            if (err) {
                res.send(JSON.stringify(SuperAdminData));
            } else {
                var CustomerMod = new customermod();
                process.stdout.write('\033c');
                CustomerMod.Report_Generation_From_Query(req.body, function (err, Result) {
                    res.send(JSON.stringify(Result));
                    var date = new Date();
                    var AdminID = SuperAdminData._id;
                    var AdminName = SuperAdminData.name;
                    var Whether_God = SuperAdminData.Whether_God;
                    var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');
                    var Message = AdminName + ' have check report for query:->' + req.body.Query + ' on ' + DateTime
                    var Purpose = 'Report -> ' + req.body.Query;
                    var Key = 'Reports';
                    var LogData = new Super_Admin_Dashboard_Logs({
                        AdminID: AdminID,
                        AdminName: AdminName,
                        Message: Message,
                        Purpose: Purpose,
                        Key: Key,
                        Whether_God: Whether_God,
                        created_at: date
                    });
                    LogData.save();
                });
            }
        })
    });

    app.post('/Collection_Views', function (req, res) {
        var Orders = "Orders";
        var Drivers = "Drivers";
        var Customers = "Customers";
        var Cookie = "Cookie";
        var ZONES = "ZONES";
        var OTP = "OTP";
        var Guest_OTP = "Guest OTP";
        var Recursive_Order_MemberShip = "Recursive Order MemberShip";
        var CollectionData = [];
        CollectionData.push({
            Key: 1,
            CollectionName: Orders
        });
        CollectionData.push({
            Key: 2,
            CollectionName: Drivers
        });
        CollectionData.push({
            Key: 3,
            CollectionName: Customers
        });
        CollectionData.push({
            Key: 4,
            CollectionName: Cookie
        });
        CollectionData.push({
            Key: 5,
            CollectionName: ZONES
        });
        CollectionData.push({
            Key: 6,
            CollectionName: OTP
        });
        CollectionData.push({
            Key: 7,
            CollectionName: Guest_OTP
        });
        CollectionData.push({
            Key: 8,
            CollectionName: Recursive_Order_MemberShip
        });
        res.send(new ApiResponce({
            success: true,
            extras: {
                CollectionData: CollectionData
            }
        }));
    });



    app.get('/route', function (req, res) {
        //var host = window.location.href;
        var url = require('url');
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        var pickAddress = query.pickAddress;
        var dropAddress = query.dropAddress;
        var lat = query.lat;
        var lng = query.lng;
        var lat_drop = query.lat_drop;
        var lng_drop = query.lng_drop;
        var bookingType = query.checkval;

        var c1 = cookie.serialize('ez_pickAddress', String(pickAddress), {
            //httpOnly: true,
            maxAge: 60 * 60 * 24 * 1 // 1 week
        });
        var c2 = cookie.serialize('ez_dropAddress', String(dropAddress), {
            //httpOnly: true,
            maxAge: 60 * 60 * 24 * 1 // 1 week
        });
        var c3 = cookie.serialize('ez_lat_drop', String(lat_drop), {
            //httpOnly: true,
            maxAge: 60 * 60 * 24 * 1 // 1 week
        });
        var c4 = cookie.serialize('ez_lng_drop', String(lng_drop), {
            //httpOnly: true,
            maxAge: 60 * 60 * 24 * 1 // 1 week
        });
        var c5 = cookie.serialize('ez_lat', String(lat), {
            //httpOnly: true,
            maxAge: 60 * 60 * 24 * 1 // 1 week
        });
        var c6 = cookie.serialize('ez_lng', String(lng), {
            //httpOnly: true,
            maxAge: 60 * 60 * 24 * 1 // 1 week
        });
        var c7 = cookie.serialize('ez_bookingType', String(bookingType), {
            //httpOnly: true,
            maxAge: 60 * 60 * 24 * 1 // 1 week
        });
        res.setHeader('Set-Cookie', c1);
        res.append('Set-Cookie', c2);
        res.append('Set-Cookie', c3);
        res.append('Set-Cookie', c4);
        res.append('Set-Cookie', c5);
        res.append('Set-Cookie', c6);
        res.append('Set-Cookie', c7);
        res.render('index');
    });




    //Live Track Order Details
    app.post('/Live_Track_Order_Anything_Order', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Live_Track_Order_Anything_Order(req, res, function (err, result) {

        });
    });


    //Recursive Ordering API and Place a Order ,  Note: This API only get Request only from CRON Jobs
    app.post('/Recursive_Ordering', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Recursive_Order_and_Place_Order(function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    });

    //Subscribe Customer Recursive Order

    app.post('/Subscribe_Recursive_Order', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_for_Recursive_Order(req.body, function (err, RecursiveOrderData) {
                    if (err) {
                        res.send(JSON.stringify(RecursiveOrderData));
                    } else {
                        CustomerMod.Subscribe_Recursive_Order(req.body, function (RecursiveOrderStatus) {
                            res.send(JSON.stringify(RecursiveOrderStatus));
                        })
                    }
                })
            }
        })
    });

    //UnSubscribe Customer Recursive Order

    app.post('/Un_Subscribe_Recursive_Order', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_for_Recursive_Order(req.body, function (err, RecursiveOrderData) {
                    if (err) {
                        res.send(JSON.stringify(RecursiveOrderData));
                    } else {
                        CustomerMod.Un_Subscribe_Recursive_Order(req.body, function (RecursiveOrderStatus) {
                            res.send(JSON.stringify(RecursiveOrderStatus));
                        })
                    }
                })
            }
        })
    });
    //UPDATE RECURSIVE ORDER DETAILS
    app.post('/Update_Recursive_Order', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_for_Recursive_Order(req.body, function (err, RecursiveOrderData) {
                    if (err) {
                        res.send(JSON.stringify(RecursiveOrderData));
                    } else {
                        CustomerMod.Check_Validity_Recursive_Order_Update(req.body, function (err, responcer) {
                            if (err) {
                                res.send(JSON.stringify(responcer));
                            } else {
                                CustomerMod.Update_Recursive_Order(req.body, function (RecursiveOrderStatus) {
                                    res.send(JSON.stringify(RecursiveOrderStatus));
                                })
                            }
                        })
                    }
                })
            }
        })
    });

    //This Api use for Getting All Recursive Orders
    app.post('/Find_All_Customer_Recursive_Orders', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                    if (err) {
                        res.send(JSON.stringify(CustomerData));
                    } else {
                        CustomerMod.Find_All_Customer_Recursive_Orders(req.body, function (RecursiveData) {
                            res.send(JSON.stringify(RecursiveData));
                        })
                    }
                })
            }
        })
    });


    //This Api use for Getting All Recursive Orders
    app.post('/Find_All_Recursive_Orders', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Find_All_Recursive_Orders(req.body, function (RecursiveData) {
                    res.send(JSON.stringify(RecursiveData));
                })
            }
        })
    });


    //This API use for Recursive Ordering
    app.post('/Storing_Recursive_Order_Details', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_Validity_Recursive_Order_Storing(req.body, function (err, responcer) {
                    if (err) {
                        res.send(JSON.stringify(responcer));
                    } else {
                        CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                            if (err) {
                                res.send(JSON.stringify(CustomerData));
                            } else {
                                CustomerMod.Verifying_Order_Zone(req.body, function (err, ZoneStatus) {
                                    if (err) {
                                        res.send(JSON.stringify(ZoneStatus));
                                    } else {
                                        CustomerMod.Store_Recursive_Data(req.body, CustomerData, function (RecursiveOrderStatus) {
                                            res.send(JSON.stringify(RecursiveOrderStatus));
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    });





    //This Api use to Display User Order in Details
    app.post('/Get_Order_Details', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                    if (err) {
                        res.send(JSON.stringify(CustomerData));
                    } else {
                        CustomerMod.Check_for_Order(req.body, function (err, OrderData) {
                            if (err) {
                                res.send(JSON.stringify(OrderData));
                            } else {
                                CustomerMod.Get_Order_Details(req.body, CustomerData, OrderData, function (err, Result) {
                                    res.send(JSON.stringify(Result));
                                })
                            }
                        })
                    }
                })
            }
        })
    });
    //Script for Signup date and signup interval
    app.post('/Script_For_Storing_Signup_Date', function (req, res) {
        CustomerMod.Script_For_Storing_Signup_Date(function (Result) {
            res.send(JSON.stringify(Result));
        });
    })

    //Script for Update_Active
    app.post('/Script_Update_Active', function (req, res) {
        CustomerMod.Script_Update_Active(req.body, function (Result) {
            res.send(Result);
        })
    });

    //This Api use for Manual Ordering IN CASE OF CHANGE OF DRIVER FOR ORDER
    app.post('/Manual_Ordering', function (req, res) {
        console.log("Manual Body");
        console.log(req.body);
        var CustomerMod = new customermod();
        CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
            if (err) {
                res.send(JSON.stringify(SuperAdminData));
            } else {
                CustomerMod.Check_for_Order(req.body, function (err, OrderData) {
                    if (err) {
                        console.log("Order Error");
                        res.send(JSON.stringify(OrderData));
                    } else {
                        CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                            if (err) {
                                console.log("Driver Error");
                                res.send(JSON.stringify(DriverData));
                            } else {
                                console.log("Driver and Orders Details Success");
                                var olddriverdata = {};
                                if (OrderData.status == 1 || OrderData.status == 8) {
                                    console.log("Entering 1St statement");
                                    CustomerMod.Manual_Ordering(req.body, OrderData, DriverData, olddriverdata, function (err, Result) {
                                        res.send(JSON.stringify(Result));
                                        var date = new Date();
                                        var AdminID = SuperAdminData._id;
                                        var AdminName = SuperAdminData.name;
                                        var Whether_God = SuperAdminData.Whether_God;
                                        var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');

                                        var Message = AdminName + ' have Manually Routed Order :->' + OrderData.orderseqId + ' to Driver->' + DriverData.name + ' ' + DriverData.lname + '  on ' + DateTime
                                        var Purpose = 'Order ' + OrderData.orderseqId;
                                        var Key = 'Orders';
                                        var LogData = new Super_Admin_Dashboard_Logs({
                                            AdminID: AdminID,
                                            AdminName: AdminName,
                                            Message: Message,
                                            Purpose: Purpose,
                                            Key: Key,
                                            Whether_God: Whether_God,
                                            created_at: date
                                        });
                                        LogData.save();
                                    })
                                } else {
                                    console.log("Entering 2nd statement");
                                    CustomerMod.Check_for_Old_Driver(OrderData, function (err, OldDriverData) {
                                        if (err) {
                                            console.log("Old Driver Error");
                                            res.send(JSON.stringify(OldDriverData));
                                        } else {
                                            olddriverdata = OldDriverData;
                                            CustomerMod.Manual_Ordering(req.body, OrderData, DriverData, olddriverdata, function (err, Result) {
                                                res.send(JSON.stringify(Result));
                                                var date = new Date();
                                                var AdminID = SuperAdminData._id;
                                                var AdminName = SuperAdminData.name;
                                                var Whether_God = SuperAdminData.Whether_God;
                                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');

                                                var Message = AdminName + ' have Manually Routed Order :->' + OrderData.orderseqId + ' to Driver->' + DriverData.name + ' ' + DriverData.lname + '  on ' + DateTime
                                                var Purpose = 'Order ' + OrderData.orderseqId;
                                                var Key = 'Orders';
                                                var LogData = new Super_Admin_Dashboard_Logs({
                                                    AdminID: AdminID,
                                                    AdminName: AdminName,
                                                    Message: Message,
                                                    Purpose: Purpose,
                                                    Key: Key,
                                                    Whether_God: Whether_God,
                                                    created_at: date
                                                });
                                                LogData.save();
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
        })
    });
    app.post('/Search_All_Contacts_Promotional', function (req, res) {
        if (req.body.SearchValue != null && req.body.sortOptions != null) {
            var query = {
                $or: [
                    {
                        Name: {
                            $regex: req.body.SearchValue,
                            $options: "i"
                        }
                    },
                    {
                        PhoneNumber: {
                            $regex: req.body.SearchValue,
                            $options: "i"
                        }
                    },
                    {
                        EmailID: {
                            $regex: req.body.SearchValue,
                            $options: "i"
                        }
                    }
                ]
            };
            var sortOptions = req.body.sortOptions;

            var toSelect = '-_id ContactID Name PhoneNumber EmailID';
            Promotional_Contacts.find(query).select(toSelect).sort(sortOptions).exec(function (err, Result) {
                if (!err) {
                    res.send(new ApiResponce({
                        success: true,
                        extras: {
                            ContactData: Result
                        }
                    }));
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
    });

    app.post('/Find_All_Contacts_Promotional', function (req, res) {
        if (req.body.skip != null && req.body.limit != null && req.body.sortOptions != null) {
            var query = {

            };
            var sortOptions = req.body.sortOptions;
            var toSkip = parseInt(req.body.skip);
            var toLimit = parseInt(req.body.limit);
            var toSelect = '-_id ContactID Name PhoneNumber EmailID';
            Promotional_Contacts.count(query).exec(function (err, Count) {
                if (Count >= 0) {
                    Promotional_Contacts.find(query).select(toSelect).sort(sortOptions).skip(toSkip).limit(toLimit).exec(function (err, Result) {
                        if (!err) {
                            res.send(new ApiResponce({
                                success: true,
                                extras: {
                                    ContactData: Result,
                                    Count: Count
                                }
                            }));
                        }
                    })
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
    });
    app.post('/Store_Contacts_for_Promotional', function (req, res) {
        StoreMod.Store_Contacts_for_Promotional(function (Result) {
            res.send("Job Runned Successfully");
        })
    });

    //This Api use for Searching the Orders of Zone
    app.post('/Searching_All_Orders_Zone', function (req, res) {
        var CustomerMod = new customermod();
        console.log("Zone orders search data " + JSON.stringify(req.body));
        CustomerMod.Searching_All_Orders_Zone(req.body, function (DriverData) {
            res.send(JSON.stringify(DriverData));
        });
    });

    //This Api use for Searching the Drivers
    app.post('/Search_All_Drivers', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Search_All_Drivers(req.body, function (DriverData) {
            res.send(JSON.stringify(DriverData));
        });
    });

    //This Api use for Searching the Drivers of Zone
    app.post('/Search_All_Drivers_of_Zones', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Search_All_Drivers_of_Zones(req.body, function (DriverData) {
            res.send(JSON.stringify(DriverData));
        });
    });
    //This Api use for Retrieving the Drivers
    app.post('/Find_All_Drivers', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Find_All_Drivers(function (DriverData) {
            res.send(JSON.stringify(DriverData));
        });
    });
    app.post('/Script_for_Updating_Driver', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Script_for_Driver_Vendor(req.body, function (err, result) {
            res.send(result);
        })
    })

    //This Api use for Retrieving the Drivers of Zone
    app.post('/Find_All_Drivers_of_Zones', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Find_All_Drivers_of_Zones(req.body, function (DriverData) {
            res.send(JSON.stringify(DriverData));
        });
    });


    app.post('/Edit_Job', function (req, res) {
        if (req.body.orderId != null && req.body.pickAddress != null && req.body.dropAddress != null
            && req.body.pickLatitude != null && req.body.pickLongitude != null && req.body.dropLatitude != null
            && req.body.dropLongitude != null && req.body.bookingType != null && req.body.receiverName != null
            && req.body.receiverPhone != null && req.body.itemName != null && req.body.itemDescription != null
            && req.body.itemImage != null && req.body.deliverycharge != null && req.body.item_actual_cost != null) {
            CustomerMod.Check_for_Order(req.body, function (err, OrderData) {
                if (err) {
                    res.send(JSON.stringify(OrderData));
                } else {
                    CustomerMod.Edit_Job(req.body, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
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
    });
    //Update Order Job Completed if Mobile Fails
    app.post('/Update_Job_Completed_If_Mobile_Fails', function (req, res) {
        if (req.body.orderId != null && req.body.DriverID != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    CustomerMod.Check_for_Order(req.body, function (err, OrderData) {
                        if (err) {
                            res.send(JSON.stringify(OrderData));
                        } else {
                            CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                                if (err) {
                                    res.send(JSON.stringify(DriverData));
                                } else {
                                    CustomerMod.Update_Job_Completed_If_Mobile_Fails(req.body, DriverData, function (Result) {
                                        res.send(JSON.stringify(Result))
                                        var date = new Date();
                                        var AdminID = SuperAdminData._id;
                                        var AdminName = SuperAdminData.name;
                                        var Whether_God = SuperAdminData.Whether_God;
                                        var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');

                                        var Message = AdminName + ' have manually completed Order :->' + OrderData.orderseqId + ' on ' + DateTime
                                        var Purpose = 'Order ' + OrderData.orderseqId;
                                        var Key = 'Orders';
                                        var LogData = new Super_Admin_Dashboard_Logs({
                                            AdminID: AdminID,
                                            AdminName: AdminName,
                                            Message: Message,
                                            Purpose: Purpose,
                                            Key: Key,
                                            Whether_God: Whether_God,
                                            created_at: date
                                        });
                                        LogData.save();
                                    })
                                }
                            })
                        }
                    })
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
    });
    //Check for Super Admin
    app.post('/SuperAdminTesting', function (req, res) {
        CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
            if (err) {
                res.send(JSON.stringify(SuperAdminData));
            } else {
                res.send(JSON.stringify(SuperAdminData));
            }
        })
    })

    //Delete Orders
    app.post('/Delete_Order', function (req, res) {
        if (req.body.orderId != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    CustomerMod.Check_for_Order(req.body, function (err, OrderData) {
                        if (err) {
                            res.send(JSON.stringify(OrderData));
                        } else {
                            CustomerMod.Delete_Order(req.body, function (Result) {
                                res.send(JSON.stringify(Result));
                                var date = new Date();
                                var AdminID = SuperAdminData._id;
                                var AdminName = SuperAdminData.name;
                                var Whether_God = SuperAdminData.Whether_God;
                                var DateTime = moment().utcOffset(330).format('MMMM Do YYYY, h:mm:ss A');

                                var Message = AdminName + ' have deleted Order :->' + OrderData.orderseqId + ' on ' + DateTime
                                var Purpose = 'Order ' + OrderData.orderseqId;
                                var Key = 'Orders';
                                var LogData = new Super_Admin_Dashboard_Logs({
                                    AdminID: AdminID,
                                    AdminName: AdminName,
                                    Message: Message,
                                    Purpose: Purpose,
                                    Key: Key,
                                    Whether_God: Whether_God,
                                    created_at: date
                                });
                                LogData.save();
                            })
                        }
                    })
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
    });
    //Search All Orders
    app.post('/Search_All_Orders_Ezshipp', function (req, res) {
        if (req.body.JOB_TYPE != null && req.body.SearchValue != null) {
            var JOB_TYPE = parseInt(req.body.JOB_TYPE);
            //Type 0 for ALL Orders
            if (JOB_TYPE == 0) {
                CustomerMod.Search_All_Orders_Ezshipp(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
            //Type 1 for Completed Orders
            else if (JOB_TYPE == 1) {
                CustomerMod.Search_All_Completed_Orders_Ezshipp(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
            //Type 2 for Expired Orders
            else if (JOB_TYPE == 2) {
                CustomerMod.Search_All_Expired_Orders_Ezshipp(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
            //Type 3 for Customer Cancelled Orders
            else if (JOB_TYPE == 3) {
                CustomerMod.Search_All_Customer_Cancelled_Orders_Ezshipp(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
            //Type 4 for Driver Cancelled Orders
            else if (JOB_TYPE == 4) {
                CustomerMod.Search_All_Driver_Cancelled_Orders_Ezshipp(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
            //Type 5 for On Going JOBS
            else if (JOB_TYPE == 5) {
                CustomerMod.Search_All_On_Going_JOBS_Ezshipp(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
            //Type 6 for Driver Cancelled Orders
            else if (JOB_TYPE == 6) {
                CustomerMod.Search_All_NEW_JOBS_Ezshipp(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            } else if (JOB_TYPE == 7) {
                CustomerMod.Search_All_Thrash_Orders_Ezshipp(req.body, function (Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        } else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    app.post('/Filtering_Customer_Testing', function (req, res) {
        CustomerMod.Find_All_Customer_Name_Filtering(req.body, function (err, Result) {
            if (!err) {
                res.send(Result);
            }
        })
    });


    app.post('/Find_All_Completed_Orders_Filtering', function (req, res) {
        console.log("All Order Screens Filter body");
        console.log(req.body);
        if (req.body.AdminID != null && req.body.skip != null && req.body.limit != null && req.body.sortOptions != null) {
            CustomerMod.Check_for_AdminID(req.body, function (err, SuperAdminData) {
                if (err) {
                    res.send(JSON.stringify(SuperAdminData));
                } else {
                    AdminMod.Check_Customers_Date_Validation(req.body, function (err, ValidityStatus) {
                        if (err) {
                            res.send(JSON.stringify(ValidityStatus));
                        } else {
                            console.log("Type validation Completed Successfully");
                            CustomerMod.Check_Name_Filter_Validation(req.body, function (err, ValidityStatus) {
                                if (err) {
                                    res.send(JSON.stringify(ValidityStatus));
                                } else {
                                    console.log("Name Validation Completed Successfully");
                                    CustomerMod.Check_PhoneNumber_Filter_Validation(req.body, function (err, ValidityStatus) {
                                        if (err) {
                                            res.send(JSON.stringify(ValidityStatus));
                                        } else {
                                            console.log("Phone Validation Completed Successfully");
                                            CustomerMod.Check_for_Booking_Types_Validation(req.body, function (err, ValidityStatus) {
                                                if (err) {
                                                    res.send(JSON.stringify(ValidityStatus));
                                                } else {
                                                    console.log("Booking Type Validation Completed Successfully");
                                                    CustomerMod.Check_for_Payment_Types_Validation(req.body, function (err, ValidityStatus) {
                                                        if (err) {
                                                            res.send(JSON.stringify(ValidityStatus));
                                                        } else {
                                                            console.log("Payment Type Validation Completed Successfully");
                                                            CustomerMod.Check_for_Pick_Zone_Validation(req.body, function (err, ValidityStatus) {
                                                                if (err) {
                                                                    res.send(JSON.stringify(ValidityStatus));
                                                                } else {
                                                                    console.log("Pick Zone Validation Completed Successfully");
                                                                    CustomerMod.Check_for_Drop_Zone_Validation(req.body, function (err, ValidityStatus) {
                                                                        if (err) {
                                                                            res.send(JSON.stringify(ValidityStatus));
                                                                        } else {
                                                                            console.log("Drop Zone Validation Completed Successfully");
                                                                            CustomerMod.Check_Driver_Filter_Validation(req.body, function (err, ValidityStatus) {
                                                                                if (err) {
                                                                                    res.send(JSON.stringify(ValidityStatus));
                                                                                } else {
                                                                                    console.log("Driver Validation Completed Successfully");
                                                                                    CustomerMod.Find_All_Completed_Orders_Filtering(req.body, function (Result) {
                                                                                        res.send(JSON.stringify(Result));
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
                            })
                        }
                    })
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
    app.post('/Find_All_Orders_Ezshipp_by_Filter', function (req, res) {
        console.log("All Order Filter body");
        console.log(req.body);
        if (req.body.skip != null && req.body.limit != null && req.body.CLEAR_ALL != null) {
            console.log("Entering here")
            if (req.body.CLEAR_ALL == true || req.body.CLEAR_ALL == "true") {
                console.log("this");
                CustomerMod.Find_All_Orders_Ezshipp_without_Filter(req.body, function (Result) {
                    res.send(Result);
                })
            } else if (req.body.CLEAR_ALL == false || req.body.CLEAR_ALL == "false") {
                CustomerMod.Check_New_Ongoing_Completed_Expired_Date_Filter_Validation(req.body, function (err, ValidityStatus) {
                    if (err) {
                        res.send(JSON.stringify(ValidityStatus));
                    } else {
                        CustomerMod.Check_Name_Filter_Validation(req.body, function (err, ValidityStatus) {
                            if (err) {
                                res.send(JSON.stringify(ValidityStatus));
                            } else {
                                CustomerMod.Check_PhoneNumber_Filter_Validation(req.body, function (err, ValidityStatus) {
                                    if (err) {
                                        res.send(JSON.stringify(ValidityStatus));
                                    } else {
                                        CustomerMod.Check_Driver_Filter_Validation(req.body, function (err, ValidityStatus) {
                                            if (err) {
                                                res.send(JSON.stringify(ValidityStatus));
                                            } else {
                                                CustomerMod.Find_All_Orders_Ezshipp_with_Filter(req.body, function (Result) {
                                                    res.send(Result);
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
        }
        else {
            res.send(new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    });
    //Testing key
    app.post('/json_test', function (req, res) {
        var myJson = {

        };
        myJson["Date"] = 1;
        myJson["Name"] = -1;
        myJson["Date"] = 5;
        res.send(myJson);

    });

    app.post('/Completed_Order_Delivery_Reports', function (req, res) {
        if (req.body.skip != null && req.body.limit != null) {
            CustomerMod.Completed_Order_Delivery_Reports(req.body, function (Result) {
                res.send(JSON.stringify(Result));
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

    //Find All Orders
    app.post('/Find_All_Orders_Ezshipp', function (req, res) {
        console.log("Entering body for All Orders");
        console.log(req.body);
        if (req.body.JOB_TYPE != null && req.body.skip != null && req.body.limit != null) {
            CustomerMod.Job_Count_By_Job_Type(req.body, function (err, Count) {
                var JOB_TYPE = parseInt(req.body.JOB_TYPE);
                //Type 0 for ALL Orders
                if (JOB_TYPE == 0) {
                    CustomerMod.Find_All_Orders_Ezshipp(req.body, Count, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
                }
                //Type 1 for Completed Orders
                else if (JOB_TYPE == 1) {
                    CustomerMod.Find_All_Completed_Orders_Ezshipp(req.body, Count, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
                }
                //Type 2 for Expired Orders
                else if (JOB_TYPE == 2) {
                    CustomerMod.Find_All_Expired_Orders_Ezshipp(req.body, Count, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
                }
                //Type 3 for Customer Cancelled Orders
                else if (JOB_TYPE == 3) {
                    CustomerMod.Find_All_Customer_Cancelled_Orders_Ezshipp(req.body, Count, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
                }
                //Type 4 for Driver Cancelled Orders
                else if (JOB_TYPE == 4) {
                    CustomerMod.Find_All_Driver_Cancelled_Orders_Ezshipp(req.body, Count, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
                }
                //Type 5 for On Going JOBS
                else if (JOB_TYPE == 5) {
                    CustomerMod.Find_All_On_Going_JOBS_Ezshipp(req.body, Count, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
                }
                //Type 6 for Driver Cancelled Orders
                else if (JOB_TYPE == 6) {
                    CustomerMod.Find_All_NEW_JOBS_Ezshipp(req.body, Count, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
                } else if (JOB_TYPE == 7) {
                    CustomerMod.Find_All_Thrash_Orders_Ezshipp(req.body, Count, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
                }
                 else if (JOB_TYPE == 8) {
					 CustomerMod.Find_All_Orders_Ezshipp_agent(req.body, Count, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
				}
                else if (JOB_TYPE == 9) {
                     CustomerMod.Find_All_Orders_Ezshipp_Customer(req.body, Count, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
                }
                else if (JOB_TYPE == 10) {
                    CustomerMod.Find_All_Orders_With_COD(req.body, Count, function (Result) {
                        res.send(JSON.stringify(Result));
                    })
                   
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
    });

    //This Api use for Retrieving the Processing Orders of Zone
    app.post('/Find_All_Orders_Zone', function (req, res) {
        console.log("Zone orders data " + JSON.stringify(req.body));
        var CustomerMod = new customermod();
        CustomerMod.Find_All_Orders_Zone(req.body, function (OrderData) {
            console.log("Order Zone Result")
            console.log(JSON.stringify(OrderData));
            res.send(JSON.stringify(OrderData));
        });
    });


    //This Api use for Retrieving the Zones
    app.post('/Find_All_Zones', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Find_All_Zones(function (ZoneData) {
            res.send(JSON.stringify(ZoneData));
        });
    });

    //This Api use for Searching the Orders of Customers
    app.post('/Searching_All_Orders_Customers', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                    if (err) {
                        res.send(JSON.stringify(CustomerData));
                    } else {
                        CustomerMod.Searching_All_Orders_Customers(req.body, CustomerData, function (DriverData) {
                            res.send(JSON.stringify(DriverData));
                        });
                    }
                })
            }
        })
    });




    //FIND ALL CUSTOMER ORDERS
    app.post('/Find_ALL_CUSTOMER_ORDERS', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_for_CustomerID(req.body, function (err, responcer) {
                    if (err) {
                        res.send(JSON.stringify(responcer));
                    } else {
                        console.log("Customer and Session Found")
                        CustomerMod.Find_ALL_CUSTOMER_ORDERS(req.body, function (err, Result) {
                            res.send(JSON.stringify(Result));
                        })
                    }
                })
            }
        })
    });

    //This Api use to Display User Order History
    app.post('/User_Order_History', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_for_CustomerID(req.body, function (err, responcer) {
                    if (err) {
                        res.send(JSON.stringify(responcer));
                    } else {
                        CustomerMod.Find_USER_ORDER_DETAILS(req.body, function (err, Result) {
                            res.send(JSON.stringify(Result));
                        })
                    }
                })
            }
        })
    });

    //This Api is use to Calculate Shiping Price Order Anything
    app.post('/Calculate_Shipping_Price', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_Validity_Pickup_Drop_Zone(req.body, function (err, responcer) {
                    if (err) {
                        res.send(JSON.stringify(responcer));
                    } else {
                        CustomerMod.Calculate_Fair_Place_by_Zones(req.body, function (err, ZoneStatus) {
                            if (err) {
                                res.send(JSON.stringify(ZoneStatus));
                            } else {
                                res.send(JSON.stringify(ZoneStatus));
                            }
                        })
                    }
                })
            }
        })
    });

    //This Api is use to check the Pickup and Drop Zone for Order Zone
    app.post('/Validating_Pickup_Drop_Zone', function (req, res) {
        var CustomerMod = new customermod();
        console.log("validating body");
        console.log(req.body);
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_Validity_Pickup_Drop_Zone(req.body, function (err, responcer) {
                    if (err) {
                        res.send(JSON.stringify(responcer));
                    } else {
                        CustomerMod.Verifying_Order_Zone(req.body, function (err, ZoneStatus) {
                            if (err) {
                                res.send(JSON.stringify(ZoneStatus));
                            } else {
                                res.send(JSON.stringify(ZoneStatus));
                            }
                        })
                    }
                })
            }
        })
    });

    //This API use for Bulk Order
    app.post('/Bulk_Order', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Send_Order_for_Bulk_Order(req.body, function (err, Result) {
                    res.send(JSON.stringify(Result));
                    CustomerMod.Remove_Unwanted_Bulk_Order_Images(req.body, function (err, Result2) {
                        console.log("Bulk Images Removed " + JSON.stringify(Result2));
                    })
                })
            }
        })
    });
    //This API use for Searching the Customer
    app.post('/Search_Customers', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.SearchCustomer(req.body, function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    });

    //This


    //Vendor Bulk Order Processing
    app.post('/Vendor_Bulk_Order_Processing', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_for_VendorOrderID(req.body, function (err, VendorOrderData) {
            if (err) {
                res.send(JSON.stringify(VendorOrderData));
            } else {
                CustomerMod.Vendor_Bulk_Order_Processing(req.body, VendorOrderData, function (err, Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        });
    });

    //Vendor Order Storing for Order Processing
    app.post('/Find_All_Orders_of_Bulk_Order', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_for_VendorOrderID(req.body, function (err, VendorOrderData) {
            if (err) {
                res.send(JSON.stringify(VendorOrderData));
            } else {
                CustomerMod.Find_All_Orders_of_Bulk_Order(req.body, function (err, Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        });
    });

    app.post('/Find_All_Vendor_COMPLETED_Bulk_Orders', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Find_All_Vendor_COMPLETED_Bulk_Orders(req.body, function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    });

    app.post('/Find_All_Vendor_Bulk_Orders', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Find_All_Vendor_Bulk_Orders(req.body, function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    });

    app.post('/Script_Removing_Vendors', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.RemoveVendorOrdersandDetails(function (Result) {
            res.send(Result);
        })
    });
    //Vendor Order Storing for Order Processing
    app.post('/Vendor_Storing', function (req, res) {
        var CustomerMod = new customermod();
        var IP_Address = req.body.IP_Address;
        console.log(JSON.stringify(req.body));
        var OrderData = req.body.OrderData;
        console.log("orderdata" + OrderData.length);
        console.log(OrderData)
        var jsonparse = JSON.parse(OrderData);
        console.log(jsonparse);
        console.log(jsonparse.length);
        console.log("uday");
        console.log(jsonparse[0].drop_flat_house_details);
        // res.send(new ApiResponce({ success: true, extras: { Status:'Your Orders are Processing' }}););

        CustomerMod.Check_for_Vendor(req.body, function (err, VendorData) {
            if (err) {
                res.send(JSON.stringify(VendorData));
            } else {
                CustomerMod.Check_for_VendorID_Subscription(req.body, function (err, VendorSubscription) {
                    if (err) {
                        res.send(JSON.stringify(VendorSubscription));
                    } else {
                        res.send(new ApiResponce({
                            success: true,
                            extras: {
                                Status: 'Your Orders are Processing'
                            }
                        }));
                        CustomerMod.Vendor_Order_Processing(req.body, VendorData, IP_Address, function (err, Result) {
                            // res.send(JSON.stringify(Result));
                        })
                    }
                });
            }
        });
    });
    app.get("/testingjson", function (req, res) {
        var result = CustomerMod.TestingJson();
        res.send(JSON.stringify(result));
    });
    //Script running forn Zonal Default Pricing
    app.post('/Script_for_Updating_Default_Zonal_Pricing', function (req, res) {
        console.log("Entering API")
        CustomerMod.Script_for_Updating_Default_Zonal_Pricing(function (Result) {
            res.send(JSON.stringify(Result));
        })
    })

    //Add or Update Zonal Price
    app.post('/ADD_UPDATE_ZONAL_PRICING', function (req, res) {
        CustomerMod.ADD_UPDATE_ZONAL_PRICING(req.body, function (Result) {
            res.send(JSON.stringify(Result));
        })
    });

    //Find All Zone Pricing of Individual Zone
    app.post('/Find_Individual_Zones_Pricing', function (req, res) {
        CustomerMod.Find_Individual_Zones_Pricing(req.body, function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    });

    //Find ALL City Zones
    app.post('/Find_All_Zones_of_City', function (req, res) {
        CustomerMod.Find_All_Zones_of_City(req.body, function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    });
    //Find ALl Zonal Pricing
    app.post('/Find_All_Zones_Pricing', function (req, res) {
        CustomerMod.Find_All_Zones_Pricing(req.body, function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    });
    //Find ALl Cities
    app.post('/Find_All_Cities', function (req, res) {
        CustomerMod.Find_All_Cities(req.body, function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    });
    //Find ALl Countries
    app.post('/Find_All_Countries', function (req, res) {
        CustomerMod.Find_All_Countries(function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    })

    //Find All Vendors Recent Prices
    app.post('/Find_All_Vendor_Recent_Prices', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_for_VendorID(req.body, function (err, VendorData) {
            if (err) {
                res.send(JSON.stringify(VendorData));
            } else {
                CustomerMod.Find_All_Vendor_Recent_Prices(req.body, function (err, Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    });

    //This Api Use to Update Vendor Price
    app.post('/Update_Vendor_Price', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_for_VendorID(req.body, function (err, VendorData) {
            if (err) {
                res.send(JSON.stringify(VendorData));
            } else {
                CustomerMod.Update_Vendor_Price(req.body, VendorData, function (err, Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    });

    //This Api Use to Update Vendor Profile
    app.post('/Update_Vendor_Profile', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_for_VendorID(req.body, function (err, VendorStatus) {
            if (err) {
                res.send(JSON.stringify(VendorStatus));
            } else {
                CustomerMod.Update_Vendor_Profile(req.body, function (err, Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    });

    //This Api USe to Active the InActive Vendor Account
    app.post('/Vendor_Do_Active', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_for_VendorID(req.body, function (err, VendorStatus) {
            if (err) {
                res.send(JSON.stringify(VendorStatus));
            } else {
                CustomerMod.Vendor_Do_Active(req.body, function (err, Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    });
    //This Api USe to InActive the Active Vendor Account
    app.post('/Vendor_Do_InActive', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_for_VendorID(req.body, function (err, VendorStatus) {
            if (err) {
                res.send(JSON.stringify(VendorStatus));
            } else {
                CustomerMod.Vendor_Do_Inactive(req.body, function (err, Result) {
                    res.send(JSON.stringify(Result));
                })
            }
        })
    });
    //This Api use to Search All Vendors
    app.post('/Search_All_Vendors', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Search_All_Vendors(req.body, function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    });


    //This Api use to Fetch All Vendors
    app.post('/Find_All_Vendors', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Find_All_Vendors(function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    });


    //This Api USe to InActive the Active Vendor Account
    app.post('/Vendor_Update_Driver', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_for_VendorID(req.body, function (err, VendorStatus) {
            if (err) {
                res.send(JSON.stringify(VendorStatus));
            } else {
                CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                    if (err) {
                        res.send(JSON.stringify(DriverData));
                    } else {
                        CustomerMod.Vendor_Update_Driver(req.body, function (err, Result) {
                            res.send(JSON.stringify(Result));
                        })
                    }
                })
            }
        })
    });
    //This API use for Registering Vendor
    app.post('/Register_Vendor', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_Validity_Vendor_Registration(req.body, function (err, ValidityStatus) {
            if (err) {
                res.send(JSON.stringify(ValidityStatus));
            } else {
                CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                    if (err) {
                        res.send(JSON.stringify(CustomerData));
                    } else {
                        CustomerMod.Check_for_CustomerID_Vendor(req.body, function (err, VendorStatus) {
                            if (err) {
                                res.send(JSON.stringify(VendorStatus));
                            } else {
                                CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
                                    if (err) {
                                        res.send(JSON.stringify(DriverData));
                                    } else {
                                        CustomerMod.Register_Vendor(req.body, function (err, Result) {
                                            res.send(JSON.stringify(Result));
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    });

    //This API use for Bulk Order Vendor
    app.post('/Bulk_Order_Vendor', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Send_Order_for_Bulk_Order_Vendor(req.body, function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    });

    app.post('/Cancel_Order', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                    if (err) {
                        res.send(JSON.stringify(CustomerData));
                    } else {
                        CustomerMod.Check_for_Order(req.body, function (err, OrderData) {
                            if (err) {
                                res.send(JSON.stringify(OrderData));
                            } else {
                                CustomerMod.cancelOrder(req.body, function (err, Result) {
                                    res.send(JSON.stringify(Result));
                                })
                            }
                        })
                    }
                })
            }
        })
    });


    app.post('/Find_All_Customer_Cancellation_Reasons', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Find_All_Customer_Cancellation_Reasons(function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    });


    app.post('/Order_Anything_Vendor', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_Validity_Orders_Anything_Vendors(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer));
            } else {
                CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                    if (err) {
                        res.send(JSON.stringify(CustomerData));
                    } else {
                        CustomerMod.Getting_LatLong_Pickup_Vendor(req.body, function (err, PickData) {
                            if (err) {
                                res.send(JSON.stringify(PickData));
                            } else {
                                CustomerMod.Getting_LatLong_Drop_Vendor(req.body, function (err, DropData) {
                                    if (err) {
                                        res.send(JSON.stringify(DropData));
                                    } else {
                                        CustomerMod.Verifying_Order_Zone_Vendor(PickData, DropData, function (err, ZoneStatus) {
                                            if (err) {
                                                res.send(JSON.stringify(ZoneStatus));
                                            } else {
                                                CustomerMod.Placing_Vendor_Order(req.body, PickData, DropData, function (err, OrderStatus) {
                                                    res.send(JSON.stringify(OrderStatus));
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
    });


    //SCRIPT for Solving Payment Type Issue
    app.post('/Script_For_Solving_Payment_type_Issue', function (req, res) {
        CustomerMod.Script_For_Solving_Payment_type_Issue(function (Result) {
            res.send(JSON.stringify(Result));
        })
    })

    //SCRIPT for Storing Customer Details for Existing orders
    app.post('/Script_For_Storing_Customer_Details_in_Orders', function (req, res) {
        CustomerMod.Script_For_Storing_Customer_Details_in_Orders(function (Result) {
            res.send(JSON.stringify(Result));
        })
    })

    //SCRIPT for Deleted false for Existing Orders
    app.post('/Script_For_sTORING_DELETE_FALSE', function (req, res) {
        CustomerMod.Script_For_sTORING_DELETE_FALSE(function (Result) {
            res.send(JSON.stringify(Result));
        })
    })
    //SCRIPT for storing flat details and landmark and collection type for existing orders
    app.post('/Script_For_sTORING_landmark_flat_collectiontype', function (req, res) {
        CustomerMod.Script_For_sTORING_landmark_flat_collectiontype(function (Result) {
            res.send(JSON.stringify(Result));
        })
    })

    //SCRIPT for Account Status 1 for Existing Orders
    app.post('/Script_For_Customer_Status', function (req, res) {
        CustomerMod.Script_For_Customer_Status(function (Result) {
            res.send(JSON.stringify(Result));
        })
    })
    //SCRIPT for Account Status 1 for Existing Orders
    app.post('/Script_For_Customer_Premium_false', function (req, res) {
        CustomerMod.Script_For_Customer_Premium_false(function (Result) {
            res.send(JSON.stringify(Result));
        })
    })
    //This API To Vendor Order Processing to Particular Vendor
    app.post('/Vendor_Single_Ordering', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_for_Driver(req.body, function (err, DriverData) {
            if (err) {
                res.send(JSON.stringify(DriverData));
            } else {
                CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                    if (err) {
                        res.send(JSON.stringify(CustomerData));
                    } else {
                        CustomerMod.Find_and_Update_Order_Sequence(function (err, SequenceNumber) {
                            CustomerMod.Storing_Customer_Order_Details(req.body, CustomerData, SequenceNumber, function (err, Result1) {
                                var OrderData = Result1.extras.OrderDetails;
                                CustomerMod.Vendor_Zone_Processing_Allocating_Driver(req.body, OrderData, DriverData, function (err, Result) {
                                    res.send(JSON.stringify(Result));
                                })
                            })
                        })
                    }
                })
            }
        })
    });
    //This API to ORDER ANYTHING
    app.post('/Order_Anything', function (req, res) {
        console.log("Order Body");
        console.log(req.body);
        var CustomerMod = new customermod();
        CustomerMod.Check_Validity_Orders_Anything(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer));
            } else {
                CustomerMod.Check_for_RazorPay_Payment_Successfully(req.body, function (err, PaymentStatus) {
                    if (err) {
                        console.log("Payment Fails");
                        res.send(JSON.stringify(PaymentStatus));
                    } else {
                        console.log("Payment Success");
                        CustomerMod.Check_for_CustomerID(req.body, function (err, CustomerData) {
                            if (err) {
                                res.send(JSON.stringify(CustomerData));
                            } else {
                                CustomerMod.Shipping_Price_Validation_Offers(req.body, CustomerData, function (err, ShippingPriceStatus) {
                                    if (err) {
                                        console.log("Shipping Error");
                                        res.send(JSON.stringify(ShippingPriceStatus));
                                    } else {
                                        console.log("Shipping Status Success");
                                        CustomerMod.Find_and_Update_Order_Sequence(function (err, SequenceNumber) {
                                            CustomerMod.Storing_Customer_Order_Details(req.body, CustomerData, SequenceNumber, function (err, Result1) {
                                                var OrderData = Result1.extras.OrderDetails;
                                                CustomerMod.Zone_Finding_of_Order(req.body, OrderData, function (err, Result2) {
                                                    if (err) {
                                                        res.send(JSON.stringify(Result2));
                                                    } else {
                                                        res.send(JSON.stringify(Result2));
                                                        if (req.body.itemImage != null || req.body.itemImage != "") {
                                                            if (req.body.Bulk_Order == null) {
                                                                CustomerMod.Remove_Unwanted_Order_Images(req.body, function (err, Result3) {
                                                                    console.log("Order Anything Images Removed " + JSON.stringify(Result3));

                                                                })
                                                            } else {

                                                            }
                                                        }
                                                        if (req.body.OFFER_CODE_APPLIED == true || req.body.OFFER_CODE_APPLIED == "true") {
                                                            CustomerMod.Update_Offer_Functionality_On_Order(req.body, OrderData, function (err, OfferFunctions) {
                                                                if (parseInt(req.body.OfferType) == 4) {
                                                                    CustomerMod.Check_for_Customer_Offer_Lottery(req.body, function (err, LotteryStatus) {
                                                                        if (err) {
                                                                            //Not Found Customer Lottery
                                                                            CustomerMod.Register_Customer_Lottery(req.body, function (err, RegisterStatus) {

                                                                            })
                                                                        } else {
                                                                            //Found Customer Lottery
                                                                            CustomerMod.Update_Customer_Lottery(req.body, function (err, UpdatedStatus) {

                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            })
                                        });
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    });

    //This Api use to  Changed Customer Password
    app.post('/Update_Customer_Password', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_for_CustomerID(req.body, function (err, responcer) {
                    if (err) {
                        res.send(JSON.stringify(responcer));
                    } else {
                        CustomerMod.Update_Customer_Password(req.body, function (err, Result) {
                            res.send(JSON.stringify(Result));
                        })
                    }
                })
            }
        })
    });

    //This Api use for First Time Changed Customer Password
    app.post('/First_Time_Changed_Customer_Password', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.CheckSessionID(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer))
            } else {
                CustomerMod.Check_for_CustomerID(req.body, function (err, responcer) {
                    if (err) {
                        res.send(JSON.stringify(responcer));
                    } else {
                        CustomerMod.Update_Customer_Password(req.body, function (err, Result) {
                            res.send(JSON.stringify(Result));
                        })
                    }
                })
            }
        })
    });

    //This Api use for forgot Password
    app.post('/Customer_Forgot_Password', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_Validity_Forgot_Password(req.body, function (err, ValidityStatus) {
            if (err) {
                res.send(JSON.stringify(ValidityStatus));
            } else {
                CustomerMod.Check_Whether_PhoneNumber_Exist(req.body, function (err, CustomerData) {
                    if (err) {
                        res.send(JSON.stringify(CustomerData));
                    } else {
                        var CustomerID = CustomerData._id;
                        var First_name = CustomerData.First_name;
                        CustomerMod.findCustomerForgotPasswordTries(req.body, function (err, ForgotPasswordStatus) {
                            if (err) {
                                res.send(JSON.stringify(ForgotPasswordStatus));
                            } else {
                                CustomerMod.RegisterCustomerForgotPasswordTries(req.body, function (err, ForgotPasswordStore) {
                                    CustomerMod.GenerateRandomPasswordandUpdateItinSchema(req.body, CustomerID, First_name, function (err, Result) {
                                        res.send(JSON.stringify(Result));
                                        CustomerMod.DeleteCustomerPasswordTries(req.body, function (err, RemovePassword) {

                                        })
                                    })
                                })
                            }
                        })
                    }
                })
            }
        })
    });

    //This Api use  for Login
    app.post('/Customer_Signin', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_Validity_Signin(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer));
            } else {
                CustomerMod.findCustomerPasswordTries(req.body, function (err, responcer) {
                    if (err) {
                        res.send(JSON.stringify(responcer));
                    } else {
                        CustomerMod.Check_Whether_PhoneNumber_Exist(req.body, function (err, CustomerData) {
                            if (err) {
                                res.send(JSON.stringify(CustomerData));
                            } else {
                                CustomerMod.CustomerSignIn(req.body, CustomerData, function (err, LoginStatus) {
                                    if (err) {
                                        res.send(JSON.stringify(LoginStatus));
                                    } else {
                                        CustomerMod.Check_Customer_Session(CustomerData, function (err, SessionStatus) {
                                            if (err) {
                                                CustomerMod.RegisteringCustomerSession(CustomerData, function (err, SessionData) {
                                                    res.send(JSON.stringify(SessionData));
                                                })
                                            } else {
                                                CustomerMod.UpdatingCustomerSession(CustomerData, function (err, SessionData) {
                                                    res.send(JSON.stringify(SessionData));
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
    });

    router.get('/Mail_Testing', function (req, res) {
        var MailgunMod = new mailgunmod();
        res.send(JSON.stringify('Mail Send Successfully'));
        var msg = {
            "email": 'uday@evontex.com',
            "customerName": 'Srinivas',
            "orderId": 'E00002912',
            "driverName": 'Uday' + ' ' + 'Kumar',
            "cancellationReason": 'Driver Not Accepting',
            "date": 'Jun 7th 2017',
            "time": '5:44 PM',
            "Name": 'Uday' + ' ' + 'Kumar',
            "storeName": 'Tesla Diagnostics',
            "Link": "https://api.ezshipp.com/reset_password/5934eb2b0997e851087e72de"
        }
        MailgunMod.Testing(msg, function (Result) {

        })
    });
    //This Api use to check Referal code exist
    app.post('/Check_Referral_Code', function (req, res) {
        CustomerMod.Check_for_Customer_Referral_Code(req.body, function (err, Result) {
            if (err) {
                res.send(JSON.stringify(Result));
            } else {
                res.send(JSON.stringify(Result));
            }
        })
    });

    //This Api use to Create User Signup
    app.post('/Customer_Sign_Up', function (req, res) {
        var CustomerMod = new customermod();

        var MailgunMod = new mailgunmod();

        CustomerMod.Check_Validity_Sign_Up(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer));
            } else {
                CustomerMod.Check_Whether_Phone_Registered(req.body, function (err, responcer) {
                    if (err) {
                        res.send(JSON.stringify(responcer));
                    } else {
                        CustomerMod.Check_Whether_Email_Registered(req.body, function (err, responcer) {
                            if (err) {
                                res.send(JSON.stringify(responcer));
                            } else {
                                CustomerMod.Check_Whether_Phone_Registered_Guest_LogiN(req.body, function (err, GuestData) {
                                    if (err) {
                                        CustomerMod.Generate_Random_Referal_Code(function (err, referral_code) {
                                            if (!err) {
                                                CustomerMod.Customer_Signup_Update(req.body, GuestData, referral_code, function (err, Result, CustomerData) {
                                                    res.send(JSON.stringify(Result));
                                                    MailgunMod.sendEmailCustomerRegistration(req.body.Email, req.body.First_name, referral_code, function (err, EmailStatus) {
                                                        if (req.body.referral_code_given == true || req.body.referral_code_given == 'true') {
                                                            CustomerMod.Generate_Random_Referal_Offer_Code_And_Generate_Offer_and_Send_Mail(req.body, CustomerData, function (err, Result) {
                                                                console.log(Result);
                                                            })
                                                        }
                                                    })
                                                });
                                            }
                                        })
                                    } else {
                                        CustomerMod.Find_and_Update_CustomerSeqID(function (err, SequenceNumber) {
                                            CustomerMod.Generate_Random_Referal_Code(function (err, referral_code) {
                                                if (!err) {
                                                    CustomerMod.Customer_Signup(req.body, SequenceNumber, referral_code, function (err, Result, CustomerData) {
                                                        res.send(JSON.stringify(Result));
                                                        MailgunMod.sendEmailCustomerRegistration(req.body.Email, req.body.First_name, referral_code, function (err, EmailStatus) {
                                                            if (req.body.referral_code_given == true || req.body.referral_code_given == 'true') {
                                                                CustomerMod.Generate_Random_Referal_Offer_Code_And_Generate_Offer_and_Send_Mail(req.body, CustomerData, function (err, Result) {
                                                                    console.log(Result);
                                                                })
                                                            }
                                                        })
                                                    });
                                                }
                                            })
                                        })
                                    }
                                })
                            }
                        })
                    }
                });
            }
        })
    });

    //This API use to Validate OTP of Latest
    app.post('/ValidateLatestOTP', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_Validity_Validating_OTP(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer));
            } else {
                CustomerMod.ValidateLatestOTP(req.body, function (err, Result) {
                    if (err) {
                        res.send(JSON.stringify(Result));
                    } else {
                        res.send(JSON.stringify(Result));
                        CustomerMod.RemoveLatestFalseOTPofPhone(req.body, function (err, responcer) {

                        })
                    }
                })
            }
        })
    });

    //This Api use  for Login
    app.post('/Guest_Login_Validating_OTP', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_Validity_Guest_Login_Validation(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer));
            } else {
                CustomerMod.Check_Whether_PhoneNumber_Exist_Guest_Login(req.body, function (err, CustomerData) {
                    if (err) {
                        res.send(JSON.stringify(CustomerData));
                    } else {
                        CustomerMod.findCustomerPasswordTries(req.body, function (err, responcer) {
                            if (err) {
                                res.send(JSON.stringify(responcer));
                            } else {
                                CustomerMod.Customer_Guest_Login(req.body, CustomerData, function (err, LoginStatus) {
                                    if (err) {
                                        res.send(JSON.stringify(LoginStatus));
                                    } else {
                                        CustomerMod.Check_Customer_Session(CustomerData, function (err, SessionStatus) {
                                            if (err) {
                                                CustomerMod.RegisteringCustomerSession(CustomerData, function (err, SessionData) {
                                                    res.send(JSON.stringify(SessionData));
                                                })
                                            } else {
                                                CustomerMod.UpdatingCustomerSession(CustomerData, function (err, SessionData) {
                                                    res.send(JSON.stringify(SessionData));
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
    });

    app.post('/Random_Number', function (req, res) {
        res.send(Result)
    })

    //This Api use to Generate Guest Login OTP
    app.post('/Generate_OTP_Guest_Login', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.Check_Validity_Guest_Login(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer));
            } else {
                CustomerMod.Check_Whether_Phone_Registered_Guest_Login(req.body, function (err, responcer) {
                    if (err) {
                        res.send(JSON.stringify(responcer));
                    } else {
                        CustomerMod.UpdatePhoneOTPFalseGuestLogin(req.body, function (err, responcer) {
                            if (responcer.success) {
                                CustomerMod.CheckforPhoneNumberCountGuestLogin(req.body, function (err, responcer) {
                                    if (err) {
                                        res.send(JSON.stringify(responcer));
                                    } else {
                                        CustomerMod.GenerateOTPandStoreITinSchemaGuestLogin(req.body, function (err, Result, OTP) {
                                            res.send(JSON.stringify(Result));
                                            if (Result.success) {
                                                CustomerMod.Check_Whether_Phone_Number_Guest_Login(req.body, function (err, responcer) {
                                                    if (err) {
                                                        //Updating Guest OTP
                                                        CustomerMod.Update_Guest_OTP(req.body, OTP, function (err, GuestSingup) {
                                                            console.log(JSON.stringify(GuestSingup));
                                                        })
                                                    } else {
                                                        //Saving Guest
                                                        CustomerMod.Find_and_Update_Customer_Sequence(function (err, SequenceNumber) {
                                                            CustomerMod.Guest_Signup(req.body, SequenceNumber, OTP, function (err, GuestSingup) {
                                                                console.log(JSON.stringify(GuestSingup));
                                                            })
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        });
                    }
                })
            }
        });
    });

    //This API use to Generate OTP
    app.post('/GenerateOTP', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.FindCookiePhoneRegistered(req.body, function (err, responcer) {
            if (err) {
                res.send(JSON.stringify(responcer));
            } else {
                CustomerMod.Check_Validity_Generating_OTP(req.body, function (err, responcer) {
                    if (err) {
                        res.send(JSON.stringify(responcer));
                    } else {
                        CustomerMod.Check_Whether_Phone_Registered(req.body, function (err, responcer) {
                            if (err) {
                                res.send(JSON.stringify(responcer));
                            } else {
                                CustomerMod.UpdatePhoneOTPFalse(req.body, function (err, responcer) {
                                    if (responcer.success) {
                                        CustomerMod.CheckforPhoneNumberCount(req.body, function (err, responcer) {
                                            if (err) {
                                                res.send(JSON.stringify(responcer));
                                            } else {
                                                CustomerMod.GenerateOTPandStoreITinSchema(req.body, function (err, Result) {
                                                    res.send(JSON.stringify(Result));
                                                    if (Result.success) {
                                                        CustomerMod.RegisterCookiePhoneToken(req.body, function (err, CookiePhoneData) {

                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                });
                            }
                        })
                    }
                });
            }
        })
    });

    //This API use to Generate Cookie for Security
    app.get('/Cookie_Creation', function (req, res) {
        var CustomerMod = new customermod();
        CustomerMod.GeneratingtheSessionCookie(function (err, Result) {
            res.send(JSON.stringify(Result));
        })
    });

    router.post('/', function (req, res) {
        res.render('index');
    });


    /*--------------------------------------End of API's------------------------------------------------*/

    app.post('/ViewCustomerProfile', function (req, res, callback) {
        var CustomerMod = new customermod();
        CustomerMod.ViewCustomerProfileData(req.body, function (err, Result) {
            if (err) {
                res.send(JSON.stringify(err));
            } else {
                CustomerMod.FilterProfileValues(Result, function (err, ProfileResult) {
                    res.send(JSON.stringify(ProfileResult));
                })
            }

        })
    });

    app.post('/UpdateCustomerProfile', function (req, res, callback) {
        var CustomerMod = new customermod();
        var userData = req.body;
        CustomerMod.ViewCustomerProfileData(req.body, function (err, Result) {
            if (err) {
                res.send(JSON.stringify(Result));
            } else {
                CustomerMod.UpdateCustomerProfileData(Result, userData, function (err, Result) {
                    res.send(JSON.stringify(Result));
                })
            }

        })

    });
};