var crypto = require('crypto');
var uuid = require('uuid');
var rand = require('csprng');
var ApiResponce = require("../Models/Apiresponce.js");
var ApiMessages = require("../Models/Apimessages.js");
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
var Ezshipp_Branch = require("../Models/Ezshipp_Branch.js");
var Ezshipp_Employee = require("../Models/Ezshipp_Employee.js");
var Ezshipp_Employee_Salaries_Logs = require("../Models/Ezshipp_Employee_Salaries_Logs.js");
var Ezshipp_Employee_Expenses = require("../Models/Ezshipp_Employee_Expenses.js");
var Ezshipp_Employee_Paid_Salaries = require("../Models/Ezshipp_Employee_Paid_Salaries.js");
var Ezshipp_Employee_Attendance = require("../Models/Ezshipp_Employee_Attendance.js");
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
var customermod = require('../CoreModules/customermod.js'); // Setting the Path for Customer Modules
var CustomerMod = new customermod();
var uuid = require('uuid');
var async = require('async');
var moment = require('moment');
var cron = require('cron');

var sync = require('sync');
var Ezshipp_Employee_Attendance = require("../Models/Ezshipp_Employee_Attendance.js");
var Ezshipp_Employee_Attendance_Request = require("../Models/Ezshipp_Employee_Attendance_Request.js");

exports.Reject_Employee_Leave = function (values, callback) {
    var query = {
        RequestID: values.RequestID
    };
    var changes = {
        $set: {
            Request_Status: 3
        }
    };
    Ezshipp_Employee_Attendance_Request.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Leave Rejected"
                }
            }));
        }
    })
};


exports.Approve_Employee_Leave = function (values, callback) {
    var query = {
        RequestID: values.RequestID
    };
    var changes = {
        $set: {
            Request_Status: 2
        }
    };
    Ezshipp_Employee_Attendance_Request.update(query, changes, function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Leave Approved"
                }
            }));
        }
    })
};

exports.Check_for_Employee_Leave_Request = function (values, callback) {
    var query = {
        RequestID: values.RequestID
    };
    Ezshipp_Employee_Attendance_Request.findOne(query).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result != null) {
                callback(false, Result);
            } else if (Result == null) {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.LEAVE_REQUEST_NOT_FOUND
                    }
                }));
            }
        }
    })
};

exports.List_All_Employee_Leave_Request = function (values, callback) {
    var query = {

    };
    var sortOptions = {
        created_at: -1
    }
    if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
        sortOptions = values.sortOptions;
    };
    var toSkip = parseInt(values.skip);
    var toLimit = parseInt(values.limit);
    Ezshipp_Employee_Attendance_Request.count(query).exec(function (err, Count) {
        if (Count >= 0) {
            Ezshipp_Employee_Attendance_Request.find(query).sort(sortOptions).skip(toSkip).limit(toLimit).exec(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    var RequestData = [];
                    async.eachSeries(Result, function (item, resp) {
                        RequestData.push({
                            RequestID: item.RequestID,
                            EmployeeID: item.EmployeeID,
                            Ezshipp_BranchID: item.Ezshipp_BranchID,
                            Ezshipp_Branch_Name: item.Ezshipp_Branch_Name,
                            Employee_Role: item.Employee_Role,
                            DriverID: item.DriverID,
                            Employee_Company_ID: item.Employee_Company_ID,
                            Employee_Name: item.Employee_Name,
                            Employee_PhoneNumber: item.Employee_PhoneNumber,
                            Employee_Email: item.Employee_Email,
                            Request_Status: item.Request_Status,
                            LeaveType: item.LeaveType,
                            Request_Description: item.Request_Description,
                            Request_From: moment(item.Request_From).utcOffset(330).format("DD/MM/YYYY"),
                            Request_To: moment(item.Request_To).subtract(1, 'day').utcOffset(330).format("DD/MM/YYYY"),
                            created_at: moment(item.created_at).utcOffset(330).format("MMM DD YYYY h:mm A"),
                            updated_at: moment(item.updated_at).utcOffset(330).format("MMM DD YYYY h:mm A")
                        });
                        resp();
                    }, function (err) {
                        callback(new ApiResponce({
                            success: true,
                            extras: {
                                Count: Count,
                                RequestData: RequestData
                            }
                        }));
                    })
                }
            })
        }
    })
}

