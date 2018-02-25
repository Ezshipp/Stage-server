var GenReportModal = /** @class */ (function () {
    function GenReportModal(AdminID, CustomerID, from_date, to_date, skip, limit, sortOptions) {
        this.AdminID = AdminID;
        this.CustomerID = CustomerID;
        this.from_date = from_date;
        this.to_date = to_date;
        this.skip = skip;
        this.limit = limit;
        this.sortOptions = sortOptions;
    }
    return GenReportModal;
}());
export { GenReportModal };
