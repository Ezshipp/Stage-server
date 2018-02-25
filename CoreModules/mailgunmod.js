var mailgunmod = function () {

    this.crypto = require('crypto');
    this.uuid = require('uuid');
    this.rand = require('csprng');
    this.ApiResponce = require("../Models/Apiresponce.js");
    this.ApiMessages = require("../Models/Apimessages.js");
    this.Config = require("../Config/config.js");
    this.config = require("../Config/config.js");
    this.Counters = require('../Models/Counters.js');
    this.Customers = require('../Models/Customers.js');
    this.randomstring = require("randomstring");
    var config = this.config;
    this.mailgun = require('mailgun-js')({ apiKey: config.mailgun.api_key, domain: config.mailgun.domain });
};
var config = require("../Config/config.js");
var Config = require("../Config/config.js");
var mailgun = require('mailgun-js')({ apiKey: config.mailgun.api_key, domain: config.mailgun.domain });

//Send Registration Success to Customer after Signup
mailgunmod.prototype.Mail_Testing = function (callback) {
    var htmlbody = ''
    var data = {
        from: config.mailgun.frommail,
        to: 'uday@evontex.com',
        subject: "Premium Customer!",
        html: 'Hi How are u'
    };
    mailgun.messages().send(data, function (error, body) {
        console.log(error);
        console.log(body);
        return callback(false, body);
    });
};
//Send Registration Success to Customer after Signup
mailgunmod.prototype.sendEmail_to_Super_Admin_Forgot_Password = function (SuperAdminData, OTP, callback) {
    var me = this;
    var htmlbody = '<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head>' +
        '  <title>Registration Successful</title>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1">' +
        '  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">' +
        '    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">' +
        '  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>' +
        '  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>' +
        '</head>' +
        '<body style="margin: 0 !important;-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; padding: 0 !important;">' +
        '<div class="container-fluid">' +
        '  <div class="row">' +
        '    <div class="col-xs-12 col-sm-6 col-md-6 col-sm-offset-3 col-md-offset-3">' +
        '    <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 15px 0;width:100%;background-color: #1e1f25" class="logo">' +
        '                        <a href="https://www.ezshipp.com" target="_blank">' +
        '                            <img alt="Logo" src="https://s3.amazonaws.com/ezshippimages/ezshipp_new.png" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;width: 120px;" border="0">' +
        '                        </a>' +
        '                </td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td bgcolor="#ffffff" align="center" style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">Forgot Password</td>' +
        '                </tr>' +
        '                <tr>' +
        '                <td><hr style="width: 200px;"/></td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 20px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;">Hi ' + SuperAdminData.name + ',</td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 10px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;text-indent:10%;">' +
        '                       Your Password has been reset to ' + OTP + ' . Please use your new Password for Login.<br><br> Cheers, <br>  Team ezshipp</td>' +
        '                        </tr>' +
        '                <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 30px 0px 10px 0px;font-size:12px;">' +
        '                                <a href="https://play.google.com/store/apps/details?id=com.ezshipp.customer.app" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/androidstore.jpg"></a>        <a href="https://itunes.apple.com/us/app/ezshipp/id1233108964" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/applestore.gif"></a>' +
        '                                </td>' +
        '                        </tr>' +
        '                    </table>   ' +
        '               </td> ' +
        '            </tr>' +
        '            <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-left: -30px;">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 10px 0px 10px 0px;font-size:18px;">' +
        '                                <p style="margin-left: 60px">Follow Us</p>' +
        '                            </td>' +
        '                            </tr>' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 5px 0px 30px 0px;font-size:18px;">' +
        '                                <ul style="display:inline;">' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/fblogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/twittlogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/gplogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/lkinlogo.jpg" /></li>' +
        '                                </ul>' +
        '                    </td>' +
        '                    </tr>' +
        '                    </table>' +
        '                    </td>' +
        '                    </tr>' +
        '             <tr>' +
        '                 <td>' +
        '                     <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 20px 0;width:100%;background-color: #1e1f25;font-size: 12px;color: #fff; line-height: 18px; font-family: Helvetica, Arial, sans-serif;" class="logo">' +
        '                    1ST FLOOR, KARAN ARCADE,<br>OPP SBI, MAXCURE HOSPITAL LANE, <br>PATRIKA NAGAR, HI TECH CITY, HYDERABAD - 500081.' +
        '                   <br /><br />' +
        '                    You are receiving this mail from  <a href="https://www.ezshipp.com" target="_blank" style="text-decoration: none;"><span style="font-weight: bold;color: #ee9b0a;font-size: 15px;">ezshipp private ltd.</span></a> <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>All rights Reserved.' +
        '                    <br /><br />' +
        '                    <a href="https://ezshipp.com/privacy_policy.html" target="_blank"  style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Privacy Policy</a>' +
        '                        <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>' +
        '                        <a href="https://ezshipp.com/cancellation.html" target="_blank" style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Cancellations and Refunds</a>' +
        '                </td>' +
        '                </tr>' +
        '            </table>' +
        '            </td>' +
        '            </tr>' +
        '     </table>' +
        '     </div>' +
        '   </div>' +
        '</div>' +
        '</body>' +
        '</html>';
    var data = {
        from: me.config.mailgun.frommail,
        to: SuperAdminData.email,
        subject: "Password Credentials!!!",
        html: htmlbody
    };
    me.mailgun.messages().send(data, function (error, body) {
        return callback(false, body);
    });
};
//Send Registration Success to Customer after Signup
mailgunmod.prototype.sendEmail_to_Premium_CustomerRegistration = function (CustomerData, callback) {
    var me = this;
    var htmlbody = '<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head>' +
        '  <title>Registration Successful</title>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1">' +
        '  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">' +
        '    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">' +
        '  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>' +
        '  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>' +
        '</head>' +
        '<body style="margin: 0 !important;-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; padding: 0 !important;">' +
        '<div class="container-fluid">' +
        '  <div class="row">' +
        '    <div class="col-xs-12 col-sm-6 col-md-6 col-sm-offset-3 col-md-offset-3">' +
        '    <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 15px 0;width:100%;background-color: #1e1f25" class="logo">' +
        '                        <a href="https://www.ezshipp.com" target="_blank">' +
        '                            <img alt="Logo" src="https://s3.amazonaws.com/ezshippimages/ezshipp_new.png" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;width: 120px;" border="0">' +
        '                        </a>' +
        '                </td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td bgcolor="#ffffff" align="center" style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">Premium Customer Registered Successfully</td>' +
        '                </tr>' +
        '                <tr>' +
        '                <td><hr style="width: 200px;"/></td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 20px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;">Hi ' + CustomerData.First_name + ',</td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 10px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;text-indent:10%;">' +
        '                       You have been Registered as Premium Customer in Ezshipp.We hope you find the best of stores on our app and save time and money!<br><br> Cheers, <br>  Team ezshipp</td>' +
        '                        </tr>' +
        '                <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 30px 0px 10px 0px;font-size:12px;">' +
        '                                <a href="https://play.google.com/store/apps/details?id=com.ezshipp.customer.app" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/androidstore.jpg"></a>        <a href="https://itunes.apple.com/us/app/ezshipp/id1233108964" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/applestore.gif"></a>' +
        '                                </td>' +
        '                        </tr>' +
        '                    </table>   ' +
        '               </td> ' +
        '            </tr>' +
        '            <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-left: -30px;">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 10px 0px 10px 0px;font-size:18px;">' +
        '                                <p style="margin-left: 60px">Follow Us</p>' +
        '                            </td>' +
        '                            </tr>' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 5px 0px 30px 0px;font-size:18px;">' +
        '                                <ul style="display:inline;">' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/fblogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/twittlogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/gplogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/lkinlogo.jpg" /></li>' +
        '                                </ul>' +
        '                    </td>' +
        '                    </tr>' +
        '                    </table>' +
        '                    </td>' +
        '                    </tr>' +
        '             <tr>' +
        '                 <td>' +
        '                     <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 20px 0;width:100%;background-color: #1e1f25;font-size: 12px;color: #fff; line-height: 18px; font-family: Helvetica, Arial, sans-serif;" class="logo">' +
        '                    1ST FLOOR, KARAN ARCADE,<br>OPP SBI, MAXCURE HOSPITAL LANE, <br>PATRIKA NAGAR, HI TECH CITY, HYDERABAD - 500081.' +
        '                   <br /><br />' +
        '                    You are receiving this mail from  <a href="https://www.ezshipp.com" target="_blank" style="text-decoration: none;"><span style="font-weight: bold;color: #ee9b0a;font-size: 15px;">ezshipp private ltd.</span></a> <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>All rights Reserved.' +
        '                    <br /><br />' +
        '                    <a href="https://ezshipp.com/privacy_policy.html" target="_blank"  style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Privacy Policy</a>' +
        '                        <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>' +
        '                        <a href="https://ezshipp.com/cancellation.html" target="_blank" style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Cancellations and Refunds</a>' +
        '                </td>' +
        '                </tr>' +
        '            </table>' +
        '            </td>' +
        '            </tr>' +
        '     </table>' +
        '     </div>' +
        '   </div>' +
        '</div>' +
        '</body>' +
        '</html>';
    var data = {
        from: me.config.mailgun.frommail,
        to: CustomerData.Email,
        subject: "Premium Customer!",
        html: htmlbody
    };
    me.mailgun.messages().send(data, function (error, body) {
        return callback(false, body);
    });
};

