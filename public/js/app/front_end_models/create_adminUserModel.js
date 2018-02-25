var CreateAdminModel = /** @class */ (function () {
    function CreateAdminModel(Name, EmailID, Password, HR_SALARY_PERMISSIONS, ADMIN_USER_PERMISSIONS, AdminID, skip, limit, sortOptions, SearchValue, RequestID, To_AdminID) {
        this.Name = Name;
        this.EmailID = EmailID;
        this.Password = Password;
        this.HR_SALARY_PERMISSIONS = HR_SALARY_PERMISSIONS;
        this.ADMIN_USER_PERMISSIONS = ADMIN_USER_PERMISSIONS;
        this.AdminID = AdminID;
        this.skip = skip;
        this.limit = limit;
        this.sortOptions = sortOptions;
        this.SearchValue = SearchValue;
        this.RequestID = RequestID;
        this.To_AdminID = To_AdminID;
    }
    return CreateAdminModel;
}());
export { CreateAdminModel };
