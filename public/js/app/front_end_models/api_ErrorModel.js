var ErrorResponseModel = /** @class */ (function () {
    function ErrorResponseModel(AdminID, API_ID, Error_Response, Error_Description, ListID, msg, Status) {
        this.AdminID = AdminID;
        this.API_ID = API_ID;
        this.Error_Response = Error_Response;
        this.Error_Description = Error_Description;
        this.ListID = ListID;
        this.msg = msg;
        this.Status = Status;
    }
    return ErrorResponseModel;
}());
export { ErrorResponseModel };
