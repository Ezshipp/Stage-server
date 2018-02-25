var FilterModel = /** @class */ (function () {
    function FilterModel(skip, limit, AdminID, CLEAR_ALL, Whether_Name_Filter, Name, Whether_PhoneNumber_Filter, PhoneNumber, Whether_New_Jobs_Filter, Whether_Ongoing_Jobs_Filter, Whether_Completed_Jobs_Filter, Whether_Expired_Jobs_Filter, Whether_Date_Filter, from_date, to_date, DriverID, Whether_Driver_Filter, Name_Query_Type, Whether_COD, Whether_Online, Payment_Captured, Payment_Not_Captured, sortOptions, InstantType, fourHoursType, SameType, Whether_Pick_Zone_Filter, PickZoneArray, Whether_Drop_Zone_Filter, DropZoneArray) {
        this.skip = skip;
        this.limit = limit;
        this.AdminID = AdminID;
        this.CLEAR_ALL = CLEAR_ALL;
        this.Whether_Name_Filter = Whether_Name_Filter;
        this.Name = Name;
        this.Whether_PhoneNumber_Filter = Whether_PhoneNumber_Filter;
        this.PhoneNumber = PhoneNumber;
        this.Whether_New_Jobs_Filter = Whether_New_Jobs_Filter;
        this.Whether_Ongoing_Jobs_Filter = Whether_Ongoing_Jobs_Filter;
        this.Whether_Completed_Jobs_Filter = Whether_Completed_Jobs_Filter;
        this.Whether_Expired_Jobs_Filter = Whether_Expired_Jobs_Filter;
        this.Whether_Date_Filter = Whether_Date_Filter;
        this.from_date = from_date;
        this.to_date = to_date;
        this.DriverID = DriverID;
        this.Whether_Driver_Filter = Whether_Driver_Filter;
        this.Name_Query_Type = Name_Query_Type;
        this.Whether_COD = Whether_COD;
        this.Whether_Online = Whether_Online;
        this.Payment_Captured = Payment_Captured;
        this.Payment_Not_Captured = Payment_Not_Captured;
        this.sortOptions = sortOptions;
        this.InstantType = InstantType;
        this.fourHoursType = fourHoursType;
        this.SameType = SameType;
        this.Whether_Pick_Zone_Filter = Whether_Pick_Zone_Filter;
        this.PickZoneArray = PickZoneArray;
        this.Whether_Drop_Zone_Filter = Whether_Drop_Zone_Filter;
        this.DropZoneArray = DropZoneArray;
    }
    return FilterModel;
}());
export { FilterModel };