//Entity Registration
mailgunmod.prototype.sendEmail_Entity_Registration = function (EntityData, Password, callback) {
    var me = this;
    var htmlbody = '<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head>' +
        '  <title>Registration Successful</title>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1">' +
        '  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">' +
        '    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">' +
        '  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>' +
        '  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>' +
        '</head>' +
        '<body style="margin: 0 !important;-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; padding: 0 !important;">' +
        '<div class="container-fluid">' +
        '  <div class="row">' +
        '    <div class="col-xs-12 col-sm-6 col-md-6 col-sm-offset-3 col-md-offset-3">' +
        '    <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 15px 0;width:100%;background-color: #1e1f25" class="logo">' +
        '                        <a href="https://www.ezshipp.com" target="_blank">' +
        '                            <img alt="Logo" src="https://s3.amazonaws.com/ezshippimages/ezshipp_new.png" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;width: 120px;" border="0">' +
        '                        </a>' +
        '                </td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td bgcolor="#ffffff" align="center" style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">Welcome To ezshipp!</td>' +
        '                </tr>' +
        '                <tr>' +
        '                <td><hr style="width: 200px;"/></td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 20px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;">Hi ' + EntityData.Admin_Name + ',</td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 10px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;text-indent:10%;">' +
        '                        Your Business Franchise <span style="color:#00f">' + EntityData.Store_Entity_Name + '</span> has been Registered in our Ezshipp.Your Login Credentials are sent to your Mobile Number <span style="color:#00f">' + EntityData.Phone_Number + '</span>.We hope you grow your stores on our app and save time and money!<br><br> Cheers, <br>  Team ezshipp</td>' +
        '                        </tr>' +
        '                <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 30px 0px 10px 0px;font-size:12px;">' +
        '                                <a href="https://play.google.com/store/apps/details?id=com.ezshipp.customer.app" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/androidstore.jpg"></a>        <a href="https://itunes.apple.com/us/app/ezshipp/id1233108964" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/applestore.gif"></a>' +
        '                                </td>' +
        '                        </tr>' +
        '                    </table>   ' +
        '               </td> ' +
        '            </tr>' +
        '            <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-left: -30px;">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 10px 0px 10px 0px;font-size:18px;">' +
        '                                <p style="margin-left: 60px">Follow Us</p>' +
        '                            </td>' +
        '                            </tr>' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 5px 0px 30px 0px;font-size:18px;">' +
        '                                <ul style="display:inline;">' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/fblogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/twittlogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/gplogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/lkinlogo.jpg" /></li>' +
        '                                </ul>' +
        '                    </td>' +
        '                    </tr>' +
        '                    </table>' +
        '                    </td>' +
        '                    </tr>' +
        '             <tr>' +
        '                 <td>' +
        '                     <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 20px 0;width:100%;background-color: #1e1f25;font-size: 12px;color: #fff; line-height: 18px; font-family: Helvetica, Arial, sans-serif;" class="logo">' +
        '                    1ST FLOOR, KARAN ARCADE,<br>OPP SBI, MAXCURE HOSPITAL LANE, <br>PATRIKA NAGAR, HI TECH CITY, HYDERABAD - 500081.' +
        '                   <br /><br />' +
        '                    You are receiving this mail from  <a href="https://www.ezshipp.com" target="_blank" style="text-decoration: none;"><span style="font-weight: bold;color: #ee9b0a;font-size: 15px;">ezshipp private ltd.</span></a> <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>All rights Reserved.' +
        '                    <br /><br />' +
        '                    <a href="https://ezshipp.com/privacy_policy.html" target="_blank"  style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Privacy Policy</a>' +
        '                        <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>' +
        '                        <a href="https://ezshipp.com/cancellation.html" target="_blank" style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Cancellations and Refunds</a>' +
        '                </td>' +
        '                </tr>' +
        '            </table>' +
        '            </td>' +
        '            </tr>' +
        '     </table>' +
        '     </div>' +
        '   </div>' +
        '</div>' +
        '</body>' +
        '</html>';
    var data = {
        from: me.config.mailgun.frommail,
        to: EntityData.Email_Address,
        subject: "Welcome to ezshipp!",
        html: htmlbody
    };
    me.mailgun.messages().send(data, function (error, body) {
        console.log("Html Body");
        console.log(htmlbody);
        return callback(false, body);
    });
};