//Check Whether Employee Attendance Already Exist
exports.Check_Whether_Employee_Attendance_Exist = function (values, callback) {
    console.log("Entering This");

    var from_moment = moment(values.date, 'DD/MM/YYYY').subtract(330, 'minutes');
    var to_moment = moment(values.date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days');
    Ezshipp_Employee_Attendance.findOne({
        EmployeeID: values.EmployeeID,
        Attendance_Date: {
            $gte: from_moment,
            $lt: to_moment
        }
    }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            console.log(Result);
            if (Result == null) {
                callback(false);
            } else if (Result != null) {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Employee_Attendance_Already_Present_for_Day
                    }
                }));
            }
        }
    })
};
//Check Whether Employee Attendance Already Exist
exports.Check_Whether_Employee_Attendance_Exist_Remove = function (values, callback) {

    var from_moment = moment(values.date, 'DD/MM/YYYY').subtract(330, 'minutes');
    var to_moment = moment(values.date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days');
    Ezshipp_Employee_Attendance.findOne({
        EmployeeID: values.EmployeeID,
        Attendance_Date: {
            $gte: from_moment,
            $lt: to_moment
        }
    }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result == null) {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Employee_Attendance_Not_Found
                    }
                }));
            } else if (Result != null) {
                callback(false, Result);
            }
        }
    })
};
exports.Remove_Employee_Attendance = function (values, EmployeeAttendanceData, callback) {

    var from_moment = moment(values.date, 'DD/MM/YYYY').subtract(330, 'minutes');
    var to_moment = moment(values.date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days');
    var query = {
        _id: EmployeeAttendanceData._id
    }
    Ezshipp_Employee_Attendance.remove(query).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Employee Attendance Removed Successfully"
                }
            }));
        }
    })
}

//Add the Employee Attendance
exports.Add_Employee_Attendance = function (values, EmployeeData, callback) {

    var AttendanceID = uuid();
    var Attendance_Date = moment(values.date, 'DD/MM/YYYY').add(150, 'minutes');
    var date = new Date();

    var AttendanceData = new Ezshipp_Employee_Attendance({
        AttendanceID: AttendanceID,
        Ezshipp_BranchID: EmployeeData.Ezshipp_BranchID,
        Ezshipp_Branch_Name: EmployeeData.Ezshipp_Branch_Name,
        Employee_Role: EmployeeData.Employee_Role,
        EmployeeID: EmployeeData.EmployeeID,
        Employee_Company_ID: EmployeeData.Employee_Company_ID,
        Employee_Name: EmployeeData.Employee_Name,
        Employee_PhoneNumber: EmployeeData.Employee_PhoneNumber,
        Employee_Email: EmployeeData.Employee_Email,
        Attendance_Date: Attendance_Date,
        created_at: date,
        updated_at: date
    });
    AttendanceData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Employee Attendance Added Successfully"
                }
            }));
        }
    })
}

