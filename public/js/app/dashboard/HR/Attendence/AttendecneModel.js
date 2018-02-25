var AttendenceModel = /** @class */ (function () {
    function AttendenceModel(skip, date, EmployeeID, from_date, to_date, AnalyticType, ReturnType, Date) {
        this.skip = skip;
        this.date = date;
        this.EmployeeID = EmployeeID;
        this.from_date = from_date;
        this.to_date = to_date;
        this.AnalyticType = AnalyticType;
        this.ReturnType = ReturnType;
        this.Date = Date;
    }
    return AttendenceModel;
}());
export { AttendenceModel };
