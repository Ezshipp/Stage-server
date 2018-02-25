var AuthenticationModel = /** @class */ (function () {
    function AuthenticationModel(Cookie, EmailID, countryCode, OTP, Code, First_name, Email, Password, terms_cond, CustomerID, Agreement_Time, SessionID, referral_code, referral_code_given, ReferalID, AdminID, DriverID) {
        this.Cookie = Cookie;
        this.EmailID = EmailID;
        this.countryCode = countryCode;
        this.OTP = OTP;
        this.Code = Code;
        this.First_name = First_name;
        this.Email = Email;
        this.Password = Password;
        this.terms_cond = terms_cond;
        this.CustomerID = CustomerID;
        this.Agreement_Time = Agreement_Time;
        this.SessionID = SessionID;
        this.referral_code = referral_code;
        this.referral_code_given = referral_code_given;
        this.ReferalID = ReferalID;
        this.AdminID = AdminID;
        this.DriverID = DriverID;
    }
    return AuthenticationModel;
}());
export { AuthenticationModel };