//Send Registration Success to Customer after 
mailgunmod.prototype.send_Offer_Code_Mail_Referral = function (maildata, callback) {
    var me = this;
    var htmlbody = '<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head>' +
        '  <title>Referral Offer Code</title>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1">' +
        '  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">' +
        '    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">' +
        '  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>' +
        '  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>' +
        '</head>' +
        '<body style="margin: 0 !important;-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; padding: 0 !important;">' +
        '<div class="container-fluid">' +
        '  <div class="row">' +
        '    <div class="col-xs-12 col-sm-6 col-md-6 col-sm-offset-3 col-md-offset-3">' +
        '    <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 15px 0;width:100%;background-color: #1e1f25" class="logo">' +
        '                        <a href="https://www.ezshipp.com" target="_blank">' +
        '                            <img alt="Logo" src="https://s3.amazonaws.com/ezshippimages/ezshipp_new.png" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;width: 120px;" border="0">' +
        '                        </a>' +
        '                </td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td bgcolor="#ffffff" align="center" style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">Congrats! You receive a new Referral Offer Code!</td>' +
        '                </tr>' +
        '                <tr>' +
        '                <td><hr style="width: 200px;"/></td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 20px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;">Hi ' + maildata.Name + ',</td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 10px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;text-indent:10%;">' +
        '                        You receive a new Offer Code: ' + maildata.OfferCode + ' . Use this Offer Code to avail ' + maildata.DiscountPercentage + '% off on your next Ezshipp Order. We hope you find the best of stores on our app and save time and money!<br><br> Cheers, <br>  Team ezshipp</td>' +
        '                        </tr>' +
        '                <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 30px 0px 10px 0px;font-size:12px;">' +
        '                                <a href="https://play.google.com/store/apps/details?id=com.ezshipp.customer.app" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/androidstore.jpg"></a>        <a href="https://itunes.apple.com/us/app/ezshipp/id1233108964" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/applestore.gif"></a>' +
        '                                </td>' +
        '                        </tr>' +
        '                    </table>   ' +
        '               </td> ' +
        '            </tr>' +
        '            <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-left: -30px;">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 10px 0px 10px 0px;font-size:18px;">' +
        '                                <p style="margin-left: 60px">Follow Us</p>' +
        '                            </td>' +
        '                            </tr>' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 5px 0px 30px 0px;font-size:18px;">' +
        '                                <ul style="display:inline;">' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/fblogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/twittlogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/gplogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/lkinlogo.jpg" /></li>' +
        '                                </ul>' +
        '                    </td>' +
        '                    </tr>' +
        '                    </table>' +
        '                    </td>' +
        '                    </tr>' +
        '             <tr>' +
        '                 <td>' +
        '                     <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 20px 0;width:100%;background-color: #1e1f25;font-size: 12px;color: #fff; line-height: 18px; font-family: Helvetica, Arial, sans-serif;" class="logo">' +
        '                    1ST FLOOR, KARAN ARCADE,<br>OPP SBI, MAXCURE HOSPITAL LANE, <br>PATRIKA NAGAR, HI TECH CITY, HYDERABAD - 500081.' +
        '                   <br /><br />' +
        '                    You are receiving this mail from  <a href="https://www.ezshipp.com" target="_blank" style="text-decoration: none;"><span style="font-weight: bold;color: #ee9b0a;font-size: 15px;">ezshipp private ltd.</span></a> <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>All rights Reserved.' +
        '                    <br /><br />' +
        '                    <a href="https://ezshipp.com/privacy_policy.html" target="_blank"  style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Privacy Policy</a>' +
        '                        <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>' +
        '                        <a href="https://ezshipp.com/cancellation.html" target="_blank" style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Cancellations and Refunds</a>' +
        '                </td>' +
        '                </tr>' +
        '            </table>' +
        '            </td>' +
        '            </tr>' +
        '     </table>' +
        '     </div>' +
        '   </div>' +
        '</div>' +
        '</body>' +
        '</html>';
    var data = {
        from: me.config.mailgun.frommail,
        to: maildata.Email,
        subject: "Referal Offer Code!",
        html: htmlbody
    };
    me.mailgun.messages().send(data, function (error, body) {
        return callback(body);
    });
};


