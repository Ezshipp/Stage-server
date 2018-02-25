var driverModel = /** @class */ (function () {
    function driverModel(skip, SearchValue, DriverID, from_date, to_date, Salary, Amount, Payment_Type, TransactionID, Purpose_Type, Comment, bookingType, OperatorID, ZoneID, password, ProviderID, limit) {
        this.skip = skip;
        this.SearchValue = SearchValue;
        this.DriverID = DriverID;
        this.from_date = from_date;
        this.to_date = to_date;
        this.Salary = Salary;
        this.Amount = Amount;
        this.Payment_Type = Payment_Type;
        this.TransactionID = TransactionID;
        this.Purpose_Type = Purpose_Type;
        this.Comment = Comment;
        this.bookingType = bookingType;
        this.OperatorID = OperatorID;
        this.ZoneID = ZoneID;
        this.password = password;
        this.ProviderID = ProviderID;
        this.limit = limit;
    }
    return driverModel;
}());
export { driverModel };