//Fetch All Employee Attendance for Day
exports.Find_All_Employee_Attendance_Day = function (values, callback) {

    var from_moment = moment(values.date, 'DD/MM/YYYY').subtract(330, 'minutes');
    var to_moment = moment(values.date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days');
    var toSkip = parseInt(values.skip);
    Ezshipp_Employee.count({ Status: true }).exec(function (err, Count) {
        if (Count >= 0) {
            Ezshipp_Employee.find({ Status: true }).skip(toSkip).limit(10).exec(function (err, Result) {
                if (!err) {
                    var EmployeeAttendanceData = [];
                    async.eachSeries(Result, function (item, resp) {
                        var query = {
                            EmployeeID: item.EmployeeID,
                            Attendance_Date: {
                                $gte: from_moment,
                                $lt: to_moment
                            }
                        }
                        Ezshipp_Employee_Attendance.findOne(query).exec(function (err, EmployeeStatus) {
                            if (!err) {
                                var Whether_Present;
                                if (EmployeeStatus == null) {
                                    Whether_Present = false;
                                } else if (EmployeeStatus != null) {
                                    Whether_Present = true;
                                }
                                EmployeeAttendanceData.push({
                                    Ezshipp_BranchID: item.Ezshipp_BranchID,
                                    Ezshipp_Branch_Name: item.Ezshipp_Branch_Name,
                                    EmployeeID: item.EmployeeID,
                                    Employee_Role: item.Employee_Role,
                                    Employee_Company_ID: item.Employee_Company_ID,
                                    Employee_Name: item.Employee_Name,
                                    Employee_PhoneNumber: item.Employee_PhoneNumber,
                                    Employee_Email: item.Employee_Email,
                                    Whether_Present: Whether_Present
                                })
                                resp();
                            }
                        })
                    }, function (err) {
                        callback(false, new ApiResponce({
                            success: true,
                            extras: {
                                EmployeeAttendanceData: EmployeeAttendanceData,
                                Count: Count
                            }
                        }));
                    })
                }
            })
        }
    })
};

//Find All Employee Attendance between Dates
exports.Find_All_Employee_Attendance_Count = function (values, callback) {

    var sync = require('sync');
    function CountEmployeeFunction(callback) {
        process.nextTick(function () {
            var query = {
                Status: true
            }
            Ezshipp_Employee.count(query).exec(function (err, Result) {
                callback(null, Result);
            })

        })
    }
    function EmployeeDataFunction(values, callback) {
        process.nextTick(function () {
            var toSkip = parseInt(values.skip);
            var query = {
                Status: true
            };
            Ezshipp_Employee.find(query).sort({ Employee_Name: 1 }).skip(toSkip).limit(10).exec(function (err, Result) {
                callback(null, Result);
            })

        })
    }
    function EmployeeAttendanceCount(values, EmployeeData, callback) {
        process.nextTick(function () {
            var from_moment = moment(values.from_date, 'DD/MM/YYYY').subtract(330, 'minutes');
            var to_moment = moment(values.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days');
            var query = {
                EmployeeID: EmployeeData.EmployeeID,
                Attendance_Date: {
                    $gte: from_moment,
                    $lt: to_moment
                }
            }
            Ezshipp_Employee_Attendance.count(query).exec(function (err, Result) {
                callback(null, Result);
            })
        })
    }
    sync(function () {
        var from_moment = moment(values.from_date, 'DD/MM/YYYY').subtract(330, 'minutes');
        var to_moment = moment(values.to_date, 'DD/MM/YYYY').subtract(330, 'minutes').add(1, 'days');
        var Day_Between_Dates = Math.abs(from_moment.diff(to_moment, 'days'));
        var Count = CountEmployeeFunction.sync(null);
        var Result = EmployeeDataFunction.sync(null, values);
        var EmployeeAttendanceData = [];
        async.eachSeries(Result, function (item, resp) {
            var AttendanceCount = EmployeeAttendanceCount.sync(null, values, item);
            EmployeeAttendanceData.push({
                Ezshipp_BranchID: item.Ezshipp_BranchID,
                Ezshipp_Branch_Name: item.Ezshipp_Branch_Name,
                EmployeeID: item.EmployeeID,
                Employee_Role: item.Employee_Role,
                Employee_Company_ID: item.Employee_Company_ID,
                Employee_Name: item.Employee_Name,
                Employee_PhoneNumber: item.Employee_PhoneNumber,
                Employee_Email: item.Employee_Email,
                AttendanceCount: AttendanceCount
            })
            resp();
        }, function (err) {
            callback(false, new ApiResponce({
                success: true,
                extras: {
                    EmployeeAttendanceData: EmployeeAttendanceData,
                    Count: Count,
                    Day_Between_Dates: Day_Between_Dates
                }
            }));
        })
    })
}

//Check for Salary Month Validity when Edit Employee Salary
exports.Check_Employee_Salary_Month_Exist_or_Not = function (values, EmployeeData, SalaryData, callback) {

    if (parseInt(values.Year_Number) == SalaryData.Year_Number) {
        if (parseInt(values.Month_Number) == SalaryData.Month_Number) {
            callback(false);
        } else {
            Ezshipp_Employee_Paid_Salaries.findOne({ EmployeeID: values.EmployeeID, Month_Number: values.Month_Number, Year_Number: values.Year_Number }).exec(function (err, SalaryStatus) {
                if (err) {
                    console.log(err);
                } else {
                    if (SalaryStatus == null) {
                        callback(false);
                    } else if (SalaryStatus != null) {
                        callback(true, new ApiResponce({
                            success: false,
                            extras: {
                                msg: ApiMessages.Employee_Salary_Already_Paid_At_this_Month
                            }
                        }));
                    }
                }
            })
        }
    } else {
        Ezshipp_Employee_Paid_Salaries.findOne({ EmployeeID: values.EmployeeID, Month_Number: values.Month_Number, Year_Number: values.Year_Number }).exec(function (err, SalaryStatus) {
            if (err) {
                console.log(err);
            } else {
                if (SalaryStatus == null) {
                    callback(false);
                } else if (SalaryStatus != null) {
                    callback(true, new ApiResponce({
                        success: false,
                        extras: {
                            msg: ApiMessages.Employee_Salary_Already_Paid_At_this_Month
                        }
                    }));
                }
            }
        })
    }
}
//Check for Employee Ezshipp
exports.Check_for_Employee = function (values, callback) {

    Ezshipp_Employee.findOne({ EmployeeID: values.EmployeeID }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result == null) {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.EMPLOYEE_NOT_FOUND
                    }
                }));
            } else {
                callback(false, Result);
            }
        }
    })
};
//Check for Employee Expense ID
exports.Check_for_Employee_Expense = function (values, callback) {

    Ezshipp_Employee_Expenses.findOne({ ExpenseID: values.ExpenseID }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result == null) {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.EMPLOYEE_EXPENSE_NOT_FOUND
                    }
                }));
            } else {
                callback(false, Result);
            }
        }
    })
};
//Update Employee Expense
exports.Edit_Employee_Expense = function (values, callback) {

    var query = {
        ExpenseID: values.ExpenseID
    };
    var date = new Date();
    var changes = {
        Amount: values.Amount,
        Payment_Type: values.Payment_Type,
        TransactionID: values.TransactionID,
        Purpose_Type: values.Purpose_Type,
        Comment: values.Comment,
        Month_Number: values.Month_Number,
        Year_Number: values.Year_Number,
        updated_at: date
    }
    var multiplicity = {
        multi: false
    }
    Ezshipp_Employee_Expenses.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: "Employee Expense Updated Successfully"
                }
            }));
        }
    })
}
//Add Employee Expenses
exports.Add_Employee_Expenses = function (values, EmployeeData, callback) {

    var ExpenseID = uuid();
    var date = new Date();
    var ExpenseData = new Ezshipp_Employee_Expenses({
        ExpenseID: ExpenseID,
        EmployeeID: values.EmployeeID,
        Employee_Company_ID: EmployeeData.Employee_Company_ID,
        Employee_Name: EmployeeData.Employee_Name,
        Employee_PhoneNumber: EmployeeData.Employee_PhoneNumber,
        Employee_Email: EmployeeData.Employee_Email,
        Amount: values.Amount,
        Payment_Type: values.Payment_Type,
        TransactionID: values.TransactionID,
        Purpose_Type: values.Purpose_Type,
        Comment: values.Comment,
        Month_Number: values.Month_Number,
        Year_Number: values.Year_Number,
        created_at: date,
        updated_at: date
    });
    ExpenseData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(new ApiResponce({
                success: true,
                extras: {
                    Status: "Employee Expense Added Successfully"
                }
            }));
        }
    });
};
//Find Employee Image URL
exports.Find_Employee_Image_for_Driver = function (EmployeeData) {

    var Employee_Image_Url = "";
    var S3URL = config.S3URL;
    Ezshipp_Employee.findOne({ EmployeeID: EmployeeData.EmployeeID }).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            if (Result == null) {
                console.log("Employee Not found");
            } else {
                if (Result.Employee_Image_Available == true) {
                    Employee_Image_Url = S3URL + Result.Employee_Image_Url;
                } else {
                    Employee_Image_Url = ""
                }
                return Employee_Image_Url;
            }
        }
    })
}