//Send Registration Success to Customer after Signup
mailgunmod.prototype.sendEmailCustomerRegistration = function (Email, First_name, referral_code, callback) {
    var me = this;
    var htmlbody = '<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head>' +
        '  <title>Registration Successful</title>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1">' +
        '  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">' +
        '    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">' +
        '  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>' +
        '  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>' +
        '</head>' +
        '<body style="margin: 0 !important;-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; padding: 0 !important;">' +
        '<div class="container-fluid">' +
        '  <div class="row">' +
        '    <div class="col-xs-12 col-sm-6 col-md-6 col-sm-offset-3 col-md-offset-3">' +
        '    <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 15px 0;width:100%;background-color: #1e1f25" class="logo">' +
        '                        <a href="https://www.ezshipp.com" target="_blank">' +
        '                            <img alt="Logo" src="https://s3.amazonaws.com/ezshippimages/ezshipp_new.png" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;width: 120px;" border="0">' +
        '                        </a>' +
        '                </td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td bgcolor="#ffffff" align="center" style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">Welcome To ezshipp!</td>' +
        '                </tr>' +
        '                <tr>' +
        '                <td><hr style="width: 200px;"/></td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 20px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;">Hi ' + First_name + ',</td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 10px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;text-indent:10%;">' +
        '                        Thank you for signing up with ezshipp .Your referral code is ' + referral_code + '.Share your referral code with your friends and relatives and get maximum benefits from ezshipp.We hope you find the best of stores on our app and save time and money!<br><br> Cheers, <br>  Team ezshipp</td>' +
        '                        </tr>' +
        '                <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 30px 0px 10px 0px;font-size:12px;">' +
        '                                <a href="https://play.google.com/store/apps/details?id=com.ezshipp.customer.app" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/androidstore.jpg"></a>        <a href="https://itunes.apple.com/us/app/ezshipp/id1233108964" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/applestore.gif"></a>' +
        '                                </td>' +
        '                        </tr>' +
        '                    </table>   ' +
        '               </td> ' +
        '            </tr>' +
        '            <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-left: -30px;">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 10px 0px 10px 0px;font-size:18px;">' +
        '                                <p style="margin-left: 60px">Follow Us</p>' +
        '                            </td>' +
        '                            </tr>' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 5px 0px 30px 0px;font-size:18px;">' +
        '                                <ul style="display:inline;">' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/fblogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/twittlogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/gplogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/lkinlogo.jpg" /></li>' +
        '                                </ul>' +
        '                    </td>' +
        '                    </tr>' +
        '                    </table>' +
        '                    </td>' +
        '                    </tr>' +
        '             <tr>' +
        '                 <td>' +
        '                     <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 20px 0;width:100%;background-color: #1e1f25;font-size: 12px;color: #fff; line-height: 18px; font-family: Helvetica, Arial, sans-serif;" class="logo">' +
        '                    1ST FLOOR, KARAN ARCADE,<br>OPP SBI, MAXCURE HOSPITAL LANE, <br>PATRIKA NAGAR, HI TECH CITY, HYDERABAD - 500081.' +
        '                   <br /><br />' +
        '                    You are receiving this mail from  <a href="https://www.ezshipp.com" target="_blank" style="text-decoration: none;"><span style="font-weight: bold;color: #ee9b0a;font-size: 15px;">ezshipp private ltd.</span></a> <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>All rights Reserved.' +
        '                    <br /><br />' +
        '                    <a href="https://ezshipp.com/privacy_policy.html" target="_blank"  style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Privacy Policy</a>' +
        '                        <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>' +
        '                        <a href="https://ezshipp.com/cancellation.html" target="_blank" style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Cancellations and Refunds</a>' +
        '                </td>' +
        '                </tr>' +
        '            </table>' +
        '            </td>' +
        '            </tr>' +
        '     </table>' +
        '     </div>' +
        '   </div>' +
        '</div>' +
        '</body>' +
        '</html>';
    var data = {
        from: me.config.mailgun.frommail,
        to: Email,
        subject: "Welcome to ezshipp!",
        html: htmlbody
    };
    me.mailgun.messages().send(data, function (error, body) {
        return callback(false, body);
    });
};
//send mail to driver
mailgunmod.prototype.cancelledByCustomerSendEmailToDriver = function (msg, callback) {
    var me = this;
    var htmlbody = '<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head>' +
        '  <title>Ordered Cancelled by Customer</title>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1">' +
        '  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">' +
        '    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">' +
        '  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>' +
        '  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>' +
        '</head>' +
        '<body style="margin: 0 !important;-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; padding: 0 !important;">' +
        '<div class="container-fluid">' +
        '  <div class="row">' +
        '    <div class="col-xs-12 col-sm-6 col-md-6 col-sm-offset-3 col-md-offset-3">' +
        '    <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 15px 0;width:100%;background-color: #1e1f25" class="logo">' +
        '                        <a href="https://www.ezshipp.com" target="_blank">' +
        '                            <img alt="Logo" src="https://s3.amazonaws.com/ezshippimages/ezshipp_new.png" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;width: 120px;" border="0">' +
        '                        </a>' +
        '                </td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td bgcolor="#ffffff" align="center" style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">Ordered Cancelled by Customer!</td>' +
        '                </tr>' +
        '                <tr>' +
        '                <td><hr style="width: 200px;"/></td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 20px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;">Dear,</td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 10px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;text-indent:10%;">' +
        '                        ' + msg.customerName + ' has Cancelled the Order(' + msg.orderId + ') on ' + msg.date + ' & ' + msg.time + ' on Ezshipp due to <span style="color: #ee9b0a">' + msg.cancellationReason + '</span>. <br><br> Cheers, <br>  Team ezshipp</td>' +
        '                        </tr>' +
        '                <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 30px 0px 10px 0px;font-size:12px;">' +
        '                                <a href="https://play.google.com/store/apps/details?id=com.ezshipp.customer.app" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/androidstore.jpg"></a>        <a href="https://itunes.apple.com/us/app/ezshipp/id1233108964" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/applestore.gif"></a>' +
        '                                </td>' +
        '                        </tr>' +
        '                    </table>   ' +
        '               </td> ' +
        '            </tr>' +
        '            <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-left: -30px;">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 10px 0px 10px 0px;font-size:18px;">' +
        '                                <p style="margin-left: 60px">Follow Us</p>' +
        '                            </td>' +
        '                            </tr>' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 5px 0px 30px 0px;font-size:18px;">' +
        '                                <ul style="display:inline;">' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/fblogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/twittlogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/gplogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/lkinlogo.jpg" /></li>' +
        '                                </ul>' +
        '                    </td>' +
        '                    </tr>' +
        '                    </table>' +
        '                    </td>' +
        '                    </tr>' +
        '             <tr>' +
        '                 <td>' +
        '                     <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 20px 0;width:100%;background-color: #1e1f25;font-size: 12px;color: #fff; line-height: 18px; font-family: Helvetica, Arial, sans-serif;" class="logo">' +
        '                    1ST FLOOR, KARAN ARCADE,<br>OPP SBI, MAXCURE HOSPITAL LANE, <br>PATRIKA NAGAR, HI TECH CITY, HYDERABAD - 500081.' +
        '                   <br /><br />' +
        '                    You are receiving this mail from  <a href="https://www.ezshipp.com" target="_blank" style="text-decoration: none;"><span style="font-weight: bold;color: #ee9b0a;font-size: 15px;">ezshipp private ltd.</span></a> <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>All rights Reserved.' +
        '                    <br /><br />' +
        '                    <a href="https://ezshipp.com/privacy_policy.html" target="_blank"  style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Privacy Policy</a>' +
        '                        <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>' +
        '                        <a href="https://ezshipp.com/cancellation.html" target="_blank" style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Cancellations and Refunds</a>' +
        '                </td>' +
        '                </tr>' +
        '            </table>' +
        '            </td>' +
        '            </tr>' +
        '     </table>' +
        '     </div>' +
        '   </div>' +
        '</div>' +
        '</body>' +
        '</html>';
    var data = {
        from: me.config.mailgun.frommail,
        to: msg.email,
        subject: "Order(" + msg.orderId + ") cancelled on ezshipp",
        html: htmlbody
    };

    me.mailgun.messages().send(data, function (error, body) {
        return callback(false, body);
    });
}


