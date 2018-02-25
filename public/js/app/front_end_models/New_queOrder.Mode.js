var NewQueueModel = /** @class */ (function () {
    function NewQueueModel(AdminID, Phone, pickAddress, skip, limit, SequenceID, Direction_Number, DriverID, Whether_New_Orders, Whether_Ongoing_Orders) {
        this.AdminID = AdminID;
        this.Phone = Phone;
        this.pickAddress = pickAddress;
        this.skip = skip;
        this.limit = limit;
        this.SequenceID = SequenceID;
        this.Direction_Number = Direction_Number;
        this.DriverID = DriverID;
        this.Whether_New_Orders = Whether_New_Orders;
        this.Whether_Ongoing_Orders = Whether_Ongoing_Orders;
    }
    return NewQueueModel;
}());
export { NewQueueModel };
