var OrderHistoryModel = /** @class */ (function () {
    function OrderHistoryModel(CustomerID, skip, orderId, SearchValue, SessionID) {
        this.CustomerID = CustomerID;
        this.skip = skip;
        this.orderId = orderId;
        this.SearchValue = SearchValue;
        this.SessionID = SessionID;
    }
    return OrderHistoryModel;
}());
export { OrderHistoryModel };