//Order cancelled by customer
//send mail to customer
mailgunmod.prototype.cancelledByCustomerSendEmailToCustomer1 = function (msg, callback) {
    var me = this;
    var htmlbody = '<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head>' +
        '  <title>Ordered Cancelled by Customer</title>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1">' +
        '  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">' +
        '    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">' +
        '  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>' +
        '  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>' +
        '</head>' +
        '<body style="margin: 0 !important;-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; padding: 0 !important;">' +
        '<div class="container-fluid">' +
        '  <div class="row">' +
        '    <div class="col-xs-12 col-sm-6 col-md-6 col-sm-offset-3 col-md-offset-3">' +
        '    <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 15px 0;width:100%;background-color: #1e1f25" class="logo">' +
        '                        <a href="https://www.ezshipp.com" target="_blank">' +
        '                            <img alt="Logo" src="https://s3.amazonaws.com/ezshippimages/ezshipp_new.png" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;width: 120px;" border="0">' +
        '                        </a>' +
        '                </td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td bgcolor="#ffffff" align="center" style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">Order Cancelled!</td>' +
        '                </tr>' +
        '                <tr>' +
        '                <td><hr style="width: 200px;"/></td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 20px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;">Hi ' + msg.customerName + ',</td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 10px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;text-indent:10%;">' +
        '                        You have cancelled the order(' + msg.orderId + ') with ezshipp on ' + msg.date + ' & ' + msg.time + '.We have informed the driver and we hope you use ezshipp for shipping and for placing store orders again.<br><br> Cheers, <br>  Team ezshipp</td>' +
        '                        </tr>' +
        '                <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 30px 0px 10px 0px;font-size:12px;">' +
        '                                <a href="https://play.google.com/store/apps/details?id=com.ezshipp.customer.app" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/androidstore.jpg"></a>        <a href="https://itunes.apple.com/us/app/ezshipp/id1233108964" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/applestore.gif"></a>' +
        '                                </td>' +
        '                        </tr>' +
        '                    </table>   ' +
        '               </td> ' +
        '            </tr>' +
        '            <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-left: -30px;">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 10px 0px 10px 0px;font-size:18px;">' +
        '                                <p style="margin-left: 60px">Follow Us</p>' +
        '                            </td>' +
        '                            </tr>' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 5px 0px 30px 0px;font-size:18px;">' +
        '                                <ul style="display:inline;">' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/fblogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/twittlogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/gplogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/lkinlogo.jpg" /></li>' +
        '                                </ul>' +
        '                    </td>' +
        '                    </tr>' +
        '                    </table>' +
        '                    </td>' +
        '                    </tr>' +
        '             <tr>' +
        '                 <td>' +
        '                     <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 20px 0;width:100%;background-color: #1e1f25;font-size: 12px;color: #fff; line-height: 18px; font-family: Helvetica, Arial, sans-serif;" class="logo">' +
        '                    1ST FLOOR, KARAN ARCADE,<br>OPP SBI, MAXCURE HOSPITAL LANE, <br>PATRIKA NAGAR, HI TECH CITY, HYDERABAD - 500081.' +
        '                   <br /><br />' +
        '                    You are receiving this mail from  <a href="https://www.ezshipp.com" target="_blank" style="text-decoration: none;"><span style="font-weight: bold;color: #ee9b0a;font-size: 15px;">ezshipp private ltd.</span></a> <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>All rights Reserved.' +
        '                    <br /><br />' +
        '                    <a href="https://ezshipp.com/privacy_policy.html" target="_blank"  style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Privacy Policy</a>' +
        '                        <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>' +
        '                        <a href="https://ezshipp.com/cancellation.html" target="_blank" style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Cancellations and Refunds</a>' +
        '                </td>' +
        '                </tr>' +
        '            </table>' +
        '            </td>' +
        '            </tr>' +
        '     </table>' +
        '     </div>' +
        '   </div>' +
        '</div>' +
        '</body>' +
        '</html>';
    var data = {
        from: me.config.mailgun.frommail,
        to: msg.email,
        subject: "Order (" + msg.orderId + ") cancelled on Ezshipp",
        html: htmlbody
    };

    me.mailgun.messages().send(data, function (error, body) {
        return callback(false, body);
    });
}