//Store Driver Details
exports.Store_Driver_Details = function (values, EmployeeData, DriverSequenceNumber, Employee_Image_Url, callback) {

    var date = new Date();
    var datetime = DateTime();
    var Password = RandomNumber();
    console.log("Password " + Password);
    var DriverData = new Drivers({
        "driverseqId": DriverSequenceNumber,
        "name": values.Employee_Name,
        "lname": "",
        "countryCode": "+91",
        "email": values.Employee_Email,
        "password": Password,
        "phone": values.Employee_PhoneNumber,
        "profilePic": Employee_Image_Url,
        "created_dt": datetime,
        "LastOnline": '',
        "businessid": values.OperatorID,
        "depoId": values.ZoneID,
        "acc_status": 3,
        "app_ids": [],
        "Devices": [],
        "Ezshipp_Branch_Details_Available": true,
        "Ezshipp_BranchID": EmployeeData.Ezshipp_BranchID,
        "Ezshipp_Branch_Name": EmployeeData.Ezshipp_Branch_Name,
        "EmployeeID": EmployeeData.EmployeeID
    })
    DriverData.save(function (err, Result) {
        if (err) {
            console.log("Driver Storing Error");
            console.log(err);
        } else {
            callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: 'Driver Created Successfully'
                }
            }), Password);
        }
    })
}
exports.DateTime = function () {

    var fulldate = new Date();
    var moment = require('moment');
    var date = moment().utcOffset(330).format('YYYY-MM-DD');
    var time = moment().utcOffset(330).format('H:mm:ss');

    var datetime = date + ' ' + time;
    return datetime;
};
//This Api is use for Removing the AWS Image based on key
exports.DeleteAWSImage = function (fname, callback) {

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
//This is use to upload to AWS 
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
//Add Employee Image Details
exports.Add_Employee_Image_Details = function (values, EmployeeData, callback) {

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
    base64ImageToFile(values.Employee_Image_Picture, os.tmpDir() + '', fname, function (err, imgPath) {
        nfile = os.tmpDir() + '/' + fname + '.jpeg';
        fname = fname + '.jpeg';
        // Upload to the S3 Bucket
        UploadImageAWS(nfile, fname, function (err, responcer) {
            var query = {
                "EmployeeID": EmployeeData.EmployeeID
            }
            var changes = {
                $set: {
                    Employee_Image_Available: true,
                    Employee_Image_Url: fname
                }
            }
            var multiplicity = {
                multi: false
            }
            Ezshipp_Employee.update(query, changes, multiplicity).exec(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    return callback(false, new ApiResponce({
                        success: true,
                        extras: {
                            Status: "Employee Image Stored Succesfully"
                        }
                    }));
                }
            })
        })
    })
};
//Add Employee Address Details
exports.Add_Employee_Address_Proof_Details = function (values, EmployeeData, callback) {

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
    base64ImageToFile(values.Address_Proof_Picture, os.tmpDir() + '', fname, function (err, imgPath) {
        nfile = os.tmpDir() + '/' + fname + '.jpeg';
        fname = fname + '.jpeg';
        // Upload to the S3 Bucket
        UploadImageAWS(nfile, fname, function (err, responcer) {
            var query = {
                "EmployeeID": EmployeeData.EmployeeID
            }
            var changes = {
                $set: {
                    Address_Proof_Available: true,
                    Address_Proof_Image: fname
                }
            }
            var multiplicity = {
                multi: false
            }
            Ezshipp_Employee.update(query, changes, multiplicity).exec(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    return callback(false, new ApiResponce({
                        success: true,
                        extras: {
                            Status: "Employee Address Proof Stored Succesfully"
                        }
                    }));
                }
            })
        })
    })
};
//Add Pan Card
exports.Add_Pan_Card_Details = function (values, EmployeeData, callback) {

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
    base64ImageToFile(values.Pan_Card_Image, os.tmpDir() + '', fname, function (err, imgPath) {
        nfile = os.tmpDir() + '/' + fname + '.jpeg';
        fname = fname + '.jpeg';
        // Upload to the S3 Bucket
        UploadImageAWS(nfile, fname, function (err, responcer) {
            var query = {
                "EmployeeID": EmployeeData.EmployeeID
            }
            var changes = {
                $set: {
                    Pan_Card_Available: true,
                    Pan_Card_Number: values.Pan_Card_Number,
                    Pan_Card_Image: fname
                }
            }
            var multiplicity = {
                multi: false
            }
            Ezshipp_Employee.update(query, changes, multiplicity).exec(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    return callback(false, new ApiResponce({
                        success: true,
                        extras: {
                            Status: "Employee Pan Card Stored Succesfully"
                        }
                    }));
                }
            })
        })
    })
};
//Add Driver License Details
exports.Add_Driver_License_Details = function (values, EmployeeData, callback) {

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
    base64ImageToFile(values.Driving_License_Picture, os.tmpDir() + '', fname, function (err, imgPath) {
        nfile = os.tmpDir() + '/' + fname + '.jpeg';
        fname = fname + '.jpeg';
        // Upload to the S3 Bucket
        UploadImageAWS(nfile, fname, function (err, responcer) {
            var query = {
                "EmployeeID": EmployeeData.EmployeeID
            }
            var moment = require('moment');
            var expr_date = moment(values.Driving_License_Expiry_Date, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
            var changes = {
                $set: {
                    Driving_License_Available: true,
                    Driving_License_Expiry_Date: expr_date,
                    Driving_License_Image: fname
                }
            }
            var multiplicity = {
                multi: false
            }
            Ezshipp_Employee.update(query, changes, multiplicity).exec(function (err, Result) {
                if (err) {
                    console.log(err);
                } else {
                    return callback(false, new ApiResponce({
                        success: true,
                        extras: {
                            Status: "Employee Driving License Stored Succesfully"
                        }
                    }));
                }
            })
        })
    })
};
//Check Employee Image Validity
exports.Check_Employee_Image_Validity = function (values, callback) {

    if (values.Employee_Image_Available == true || values.Employee_Image_Available == "true") {
        if (values.Employee_Image_Picture != null) {
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
};
//Check Driver Email Exist or not in Driver
exports.Check_Driver_Email_Exist_or_Not = function (values, callback) {

    Drivers.findOne({ email: values.Employee_Email }).exec(function (err, Result) {
        if (Result) {
            callback(true);
        } else {
            callback(false);
        }
    })
}
//Generating the Random Number for Password or OTP
exports.RandomNumber = function () {

    var charBank = "123456789";
    var fstring = '';
    for (var i = 0; i < 6; i++) {
        fstring += charBank[parseInt(Math.random() * 10)];
    }
    return parseInt(fstring);
};


//Check Employee Driving License Image Validity
exports.Check_Employee_Driving_License_Image_Validity = function (values, callback) {

    if (values.Driving_License_Available == true || values.Driving_License_Available == "true") {
        if (values.Driving_License_Expiry_Date != null && values.Driving_License_Picture != null) {
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
};
//Check Employee Address Proof Image Validity
exports.Check_Employee_Address_Proof_Image_Validity = function (values, callback) {

    if (values.Address_Proof_Available == true || values.Address_Proof_Available == "true") {
        if (values.Address_Proof_Picture != null) {
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
};
//Check Employee Pan Card Image Validity
exports.Check_Employee_Pan_Card_Image_Validity = function (values, callback) {

    if (values.Pan_Card_Available == true || values.Pan_Card_Available == "true") {
        if (values.Pan_Card_Image != null && values.Pan_Card_Number != null) {
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
};
//Check Role Validity
exports.Check_Employee_Role_Validity = function (values, callback) {

    var Employee_Role = parseInt(values.Employee_Role);
    if (Employee_Role == 1) { //driver
        if (values.ZoneID != null && values.OperatorID != null) {
            CustomerMod.Check_for_OperatorID(values, function (err, OperatorData) {
                if (err) {
                    console.log("operator not found")
                    callback(true, OperatorData);
                } else {
                    CustomerMod.Check_for_ZoneID(values, function (err, ZoneData) {
                        if (err) {
                            console.log("zone not found")
                            callback(true, ZoneData);
                        } else {
                            console.log("both found")
                            callback(false);
                        }
                    })
                }
            })
        } else {
            console.log("operator zone not found");
            callback(true, new ApiResponce({
                success: false,
                extras: {
                    msg: ApiMessages.ENTER_ALL_TAGS
                }
            }));
        }
    } else { //other than driver
        console.log("Not a driver");
        callback(false);
    }

}
exports.Remove_Employee = function (values, EmployeeData, callback) {

    var date = new Date();

    var query = {
        EmployeeID: values.EmployeeID
    }
    var changes = {
        Status: false,
        updated_at: date
    }
    var multiplicity = {
        multi: false
    };
    Ezshipp_Employee.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: 'Employee Removed Successfully'
                }
            }))
        }
    })
}
exports.Edit_Employee_Information = function (values, EmployeeData, callback) {

    var moment = require('moment');
    var roletype;
    var date = new Date();
    if (parseInt(EmployeeData.Employee_Role) == 1) {
        roletype = "Driver "
    } else if (parseInt(EmployeeData.Employee_Role) == 2) {
        roletype = "Employee "
    }
    var dob = moment(values.Employee_DOB, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
    var dojoin = moment(values.Employee_Date_of_Joining, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
    var query = {
        EmployeeID: values.EmployeeID
    }
    var changes = {
        Employee_Name: values.Employee_Name,
        Employee_Gender: values.Employee_Gender,
        Employee_Email: values.Employee_Email,
        Employee_PhoneNumber: values.Employee_PhoneNumber,
        Employee_Address: values.Employee_Address,
        Employee_DOB: dob,
        Employee_Date_of_Joining: dojoin,
        updated_at: date
    }
    var multiplicity = {
        multi: false
    };
    Ezshipp_Employee.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: roletype + ' Updated Successfully'
                }
            }))
        }
    })
}
//Edit Employee Salary 
exports.Edit_Employee_Salary_Details = function (values, EmployeeData, callback) {

    var moment = require('moment');
    var roletype;
    var date = new Date();
    if (parseInt(EmployeeData.Employee_Role) == 1) {
        roletype = "Driver "
    } else if (parseInt(EmployeeData.Employee_Role) == 2) {
        roletype = "Employee "
    }
    var query = {
        EmployeeID: values.EmployeeID
    }
    var changes = {
        Employee_Basic_Salary: values.Employee_Basic_Salary,
        Employee_PF: values.Employee_PF,
        Employee_TDS: values.Employee_TDS,
        updated_at: date
    }
    var multiplicity = {
        multi: false
    };
    Ezshipp_Employee.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: roletype + 'Salary Details Updated Successfully'
                }
            }))
            var SalaryData = new Ezshipp_Employee_Salaries_Logs({
                EmployeeID: values.EmployeeID,
                Employee_Basic_Salary: values.Employee_Basic_Salary,
                Employee_PF: values.Employee_PF,
                Employee_TDS: values.Employee_TDS,
                created_at: date,
                updated_at: date
            })
            SalaryData.save();
        }
    })
}
//Edit Employee Bank Details 
exports.Edit_Employee_Bank_Details = function (values, EmployeeData, callback) {

    var moment = require('moment');
    var roletype;
    var date = new Date();
    if (parseInt(EmployeeData.Employee_Role) == 1) {
        roletype = "Driver "
    } else if (parseInt(EmployeeData.Employee_Role) == 2) {
        roletype = "Employee "
    }
    var query = {
        EmployeeID: values.EmployeeID
    }
    var changes = {
        Bank_Account_No: values.Bank_Account_No,
        Bank_Name: values.Bank_Name,
        Bank_IFSC_No: values.Bank_IFSC_No,
        updated_at: date
    }
    var multiplicity = {
        multi: false
    };
    Ezshipp_Employee.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: roletype + 'Bank Details Updated Successfully'
                }
            }))
        }
    })
}
//Store Driver Information and Profile Setting False
exports.Store_Driver_Information_When_Accepting = function (DriverData, Employee_Company_ID, callback) {

    var date = new Date();
    var EmployeeID = uuid();
    var moment = require('moment');
    var Employee_Name = String(DriverData.name) + ' ' + String(DriverData.lname);
    var EmployeeData = new Ezshipp_Employee({
        Employee_Role: 1,
        EmployeeID: EmployeeID,
        Employee_Company_ID: Employee_Company_ID,
        Employee_Name: Employee_Name,
        Employee_Gender: 1,
        Employee_Email: DriverData.email,
        Employee_PhoneNumber: DriverData.phone,
        Status: true,
        Complete_Profile_Set: false,
        created_at: date,
        updated_at: date
    });
    EmployeeData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback('Driver Information Stored Successfully ');
            console.log("Driver Information Stored in Employee" + DriverData.driverseqId);
        }
    })
}
exports.Edit_Employee_Branch = function (values, EmployeeData, Ezshipp_Branch_Data, callback) {

    var moment = require('moment');
    var roletype;
    var date = new Date();
    if (parseInt(EmployeeData.Employee_Role) == 1) {
        roletype = "Driver "
    } else if (parseInt(EmployeeData.Employee_Role) == 2) {
        roletype = "Employee "
    }

    var query = {
        EmployeeID: values.EmployeeID
    }
    var changes = {
        Ezshipp_BranchID: Ezshipp_Branch_Data.Ezshipp_BranchID,
        Ezshipp_Branch_Name: Ezshipp_Branch_Data.Ezshipp_Branch_Name,
        updated_at: date
    }
    var multiplicity = {
        multi: false
    };
    Ezshipp_Employee.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: roletype + 'Branch Updated Successfully'
                }
            }))
        }
    })
}
//Store Employee Details
exports.Store_Employee_Details = function (values, Ezshipp_Branch_Data, Employee_Company_ID, callback) {

    var date = new Date();
    var EmployeeID = uuid();
    var moment = require('moment');
    var roletype;
    if (parseInt(values.Employee_Role) == 1) {
        roletype = "Driver "
    } else if (parseInt(values.Employee_Role) == 2) {
        roletype = "Employee "
    }
    var dob = moment(values.Employee_DOB, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
    var dojoin = moment(values.Employee_Date_of_Joining, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
    var EmployeeData = new Ezshipp_Employee({
        Ezshipp_BranchID: Ezshipp_Branch_Data.Ezshipp_BranchID,
        Ezshipp_Branch_Name: Ezshipp_Branch_Data.Ezshipp_Branch_Name,
        Employee_Role: values.Employee_Role,
        EmployeeID: EmployeeID,
        Employee_Company_ID: Employee_Company_ID,
        Employee_Name: values.Employee_Name,
        Employee_Gender: values.Employee_Gender,
        Employee_Email: values.Employee_Email,
        Employee_PhoneNumber: values.Employee_PhoneNumber,
        Employee_Address: values.Employee_Address,
        Employee_DOB: dob,
        Employee_Basic_Salary: values.Employee_Basic_Salary,
        Employee_PF: values.Employee_PF,
        Employee_TDS: values.Employee_TDS,
        Employee_Date_of_Joining: dojoin,
        Bank_Account_No: values.Bank_Account_No,
        Bank_Name: values.Bank_Name,
        Bank_IFSC_No: values.Bank_IFSC_No,
        Status: true,
        Complete_Profile_Set: true,
        created_at: date,
        updated_at: date
    });
    EmployeeData.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: roletype + 'Added Successfully'
                }
            }), Result);
            var SalaryData = new Ezshipp_Employee_Salaries_Logs({
                EmployeeID: EmployeeID,
                Employee_Basic_Salary: values.Employee_Basic_Salary,
                Employee_PF: values.Employee_PF,
                Employee_TDS: values.Employee_TDS,
                created_at: date,
                updated_at: date
            })
            SalaryData.save();
        }
    });
}
//Updating Employee Data and Profile Setting True
exports.Update_Employee_Data_and_Profile_Setting = function (values, Ezshipp_Branch_Data, EmployeeData, callback) {

    var date = new Date();
    var moment = require('moment');
    var dob = moment(values.Employee_DOB, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
    var dojoin = moment(values.Employee_Date_of_Joining, 'DD/MM/YYYY').subtract(330, 'minutes').toDate();
    var query = {
        EmployeeID: values.EmployeeID
    }
    var changes = {
        Ezshipp_BranchID: Ezshipp_Branch_Data.Ezshipp_BranchID,
        Ezshipp_Branch_Name: Ezshipp_Branch_Data.Ezshipp_Branch_Name,
        Employee_Address: values.Employee_Address,
        Employee_DOB: dob,
        Employee_Basic_Salary: values.Employee_Basic_Salary,
        Employee_PF: values.Employee_PF,
        Employee_TDS: values.Employee_TDS,
        Employee_Date_of_Joining: dojoin,
        Bank_Account_No: values.Bank_Account_No,
        Bank_Name: values.Bank_Name,
        Bank_IFSC_No: values.Bank_IFSC_No,
        Complete_Profile_Set: true,
        updated_at: date
    }
    var multiplicity = {
        multi: false
    };
    Ezshipp_Employee.update(query, changes, multiplicity).exec(function (err, Result) {
        if (err) {
            console.log(err)
        }
        else {
            callback(false, new ApiResponce({
                success: true,
                extras: {
                    Status: 'Driver Profile Setted Successfully'
                }
            }), EmployeeData);
            var SalaryData = new Ezshipp_Employee_Salaries_Logs({
                EmployeeID: values.EmployeeID,
                Employee_Basic_Salary: values.Employee_Basic_Salary,
                Employee_PF: values.Employee_PF,
                Employee_TDS: values.Employee_TDS,
                created_at: date,
                updated_at: date
            })
            SalaryData.save();
        }
    })

}
//Check Whether Employee Phone Number Registered
exports.Check_Whether_Employee_PhoneNumber_Exist = function (values, callback) {

    if (values.Employee_PhoneNumber != null) {
        Ezshipp_Employee.findOne({ Employee_PhoneNumber: values.Employee_PhoneNumber }).exec(function (err, Result) {
            if (Result) {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Employee_Phone_Number_Already_Exist
                    }
                }));
            } else {
                callback(false);
            }
        })
    } else {
        return callback(error, new ApiResponce({
            success: false,
            extras: {
                msg: ApiMessages.ENTER_ALL_TAGS
            }
        }));
    }
}
//Check Whether Employee Phone Number Registered
exports.Check_Whether_Employee_Email_Exist = function (values, callback) {

    if (values.Employee_Email != null) {
        Ezshipp_Employee.findOne({ Employee_Email: values.Employee_Email }).exec(function (err, Result) {
            if (Result) {
                callback(true, new ApiResponce({
                    success: false,
                    extras: {
                        msg: ApiMessages.Employee_Email_ID_Already_Exist
                    }
                }));
            } else {
                callback(false);
            }
        })
    } else {
        return callback(error, new ApiResponce({
            success: false,
            extras: {
                msg: ApiMessages.ENTER_ALL_TAGS
            }
        }));
    }
}
//Check for Ezshipp Branch Name
exports.Check_Whether_Ezshipp_Branch_Name_Exist_Or_Not = function (Ezshipp_Branch_Name, callback) {

    Ezshipp_Branch.findOne({ Ezshipp_Branch_Name: Ezshipp_Branch_Name }).exec(function (err, Ezshipp_Branch_Data) {
        if (err) {
            console.log(err);
            console.log("Case 1");
        } else {
            if (Ezshipp_Branch_Data == null) {
                console.log("Case 2");
                callback(true, {});
            } else if (Ezshipp_Branch_Data != null) {
                console.log("Case 3");
                callback(false, Ezshipp_Branch_Data);
            }
        }
    })
}
exports.Create_Ezshipp_Branch = function (values, Ezshipp_Branch_Name, callback) {

    var BranchID = uuid();
    var date = new Date();
    var Ezshipp_Branch_Data = new Ezshipp_Branch({
        Ezshipp_BranchID: BranchID,
        Ezshipp_Branch_Name: Ezshipp_Branch_Name,
        Status: true,
        created_at: date,
        updated_at: date
    })
    Ezshipp_Branch_Data.save(function (err, Result) {
        if (err) {
            console.log(err);
        } else {
            callback(false, 'Ezshipp Branch Added Successfully', Result);
        }
    })
}