//send mail to customer
mailgunmod.prototype.cancelledByCustomerSendEmailToCustomer = function (msg, callback) {
    var me = this;
    var htmlbody = '<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head>' +
        '  <title>Ordered Cancelled by Customer</title>' +
        '  <meta charset="utf-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1">' +
        '  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">' +
        '    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">' +
        '  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>' +
        '  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>' +
        '</head>' +
        '<body style="margin: 0 !important;-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; padding: 0 !important;">' +
        '<div class="container-fluid">' +
        '  <div class="row">' +
        '    <div class="col-xs-12 col-sm-6 col-md-6 col-sm-offset-3 col-md-offset-3">' +
        '    <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 15px 0;width:100%;background-color: #1e1f25" class="logo">' +
        '                        <a href="https://www.ezshipp.com" target="_blank">' +
        '                            <img alt="Logo" src="https://s3.amazonaws.com/ezshippimages/ezshipp_new.png" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;width: 120px;" border="0">' +
        '                        </a>' +
        '                </td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td bgcolor="#ffffff" align="center" style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">Order Cancelled!</td>' +
        '                </tr>' +
        '                <tr>' +
        '                <td><hr style="width: 200px;"/></td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 20px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;">Hi ' + msg.customerName + ',</td>' +
        '                </tr>' +
        '                <tr>' +
        '                    <td align="left" style="padding: 10px 0 0 7%; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;text-indent:10%;">' +
        '                        You have cancelled the order(' + msg.orderId + ') with ezshipp on ' + msg.date + ' & ' + msg.time + '.We have informed the driver and we hope you use ezshipp for shipping and for placing store orders again.<br><br> Cheers, <br>  Team ezshipp</td>' +
        '                        </tr>' +
        '                <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 30px 0px 10px 0px;font-size:12px;">' +
        '                                <a href="https://play.google.com/store/apps/details?id=com.ezshipp.customer.app" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/androidstore.jpg"></a>        <a href="https://itunes.apple.com/us/app/ezshipp/id1233108964" target="_blank" > <img src="https://s3.amazonaws.com/ezshippimages/applestore.gif"></a>' +
        '                                </td>' +
        '                        </tr>' +
        '                    </table>   ' +
        '               </td> ' +
        '            </tr>' +
        '            <tr>' +
        '                <td>' +
        '                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-left: -30px;">' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 10px 0px 10px 0px;font-size:18px;">' +
        '                                <p style="margin-left: 60px">Follow Us</p>' +
        '                            </td>' +
        '                            </tr>' +
        '                        <tr>' +
        '                            <td align="center" style="padding: 5px 0px 30px 0px;font-size:18px;">' +
        '                                <ul style="display:inline;">' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/fblogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/twittlogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/gplogo.png" /></li>' +
        '                                    <li style="display:inline;margin-left: 10px;"><img src="https://s3.amazonaws.com/ezshippimages/lkinlogo.jpg" /></li>' +
        '                                </ul>' +
        '                    </td>' +
        '                    </tr>' +
        '                    </table>' +
        '                    </td>' +
        '                    </tr>' +
        '             <tr>' +
        '                 <td>' +
        '                     <table align="center" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">' +
        '            <tr>' +
        '                <td align="center" valign="top" style="padding: 20px 0;width:100%;background-color: #1e1f25;font-size: 12px;color: #fff; line-height: 18px; font-family: Helvetica, Arial, sans-serif;" class="logo">' +
        '                    1ST FLOOR, KARAN ARCADE,<br>OPP SBI, MAXCURE HOSPITAL LANE, <br>PATRIKA NAGAR, HI TECH CITY, HYDERABAD - 500081.' +
        '                   <br /><br />' +
        '                    You are receiving this mail from  <a href="https://www.ezshipp.com" target="_blank" style="text-decoration: none;"><span style="font-weight: bold;color: #ee9b0a;font-size: 15px;">ezshipp private ltd.</span></a> <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>All rights Reserved.' +
        '                    <br /><br />' +
        '                    <a href="https://ezshipp.com/privacy_policy.html" target="_blank"  style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Privacy Policy</a>' +
        '                        <span style="font-family: Arial, sans-serif; font-size: 15px; color: #fff;">  |  </span>' +
        '                        <a href="https://ezshipp.com/cancellation.html" target="_blank" style="color: #ee9b0a;font-size: 15px; text-decoration: none;">Cancellations and Refunds</a>' +
        '                </td>' +
        '                </tr>' +
        '            </table>' +
        '            </td>' +
        '            </tr>' +
        '     </table>' +
        '     </div>' +
        '   </div>' +
        '</div>' +
        '</body>' +
        '</html>';
    var data = {
        from: me.config.mailgun.frommail,
        to: msg.email,
        subject: "Order(" + msg.orderId + ") cancelled on ezshipp",
        html: htmlbody
    };

    me.mailgun.messages().send(data, function (error, body) {
        return callback(false, body);
    });
};


module.exports = mailgunmod;